import "./AIHero.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
    arrow: "M5 12h14M13 6l6 6-6 6"
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
};

const AIHero = ({ prompt, setPrompt, onSubmit, thinking }) => {
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <section className="ai-hero" aria-labelledby="ai-hero-title">
      <header className="ai-hero-status">
        <span className="ai-hero-brand">
          <span className="ai-hero-brand-mark">FS</span>
          <span className="ai-hero-brand-text">
            <strong>FIN SIGHT AI</strong>
            <small>Financial intelligence engine</small>
          </span>
        </span>

        <span className="ai-hero-online">
          <span className="ai-hero-online-dot" />
          AI Online
        </span>
      </header>

      <h1 className="ai-hero-title" id="ai-hero-title">
        Good evening.
        <br />
        <span className="ai-hero-title-sub">
          Let's make your money work smarter.
        </span>
      </h1>

      <p className="ai-hero-question">
        What would you like to understand today?
      </p>

      <form
        className="ai-hero-input"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <span className="ai-hero-input-icon">
          <Icon name="sparkle" size={18} />
        </span>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything about your finances..."
          aria-label="Ask FinSight AI"
        />

        <button
          className="ai-hero-submit"
          type="submit"
          disabled={thinking}
          aria-label="Run analysis"
        >
          <Icon name="arrow" size={16} />
        </button>
      </form>

      <p className="ai-hero-hint">
        Try: "Can I afford a new laptop next month?" · "Why did my spending increase?"
      </p>
    </section>
  );
};

export default AIHero;