import "./AIInsight.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    sparkle:
      "m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z",
    arrowRight: "M5 12h14M13 6l6 6-6 6",
    arrowUp: "m5 12 7-7 7 7M12 19V5"
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
      <path d={paths[name] || paths.sparkle} />
    </svg>
  );
};

const AIInsight = () => {
  return (
    <section className="fs-ai-insight" aria-labelledby="ai-insight-title">
      <div className="fs-ai-glow fs-ai-glow--one" />
      <div className="fs-ai-glow fs-ai-glow--two" />

      <div className="fs-ai-identity">
        <div className="fs-ai-icon">
          <Icon name="sparkle" size={22} />
        </div>
        <span>FinSight intelligence</span>
      </div>

      <div className="fs-ai-content">
        <div className="fs-ai-copy">
          <span className="fs-ai-kicker">AI FINANCIAL INSIGHT</span>

          <h2 id="ai-insight-title">
            Your spending rhythm is looking healthier.
          </h2>

          <p>
            You spent 4.2% less this month while keeping your savings rate above
            45%. Most of the improvement came from dining and shopping.
          </p>
        </div>

        <div className="fs-ai-recommendation">
          <div className="fs-ai-recommendation-icon">
            <Icon name="arrowUp" size={16} />
          </div>

          <div>
            <strong>Small opportunity</strong>
            <span>
              Reducing dining by $120 could add $1,440 to your yearly savings.
            </span>
          </div>
        </div>

        <button className="fs-ai-action" type="button">
          View personalized analysis
          <Icon name="arrowRight" size={15} />
        </button>
      </div>
    </section>
  );
};

export default AIInsight;