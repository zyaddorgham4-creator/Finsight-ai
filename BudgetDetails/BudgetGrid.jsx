import "./BudgetGrid.css";
import BudgetCard from "./BudgetCard";
import BudgetEmptyState from "./BudgetEmptyState";
import { useState } from "react";

const BudgetGrid = ({
  data,
  handleDelete,
  handleEdit
}) => {
  const [view, setView] = useState("grid");

  return (
    <section
      className={`budget-grid-section budget-grid-section--${view}`}
      aria-labelledby="budget-grid-title"
    >
      <div className="budget-grid-header">
        <div>
          <h2 id="budget-grid-title">
            Your Budgets
          </h2>

          <p>
            Track spending limits for each category at a glance.
          </p>
        </div>

        <div
          className="budget-grid-view"
          role="group"
          aria-label="View options"
        >
          <button
            className={`budget-grid-view-btn ${
              view === "grid" ? "is-active" : ""
            }`}
            type="button"
            onClick={() => setView("grid")}
          >
            Grid
          </button>

          <button
            className={`budget-grid-view-btn ${
              view === "list" ? "is-active" : ""
            }`}
            type="button"
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <BudgetEmptyState />
      ) : (
        <div className={`budget-grid budget-grid--${view}`}>
          {data.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BudgetGrid;