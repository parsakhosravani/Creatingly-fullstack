import React from "react";
import Counter from "./components/Counter";
import SumCalculator from "./components/SumCalculator";
import { Github, Code, Server } from "lucide-react";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-content">
          <h1 className="app__title">
            <Code size={32} />
            Full-Stack Counter App
          </h1>
          <p className="app__subtitle">
            Node.js + Express + React + TypeScript
          </p>
        </div>
      </header>

      <main className="app__main">
        <div className="app__container">
          <section className="app__section">
            <Counter initialValue={0} />
          </section>

          <section className="app__section">
            <SumCalculator />
          </section>
        </div>
      </main>

      <footer className="app__footer">
        <div className="app__footer-content">
          <div className="app__tech-stack">
            <span className="app__tech-item">
              <Server size={16} />
              Node.js + Express
            </span>
            <span className="app__tech-item">
              <Code size={16} />
              React + TypeScript
            </span>
            <span className="app__tech-item">
              <Github size={16} />
              Best Practices
            </span>
          </div>
          <p className="app__footer-text">
            Built with modern web technologies and best practices
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
