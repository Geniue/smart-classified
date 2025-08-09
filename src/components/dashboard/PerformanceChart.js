export default function PerformanceChart({ data }) {
  const maxViews = Math.max(...data.map(item => item.views), 100);

  return (
    <div className="performance-chart">
      <div className="chart-bars">
        {data.map((item) => (
          <div key={item.date} className="chart-item">
            <div className="chart-label">{item.date}</div>
            <div className="chart-bar-container">
              
              {/* Views Label */}
              <div className="chart-value views-value">
                {item.views} views
              </div>
              <div 
                className="chart-bar views" 
                style={{ width: `${(item.views / maxViews) * 100}%` }}
              ></div>

              {/* Clicks Label */}
              <div className="chart-value clicks-value">
                {item.clicks} clicks
              </div>
              <div 
                className="chart-bar clicks"
                style={{ width: `${(item.clicks / maxViews) * 100}%` }}
              ></div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
