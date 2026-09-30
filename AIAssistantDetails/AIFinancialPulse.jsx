import "./AIFinancialPulse.css";

const AIFinancialPulse = ({ onOpenSummary }) => {
  const pulseItems = [
    { id: "spend", label: "Spending Momentum", value: "↑ 12%", note: "vs last month", tone: "warning" },
    { id: "save", label: "Saving Momentum", value: "↑ 8%", note: "vs last month", tone: "positive" },
    { id: "goal", label: "Goal Health", value: "78%", note: "across 6 goals", tone: "neutral" },
    { id: "flow", label: "Cash Flow Stability", value: "Strong", note: "no shortfall detected", tone: "positive" },
    { id: "risk", label: "Financial Risk", value: "Low", note: "based on last 90 days", tone: "positive" }
  ];

  return (
    <section className="ai-pulse" aria-labelledby="ai-pulse-title">
      <header className="ai-pulse-header">
        <div>
          <span className="ai-pulse-kicker">AI FINANCIAL PULSE</span>
          <h2 id="ai-pulse-title">What FinSight AI sees right now</h2>
        </div>
        <button className="ai-pulse-cta" type="button" onClick={onOpenSummary}>
          View summary
        </button>
      </header>

      <div className="ai-pulse-grid">
        {pulseItems.map((item) => (
          <article
            key={item.id}
            className={`ai-pulse-item ai-pulse-item--${item.tone}`}
          >
            <span className="ai-pulse-label">{item.label}</span>
            <strong className="ai-pulse-value">{item.value}</strong>
            <span className="ai-pulse-note">{item.note}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AIFinancialPulse;