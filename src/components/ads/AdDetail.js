// src/components/ads/AdDetail.js
import { useState } from 'react';
import { FaHeart, FaShareAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import WizardButton from '../common/WizardButton';

import './css/AdDetail.css';

function AdDetail({ ad }) {
  const [saved, setSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Set default values for missing properties

  ad.images = [
    "https://images.unsplash.com/photo-1637496652486-99d500bcdd18?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1690705229380-a32a8eb5017d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1656078411660-05f2cf994d33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  const safeAd = {
    ...ad,
    seller: ad.seller || {
      name: 'Private Seller',
      joinedDate: new Date().toISOString()
    },
    images: ad.images || [],
    specifications: ad.specifications || {},
    location: ad.location || 'Location not specified',
    createdAt: ad.createdAt || new Date().toISOString()
  };

  const handleSaveAd = () => {
    setSaved(!saved);
    // TODO: Add save functionality
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? ad.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === ad.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="ad-detail-container">
      {/* Image Gallery */}
      <div className="ad-gallery">
        {safeAd.images.length > 0 ? (
          <>
            <img 
              src={safeAd.images[currentImageIndex]} 
              alt={safeAd.title} 
              className="main-image"
            />
            {safeAd.images.length > 1 && (
              <div className="gallery-controls">
                <button 
                  onClick={handlePreviousImage}
                  className="gallery-nav prev"
                >
                  &lt;
                </button>
                <button 
                  onClick={handleNextImage}
                  className="gallery-nav next"
                >
                  &gt;
                </button>
              </div>
            )}
            <div className="thumbnail-container">
              {safeAd.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="no-image-placeholder">
            No images available
          </div>
        )}
      </div>

      {/* Ad Content */}
      <div className="ad-content">
        <div className="ad-header">
          <h1>{safeAd.title}</h1>
          <div className="price">${safeAd.price}</div>
          
          <div className="ad-meta">
            <span className="location">
              <FaMapMarkerAlt /> {safeAd.location}
            </span>
            <span className="posted-date">
              Posted: {new Date(safeAd.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="ad-description">
          <h3>Description</h3>
          <p>{safeAd.description || 'No description provided'}</p>
        </div>

        {/* Ad Specifications */}
        {Object.keys(safeAd.specifications).length > 0 && (
          <div className="ad-specs">
            <h3>Specifications</h3>
            <ul>
              {Object.entries(safeAd.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Seller Info */}
        <div className="seller-info">
          <h3>Seller Information</h3>
          <div className="seller-details">
            <div className="seller-avatar">
              {safeAd.seller.name.charAt(0)}
            </div>
            <div className="seller-meta">
              <h4>{safeAd.seller.name}</h4>
              <span className="member-since">
                Member since {new Date(safeAd.seller.joinedDate).getFullYear()}
              </span>
            </div>
          </div>
          <div className="seller-actions">
            <WizardButton 
              type="secondary" 
              icon={<FaEnvelope />}
              className="contact-btn"
            >
              Send Message
            </WizardButton>
            <WizardButton 
              type="secondary" 
              icon={<FaPhone />}
              className="contact-btn"
            >
              Show Phone
            </WizardButton>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="ad-actions">
        <button 
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSaveAd}
        >
          <FaHeart /> {saved ? 'Saved' : 'Save'}
        </button>
        <button className="share-btn">
          <FaShareAlt /> Share
        </button>
        <WizardButton 
          type="primary"
          className="inquiry-btn"
        >
          Make an Offer
        </WizardButton>
      </div>
    </div>
  );
}

export default AdDetail;