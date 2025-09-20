const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Validation schema
const numbersSchema = Joi.object({
  numbers: Joi.array()
    .items(Joi.number().required())
    .min(1)
    .max(1000)
    .required()
    .messages({
      "array.base": "Numbers must be an array",
      "array.min": "Array must contain at least one number",
      "array.max": "Array can contain at most 1000 numbers",
      "any.required": "Numbers array is required",
    }),
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Sum calculation endpoint
app.post("/api/sum", (req, res) => {
  try {
    // Validate request body
    const { error, value } = numbersSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.details.map((detail) => detail.message),
      });
    }

    const { numbers } = value;

    // Calculate sum with overflow protection
    const sum = numbers.reduce((acc, num) => {
      const result = acc + num;

      // Check for overflow (JavaScript's MAX_SAFE_INTEGER)
      if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
        throw new Error("Sum exceeds safe integer range");
      }

      return result;
    }, 0);

    // Log the operation (in production, use proper logging library)
    console.log(`Sum calculated: ${numbers.length} numbers, result: ${sum}`);

    res.status(200).json({
      success: true,
      data: {
        sum: sum,
        count: numbers.length,
        numbers: numbers,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calculating sum:", error);

    res.status(500).json({
      success: false,
      error:
        error.message === "Sum exceeds safe integer range"
          ? "Sum too large to calculate safely"
          : "Internal server error",
      timestamp: new Date().toISOString(),
    });
  }
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  res.status(500).json({
    success: false,
    error: "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧮 Sum endpoint: http://localhost:${PORT}/api/sum`);
});

module.exports = app;
