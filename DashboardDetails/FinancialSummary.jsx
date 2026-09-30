import React from "react";
import "./FinancialSummary.css";

const Icon = ({ name, size = 19 }) => {
  const paths = {
    wallet:
      "M4 6.5A2.5 2.5 0 0 1 6.5 4H19a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 17.5v-11ZM4 8h17M16 14h.01",
    income:
      "M5 17 12 10l4 4 4-5M5 5h4M5 5v4",
    expense:
      "M5 7l7 7 4-4 4 5M19 19h-4M19 19v-4",
    savings:
      "M12 3v18M17 7.5c0-1.7-1.8-3-5-3s-5 1.3-5 3 1.6 3 5 3 5 1.3 5 3-2 3-5 3-5-3",
    arrowUp: "m5 12 7-7 7 7M12 19V5",
    arrowDown: "m5 12 7 7 7-7M12 5v14",
    arrowRight: "M5 12h14M13 6l6 6-6 6"
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.wallet} />
    </svg>
  );
};

const metrics = [
  {
    className: "balance",
    label: "Total balance",
    value: "$24,680.42",
    detail: "Across 4 accounts",
    trend: "+8.4%",
    trendLabel: "vs last month",
    icon: "wallet"
  },
  {
    className: "income",
    label: "Income",
    value: "$8,420.00",
    detail: "This month",
    trend: "+12.8%",
    trendLabel: "vs last month",
    icon: "income"
  },
  {
    className: "expenses",
    label: "Expenses",
    value: "$4,286.18",
    detail: "This month",
    trend: "-4.2%",
    trendLabel: "vs last month",
    icon: "expense"
  },
  {
    className: "savings",
    label: "Savings rate",
    value: "48.9%",
    detail: "$4,133.82 saved",
    trend: "+6.1%",
    trendLabel: "vs last month",
    icon: "savings"
  }
];

const FinancialSummary = () => {
  return (
    <section className="fs-summary-section" aria-labelledby="financial-summary-title">
      <div className="fs-section-heading">
        <div>
          <span className="fs-section-kicker">AT A GLANCE</span>
          <h2 id="financial-summary-title">Financial summary</h2>
        </div>
        <button className="fs-text-action" type="button">
          View reports
          <Icon name="arrowRight" size={15} />
        </button>
      </div>

      <div className="fs-summary-grid">
        {metrics.map((metric) => (
          <article className={`fs-summary-card fs-summary-card--${metric.className}`} key={metric.label}>
            <div className="fs-summary-card-top">
              <div className="fs-summary-icon">
                <Icon name={metric.icon} size={19} />
              </div>
              <span className="fs-summary-label">{metric.label}</span>
            </div>

            <div className="fs-summary-value">{metric.value}</div>

            <div className="fs-summary-footer">
              <span className={`fs-summary-trend ${metric.className === "expenses" ? "is-positive" : ""}`}>
                <Icon name={metric.className === "expenses" ? "arrowDown" : "arrowUp"} size={12} />
                {metric.trend}
              </span>
              <span>{metric.trendLabel}</span>
            </div>

            <span className="fs-summary-detail">{metric.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FinancialSummary;