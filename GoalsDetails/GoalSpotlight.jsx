
import "./GoalSpotlight.css";

const GoalSpotlight = ({ goals }) => {

  const FeaturedGoal = goals.reduce((a, b) => {

    const currentProgress = b.saved / b.target;
    const bestProgress = a.saved / a.target;

    if (currentProgress > bestProgress) {
      return b;
    }

    return a;

  }, goals[0]);

  const Progress = (FeaturedGoal.saved / FeaturedGoal.target) * 100;
  const Remaining = FeaturedGoal.target - FeaturedGoal.saved;

  const Today = new Date();
  const Deadline = new Date(FeaturedGoal.deadline);
  const Difference = Deadline - Today;
  const DaysLeft = Math.ceil(Difference / (1000 * 60 * 60 * 24));

  let Status;

  if (FeaturedGoal.saved >= FeaturedGoal.target) {
    Status = "Completed";
  } else if (DaysLeft < 0) {
    Status = "At Risk";
  } else if (Progress >= 50) {
    Status = "On Track";
  } else {
    Status = "Needs Attention";
  }

  return (
    <section className="goal-spotlight" aria-labelledby="goal-spotlight-title">

      <header className="goal-spotlight-header">
        <span className="goal-spotlight-kicker">FEATURED GOAL</span>
        <span className="goal-spotlight-status">{Status}</span>
      </header>

      <div className="goal-spotlight-main">

        <div className="goal-spotlight-icon">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="5" width="16" height="11" rx="2" />
            <path d="M2 20h20" />
          </svg>
        </div>

        <div className="goal-spotlight-text">
          <h2 id="goal-spotlight-title">{FeaturedGoal.name}</h2>

          <span className="goal-spotlight-category">
            {FeaturedGoal.category}
          </span>
        </div>

      </div>

      <div className="goal-spotlight-amounts">

        <div className="goal-spotlight-amount">
          <strong>${FeaturedGoal.saved}</strong>
          <span>of ${FeaturedGoal.target}</span>
        </div>

        <span className="goal-spotlight-percent">
          {Math.round(Progress)}%
        </span>

      </div>

      <div className="goal-spotlight-progress" aria-hidden="true">
        <span
          className="goal-spotlight-progress-fill"
          style={{ width: `${Progress}%` }}
        />
      </div>

      <footer className="goal-spotlight-footer">

        <div className="goal-spotlight-meta">
          <span className="goal-spotlight-meta-label">Remaining</span>

          <span className="goal-spotlight-meta-value">
            ${Remaining}
          </span>
        </div>

        <span className="goal-spotlight-divider" />

        <div className="goal-spotlight-meta">
          <span className="goal-spotlight-meta-label">Deadline</span>

          <span className="goal-spotlight-meta-value">
            {DaysLeft} days left
          </span>
        </div>

      </footer>

    </section>
  );
};

export default GoalSpotlight;


