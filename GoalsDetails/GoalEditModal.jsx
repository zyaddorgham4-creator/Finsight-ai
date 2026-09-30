import "./GoalEditModal.css";
import { useState } from "react";

const GoalEditModal = ({
  goal,
  onSave,
  onClose
}) => {
  const [FormData, setFormData] = useState({
    name: goal.name,
    category: goal.category,
    saved: goal.saved,
    target: goal.target,
    deadline: goal.deadline,
    icon: goal.icon
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]:
        name === "saved" ||
        name === "target"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !FormData.name.trim() ||
      !FormData.category.trim() ||
      FormData.target <= 0 ||
      FormData.saved < 0 ||
      FormData.saved > FormData.target ||
      !FormData.deadline
    ) {
      return;
    }

    const WasCompleted =
      goal.saved >= goal.target;

    const IsCompleted =
      FormData.saved >= FormData.target;

    let CompletedAt =
      goal.completedAt || null;

    if (
      !WasCompleted &&
      IsCompleted
    ) {
      CompletedAt =
        new Date().toISOString();
    }

    if (!IsCompleted) {
      CompletedAt = null;
    }

    onSave({
      ...goal,
      ...FormData,
      completedAt: CompletedAt
    });
  };

  return (
    <div
      className="goal-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="goal-edit-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <header className="goal-modal-header">
          <div>
            <h2>Edit Goal</h2>

            <p>
              Update your goal details.
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

        <form
          className="goal-edit-form"
          onSubmit={handleSubmit}
        >
          <label>
            Goal Name

            <input
              type="text"
              name="name"
              value={FormData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Category

            <input
              type="text"
              name="category"
              value={FormData.category}
              onChange={handleChange}
            />
          </label>

          <div className="goal-edit-form-row">
            <label>
              Saved

              <input
                type="number"
                name="saved"
                min="0"
                value={FormData.saved}
                onChange={handleChange}
              />
            </label>

            <label>
              Target

              <input
                type="number"
                name="target"
                min="1"
                value={FormData.target}
                onChange={handleChange}
              />
            </label>
          </div>

          {FormData.saved >
            FormData.target && (
            <p
              style={{
                margin: "-8px 0 0",
                color: "#bd625c",
                fontSize: "11.5px"
              }}
            >
              Saved amount cannot be greater
              than the target.
            </p>
          )}

          <label>
            Deadline

            <input
              type="date"
              name="deadline"
              value={FormData.deadline}
              onChange={handleChange}
            />
          </label>

          <label>
            Icon

            <select
              name="icon"
              value={FormData.icon}
              onChange={handleChange}
            >
              <option value="laptop">
                Laptop
              </option>

              <option value="shield">
                Shield
              </option>

              <option value="plane">
                Plane
              </option>

              <option value="phone">
                Phone
              </option>

              <option value="car">
                Car
              </option>

              <option value="book">
                Book
              </option>
            </select>
          </label>

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
            >
              Save Changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default GoalEditModal;