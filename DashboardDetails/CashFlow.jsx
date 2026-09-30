import  { useState } from "react";
import "./CashFlow.css";

const Icon = ({ name, size = 16 }) => {
  const paths = {
    chevron:
      "m6 9 6 6 6-6",
    arrowRight:
      "M5 12h14M13 6l6 6-6 6",
    info:
      "M12 16v-4M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
      <path d={paths[name] || paths.info} />
    </svg>
  );
};

const periods = ["6 months", "3 months", "30 days"];

const CashFlow = () => {
  const [activePeriod, setActivePeriod] = useState("6 months");

  return (
    <section className="fs-cashflow-card" aria-labelledby="cashflow-title">
      <div className="fs-cashflow-header">
        <div>
          <span className="fs-section-kicker">MONEY MOVEMENT</span>
          <h2 id="cashflow-title">Cash flow</h2>
        </div>

        <button className="fs-period-select" type="button">
          {activePeriod}
          <Icon name="chevron" size={15} />
        </button>
      </div>

      <div className="fs-cashflow-meta">
        <div className="fs-cashflow-total">
          <strong>$4,133.82</strong>
          <span>Net cash flow</span>
        </div>

        <div className="fs-cashflow-legend">
          <span><i className="fs-legend-dot fs-legend-dot--income" />Income</span>
          <span><i className="fs-legend-dot fs-legend-dot--expense" />Expenses</span>
        </div>
      </div>

      <div className="fs-period-options" aria-label="Cash flow periods">
        {periods.map((period) => (
          <button
            className={activePeriod === period ? "is-active" : ""}
            key={period}
            type="button"
            onClick={() => setActivePeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      <div className="fs-chart-shell">
        <div className="fs-chart-y-labels">
          <span>$10k</span>
          <span>$7.5k</span>
          <span>$5k</span>
          <span>$2.5k</span>
          <span>$0</span>
        </div>

        <div className="fs-chart">
          <div className="fs-chart-grid">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <svg className="fs-cashflow-svg" viewBox="0 0 720 240" preserveAspectRatio="none" role="img" aria-label="Income and expenses over six months">
            <defs>
              <linearGradient id="incomeFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#5ba88d" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#5ba88d" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d98969" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#d98969" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              className="fs-chart-area fs-chart-area--income"
              d="M0 120 C58 94 82 110 126 75 S190 82 238 57 S310 90 360 51 S425 73 478 37 S540 73 595 45 S660 55 720 24 L720 240 L0 240 Z"
              fill="url(#incomeFill)"
            />
            <path
              className="fs-chart-area fs-chart-area--expense"
              d="M0 175 C58 164 85 181 126 148 S188 164 238 139 S305 151 360 130 S422 160 478 116 S540 148 595 125 S660 136 720 103 L720 240 L0 240 Z"
              fill="url(#expenseFill)"
            />
            <path
              className="fs-chart-line fs-chart-line--income"
              d="M0 120 C58 94 82 110 126 75 S190 82 238 57 S310 90 360 51 S425 73 478 37 S540 73 595 45 S660 55 720 24"
            />
            <path
              className="fs-chart-line fs-chart-line--expense"
              d="M0 175 C58 164 85 181 126 148 S188 164 238 139 S305 151 360 130 S422 160 478 116 S540 148 595 125 S660 136 720 103"
            />
            <circle className="fs-chart-point fs-chart-point--income" cx="478" cy="37" r="5" />
            <circle className="fs-chart-point fs-chart-point--expense" cx="478" cy="116" r="5" />
          </svg>

          <div className="fs-chart-tooltip">
            <span>August 2026</span>
            <strong>$9,420</strong>
            <small>Income</small>
          </div>

          <div className="fs-chart-x-labels">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>
      </div>

      <div className="fs-chart-footer">
        <span><Icon name="info" size={14} /> Based on recorded income and expenses</span>
        <button type="button">Explore cash flow <Icon name="arrowRight" size={14} /></button>
      </div>
    </section>
  );
};

export default CashFlow;