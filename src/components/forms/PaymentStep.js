// src/components/forms/PaymentStep.js
import { FaCreditCard, FaPaypal } from "react-icons/fa";

import './css/PaymentStep.css';

export default function PaymentStep({ amount, onBack, onSubmit }) {
  return (
    <div className="payment-step-container">
      <h3>💳 Complete Payment</h3>
      <p className="total-amount">
        Total Amount: <span>${amount}</span>
      </p>

      <div className="payment-options">
        <label className="payment-card">
          <input type="radio" name="payment" defaultChecked />
          <div className="payment-content">
            <FaCreditCard className="payment-icon" />
            <span>Credit Card</span>
          </div>
        </label>

        <label className="payment-card">
          <input type="radio" name="payment" />
          <div className="payment-content">
            <FaPaypal className="payment-icon" />
            <span>PayPal</span>
          </div>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onSubmit}>
          Pay & Publish
        </button>
      </div>
    </div>
  );
}
