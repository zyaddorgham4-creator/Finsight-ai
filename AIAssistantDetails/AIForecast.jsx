import { useState } from "react";
import "./AIForecast.css";

const forecastData = {
  30: { current: "$8,420", expected: "$8,960", upcoming: "$1,150", savings: "$540", points: [22, 30, 34, 40, 46, 52, 60, 68] },
  60: { current: "$8,420", expected: "$9,720", upcoming: "$1,980", savings: "$1,300", points: [22, 32, 42, 50, 58, 68, 78, 88] },
  90: { current: "$8,420", expected: "$10,580", upcoming: "$2,640", savings: "$2,160", points: [22, 34, 46, 56, 66, 76, 86, 96] }
};

const AIForecast = ({ onExportReport }) => {
  const [range, setRange] = useState(30);
  const data = forecastData[range];
  const max = Math.max(...data.points);

  return (
    <section className="ai-forecast" aria-labelledby="ai-forecast-title">
      <header className="ai-forecast-header">
        <div>
          <span className="ai-forecast-kicker">AI FORECAST</span>
          <h2 id="ai-forecast-title">Where your money is heading</h2>
        </div>

        <div className="ai-forecast-header-actions">
          <div className="ai-forecast-range" role="tablist">
            {[30, 60, 90].map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={range === r}
                className={`ai-forecast-range-btn ${range === r ? "is-active" : ""}`}
                type="button"
                onClick={() => setRange(r)}
              >
                {r} days
              </button>
            ))}
          </div>

          <button className="ai-forecast-export" type="button" onClick={onExportReport}>
            Export
          </button>
        </div>
      </header>

      <div className="ai-forecast-grid">
        <div className="ai-forecast-values">
          <div className="ai-forecast-value">
            <span className="ai-forecast-value-label">Current balance</span>
            <strong className="ai-forecast-value-number">{data.current}</strong>
          </div>

          <div className="ai-forecast-value">
            <span className="ai-forecast-value-label">Expected balance</span>
            <strong className="ai-forecast-value-number ai-forecast-value-number--positive">
              {data.expected}
            </strong>
          </div>

          <div className="ai-forecast-value">
            <span className="ai-forecast-value-label">Upcoming expenses</span>
            <strong className="ai-forecast-value-number ai-forecast-value-number--warning">
              {data.upcoming}
            </strong>
          </div>

          <div className="ai-forecast-value">
            <span className="ai-forecast-value-label">Projected savings</span>
            <strong className="ai-forecast-value-number ai-forecast-value-number--positive">
              {data.savings}
            </strong>
          </div>
        </div>

        <div className="ai-forecast-chart">
          <div className="ai-forecast-chart-legend">
            <span className="ai-forecast-chart-legend-item ai-forecast-chart-legend-item--current">
              <span className="ai-forecast-chart-legend-dot" />
              Current
            </span>
            <span className="ai-forecast-chart-legend-item ai-forecast-chart-legend-item--projected">
              <span className="ai-forecast-chart-legend-dot" />
              Projected
            </span>
            <span className="ai-forecast-chart-legend-item ai-forecast-chart-legend-item--potential">
              <span className="ai-forecast-chart-legend-dot" />
              Potential
            </span>
          </div>

          <div className="ai-forecast-chart-area">
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="ai-forecast-chart-svg" aria-hidden="true">
              <defs>
                <linearGradient id="aiForecastFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4b9c82" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#4b9c82" stopOpacity="0" />
                </linearGradient>
              </defs>

              <polyline
                className="ai-forecast-line ai-forecast-line--current"
                points={data.points.map((p, i) => `${(i / (data.points.length - 1)) * 300},${120 - (p / max) * 100}`).join(" ")}
                fill="none"
              />

              <polygon
                className="ai-forecast-area"
                points={`0,120 ${data.points.map((p, i) => `${(i / (data.points.length - 1)) * 300},${120 - (p / max) * 100}`).join(" ")} 300,120`}
                fill="url(#aiForecastFill)"
              />

              <polyline
                className="ai-forecast-line ai-forecast-line--potential"
                points={data.points.map((p, i) => `${(i / (data.points.length - 1)) * 300},${120 - ((p * 1.12) / max) * 100}`).join(" ")}
                fill="none"
              />
            </svg>
          </div>

          <div className="ai-forecast-chart-axis">
            <span>Now</span>
            <span>+{range / 2} d</span>
            <span>+{range} d</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIForecast;