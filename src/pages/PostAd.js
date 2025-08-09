// src/pages/PostAd.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../components/forms/CategorySelector';
import AdTemplateBuilder from '../components/ads/AdTemplateBuilder';
import PackageSelector from '../components/forms/PackageSelector';
import PaymentStep from '../components/forms/PaymentStep';

import './css/PostAd.css';

function PostAd() {
  const [step, setStep] = useState(1);
  const [adData, setAdData] = useState({
    category: null,
    title: '',
    description: '',
    price: '',
    images: [],
    package: null
  });
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    // Will be replaced with actual API call
    console.log('Ad submitted:', adData);
    navigate('/dashboard');
  };

  return (
    <div className="post-ad-container">
      <div className="post-ad-card">
        <h1 className="post-ad-title">Post a New Ad</h1>
        
        <div className="wizard-progress">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div 
              key={stepNumber}
              className={`wizard-step ${step === stepNumber ? 'active' : ''} ${step > stepNumber ? 'completed' : ''}`}
            >
              <div className="step-number">{stepNumber}</div>
              <div className="step-label">{
                stepNumber === 1 ? 'Category' :
                stepNumber === 2 ? 'Details' :
                stepNumber === 3 ? 'Package' : 'Payment'
              }</div>
            </div>
          ))}
        </div>
        
        <div className="wizard-content">
          {step === 1 && (
            <CategorySelector 
              selected={adData.category}
              onSelect={category => setAdData({...adData, category})}
              onNext={handleNext}
            />
          )}
          
          {step === 2 && (
            <AdTemplateBuilder 
              adData={adData}
              onChange={updates => setAdData({...adData, ...updates})}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          
          {step === 3 && (
            <PackageSelector 
              selected={adData.package}
              onSelect={pkg => setAdData({...adData, package: pkg})}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          
          {step === 4 && (
            <PaymentStep 
              amount={adData.package?.price || 0}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostAd;