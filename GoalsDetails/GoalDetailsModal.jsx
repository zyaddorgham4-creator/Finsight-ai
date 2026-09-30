import "./GoalDetailsModal.css";

const GoalDetailsModal = ({
  goal,
  activities,
  onClose,
  onAddMoney,
  onEdit
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

  const DaysLeft = Math.ceil(
    (Deadline - Today) /
      (1000 * 60 * 60 * 24)
  );

  const GoalActivities = activities
    .filter(
      (activity) =>
        activity.goalId === goal.id
    )
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

  const Deposits = GoalActivities.filter(
    (activity) =>
      activity.type === "deposit"
  );

  const FormatDate = (date) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );
  };

  return (
    <div
      className="goal-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="goal-details-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <header className="goal-details-header">
          <div className="goal-details-heading">
            <div className="goal-details-icon">
              +
            </div>

            <div>
              <span>
                {goal.category}
              </span>

              <h2>{goal.name}</h2>
            </div>
          </div>

          <button
            className="goal-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close details"
          >
            ×
          </button>
        </header>

        <section className="goal-details-progress">
          <div className="goal-details-progress-top">
            <div>
              <span>
                Current progress
              </span>

              <strong>
                ${goal.saved}
              </strong>
            </div>

            <strong>
              {Math.round(Progress)}%
            </strong>
          </div>

          <div className="goal-details-progress-bar">
            <span
              style={{
                width: `${Progress}%`
              }}
            />
          </div>

          <div className="goal-details-progress-bottom">
            <span>
              ${Remaining} remaining
            </span>

            <span>
              Target ${goal.target}
            </span>
          </div>
        </section>

        <section className="goal-details-stats">
          <div>
            <span>Deadline</span>

            <strong>
              {Deadline.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }
              )}
            </strong>
          </div>

          <div>
            <span>Time left</span>

            <strong>
              {goal.saved >= goal.target
                ? "Completed"
                : DaysLeft < 0
                ? "Overdue"
                : `${DaysLeft} days`}
            </strong>
          </div>

          <div>
            <span>Contributions</span>

            <strong>
              {Deposits.length}
            </strong>
          </div>
        </section>

        <section className="goal-details-history">
          <header>
            <div>
              <h3>
                Contribution History
              </h3>

              <p>
                Every amount added to this goal.
              </p>
            </div>

            <span>
              {Deposits.length}
            </span>
          </header>

          {Deposits.length === 0 ? (
            <div className="goal-details-empty">
              <span>+</span>

              <strong>
                No contributions yet
              </strong>

              <p>
                Add money to this goal and
                your history will appear here.
              </p>
            </div>
          ) : (
            <ul className="goal-details-history-list">
              {Deposits.map(
                (activity) => (
                  <li
                    key={activity.id}
                  >
                    <span className="goal-details-history-icon">
                      +
                    </span>

                    <div>
                      <strong>
                        +${activity.amount}
                      </strong>

                      <span>
                        Contribution
                      </span>
                    </div>

                    <time>
                      {FormatDate(
                        activity.date
                      )}
                    </time>
                  </li>
                )
              )}

              {GoalActivities.some(
                (activity) =>
                  activity.type ===
                  "completed"
              ) && (
                <li className="goal-details-history-completed">
                  <span className="goal-details-history-icon">
                    ✓
                  </span>

                  <div>
                    <strong>
                      Goal completed
                    </strong>

                    <span>
                      Target reached
                    </span>
                  </div>

                  <time>
                    {FormatDate(
                      goal.completedAt
                    )}
                  </time>
                </li>
              )}
            </ul>
          )}
        </section>

        <footer className="goal-details-actions">
          <button
            type="button"
            className="goal-modal-btn goal-modal-btn--secondary"
            onClick={() => {
              onClose();
              onEdit(goal);
            }}
          >
            Edit Goal
          </button>

          {goal.saved <
            goal.target && (
            <button
              type="button"
              className="goal-modal-btn goal-modal-btn--primary"
              onClick={() => {
                onClose();
                onAddMoney(goal);
              }}
            >
              + Add Money
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default GoalDetailsModal;