import "./BudgetEmptyState.css";

const Icon = ({ name, size = 24 }) => {
  const paths = {
    wallet: "M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8ZM16 13h2M3 10h18",
    plus: "M12 5v14M5 12h14"
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
};

const BudgetEmptyState = () => {
  return (
    <section className="budget-empty" aria-labelledby="budget-empty-title">
      <span className="budget-empty-icon">
        <Icon name="wallet" size={26} />
      </span>

      <h2 id="budget-empty-title">No budgets yet</h2>
      <p>
        Create your first budget to start tracking spending limits and stay
        in control of your money.
      </p>

      <button className="budget-empty-btn" type="button">
        <Icon name="plus" size={16} />
        Create your first budget
      </button>
    </section>
  );
};

export default BudgetEmptyState;