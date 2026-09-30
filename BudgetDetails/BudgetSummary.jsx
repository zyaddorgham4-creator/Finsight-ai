import "./BudgetSummary.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    wallet:
      "M4 7V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v2M4 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7h1ZM16 13h.01",

    spent:
      "M12 3v18M17 7.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5 1.8 2.5 4 2.5 4 1.1 4 2.5-1.8 2.5-4 2.5-4 1.1-4 2.5 1.8 2.5 4 2.5 4-1.1 4-2.5",

    remaining:
      "M12 3v18M17 7.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5 1.8 2.5 4 2.5 4 1.1 4 2.5-1.8 2.5-4 2.5-4 1.1-4 2.5 1.8 2.5 4 2.5 4-1.1 4-2.5",

    check:
      "M20 6 9 17l-5-5"
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

const BudgetSummary = ({ data }) => {
  const totalBudget = data.reduce(
    (total, budget) =>
      total + Number(budget.amount || 0),
    0
  );

  const totalSpent = data.reduce(
    (total, budget) =>
      total + Number(budget.spent || 0),
    0
  );

  const totalRemaining = data.reduce(
    (total, budget) =>
      total + Number(budget.remaining || 0),
    0
  );

  const onTrack = data.filter(
    (budget) => budget.status === "On track"
  ).length;

  return (
    <section
      className="budget-summary"
      aria-label="Budget summary"
    >
      <article className="budget-summary-card">
        <div className="budget-summary-icon budget-summary-icon--green">
          <Icon name="wallet" size={19} />
        </div>

        <div className="budget-summary-content">
          <span>Total Budget</span>

          <strong>
            ${totalBudget.toFixed(2)}
          </strong>
        </div>
      </article>

      <article className="budget-summary-card">
        <div className="budget-summary-icon budget-summary-icon--blue">
          <Icon name="spent" size={19} />
        </div>

        <div className="budget-summary-content">
          <span>Total Spent</span>

          <strong>
            ${totalSpent.toFixed(2)}
          </strong>
        </div>
      </article>

      <article className="budget-summary-card">
        <div className="budget-summary-icon budget-summary-icon--purple">
          <Icon name="remaining" size={19} />
        </div>

        <div className="budget-summary-content">
          <span>Remaining</span>

          <strong>
            ${totalRemaining.toFixed(2)}
          </strong>
        </div>
      </article>

      <article className="budget-summary-card">
        <div className="budget-summary-icon budget-summary-icon--green">
          <Icon name="check" size={19} />
        </div>

        <div className="budget-summary-content">
          <span>On Track</span>

          <strong>
            {onTrack} of {data.length}
          </strong>
        </div>
      </article>
    </section>
  );
};

export default BudgetSummary;