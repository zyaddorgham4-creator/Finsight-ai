import './ModelAddTransiction.css';


export default function ModelAddTransiction({openaddtransiction,CloseTransictionAdd,form,HandleInput,AddTransiction,Icon})
{
    return(
        <>
              {openaddtransiction && (
        <div
          className="fs-modal-overlay"
          onClick={CloseTransictionAdd}
        >
          <div
            className="fs-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-transaction-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fs-modal-header">
              <div className="fs-modal-header-text">
                <h3 id="add-transaction-title">Add Transaction</h3>
                <p>
                  Record a new income or expense to keep your finances up to
                  date.
                </p>
              </div>

              <button
                className="fs-modal-close"
                type="button"
                aria-label="Close modal"
                onClick={CloseTransictionAdd}
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="fs-modal-body">
              <div className="fs-modal-type-indicator">
                <div className="fs-modal-type-option fs-modal-type-option--income">
                  <span className="fs-modal-type-icon fs-modal-type-icon--income">
                    <Icon name="arrowUp" size={16} />
                  </span>

                  <div className="fs-modal-type-copy">
                    <strong>Income</strong>
                    <small>Money received</small>
                  </div>
                </div>

                <div className="fs-modal-type-option fs-modal-type-option--expense is-active">
                  <span className="fs-modal-type-icon fs-modal-type-icon--expense">
                    <Icon name="arrowDown" size={16} />
                  </span>

                  <div className="fs-modal-type-copy">
                    <strong>Expense</strong>
                    <small>Money spent</small>
                  </div>
                </div>
              </div>

              <div className="fs-modal-field">
                <label htmlFor="fs-tx-name">Transaction Name</label>
                <input
                  id="fs-tx-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={form.name}
                  onChange={HandleInput}
                />
              </div>

              <div className="fs-modal-field">
                <label htmlFor="fs-tx-description">Description</label>
                <input
                  id="fs-tx-description"
                  name="description"
                  type="text"
                  placeholder="Add a short description"
                  value={form.description}
                  onChange={HandleInput}
                />
              </div>

              <div className="fs-modal-row">
                <div className="fs-modal-field">
                  <label htmlFor="fs-tx-category">Category</label>

                  <div className="fs-modal-select-wrapper">
                    <span className="fs-modal-select-icon">
                      <Icon name="tag" size={15} />
                    </span>

                    <select
                      id="fs-tx-category"
                      name="category"
                      value={form.category}
                      onChange={HandleInput}
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="Food & dining">
                        Food &amp; Dining
                      </option>
                      <option value="Transport">Transport</option>
                      <option value="Housing">Housing</option>
                      <option value="Subscriptions">
                        Subscriptions
                      </option>
                      <option value="Shopping">Shopping</option>
                      <option value="Entertainment">
                        Entertainment
                      </option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                      <option value="Income">Income</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="fs-modal-field">
                  <label htmlFor="fs-tx-date">Date</label>

                  <div className="fs-modal-select-wrapper">
                    <span className="fs-modal-select-icon">
                      <Icon name="calendar" size={15} />
                    </span>

                    <input
                      id="fs-tx-date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={HandleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="fs-modal-field">
                <label htmlFor="fs-tx-method">Payment Method</label>

                <div className="fs-modal-select-wrapper">
                  <span className="fs-modal-select-icon">
                    <Icon name="card" size={15} />
                  </span>

                  <select
                    id="fs-tx-method"
                    name="method"
                    value={form.method}
                    onChange={HandleInput}
                  >
                    <option value="" disabled>
                      Select payment method
                    </option>
                    <option value="Visa •••• 2841">
                      Visa •••• 2841
                    </option>
                    <option value="Mastercard •••• 9012">
                      Mastercard •••• 9012
                    </option>
                    <option value="Bank transfer">
                      Bank transfer
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="fs-modal-row">
                <div className="fs-modal-field">
                  <label htmlFor="fs-tx-type">Type</label>

                  <div className="fs-modal-select-wrapper">
                    <span className="fs-modal-select-icon">
                      <Icon name="tag" size={15} />
                    </span>

                    <select
                      id="fs-tx-type"
                      name="type"
                      value={form.type}
                      onChange={HandleInput}
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>
                </div>

                <div className="fs-modal-field">
                  <label htmlFor="fs-tx-icon">Icon</label>

                  <div className="fs-modal-select-wrapper">
                    <span className="fs-modal-select-icon">
                      <Icon name="tag" size={15} />
                    </span>

                    <select
                      id="fs-tx-icon"
                      name="icon"
                      value={form.icon}
                      onChange={HandleInput}
                    >
                      <option value="" disabled>
                        Select icon
                      </option>
                      <option value="shopping">Shopping</option>
                      <option value="briefcase">Briefcase</option>
                      <option value="car">Car</option>
                      <option value="bolt">Bolt</option>
                      <option value="home">Home</option>
                      <option value="coffee">Coffee</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="fs-modal-field">
                <label htmlFor="fs-tx-amount">Amount</label>

                <div className="fs-modal-amount-wrapper">
                  <span className="fs-modal-currency">$</span>

                  <input
                    id="fs-tx-amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={HandleInput}
                  />

                  <span className="fs-modal-currency-code">USD</span>
                </div>
              </div>
            </div>

            <div className="fs-modal-footer">
              <button
                className="fs-modal-btn-cancel"
                type="button"
                onClick={CloseTransictionAdd}
              >
                Cancel
              </button>

              <button
                className="fs-modal-btn-submit"
                type="button"
                onClick={AddTransiction}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}

        </>
    )
}