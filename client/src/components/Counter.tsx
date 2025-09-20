import React from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import "./Counter.css";
import { useCounter } from "../hooks/useCounter";

interface CounterProps {
  initialValue?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  className = "",
}) => {
  const { count, increment, decrement, reset } = useCounter(initialValue);

  return (
    <div className={`counter ${className}`}>
      <div className="counter__header">
        <h2 className="counter__title">Counter</h2>
      </div>

      <div className="counter__display">
        <span className="counter__value" data-testid="counter-value">
          {count}
        </span>
      </div>

      <div className="counter__controls">
        <button
          className="counter__button counter__button--decrement"
          onClick={decrement}
          disabled={count === 0}
          aria-label="Decrement counter"
          data-testid="decrement-button"
        >
          <Minus size={20} />
          <span>Decrement</span>
        </button>

        <button
          className="counter__button counter__button--reset"
          onClick={reset}
          aria-label="Reset counter"
          data-testid="reset-button"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>

        <button
          className="counter__button counter__button--increment"
          onClick={increment}
          aria-label="Increment counter"
          data-testid="increment-button"
        >
          <Plus size={20} />
          <span>Increment</span>
        </button>
      </div>

      {count === 0 && (
        <div className="counter__info">
          <small>Counter cannot go below zero</small>
        </div>
      )}
    </div>
  );
};

export default Counter;
