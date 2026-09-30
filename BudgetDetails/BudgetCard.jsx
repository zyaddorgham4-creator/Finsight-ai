import "./BudgetCard.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    food: "M4 4h2l1.5 13h11L20 4H4ZM9 20a1 1 0 1 0-2 0 1 1 0 0 0 0 2ZM17 20a1 1 0 0 0-2 1 1 1 0 0 0 0 2Z",
    shopping: "M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0",
    transport: "M5 17h14l-1-8a2 2 0 0 1-2-2H8a2 2 0 0 1-2 2l-1 8ZM7 17v3M17 17v3M8 12h.01M16 12h.01",
    housing: "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6",
    entertainment: "M4 6h16v12H4zM8 10h.01M16 10h.01M10 15h4",
    bills: "M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6",
    other: "M12 5v14M5 12h14",
    edit: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"
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
      <path d={paths[name]} />
    </svg>
  );
};

const categoryNames = {
  food: "Food & Dining",
  shopping: "Shopping",
  transport: "Transport",
  housing: "Housing",
  entertainment: "Entertainment",
  bills: "Bills & Utilities",
  other: "Other"
};

const periodNames = {
  weekly: "Weekly budget",
  monthly: "Monthly budget",
  quarterly: "Quarterly budget",
  yearly: "Yearly budget"
};

const BudgetCard = ({
  budget,
  handleDelete,
  handleEdit
}) => {
  const progress =
    budget.amount > 0
      ? Math.min(
          (budget.spent / budget.amount) * 100,
          100
        )
      : 0;

  return (
    <article
      className="budget-card"
      style={{
        "--budget-color": budget.color
      }}
    >
      <header className="budget-card-header">
        <span className="budget-card-icon">
          <Icon
            name={budget.category}
            size={18}
          />
        </span>

        <div className="budget-card-title-block">
          <h3>
            {categoryNames[budget.category] || "Other"}
          </h3>

          <span className="budget-card-period">
            {periodNames[budget.period] || "Budget"}
          </span>
        </div>

        <span className="budget-card-status">
          {budget.status}
        </span>
      </header>

      <div className="budget-card-amounts">
        <div className="budget-card-amount">
          <strong>
            ${budget.amount.toFixed(2)}
          </strong>

          <span>limit</span>
        </div>
      </div>

      <div className="budget-card-progress">
        <div className="budget-card-progress-header">
          <span>Progress</span>

          <strong>
            {budget.percentage.toFixed(0)}%
          </strong>
        </div>

        <div className="budget-card-progress-track">
          <div
            className="budget-card-progress-bar"
            style={{
              width: `${progress}%`
            }}
          />
        </div>
      </div>

      <div className="budget-card-info">
        <span>Spent</span>

        <strong>
          ${budget.spent.toFixed(2)}
        </strong>
      </div>

      <div className="budget-card-info">
        <span>
          {budget.remaining < 0
            ? "Over budget"
            : "Remaining"}
        </span>

        <strong>
          $
          {Math.abs(
            budget.remaining
          ).toFixed(2)}
        </strong>
      </div>

      <div className="budget-card-actions">
        <button
          className="budget-card-action budget-card-action--edit"
          type="button"
          onClick={() => handleEdit(budget)}
        >
          <Icon
            name="edit"
            size={16}
          />

          <span>Edit</span>
        </button>

        <button
          className="budget-card-action budget-card-action--delete"
          type="button"
          onClick={() => handleDelete(budget.id)}
        >
          <Icon
            name="trash"
            size={16}
          />

          <span>Delete</span>
        </button>
      </div>
    </article>
  );
};

export default BudgetCard;