// src/components/forms/PackageSelector.js
export default function PackageSelector({ selected, onSelect, onBack, onNext }) {
  const packages = [
    { id: 'basic', name: 'Basic', price: 9.99, features: ['7 days visibility'] },
    { id: 'standard', name: 'Standard', price: 19.99, features: ['14 days visibility', 'Highlighted'] },
    { id: 'premium', name: 'Premium', price: 29.99, features: ['30 days visibility', 'Top placement', 'Urgent tag'] }
  ];
  return (
    <div className="package-selector">
      <h2 className="wizard-subtitle">Select a Package</h2>
      <div className="packages-grid">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className={`package-card ${selected?.id === pkg.id ? 'selected' : ''}`}
            onClick={() => onSelect(pkg)}
          >
            <h3>{pkg.name}</h3>
            <div className="price">${pkg.price}</div>
            <ul className="features">
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wizard-actions">
        <button 
          className="wizard-button wizard-button-secondary"
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className="wizard-button wizard-button-primary"
          onClick={onNext}
          disabled={!selected}
        >
          Continue
        </button>
      </div>
    </div>
  );
}