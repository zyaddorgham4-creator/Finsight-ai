import "./GoalCreateModal.css";
import { useState } from "react";

const GoalCreateModal = ({
  onCreate,
  onClose
}) => {
  const [FormData, setFormData] = useState({
    name: "",
    category: "",
    saved: 0,
    target: "",
    deadline: "",
    icon: "laptop"
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

    const IsCompleted =
      FormData.saved >= FormData.target;

    const Today =
      new Date().toISOString();

    const NewGoal = {
      id: crypto.randomUUID(),
      icon: FormData.icon,
      name: FormData.name.trim(),
      category: FormData.category.trim(),
      saved: FormData.saved,
      target: FormData.target,
      deadline: FormData.deadline,
      completedAt: IsCompleted
        ? Today
        : null
    };

    onCreate(NewGoal);
  };

  return (
    <div
      className="goal-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="goal-create-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <header className="goal-modal-header">
          <div>
            <h2>Create Goal</h2>

            <p>
              Set a new financial milestone.
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
          className="goal-create-form"
          onSubmit={handleSubmit}
        >
          <label>
            Goal Name

            <input
              type="text"
              name="name"
              value={FormData.name}
              onChange={handleChange}
              placeholder="e.g. New Laptop"
            />
          </label>

          <label>
            Category

            <input
              type="text"
              name="category"
              value={FormData.category}
              onChange={handleChange}
              placeholder="e.g. Technology"
            />
          </label>

          <div className="goal-create-form-row">
            <label>
              Current Saved

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
                placeholder="1000"
              />
            </label>
          </div>

          <div className="goal-create-form-row">
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
          </div>

          {FormData.saved >
            FormData.target &&
            FormData.target > 0 && (
              <p className="goal-create-error">
                Saved amount cannot be greater
                than the target.
              </p>
            )}

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
              Create Goal
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default GoalCreateModal;