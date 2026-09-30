import React from "react";
import "./BudgetOverview.css";

const Icon = ({ name, size = 17 }) => {
  const paths = {
    home:
      "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6",
    food:
      "M6 3v8M3 3v5a3 3 0 0 0 6 0V3M6 11v10M17 3v18M17 3c2 1.7 3 4 3 6h-3",
    plane:
      "m3 11 18-7-7 18-2-8-6-3-3 0ZM12 14l4 4",
    shopping:
      "M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0",
    alert:
      "M12 9v4M12 17h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z"
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
      <path d={paths[name] || paths.alert} />
    </svg>
  );
};

const budgets = [
  {
    name: "Housing",
    icon: "home",
    spent: "$1,420",
    limit: "$1,800",
    remaining: "$380 left",
    progress: 79,
    status: "Healthy",
    tone: "healthy"
  },
  {
    name: "Food & dining",
    icon: "food",
    spent: "$864",
    limit: "$1,000",
    remaining: "$136 left",
    progress: 86,
    status: "Near limit",
    tone: "near"
  },
  {
    name: "Travel",
    icon: "plane",
    spent: "$1,240",
    limit: "$1,000",
    remaining: "$240 over",
    progress: 100,
    status: "Exceeded",
    tone: "exceeded"
  },
  {
    name: "Shopping",
    icon: "shopping",
    spent: "$521",
    limit: "$800",
    remaining: "$279 left",
    progress: 65,
    status: "Healthy",
    tone: "healthy"
  }
];

const BudgetOverview = () => {
  return (
    <section className="fs-budget-card" aria-labelledby="budget-title">
      <div className="fs-budget-header">
        <div>
          <span className="fs-section-kicker">PLAN AHEAD</span>
          <h2 id="budget-title">Budget overview</h2>
        </div>

        <button className="fs-budget-action" type="button">
          Manage budgets
        </button>
      </div>

      <div className="fs-budget-list">
        {budgets.map((budget) => (
          <article className="fs-budget-row" key={budget.name}>
            <div className={`fs-budget-icon fs-budget-icon--${budget.tone}`}>
              <Icon name={budget.icon} size={16} />
            </div>

            <div className="fs-budget-name">
              <strong>{budget.name}</strong>
              <span>
                {budget.spent} of {budget.limit}
              </span>
            </div>

            <div className="fs-budget-progress">
              <div className="fs-budget-progress-track">
                <span
                  className={`fs-budget-progress-fill fs-budget-progress-fill--${budget.tone}`}
                  style={{ width: `${budget.progress}%` }}
                />
              </div>

              <span className={`fs-budget-status fs-budget-status--${budget.tone}`}>
                {budget.status}
              </span>
            </div>

            <div className={`fs-budget-remaining fs-budget-remaining--${budget.tone}`}>
              {budget.remaining}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BudgetOverview;