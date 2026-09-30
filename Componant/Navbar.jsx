import { Link } from "react-router-dom";
import "./Navbar.css";

const Icon = ({ name, size = 17 }) => {
  const paths = {
    dashboard:
      "M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z",
    transactions:
      "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM8 8h8M8 12h8M8 16h5",
    budgets:
      "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5ZM8 7h8M8 11h8M8 15h5",
    goals:
      "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 1 1M12 3v9h9",
    analytics:
      "M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-7M20 16v-3",
    assistant:
      "m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z",
    menu: "M4 6h16M4 12h16M4 18h16"
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
      <path d={paths[name] || paths.dashboard} />
    </svg>
  );
};

const navItems = [
  {
    label: "Dashboard",
    icon: "dashboard",
    path: "/",
    active: true
  },
  {
    label: "Transactions",
    icon: "transactions",
    path: "/transactions"
  },
  {
    label: "Budgets",
    icon: "budgets",
    path: "/budgets"
  },
  {
    label: "Goals",
    icon: "goals",
    path: "/Goals"
  },
  
  {
    label: "AI Assistant",
    icon: "assistant",
    path: "/ai-assistant"
  }
];

const Navbar = () => {
  return (
    <nav className="fs-navbar" aria-label="Primary navigation">
      <div className="fs-navbar-container">
        <Link
          className="fs-brand"
          to="/"
          aria-label="FinSight dashboard"
        >
          <span className="fs-brand-mark">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 17.5 9.5 13l3 3L19 9.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 9.5H19v3.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="fs-brand-name">
            Fin<span>Sight</span>
          </span>
        </Link>

        <div className="fs-desktop-nav">
          {navItems.map((item) => (
            <Link
              className={`fs-nav-link ${item.active ? "is-active" : ""}`}
              to={item.path}
              key={item.label}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <details className="fs-mobile-menu">
          <summary aria-label="Open navigation menu">
            <Icon name="menu" size={21} />
          </summary>

          <div className="fs-mobile-panel">
            <div className="fs-mobile-panel-heading">
              <span>Navigation</span>
            </div>

            <div className="fs-mobile-links">
              {navItems.map((item) => (
                <Link
                  className={`fs-mobile-link ${item.active ? "is-active" : ""}`}
                  to={item.path}
                  key={item.label}
                >
                  <Icon name={item.icon} size={17} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
};

export default Navbar;