import "./GoalDeleteModal.css";

const GoalDeleteModal = ({ goal, onConfirm, onClose }) => {
  return (
    <div
      className="goal-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="goal-delete-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="goal-delete-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          </svg>
        </div>

        <div className="goal-delete-content">
          <h2>Delete Goal?</h2>

          <p>
            Are you sure you want to delete{" "}
            <strong>{goal.name}</strong>? This action cannot be undone.
          </p>
        </div>

        <footer className="goal-modal-actions">
          <button
            type="button"
            className="goal-modal-btn goal-modal-btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="goal-modal-btn goal-modal-btn--danger"
            onClick={() => onConfirm(goal.id)}
          >
            Delete Goal
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GoalDeleteModal;