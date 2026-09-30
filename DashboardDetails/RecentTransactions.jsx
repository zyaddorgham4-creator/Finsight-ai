import React from "react";
import "./RecentTransactions.css";

const Icon = ({ name, size = 17 }) => {
  const paths = {
    coffee:
      "M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8ZM16 10h2a2 2 0 0 1 0 4h-2M8 4v2M12 4v2",
    shopping:
      "M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0",
    bolt:
      "m13 2-9 12h7l-1 8 9-12h-7l1-8Z",
    play:
      "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM10 8l5 4-5 4V8Z",
    arrowRight:
      "M5 12h14M13 6l6 6-6 6"
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
      <path d={paths[name] || paths.shopping} />
    </svg>
  );
};

const transactions = [
  {
    name: "Blue Bottle Coffee",
    category: "Food & dining",
    date: "Today, 9:42 AM",
    method: "Visa •••• 2841",
    amount: "-$6.80",
    icon: "coffee",
    tone: "coffee"
  },
  {
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Yesterday, 6:18 PM",
    method: "Visa •••• 2841",
    amount: "-$86.42",
    icon: "shopping",
    tone: "shopping"
  },
  {
    name: "Adobe Creative Cloud",
    category: "Subscriptions",
    date: "Sep 18, 2026",
    method: "Mastercard •••• 9012",
    amount: "-$54.99",
    icon: "bolt",
    tone: "bolt"
  },
  {
    name: "Netflix",
    category: "Entertainment",
    date: "Sep 17, 2026",
    method: "Mastercard •••• 9012",
    amount: "-$22.99",
    icon: "play",
    tone: "play"
  }
];

const RecentTransactions = () => {
  return (
    <section
      className="fs-transactions-card"
      aria-labelledby="transactions-title"
    >
      <div className="fs-transactions-header">
        <div>
          <span className="fs-section-kicker">ACTIVITY</span>
          <h2 id="transactions-title">Recent transactions</h2>
        </div>

        <button className="fs-view-all" type="button">
          View all
          <Icon name="arrowRight" size={14} />
        </button>
      </div>

      <div className="fs-transaction-list">
        {transactions.map((transaction) => (
          <article
            className="fs-transaction-row"
            key={`${transaction.name}-${transaction.date}`}
          >
            <div
              className={`fs-transaction-icon fs-transaction-icon--${transaction.tone}`}
            >
              <Icon name={transaction.icon} size={17} />
            </div>

            <div className="fs-transaction-main">
              <strong>{transaction.name}</strong>
              <span>{transaction.category}</span>
            </div>

            <div className="fs-transaction-date">
              <strong>{transaction.date}</strong>
              <span>{transaction.method}</span>
            </div>

            <strong className="fs-transaction-amount">
              {transaction.amount}
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;