import "./GoalsHeader.css";

const Icon = ({ name, size = 17 }) => {
  const paths = {
    plus: "M12 5v14M5 12h14"
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

const GoalsHeader = ({ onAddGoal }) => {
  return (
    <header className="goals-header">
      <div className="goals-header-text">
        <span className="goals-header-kicker">
          MOTIVATION
        </span>

        <h1>Your Goals</h1>

        <p>
          Track what you're saving for and watch
          your progress grow.
        </p>
      </div>

      <button
        className="goals-header-btn"
        type="button"
        onClick={onAddGoal}
      >
        <Icon name="plus" size={17} />
        Add Goal
      </button>
    </header>
  );
};

export default GoalsHeader;