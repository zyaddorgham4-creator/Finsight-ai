import "./AIAnalysisHistory.css";

const AIAnalysisHistory = ({ items, onViewAll }) => {
  return (
    <section className="ai-history" aria-labelledby="ai-history-title">
      <header className="ai-history-header">
        <div>
          <span className="ai-history-kicker">RECENT</span>
          <h2 id="ai-history-title">Recent AI Analysis</h2>
        </div>

        <button className="ai-history-cta" type="button" onClick={onViewAll}>
          View all
        </button>
      </header>

      <ul className="ai-history-list">
        {items.map((item) => (
          <li key={item.id} className="ai-history-item">
            <span className="ai-history-mark" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </span>

            <div className="ai-history-body">
              <span className="ai-history-title">{item.title}</span>
              <span className="ai-history-time">{item.time}</span>
            </div>

            <span className="ai-history-arrow" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AIAnalysisHistory;