import { useState } from "react";
import "./AIInsights.css";

const AIInsights = ({ onAction }) => {
  const [openId, setOpenId] = useState(1);

  const insights = [
    {
      id: 1,
      type: "SPENDING ANOMALY",
      title: "Dining spending increased 18%",
      body: "You spent $142 more on dining than your recent average. This is the largest single-month increase in the last 6 months.",
      impact: "$85",
      impactLabel: "Potential monthly saving",
      action: "Explore Spending"
    },
    {
      id: 2,
      type: "GOAL ALERT",
      title: "Your vacation goal is approaching its deadline",
      body: "At your current pace, you'll reach 82% of your Travel Fund by the target date. An extra $65/month would close the gap.",
      impact: "$65",
      impactLabel: "Additional monthly saving needed",
      action: "Adjust Goal"
    },
    {
      id: 3,
      type: "OPPORTUNITY",
      title: "You could save approximately $85/month",
      body: "Three recurring subscriptions are either unused or duplicated. Reviewing them could recover meaningful monthly cash.",
      impact: "$85",
      impactLabel: "Recoverable monthly spend",
      action: "Review Subscriptions"
    },
    {
      id: 4,
      type: "TIMELINE",
      title: "Your laptop goal may be delayed by 19 days",
      body: "Based on your current saving pace, the New Laptop goal will complete 19 days later than your original target date.",
      impact: "19 days",
      impactLabel: "Projected delay",
      action: "Adjust Pace"
    }
  ];

  return (
    <section className="ai-insights" aria-labelledby="ai-insights-title">
      <header className="ai-insights-header">
        <div>
          <span className="ai-insights-kicker">PROACTIVE</span>
          <h2 id="ai-insights-title">AI noticed something</h2>
          <p>Observations surfaced automatically from your recent activity.</p>
        </div>
      </header>

      <div className="ai-insights-list">
        {insights.map((insight) => {
          const isOpen = openId === insight.id;
          return (
            <article
              key={insight.id}
              className={`ai-insight ${isOpen ? "is-open" : ""}`}
            >
              <button
                className="ai-insight-head"
                type="button"
                onClick={() => setOpenId(isOpen ? null : insight.id)}
                aria-expanded={isOpen}
              >
                <span className="ai-insight-type">{insight.type}</span>
                <span className="ai-insight-title">{insight.title}</span>
                <span className="ai-insight-toggle" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="ai-insight-body">
                  <p className="ai-insight-text">{insight.body}</p>

                  <div className="ai-insight-meta">
                    <div className="ai-insight-impact">
                      <span className="ai-insight-impact-label">
                        {insight.impactLabel}
                      </span>
                      <strong className="ai-insight-impact-value">
                        {insight.impact}
                      </strong>
                    </div>

                    <button
                      className="ai-insight-action"
                      type="button"
                      onClick={() => onAction(insight.action)}
                    >
                      {insight.action}
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AIInsights;