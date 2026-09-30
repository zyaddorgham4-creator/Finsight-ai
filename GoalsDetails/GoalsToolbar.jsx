import "./GoalsToolbar.css";

const GoalsToolbar = ({
  Search,
  setSearch,
  Filter,
  setFilter,
  Sort,
  setSort,
  View,
  setView
}) => {
  return (
    <div className="goals-section-toolbar">
      <div className="goals-search">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
          />

          <path d="m20 20-4-4" />
        </svg>

        <input
          type="search"
          value={Search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search goals..."
          aria-label="Search goals"
        />
      </div>

      <div className="goals-filter-group">
        <select
          value={Filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          aria-label="Filter goals"
        >
          <option value="all">
            All Goals
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="overdue">
            Overdue
          </option>
        </select>

        <select
          value={Sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          aria-label="Sort goals"
        >
          <option value="deadline">
            Sort by Deadline
          </option>

          <option value="progress">
            Sort by Progress
          </option>

          <option value="amount">
            Sort by Saved Amount
          </option>

          <option value="name">
            Sort by Name
          </option>
        </select>
      </div>

      <div
        className="goals-section-view"
        role="group"
        aria-label="View options"
      >
        <button
          className={`goals-section-view-btn ${
            View === "grid"
              ? "is-active"
              : ""
          }`}
          type="button"
          onClick={() => setView("grid")}
          aria-pressed={View === "grid"}
        >
          Grid
        </button>

        <button
          className={`goals-section-view-btn ${
            View === "list"
              ? "is-active"
              : ""
          }`}
          type="button"
          onClick={() => setView("list")}
          aria-pressed={View === "list"}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default GoalsToolbar;