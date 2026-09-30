import "./DashboardHeader.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    calendar:
      "M6 2v4M18 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    plus: "M12 5v14M5 12h14",
    bell:
      "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
    arrowUp: "m5 12 7-7 7 7M12 19V5",
    sparkle:
      "m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"
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

const DashboardHeader = () => {
  return (
    <header className="fs-dashboard-header">
      <div className="fs-header-copy">
        <span className="fs-header-eyebrow">PERSONAL OVERVIEW</span>
        <h1>Good morning, zyad <span>✦</span></h1>
        <p>Here’s how your financial picture is looking today.</p>
      </div>

      <div className="fs-header-actions">
        <div className="fs-current-date">
          <Icon name="calendar" size={16} />
          <span>Sunday, September 20, 2026</span>
        </div>

        <button className="fs-add-transaction" type="button">
          <Icon name="plus" size={17} />
          <span>Add transaction</span>
        </button>

        <button className="fs-notification-button" type="button" aria-label="Notifications">
          <Icon name="bell" size={19} />
          <span className="fs-notification-dot" />
        </button>

        <div className="fs-user-avatar" aria-label="Alex Morgan">
          ZD
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;