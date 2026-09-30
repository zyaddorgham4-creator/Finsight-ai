import "./GoalCard.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    laptop: "M4 5h16v11H4zM2 20h20",
    shield: "M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z",
    plane: "M2 12l20-8-8 20-3-9-9-3Z",
    phone: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM11 17h2",
    car: "M5 17h14l-1-8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2l-1 8ZM7 17v3M17 17v3M8 12h.01M16 12h.01",
    book: "M4 4h7a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H4V4ZM20 4h-5v13h5V4Z"
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

const GoalCard = ({
  goal,
  onEdit,
  onDelete,
  onAddMoney,
  onDetails
}) => {
  const Progress = Math.min(
    (goal.saved / goal.target) * 100,
    100
  );

  const Remaining = Math.max(
    goal.target - goal.saved,
    0
  );

  const Today = new Date();
  Today.setHours(0, 0, 0, 0);

  const Deadline = new Date(
    goal.deadline
  );

  Deadline.setHours(0, 0, 0, 0);

  const Difference =
    Deadline - Today;

  const DaysLeft = Math.ceil(
    Difference /
      (1000 * 60 * 60 * 24)
  );

  let Status;
  let StatusLabel;

  if (goal.saved >= goal.target) {
    Status = "completed";
    StatusLabel = "Completed";
  } else if (DaysLeft < 0) {
    Status = "overdue";
    StatusLabel = "Overdue";
  } else if (
    DaysLeft <= 14 &&
    Progress < 80
  ) {
    Status = "needs-attention";
    StatusLabel = "Needs Attention";
  } else if (Progress >= 75) {
    Status = "on-track";
    StatusLabel = "On Track";
  } else {
    Status = "in-progress";
    StatusLabel = "In Progress";
  }

  const FormattedDeadline =
    Deadline.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );

  return (
    <article
      className={`goal-card goal-card--${Status}`}
      onClick={() =>
        onDetails(goal)
      }
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onDetails(goal);
        }
      }}
    >
      <header className="goal-card-header">
        <span className="goal-card-icon">
          <Icon
            name={goal.icon}
            size={18}
          />
        </span>

        <div className="goal-card-title-block">
          <h3>{goal.name}</h3>

          <span className="goal-card-category">
            {goal.category}
          </span>
        </div>

        <span className="goal-card-status">
          {StatusLabel}
        </span>
      </header>

      <div className="goal-card-amounts">
        <div className="goal-card-amount">
          <strong>
            ${goal.saved}
          </strong>

          <span>
            of ${goal.target}
          </span>
        </div>

        <span className="goal-card-percent">
          {Math.round(Progress)}%
        </span>
      </div>

      <div
        className="goal-card-progress"
        aria-hidden="true"
      >
        <span
          className="goal-card-progress-fill"
          style={{
            width: `${Progress}%`
          }}
        />
      </div>

      <footer className="goal-card-footer">
        <div className="goal-card-meta">
          <span className="goal-card-meta-label">
            Remaining
          </span>

          <span className="goal-card-meta-value">
            ${Remaining}
          </span>
        </div>

        <div className="goal-card-actions">
          <span className="goal-card-deadline">
            {FormattedDeadline}
          </span>

          <div className="goal-card-action-icons">
            {goal.saved <
              goal.target && (
              <button
                className="goal-card-action goal-card-action--add"
                type="button"
                aria-label={`Add money to ${goal.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddMoney(goal);
                }}
              >
                +
              </button>
            )}

            <button
              className="goal-card-action"
              type="button"
              aria-label={`Edit ${goal.name}`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(goal);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
              </svg>
            </button>

            <button
              className="goal-card-action goal-card-action--danger"
              type="button"
              aria-label={`Delete ${goal.name}`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(goal);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default GoalCard;