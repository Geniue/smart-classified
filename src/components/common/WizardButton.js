// src/components/common/WizardButton.js
import './css/WizardButton.css'; // We'll create this CSS file next

const WizardButton = ({ 
  children, 
  onClick, 
  type = 'primary', 
  disabled = false 
}) => {
  // Determine button class based on type
  const getButtonClass = () => {
    let baseClass = 'wizard-button';
    if (disabled) baseClass += ' disabled';
    if (type === 'primary') return baseClass + ' primary';
    if (type === 'secondary') return baseClass + ' secondary';
    if (type === 'danger') return baseClass + ' danger';
    return baseClass;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getButtonClass()}
    >
      {children}
    </button>
  );
};

export default WizardButton;