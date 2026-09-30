import "./Achievements.css";

const Achievements = ({ goals }) => {
  const CompletedGoals = goals
    .filter(
      (goal) =>
        goal.saved >= goal.target
    )
    .sort((a, b) => {
      const DateA = a.completedAt
        ? new Date(a.completedAt)
        : new Date(0);

      const DateB = b.completedAt
        ? new Date(b.completedAt)
        : new Date(0);

      return DateB - DateA;
    });

  const FormatCompletedDate = (date) => {
    if (!date) {
      return "Completion date unavailable";
    }

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
    <section
      className="achievements"
      aria-labelledby="achievements-title"
    >
      <header className="achievements-header">
        <div>
          <h2 id="achievements-title">
            Achievements
          </h2>

          <p>
            Goals you've successfully completed.
          </p>
        </div>

        <span className="achievements-count">
          {CompletedGoals.length}
        </span>
      </header>

      {CompletedGoals.length === 0 ? (
        <div className="achievements-empty">
          <span
            className="achievements-empty-icon"
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M8 12.5 10.5 15 16 9.5" />
            </svg>
          </span>

          <strong>
            No achievements yet
          </strong>

          <p>
            Complete your first goal and it
            will appear here.
          </p>
        </div>
      ) : (
        <div className="achievements-grid">
          {CompletedGoals.map(
            (goal) => (
              <article
                key={goal.id}
                className="achievement-card"
              >
                <span
                  className="achievement-badge"
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="12"
                      cy="9"
                      r="5"
                    />

                    <path d="M8.5 13.5 7 21l5-2 5 2-1.5-7.5" />
                  </svg>
                </span>

                <div className="achievement-body">
                  <h3>
                    {goal.name}
                  </h3>

                  <span className="achievement-meta">
                    Completed{" "}
                    {FormatCompletedDate(
                      goal.completedAt
                    )}
                  </span>

                  <span className="achievement-progress">
                    $
                    {goal.saved.toLocaleString()}{" "}
                    saved
                  </span>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Achievements;