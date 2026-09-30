import { useState } from "react";
import "./AIModal.css";

const AIModal = ({ modal, history, onClose, onConfirmGoal, onApplyPlan, onToast }) => {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalPeriod, setGoalPeriod] = useState("monthly");

  const renderBody = () => {
    switch (modal.type) {
      case "summary":
        return (
          <div className="ai-modal-grid">
            <div className="ai-modal-stat">
              <span>Total Balance</span>
              <strong>$8,420.00</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Monthly Income</span>
              <strong>$4,200.00</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Monthly Expenses</span>
              <strong>$2,960.00</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Savings Rate</span>
              <strong>28%</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Active Goals</span>
              <strong>6</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Risk Level</span>
              <strong className="is-positive">Low</strong>
            </div>
          </div>
        );

      case "insights":
        return (
          <ul className="ai-modal-list">
            <li>
              <strong>Dining spending increased 18%</strong>
              <span>Potential saving: $85/month</span>
            </li>
            <li>
              <strong>Vacation goal approaching deadline</strong>
              <span>Needs $65/month extra</span>
            </li>
            <li>
              <strong>Three recurring subscriptions could be cut</strong>
              <span>Recoverable: $85/month</span>
            </li>
            <li>
              <strong>Laptop goal may be delayed by 19 days</strong>
              <span>Adjust pace to stay on track</span>
            </li>
          </ul>
        );

      case "new-goal":
        return (
          <form
            className="ai-modal-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!goalName.trim()) return;
              onConfirmGoal(goalName.trim());
              setGoalName("");
              setGoalAmount("");
            }}
          >
            <label>
              Goal name
              <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g. New Camera"
              />
            </label>

            <label>
              Target amount
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="0.00"
              />
            </label>

            <label>
              Period
              <select value={goalPeriod} onChange={(e) => setGoalPeriod(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>

            <div className="ai-modal-form-actions">
              <button type="button" className="ai-modal-btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="ai-modal-btn-primary">
                Create Goal
              </button>
            </div>
          </form>
        );

      case "subscriptions":
        return (
          <ul className="ai-modal-list">
            <li>
              <strong>Netflix Premium</strong>
              <span>$22.99 / month — Duplicate with Basic plan</span>
            </li>
            <li>
              <strong>Spotify Duo</strong>
              <span>$14.99 / month — Unused for 45 days</span>
            </li>
            <li>
              <strong>Adobe Creative Cloud</strong>
              <span>$54.99 / month — Downgrade to Photography plan</span>
            </li>
          </ul>
        );

      case "compare":
        return (
          <div className="ai-modal-compare">
            <div className="ai-modal-compare-item">
              <span>Scenario A: Save $150 more</span>
              <strong>+$1,650 in 8 months</strong>
            </div>
            <div className="ai-modal-compare-item">
              <span>Scenario B: Cut dining 30%</span>
              <strong>+$780 in 8 months</strong>
            </div>
            <div className="ai-modal-compare-item">
              <span>Scenario C: Increase income 10%</span>
              <strong>+$2,000 in 8 months</strong>
            </div>
            <button
              className="ai-modal-btn-primary"
              type="button"
              onClick={() => {
                onApplyPlan("Save $150 more");
              }}
            >
              Apply best scenario
            </button>
          </div>
        );

      case "adjust-budget":
        return (
          <div className="ai-modal-grid">
            <div className="ai-modal-stat">
              <span>Food &amp; Dining</span>
              <strong>$600 → $500</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Entertainment</span>
              <strong>$150 → $110</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Subscriptions</span>
              <strong>$92 → $55</strong>
            </div>
            <div className="ai-modal-stat">
              <span>Monthly savings</span>
              <strong className="is-positive">+$177</strong>
            </div>
            <button
              className="ai-modal-btn-primary ai-modal-btn-full"
              type="button"
              onClick={() => {
                onToast({ tone: "success", text: "Budget adjusted — $177/month recovered." });
                onClose();
              }}
            >
              Apply adjustments
            </button>
          </div>
        );

      case "export-report":
        return (
          <div className="ai-modal-export">
            <p>Your financial report will include balance, spending, goals, and insights for the last 90 days.</p>
            <button
              className="ai-modal-btn-primary"
              type="button"
              onClick={() => {
                onToast({ tone: "success", text: "Report exported successfully." });
                onClose();
              }}
            >
              Download PDF
            </button>
          </div>
        );

      case "history":
        return (
          <ul className="ai-modal-list">
            {history.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div
        className="ai-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ai-modal-header">
          <div>
            <h3 id="ai-modal-title">{modal.title}</h3>
            <p>{modal.subtitle}</p>
          </div>

          <button className="ai-modal-close" type="button" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="ai-modal-body">{renderBody()}</div>
      </div>
    </div>
  );
};

export default AIModal;