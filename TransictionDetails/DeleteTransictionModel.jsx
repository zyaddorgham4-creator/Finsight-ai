const Icon = ({ name, size = 17 }) => {
  const paths = {
    shopping: "M5 8h14l-1 12H6L5 8ZM9 8a3 3 0 0 1 6 0",
    briefcase:
      "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2ZM9 7V5h6v2M3 12h18M10 12v2h4v-2",
    car: "M5 17h14l-1-8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2l-1 8ZM7 17v3M17 17v3M8 12h.01M16 12h.01",
    bolt: "m13 2-9 12h7l-1 8 9-12h-7l1-8Z",
    home: "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6",
    coffee:
      "M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8ZM16 10h2a2 2 0 0 1 0 4h-2M8 4v2M12 4v2",
    more: "M6 12h.01M12 12h.01M18 12h.01",
    plus: "M12 5v14M5 12h14",
    edit: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
    trash:
      "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6",
    eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    close: "M6 6l12 12M18 6L6 18",
    calendar:
      "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    card: "M3 10h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
    tag: "M20.59 13.41 12 22l-9-9V4h9l8.59 8.59a2 2 0 0 1 0 2.82Z",
    arrowUp: "M12 19V5M5 12l7-7 7 7",
    arrowDown: "M12 5v14M19 12l-7 7-7-7"
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
      <path d={paths[name] || paths.more} />
    </svg>
  );
};
import './DeleteTransictionModel.css';
export default function DeleteTransictionModel({OpenDeleteModel,DeleteTransaction,CloseTransictionDelete,DeleteTransiction,IdDelete})
{
    return(

        <>
        {OpenDeleteModel && DeleteTransaction && (
        <div className="fs-delete-overlay">
          <div
            className="fs-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fs-delete-title"
            aria-describedby="fs-delete-description"
          >
            <button
              onClick={() => {
                CloseTransictionDelete();
              }}
              className="fs-delete-close"
              type="button"
              aria-label="Close delete confirmation"
            >
              <Icon name="close" size={18} />
            </button>

            <div className="fs-delete-icon-wrapper">
              <span className="fs-delete-icon-inner">
                <Icon name="trash" size={22} />
              </span>
            </div>

            <div className="fs-delete-content">
              <h3
                id="fs-delete-title"
                className="fs-delete-title"
              >
                Delete transaction?
              </h3>

              <p
                id="fs-delete-description"
                className="fs-delete-description"
              >
                This action cannot be undone. The transaction will be
                permanently removed from your records.
              </p>
            </div>

            <div className="fs-delete-preview">
              <div className="fs-delete-preview-top">
                <div className="fs-delete-preview-main">
                  <span
                    className={`fs-delete-preview-icon fs-delete-preview-icon--${DeleteTransaction.tone}`}
                  >
                    <Icon
                      name={DeleteTransaction.icon}
                      size={18}
                    />
                  </span>

                  <div className="fs-delete-preview-copy">
                    <strong>{DeleteTransaction.name}</strong>
                    <small>{DeleteTransaction.description}</small>
                  </div>
                </div>

                <span
                  className={`fs-delete-preview-amount fs-delete-preview-amount--${DeleteTransaction.tone}`}
                >
                  {DeleteTransaction.type === "Income" ? "+" : "-"}$
                  {Number(DeleteTransaction.amount).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )}
                </span>
              </div>

              <div className="fs-delete-preview-meta">
                <span className="fs-delete-preview-tag">
                  {DeleteTransaction.category}
                </span>

                <span className="fs-delete-preview-dot" />

                <span className="fs-delete-preview-muted">
                  {DeleteTransaction.date}
                </span>

                <span className="fs-delete-preview-dot" />

                <span
                  className={`fs-delete-preview-type fs-delete-preview-type--${DeleteTransaction.tone}`}
                >
                  <i />
                  {DeleteTransaction.type}
                </span>
              </div>
            </div>

            <div className="fs-delete-actions">
              <button
                onClick={() => {
                  CloseTransictionDelete();
                }}
                className="fs-delete-btn-cancel"
                type="button"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  DeleteTransiction(IdDelete);
                }}
                className="fs-delete-btn-confirm"
                type="button"
              >
                <Icon name="trash" size={15} />
                Delete Transaction
              </button>
            </div>
          </div>
        </div>
      )}

        </>
    )
}