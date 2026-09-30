import "./AIResponse.css";

const AIResponse = ({ data, onAction }) => {
  return (
    <section className="ai-response" aria-live="polite">
      <header className="ai-response-header">
        <div className="ai-response-title-block">
          <span className="ai-response-kicker">AI ANALYSIS</span>
          <h2>{data.category}</h2>
          <span className="ai-response-prompt">"{data.prompt}"</span>
        </div>

        <div className="ai-response-confidence">
          <span className="ai-response-confidence-label">AI Confidence</span>
          <span className="ai-response-confidence-value">{data.confidence}%</span>
        </div>
      </header>

      <div className="ai-response-metrics">
        {data.metrics.map((metric, i) => (
          <div
            key={i}
            className={`ai-response-metric ai-response-metric--${metric.tone}`}
          >
            <span className="ai-response-metric-label">{metric.label}</span>
            <strong className="ai-response-metric-value">{metric.value}</strong>
          </div>
        ))}
      </div>

      <div className="ai-response-assessment">
        <span className="ai-response-assessment-label">AI Assessment</span>
        <p>{data.assessment}</p>
      </div>

      <footer className="ai-response-actions">
        {data.actions.map((action, i) => (
          <button
            key={i}
            className={`ai-response-action ${i === 0 ? "is-primary" : ""}`}
            type="button"
            onClick={() => onAction(action)}
          >
            {action}
          </button>
        ))}
      </footer>
    </section>
  );
};

export default AIResponse;