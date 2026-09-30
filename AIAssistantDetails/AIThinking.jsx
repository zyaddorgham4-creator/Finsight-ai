import "./AIThinking.css";

const AIThinking = () => {
  return (
    <section className="ai-thinking" role="status" aria-live="polite">
      <span className="ai-thinking-mark">
        <span className="ai-thinking-dot" />
        <span className="ai-thinking-dot" />
        <span className="ai-thinking-dot" />
      </span>

      <span className="ai-thinking-text">Analyzing your financial data...</span>

      <span className="ai-thinking-bar" aria-hidden="true">
        <span className="ai-thinking-bar-fill" />
      </span>
    </section>
  );
};

export default AIThinking;