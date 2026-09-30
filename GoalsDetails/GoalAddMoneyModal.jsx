import "./GoalAddMoneyModal.css";
import { useState } from "react";

const GoalAddMoneyModal = ({
  goal,
  onConfirm,
  onClose
}) => {
  const [Amount, setAmount] = useState("");

  const Remaining = Math.max(
    goal.target - goal.saved,
    0
  );

  const NumericAmount = Number(Amount);

  const IsValidAmount =
    NumericAmount > 0 &&
    NumericAmount <= Remaining;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!IsValidAmount) {
      return;
    }

    onConfirm(NumericAmount);
  };

  return (
    <div
      className="goal-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="goal-add-money-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <header className="goal-modal-header">
          <div>
            <h2>Add Money</h2>

            <p>
              Add savings to {goal.name}.
            </p>
          </div>

          <button
            className="goal-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </header>

        <div className="goal-add-money-summary">
          <div>
            <span>Current saved</span>
            <strong>
              ${goal.saved}
            </strong>
          </div>

          <div>
            <span>Remaining</span>
            <strong>
              ${Remaining}
            </strong>
          </div>
        </div>

        <form
          className="goal-add-money-form"
          onSubmit={handleSubmit}
        >
          <label>
            Amount

            <div className="goal-add-money-input">
              <span>$</span>

              <input
                type="number"
                min="0.01"
                max={Remaining}
                step="0.01"
                value={Amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="0.00"
                autoFocus
              />
            </div>
          </label>

          {NumericAmount > Remaining && (
            <p className="goal-add-money-error">
              Amount cannot be greater than the
              remaining ${Remaining}.
            </p>
          )}

          {NumericAmount <= 0 &&
            Amount !== "" && (
              <p className="goal-add-money-error">
                Enter an amount greater than zero.
              </p>
            )}

          <p className="goal-add-money-hint">
            You can add up to ${Remaining} to complete
            this goal.
          </p>

          <footer className="goal-modal-actions">
            <button
              type="button"
              className="goal-modal-btn goal-modal-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="goal-modal-btn goal-modal-btn--primary"
              disabled={!IsValidAmount}
            >
              Add ${IsValidAmount ? NumericAmount : ""}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default GoalAddMoneyModal;