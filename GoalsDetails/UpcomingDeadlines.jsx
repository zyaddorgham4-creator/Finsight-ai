import "./UpcomingDeadlines.css";

const UpcomingDeadlines = ({ goals }) => {
  const Today = new Date();
  Today.setHours(0, 0, 0, 0);

  const GetDaysLeft = (deadline) => {
    const Deadline = new Date(deadline);
    Deadline.setHours(0, 0, 0, 0);

    const Difference = Deadline - Today;

    return Math.ceil(
      Difference / (1000 * 60 * 60 * 24)
    );
  };

  const GetUrgency = (DaysLeft) => {
    if (DaysLeft <= 14) {
      return "high";
    }

    if (DaysLeft <= 30) {
      return "medium";
    }

    return "low";
  };

  const FormatTime = (DaysLeft) => {
    if (DaysLeft < 0) {
      const OverdueDays = Math.abs(DaysLeft);

      return OverdueDays === 1
        ? "1 day overdue"
        : `${OverdueDays} days overdue`;
    }

    if (DaysLeft === 0) {
      return "Due today";
    }

    if (DaysLeft === 1) {
      return "1 day left";
    }

    if (DaysLeft < 30) {
      return `${DaysLeft} days left`;
    }

    const MonthsLeft = Math.floor(DaysLeft / 30);

    if (MonthsLeft === 1) {
      return "1 month left";
    }

    return `${MonthsLeft} months left`;
  };

  const UpcomingGoals = goals
    .map((goal) => {
      const DaysLeft = GetDaysLeft(goal.deadline);

      return {
        ...goal,
        DaysLeft,
        Urgency: GetUrgency(DaysLeft)
      };
    })
    .filter((goal) => goal.saved < goal.target)
    .sort((a, b) => a.DaysLeft - b.DaysLeft)
    .slice(0, 4);

  return (
    <section
      className="upcoming-deadlines"
      aria-labelledby="upcoming-deadlines-title"
    >
      <header className="upcoming-deadlines-header">
        <h2 id="upcoming-deadlines-title">
          Upcoming Deadlines
        </h2>
      </header>

      {UpcomingGoals.length === 0 ? (
        <div className="upcoming-deadlines-empty">
          <span className="upcoming-deadlines-empty-icon">
            ✓
          </span>

          <strong>No upcoming deadlines</strong>

          <p>
            All your current goals are completed.
          </p>
        </div>
      ) : (
        <ul className="upcoming-deadlines-list">
          {UpcomingGoals.map((goal) => (
            <li
              key={goal.id}
              className="upcoming-deadlines-item"
            >
              <div className="upcoming-deadlines-info">
                <span className="upcoming-deadlines-name">
                  {goal.name}
                </span>

                <span
                  className={`upcoming-deadlines-time upcoming-deadlines-time--${goal.Urgency}`}
                >
                  {FormatTime(goal.DaysLeft)}
                </span>
              </div>

              <span
                className={`upcoming-deadlines-indicator upcoming-deadlines-indicator--${goal.Urgency}`}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default UpcomingDeadlines;