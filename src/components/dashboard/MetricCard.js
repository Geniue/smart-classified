// src/components/dashboard/MetricCard.js
// Must use 'export default' if importing without braces
export default function MetricCard({ title, value, change }) {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <div className="metric-value">{value}</div>
      <div className="metric-change">{change}</div>
    </div>
  );
}