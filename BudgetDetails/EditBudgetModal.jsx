import "./EditBudgetModal.css";
import { useState } from "react";

const EditBudgetModal = ({
  budget,
  onClose,
  onUpdate
}) => {
  const [category, setCategory] = useState(
    budget.category
  );

  const [amount, setAmount] = useState(
    String(budget.amount)
  );

  const [period, setPeriod] = useState(
    budget.period
  );

  const [color, setColor] = useState(
    budget.color || "green"
  );

  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (!amount || Number.isNaN(numericAmount)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (numericAmount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (!period) {
      setError("Please select a period.");
      return;
    }

    onUpdate({
      id: budget.id,
      category,
      amount: numericAmount,
      period,
      color
    });
  }

  return (
    <div
      className="edit-budget-overlay"
      onMouseDown={onClose}
    >
      <div
        className="edit-budget-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="edit-budget-header">
          <div>
            <h2>Edit Budget</h2>
            <p>Update your budget details.</p>
          </div>

          <button
            className="edit-budget-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className="edit-budget-form"
          onSubmit={handleSubmit}
        >
          <label>
            <span>Category</span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="food">
                Food & Dining
              </option>

              <option value="shopping">
                Shopping
              </option>

              <option value="transport">
                Transport
              </option>

              <option value="housing">
                Housing
              </option>

              <option value="entertainment">
                Entertainment
              </option>

              <option value="bills">
                Bills & Utilities
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </label>

          <label>
            <span>Amount</span>

            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
            />
          </label>

          <label>
            <span>Period</span>

            <select
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value)
              }
            >
              <option value="weekly">
                Weekly
              </option>

              <option value="monthly">
                Monthly
              </option>

              <option value="quarterly">
                Quarterly
              </option>

              <option value="yearly">
                Yearly
              </option>
            </select>
          </label>

          <label>
            <span>Color</span>

            <select
              value={color}
              onChange={(event) =>
                setColor(event.target.value)
              }
            >
              <option value="green">
                Green
              </option>

              <option value="blue">
                Blue
              </option>

              <option value="amber">
                Amber
              </option>

              <option value="red">
                Red
              </option>

              <option value="purple">
                Purple
              </option>
            </select>
          </label>

          {error && (
            <p className="edit-budget-error">
              {error}
            </p>
          )}

          <div className="edit-budget-actions">
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudgetModal;