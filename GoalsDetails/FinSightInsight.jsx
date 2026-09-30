import "./FinSightInsight.css";

const FinSightInsight = ({
  goals,
  onViewDetails
}) => {
  if (!goals || goals.length === 0) {
    return (
      <aside
        className="fs-insight"
        aria-labelledby="fs-insight-title"
      >
        <header className="fs-insight-header">
          <span className="fs-insight-badge">
            <span className="fs-insight-badge-dot" />
            FinSight Insight
          </span>
        </header>

        <p
          className="fs-insight-text"
          id="fs-insight-title"
        >
          You don't have any goals yet. Create your
          first goal to start tracking your progress.
        </p>

        <footer className="fs-insight-footer">
          <span className="fs-insight-meta">
            Based on your current goals
          </span>

          <button
            className="fs-insight-cta"
            type="button"
            disabled
          >
            View details
          </button>
        </footer>
      </aside>
    );
  }

  const Today = new Date();

  Today.setHours(0, 0, 0, 0);

  const ClosestGoal = goals.reduce((a, b) => {
    const DeadlineA = new Date(a.deadline);
    const DeadlineB = new Date(b.deadline);

    if (DeadlineB < DeadlineA) {
      return b;
    }

    return a;
  }, goals[0]);

  const Deadline = new Date(
    ClosestGoal.deadline
  );

  Deadline.setHours(0, 0, 0, 0);

  const Difference =
    Deadline - Today;

  const DaysLeft = Math.ceil(
    Difference /
      (1000 * 60 * 60 * 24)
  );

  const Progress = Math.min(
    (ClosestGoal.saved /
      ClosestGoal.target) *
      100,
    100
  );

  const Remaining = Math.max(
    ClosestGoal.target -
      ClosestGoal.saved,
    0
  );

  let Status;
  let InsightMessage;

  if (
    ClosestGoal.saved >=
    ClosestGoal.target
  ) {
    Status = "Completed";

    InsightMessage = (
      <>
        You've reached your{" "}
        <strong>
          {ClosestGoal.name}
        </strong>{" "}
        goal. You've saved $
        {ClosestGoal.saved} toward a $
        {ClosestGoal.target} target.
      </>
    );
  } else if (DaysLeft < 0) {
    Status = "Overdue";

    InsightMessage = (
      <>
        Your{" "}
        <strong>
          {ClosestGoal.name}
        </strong>{" "}
        goal is overdue. You still need $
        {Remaining} to reach your target.
      </>
    );
  } else if (
    DaysLeft <= 14 &&
    Progress < 80
  ) {
    Status = "Needs Attention";

    InsightMessage = (
      <>
        Your{" "}
        <strong>
          {ClosestGoal.name}
        </strong>{" "}
        goal is due in{" "}
        <strong>
          {DaysLeft} days
        </strong>
        , but you're currently at{" "}
        <strong>
          {Math.round(Progress)}%
        </strong>
        . You still need ${Remaining}.
      </>
    );
  } else if (Progress >= 75) {
    Status = "On Track";

    InsightMessage = (
      <>
        Your{" "}
        <strong>
          {ClosestGoal.name}
        </strong>{" "}
        goal is{" "}
        <strong>
          {Math.round(Progress)}%
        </strong>{" "}
        complete with{" "}
        <strong>
          {DaysLeft} days
        </strong>{" "}
        remaining.
      </>
    );
  } else {
    Status = "In Progress";

    InsightMessage = (
      <>
        Your{" "}
        <strong>
          {ClosestGoal.name}
        </strong>{" "}
        goal is{" "}
        <strong>
          {Math.round(Progress)}%
        </strong>{" "}
        complete. You have{" "}
        <strong>
          {DaysLeft} days
        </strong>{" "}
        to save the remaining $
        {Remaining}.
      </>
    );
  }

  return (
    <aside
      className="fs-insight"
      aria-labelledby="fs-insight-title"
    >
      <header className="fs-insight-header">
        <span className="fs-insight-badge">
          <span className="fs-insight-badge-dot" />
          FinSight Insight
        </span>

        <span className="fs-insight-status">
          {Status}
        </span>
      </header>

      <p
        className="fs-insight-text"
        id="fs-insight-title"
      >
        {InsightMessage}
      </p>

      <footer className="fs-insight-footer">
        <span className="fs-insight-meta">
          Based on your current goals
        </span>

        <button
          className="fs-insight-cta"
          type="button"
          onClick={() =>
            onViewDetails(ClosestGoal)
          }
        >
          View details
        </button>
      </footer>
    </aside>
  );
};

export default FinSightInsight;