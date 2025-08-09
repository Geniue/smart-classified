// src/components/forms/CategorySelector.js
import WizardButton from '../../components/common/WizardButton';

export default function CategorySelector({ selected, onSelect, onNext }) {
  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'vehicles', name: 'Vehicles' },
    { id: 'property', name: 'Property' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'jobs', name: 'Jobs' },
    { id: 'services', name: 'Services' },
  ];
  return (
    <div className="category-selector">
      <h2 className="wizard-subtitle">Select a Category</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selected === category.id ? 'selected' : ''}`}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="wizard-actions">
        <div></div>
        <WizardButton 
            type="primary"
            onClick={onNext}
            disabled={!selected}
        >
            Continue
        </WizardButton>
    </div>
    </div>
  );
  
}