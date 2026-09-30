import "./BudgetHeader.css";
import { useState } from "react";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    plus: "M12 5v14M5 12h14",
    close: "M6 6l12 12M18 6L6 18",
    tag: "M20.59 13.41 12 22l-9-9V4h9l8.59 8.59a2 2 0 0 1 0 2.82Z",
    calendar:
      "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    check: "M20 6 9 17l-5-5"
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
      <path d={paths[name]} />
    </svg>
  );
};

const BudgetHeader = ({ data, setData }) => {
  const [OpenBudgetModel, setOpenBudgetModel] = useState(false);

  const [BudegtModelForm, setBudegtModelForm] = useState({
    category: "",
    amount: "",
    period: "monthly",
    color: "green"
  });

  function HandleBudgetModelForm(e) {
    let { name, value } = e.target;

    setBudegtModelForm({
      ...BudegtModelForm,
      [name]: value
    });
  }

  function HandleColorChange(color) {
    setBudegtModelForm({
      ...BudegtModelForm,
      color: color
    });
  }

  function OpenModel() {
    setOpenBudgetModel(true);
  }

  function CloseModel() {
    setOpenBudgetModel(false);

    setBudegtModelForm({
      category: "",
      amount: "",
      period: "monthly",
      color: "green"
    });
  }

  function AddBudget() {
    if (
      BudegtModelForm.category === "" ||
      BudegtModelForm.amount === "" ||
      BudegtModelForm.period === ""
    )
      return;

    setData([
      ...data,
      {
        id: Date.now(),
        category: BudegtModelForm.category,
        period: BudegtModelForm.period,
        amount: BudegtModelForm.amount,
        color: BudegtModelForm.color
      }
    ]);

    CloseModel();
  }

  return (
    <>
      <header className="budget-header">
        <div className="budget-header-text">
          <span className="budget-header-kicker">PLANNING</span>

          <h1>Budgets</h1>

          <p>
            Plan and monitor your spending limits across every category.
          </p>
        </div>

        <button
          onClick={() => {
            OpenModel();
          }}
          className="budget-header-btn"
          type="button"
        >
          <Icon name="plus" size={17} />
          Create Budget
        </button>
      </header>

      {OpenBudgetModel && (
        <div className="cb-overlay" role="presentation">
          <div
            className="cb-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cb-title"
            aria-describedby="cb-description"
          >
            <header className="cb-header">
              <div className="cb-header-text">
                <h2 id="cb-title">Create Budget</h2>

                <p id="cb-description">
                  Set a monthly spending limit for a category.
                </p>
              </div>

              <button
                onClick={() => {
                  CloseModel();
                }}
                className="cb-close"
                type="button"
                aria-label="Close create budget"
              >
                <Icon name="close" size={18} />
              </button>
            </header>

            <div className="cb-body">
              <div className="cb-field">
                <label htmlFor="cb-category">Category</label>

                <div className="cb-select-wrap">
                  <span className="cb-select-icon">
                    <Icon name="tag" size={15} />
                  </span>

                  <select
                    value={BudegtModelForm.category}
                    onChange={HandleBudgetModelForm}
                    id="cb-category"
                    name="category"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    <option value="food">Food &amp; Dining</option>
                    <option value="shopping">Shopping</option>
                    <option value="transport">Transport</option>
                    <option value="housing">Housing</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="bills">Bills &amp; Utilities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="cb-field">
                <label htmlFor="cb-amount">Budget Amount</label>

                <div className="cb-amount-wrap">
                  <span className="cb-amount-currency">$</span>

                  <input
                    value={BudegtModelForm.amount}
                    onChange={HandleBudgetModelForm}
                    id="cb-amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    name="amount"
                  />

                  <span className="cb-amount-code">USD</span>
                </div>
              </div>

              <div className="cb-field">
                <label htmlFor="cb-period">Period</label>

                <div className="cb-select-wrap">
                  <span className="cb-select-icon">
                    <Icon name="calendar" size={15} />
                  </span>

                  <select
                    value={BudegtModelForm.period}
                    onChange={HandleBudgetModelForm}
                    id="cb-period"
                    name="period"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="cb-field">
                <span className="cb-field-label">Color</span>

                <div
                  className="cb-color-row"
                  role="radiogroup"
                  aria-label="Accent color"
                >
                  <button
                    onClick={() => {
                      HandleColorChange("green");
                    }}
                    className={`cb-color cb-color--green ${
                      BudegtModelForm.color === "green" ? "is-active" : ""
                    }`}
                    type="button"
                    aria-label="Green"
                  />

                  <button
                    onClick={() => {
                      HandleColorChange("blue");
                    }}
                    className={`cb-color cb-color--blue ${
                      BudegtModelForm.color === "blue" ? "is-active" : ""
                    }`}
                    type="button"
                    aria-label="Blue"
                  />

                  <button
                    onClick={() => {
                      HandleColorChange("amber");
                    }}
                    className={`cb-color cb-color--amber ${
                      BudegtModelForm.color === "amber" ? "is-active" : ""
                    }`}
                    type="button"
                    aria-label="Amber"
                  />

                  <button
                    onClick={() => {
                      HandleColorChange("red");
                    }}
                    className={`cb-color cb-color--red ${
                      BudegtModelForm.color === "red" ? "is-active" : ""
                    }`}
                    type="button"
                    aria-label="Red"
                  />

                  <button
                    onClick={() => {
                      HandleColorChange("purple");
                    }}
                    className={`cb-color cb-color--purple ${
                      BudegtModelForm.color === "purple" ? "is-active" : ""
                    }`}
                    type="button"
                    aria-label="Purple"
                  />
                </div>
              </div>
            </div>

            <footer className="cb-footer">
              <button
                onClick={() => {
                  CloseModel();
                }}
                className="cb-btn-cancel"
                type="button"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  AddBudget();
                }}
                className="cb-btn-submit"
                type="button"
              >
                <Icon name="check" size={15} />
                Create Budget
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetHeader;