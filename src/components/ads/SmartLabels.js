// src/components/ads/SmartLabels.js
function SmartLabels({ labels }) {
  if (!labels || labels.length === 0) return null;

  const getLabelClass = (type) => {
    switch(type) {
      case 'trending': return 'trending';
      case 'top-rated': return 'top-rated';
      case 'reduced': return 'reduced';
      default: return '';
    }
  };

  return (
    <div className="smart-labels">
      {labels.map((label, index) => (
        <span key={index} className={`label ${getLabelClass(label.type)}`}>
          {label.text}
        </span>
      ))}
    </div>
  );
}

export default SmartLabels;