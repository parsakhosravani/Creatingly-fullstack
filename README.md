# Full-Stack Counter Application

A modern full-stack application built with Node.js, Express, React, and TypeScript that demonstrates best practices for web development.

## Features

### Backend (Node.js + Express)

- ✅ RESTful API endpoint that accepts POST requests with JSON payload
- ✅ Sum calculation for array of numbers
- ✅ Comprehensive input validation using Joi
- ✅ Security middleware (Helmet, CORS, Rate limiting)
- ✅ Error handling and logging
- ✅ Health check endpoint
- ✅ Unit tests with Jest and Supertest
- ✅ Overflow protection for large numbers

### Frontend (React + TypeScript)

- ✅ Modern counter component with increment/decrement buttons
- ✅ Counter never goes below zero
- ✅ Interactive sum calculator that uses the backend API
- ✅ Custom hooks for state management
- ✅ Responsive design with modern CSS
- ✅ Loading states and error handling
- ✅ Accessibility features
- ✅ TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies for both server and client:

```bash
npm run install:all
```

2. Start the development servers:

```bash
npm run dev
```

This will start:

- Backend server on http://localhost:3001
- Frontend development server on http://localhost:3000

### Individual Commands

#### Backend

```bash
cd server
npm install
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

#### Frontend

```bash
cd client
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## API Documentation

### POST /api/sum

Calculate the sum of an array of numbers.

**Request Body:**

```json
{
  "numbers": [1, 2, 3, 4, 5]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "sum": 15,
    "count": 5,
    "numbers": [1, 2, 3, 4, 5]
  },
  "timestamp": "2025-09-21T10:30:00.000Z"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Numbers must be an array"],
  "timestamp": "2025-09-21T10:30:00.000Z"
}
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2025-09-21T10:30:00.000Z",
  "uptime": 123.45
}
```

## Architecture & Best Practices

### Backend

- **Security**: Helmet for security headers, CORS configuration, rate limiting
- **Validation**: Joi schema validation for request bodies
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Testing**: Comprehensive test suite with Jest and Supertest
- **Code Organization**: Clean separation of concerns

### Frontend

- **Component Architecture**: Reusable components with proper props interface
- **Custom Hooks**: `useCounter` hook for counter logic
- **Type Safety**: Full TypeScript implementation
- **API Integration**: Axios with interceptors for API communication
- **Responsive Design**: Mobile-first CSS with modern styling
- **Accessibility**: ARIA labels and semantic HTML

### Code Quality

- **TypeScript**: Full type safety across the stack
- **ESLint**: Code linting for consistency
- **Error Boundaries**: Proper error handling in React
- **Loading States**: User feedback for async operations
- **Input Validation**: Both client and server-side validation

## Project Structure

```
├── server/                 # Backend (Node.js + Express)
│   ├── server.js          # Main server file
│   ├── tests/             # Test files
│   └── package.json       # Backend dependencies
├── client/                # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main App component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json for scripts
```

## Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Jest & Supertest** - Testing framework

### Frontend

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Axios** - HTTP client
- **Lucide React** - Icon library

## License

MIT License - feel free to use this project as a reference or starting point for your own applications.
