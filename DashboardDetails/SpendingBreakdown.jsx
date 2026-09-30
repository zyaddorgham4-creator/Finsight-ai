import React from "react";
import "./SpendingBreakdown.css";

const Icon = ({ name, size = 17 }) => {
  const paths = {
    home:
      "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6",
    food:
      "M6 3v8M3 3v5a3 3 0 0 0 6 0V3M6 11v10M17 3v18M17 3c2 1.7 3 4 3 6h-3",
    transport:
      "M5 17h14l-1-8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2l-1 8ZM7 17v3M17 17v3M8 12h.01M16 12h.01",
    shopping:
      "M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0",
    more:
      "M6 12h.01M12 12h.01M18 12h.01"
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
      <path d={paths[name] || paths.more} />
    </svg>
  );
};

const categories = [
  { name: "Housing", value: "$1,420.00", percentage: "33.1%", color: "#477b70", icon: "home" },
  { name: "Food & dining", value: "$864.20", percentage: "20.2%", color: "#d99a55", icon: "food" },
  { name: "Transport", value: "$582.48", percentage: "13.6%", color: "#cf7461", icon: "transport" },
  { name: "Shopping", value: "$521.40", percentage: "12.2%", color: "#8299aa", icon: "shopping" },
  { name: "Other", value: "$898.10", percentage: "20.9%", color: "#b7c1bd", icon: "more" }
];

const SpendingBreakdown = () => {
  return (
    <section className="fs-spending-card" aria-labelledby="spending-title">
      <div className="fs-spending-header">
        <div>
          <span className="fs-section-kicker">WHERE IT GOES</span>
          <h2 id="spending-title">Spending breakdown</h2>
        </div>
        <button type="button" className="fs-spending-period">September <span>⌄</span></button>
      </div>

      <div className="fs-spending-content">
        <div className="fs-donut-wrap">
          <div className="fs-donut">
            <div className="fs-donut-center">
              <strong>$4,286</strong>
              <span>Total spent</span>
            </div>
          </div>
          <span className="fs-donut-caption">Compared to $4,475 last month</span>
        </div>

        <div className="fs-category-list">
          {categories.map((category) => (
            <div className="fs-category-row" key={category.name}>
              <div className="fs-category-name">
                <span className="fs-category-icon" style={{ color: category.color }}>
                  <Icon name={category.icon} size={15} />
                </span>
                <span>{category.name}</span>
              </div>
              <div className="fs-category-values">
                <strong>{category.value}</strong>
                <span>{category.percentage}</span>
              </div>
              <div className="fs-category-bar">
                <span style={{ width: category.percentage, backgroundColor: category.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpendingBreakdown;