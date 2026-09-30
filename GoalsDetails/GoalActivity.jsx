import "./GoalActivity.css";
import { useState } from "react";

const GoalActivity = ({ goals, activities }) => {
  const [VisibleCount, setVisibleCount] = useState(4);

  const GoalMap = goals.reduce((acc, goal) => {
    acc[goal.id] = goal;
    return acc;
  }, {});

  const SortedActivities = [...activities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const VisibleActivities = SortedActivities.slice(
    0,
    VisibleCount
  );

  const FormatDate = (date) => {
    const ActivityDate = new Date(date);
    ActivityDate.setHours(0, 0, 0, 0);

    const Today = new Date();
    Today.setHours(0, 0, 0, 0);

    const Difference = Today - ActivityDate;

    const DaysDifference = Math.floor(
      Difference / (1000 * 60 * 60 * 24)
    );

    if (DaysDifference === 0) {
      return "Today";
    }

    if (DaysDifference === 1) {
      return "Yesterday";
    }

    return ActivityDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  const GetActivityData = (activity) => {
    const goal = GoalMap[activity.goalId];

    if (activity.type === "completed") {
      return {
        tone: "accent",
        amount: "Completed",
        title: goal
          ? `${goal.name} goal completed`
          : "Goal completed"
      };
    }

    if (activity.type === "deposit") {
      return {
        tone: "positive",
        amount: `+ $${activity.amount}`,
        title: goal
          ? `Added to ${goal.name}`
          : "Added to goal"
      };
    }

    return {
      tone: "positive",
      amount: `$${activity.amount}`,
      title: goal
        ? `${goal.name} activity`
        : "Goal activity"
    };
  };

  const HandleViewAll = () => {
    if (VisibleCount >= SortedActivities.length) {
      setVisibleCount(4);
    } else {
      setVisibleCount(SortedActivities.length);
    }
  };

  const ShowViewButton = SortedActivities.length > 4;

  return (
    <section
      className="goal-activity"
      aria-labelledby="goal-activity-title"
    >
      <header className="goal-activity-header">
        <h2 id="goal-activity-title">
          Recent Goal Activity
        </h2>

        {ShowViewButton && (
          <button
            className="goal-activity-cta"
            type="button"
            onClick={HandleViewAll}
          >
            {VisibleCount >= SortedActivities.length
              ? "Show less"
              : "View all"}
          </button>
        )}
      </header>

      {VisibleActivities.length === 0 ? (
        <div className="goal-activity-empty">
          <span className="goal-activity-empty-icon">
            +
          </span>

          <strong>No goal activity yet</strong>

          <p>
            Your goal deposits and completed goals will appear here.
          </p>
        </div>
      ) : (
        <ul className="goal-activity-list">
          {VisibleActivities.map((activity) => {
            const ActivityData = GetActivityData(activity);

            return (
              <li
                key={activity.id}
                className="goal-activity-item"
              >
                <span
                  className={`goal-activity-icon goal-activity-icon--${ActivityData.tone}`}
                  aria-hidden="true"
                >
                  {activity.type === "completed" ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                </span>

                <div className="goal-activity-body">
                  <div className="goal-activity-line">
                    <strong className="goal-activity-amount">
                      {ActivityData.amount}
                    </strong>

                    <span className="goal-activity-title">
                      {ActivityData.title}
                    </span>
                  </div>

                  <span className="goal-activity-date">
                    {FormatDate(activity.date)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default GoalActivity;