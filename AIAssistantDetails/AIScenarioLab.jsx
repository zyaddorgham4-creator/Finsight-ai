import { useState } from "react";
import "./AIScenarioLab.css";

const scenarios = {
  save: {
    title: "Save an extra $150 every month",
    description: "Adjusting your automatic transfer to savings by $150.",
    current: "$4,200",
    projected: "$5,850",
    diff: "+$1,650",
    tone: "positive",
    points: [12, 20, 30, 38, 46, 58, 72, 88]
  },
  dining: {
    title: "Reduce dining spending by 30%",
    description: "Capping dining at 70% of your recent average.",
    current: "$4,200",
    projected: "$4,980",
    diff: "+$780",
    tone: "positive",
    points: [12, 18, 25, 32, 40, 48, 58, 68]
  },
  laptop: {
    title: "Buy a new laptop next month",
    description: "One-time $900 expense in the next 30 days.",
    current: "$4,200",
    projected: "$3,480",
    diff: "-$720",
    tone: "warning",
    points: [12, 14, 10, 18, 26, 34, 42, 52]
  },
  income: {
    title: "Increase income by 10%",
    description: "Additional $380/month from side work.",
    current: "$4,200",
    projected: "$6,200",
    diff: "+$2,000",
    tone: "positive",
    points: [12, 22, 32, 42, 54, 66, 78, 92]
  },
  delay: {
    title: "Delay a purchase by 3 months",
    description: "Postpone a planned $600 purchase by 90 days.",
    current: "$4,200",
    projected: "$4,850",
    diff: "+$650",
    tone: "positive",
    points: [12, 18, 26, 34, 42, 52, 62, 74]
  },
  recurring: {
    title: "Add a $50 recurring expense",
    description: "New subscription impacting monthly cash flow.",
    current: "$4,200",
    projected: "$3,720",
    diff: "-$480",
    tone: "warning",
    points: [12, 16, 20, 24, 30, 36, 42, 48]
  }
};

const AIScenarioLab = ({ onApplyPlan }) => {
  const [active, setActive] = useState("save");
  const scenario = scenarios[active];
  const max = Math.max(...scenario.points);

  const tabs = [
    { id: "save", label: "Save more" },
    { id: "dining", label: "Cut dining" },
    { id: "laptop", label: "Buy laptop" },
    { id: "income", label: "Increase income" },
    { id: "delay", label: "Delay purchase" },
    { id: "recurring", label: "New recurring" }
  ];

  const compareAnother = () => {
    const keys = Object.keys(scenarios).filter((k) => k !== active);
    const next = keys[Math.floor(Math.random() * keys.length)];
    setActive(next);
  };

  return (
    <section className="ai-lab" aria-labelledby="ai-lab-title">
      <header className="ai-lab-header">
        <div>
          <span className="ai-lab-kicker">AI SCENARIO LAB</span>
          <h2 id="ai-lab-title">
            Explore how one decision could change your financial future.
          </h2>
        </div>
      </header>

      <div className="ai-lab-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={`ai-lab-tab ${active === tab.id ? "is-active" : ""}`}
            type="button"
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ai-lab-body">
        <div className="ai-lab-summary">
          <span className="ai-lab-scenario-label">Scenario</span>
          <h3 className="ai-lab-scenario-title">{scenario.title}</h3>
          <p className="ai-lab-scenario-desc">{scenario.description}</p>

          <div className="ai-lab-values">
            <div className="ai-lab-value">
              <span className="ai-lab-value-label">Current trajectory</span>
              <strong className="ai-lab-value-number">{scenario.current}</strong>
            </div>

            <div className="ai-lab-value ai-lab-value--accent">
              <span className="ai-lab-value-label">AI projected trajectory</span>
              <strong className="ai-lab-value-number">{scenario.projected}</strong>
            </div>

            <div className={`ai-lab-value ai-lab-value--${scenario.tone}`}>
              <span className="ai-lab-value-label">Difference</span>
              <strong className="ai-lab-value-number">{scenario.diff}</strong>
            </div>
          </div>

          <div className="ai-lab-actions">
            <button
              className="ai-lab-btn-primary"
              type="button"
              onClick={() => onApplyPlan(scenario.title)}
            >
              Apply this plan
            </button>
            <button
              className="ai-lab-btn-secondary"
              type="button"
              onClick={compareAnother}
            >
              Compare another scenario
            </button>
          </div>
        </div>

        <div className="ai-lab-chart">
          <div className="ai-lab-chart-header">
            <span className="ai-lab-chart-title">8-month projection</span>
            <span className="ai-lab-chart-legend">
              <span className="ai-lab-chart-legend-dot" />
              Projected
            </span>
          </div>

          <div className="ai-lab-chart-bars">
            {scenario.points.map((p, i) => (
              <div
                key={i}
                className="ai-lab-chart-bar"
                style={{ height: `${(p / max) * 100}%` }}
                title={`Month ${i + 1}`}
              />
            ))}
          </div>

          <div className="ai-lab-chart-axis">
            <span>M1</span>
            <span>M4</span>
            <span>M8</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIScenarioLab;