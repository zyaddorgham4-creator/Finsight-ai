import "./AIQuickCommands.css";

const AIQuickCommands = ({ onSelect }) => {
  const commands = [
    { id: 1, label: "Analyze my spending", icon: "chart" },
    { id: 2, label: "Forecast my cash flow", icon: "trend" },
    { id: 3, label: "Find saving opportunities", icon: "target" },
    { id: 4, label: "Check my goals", icon: "flag" },
    { id: 5, label: "Explain my biggest expense", icon: "search" },
    { id: 6, label: "Build a saving plan", icon: "spark" }
  ];

  const paths = {
    chart: "M3 3v18h18M7 15l3-4 3 3 5-7",
    trend: "M3 17 9 11l4 4 8-8M17 7h4v4",
    target: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    flag: "M5 21V4h12l-2 4 2 4H5",
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM21 21l-4.3-4.3",
    spark: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
  };

  return (
    <section className="ai-commands" aria-label="Quick AI commands">
      <span className="ai-commands-label">Quick commands</span>

      <div className="ai-commands-list">
        {commands.map((cmd) => (
          <button
            key={cmd.id}
            className="ai-command-chip"
            type="button"
            onClick={() => onSelect(cmd.label)}
          >
            <span className="ai-command-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={paths[cmd.icon]} />
              </svg>
            </span>
            {cmd.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default AIQuickCommands;