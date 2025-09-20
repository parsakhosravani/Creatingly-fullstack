import React, { useState, useCallback } from "react";
import { Calculator, Plus, X, Loader } from "lucide-react";
import { sumAPI } from "../services/api";
import { SumResponse } from "../types";
import "./SumCalculator.css";

const SumCalculator: React.FC = () => {
  const [numbers, setNumbers] = useState<string>("");
  const [result, setResult] = useState<SumResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleCalculateSum = useCallback(async () => {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Parse the input string into array of numbers
      const numbersArray = numbers
        .split(",")
        .map((n) => n.trim())
        .filter((n) => n !== "")
        .map((n) => {
          const num = parseFloat(n);
          if (isNaN(num)) {
            throw new Error(`"${n}" is not a valid number`);
          }
          return num;
        });

      if (numbersArray.length === 0) {
        throw new Error("Please enter at least one number");
      }

      const response = await sumAPI.calculateSum({ numbers: numbersArray });
      setResult(response);

      if (!response.success) {
        setError(response.error || "Failed to calculate sum");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [numbers]);

  const handleClear = useCallback(() => {
    setNumbers("");
    setResult(null);
    setError("");
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculateSum();
    }
  };

  return (
    <div className="sum-calculator">
      <div className="sum-calculator__header">
        <Calculator size={24} />
        <h2 className="sum-calculator__title">Sum Calculator</h2>
      </div>

      <div className="sum-calculator__input-group">
        <label htmlFor="numbers-input" className="sum-calculator__label">
          Enter numbers separated by commas:
        </label>
        <input
          id="numbers-input"
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., 1, 2, 3, 4.5, -2"
          className="sum-calculator__input"
          disabled={loading}
          data-testid="numbers-input"
        />
        <small className="sum-calculator__hint">
          You can enter integers, decimals, and negative numbers
        </small>
      </div>

      <div className="sum-calculator__controls">
        <button
          onClick={handleCalculateSum}
          disabled={loading || !numbers.trim()}
          className="sum-calculator__button sum-calculator__button--calculate"
          data-testid="calculate-button"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={16} />
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Calculate Sum</span>
            </>
          )}
        </button>

        <button
          onClick={handleClear}
          disabled={loading}
          className="sum-calculator__button sum-calculator__button--clear"
          data-testid="clear-button"
        >
          <X size={16} />
          <span>Clear</span>
        </button>
      </div>

      {error && (
        <div className="sum-calculator__error" data-testid="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && result.success && result.data && (
        <div className="sum-calculator__result" data-testid="result">
          <div className="sum-calculator__result-header">
            <h3>Result</h3>
          </div>
          <div className="sum-calculator__result-content">
            <div className="sum-calculator__result-item">
              <span className="sum-calculator__result-label">Sum:</span>
              <span className="sum-calculator__result-value sum-calculator__result-value--primary">
                {result.data.sum}
              </span>
            </div>
            <div className="sum-calculator__result-item">
              <span className="sum-calculator__result-label">Count:</span>
              <span className="sum-calculator__result-value">
                {result.data.count} numbers
              </span>
            </div>
            <div className="sum-calculator__result-item sum-calculator__result-item--numbers">
              <span className="sum-calculator__result-label">Numbers:</span>
              <span className="sum-calculator__result-numbers">
                {result.data.numbers.join(", ")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SumCalculator;
