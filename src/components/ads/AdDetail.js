// src/components/ads/AdDetail.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShareAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import WizardButton from '../common/WizardButton';

import './css/AdDetail.css';

function AdDetail({ ad }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setLoading(false);
    };
    loadData();
  }, []);


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
  
  if (loading) return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading your ad details...
      </motion.p>
    </motion.div>
  );

  return (
    <motion.div 
      className="ad-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Gallery */}
      <motion.div 
        className="ad-gallery"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {safeAd.images.length > 0 ? (
          <>
            <div className="main-image-container">
              <motion.img 
                src={safeAd.images[currentImageIndex]} 
                alt={safeAd.title} 
                className="main-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {safeAd.images.length > 1 && (
                <div className="gallery-controls">
                  <motion.button 
                    onClick={handlePreviousImage}
                    className="gallery-nav prev"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    &lt;
                  </motion.button>
                  <motion.button 
                    onClick={handleNextImage}
                    className="gallery-nav next"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    &gt;
                  </motion.button>
                </div>
              )}
            </div>
            <div className="thumbnail-wrapper">
              <div className="thumbnail-container">
                {safeAd.images.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="no-image-placeholder">
            No images available
          </div>
        )}
      </motion.div>

      {/* Ad Content */}
      <motion.div 
        className="ad-content"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="ad-header">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {safeAd.title}
          </motion.h1>
          <motion.div 
            className="price"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            ${safeAd.price}
          </motion.div>
          
          <motion.div 
            className="ad-meta"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="location">
              <FaMapMarkerAlt /> {safeAd.location}
            </span>
            <span className="posted-date">
              Posted: {new Date(safeAd.createdAt).toLocaleDateString()}
            </span>
          </motion.div>
        </div>

        <motion.div 
          className="ad-description"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <h3>Description</h3>
          <p>{safeAd.description}</p>
        </motion.div>

        {/* Ad Specifications */}
        {Object.keys(safeAd.specifications).length > 0 && (
          <motion.div 
            className="ad-specs"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Specifications</h3>
            <ul>
              {Object.entries(safeAd.specifications).map(([key, value]) => (
                <motion.li
                  key={key}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * Object.keys(safeAd.specifications).indexOf(key) }}
                >
                  <strong>{key}:</strong> {value}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Seller Info */}
        <motion.div 
          className="seller-info"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <h3>Seller Information</h3>
          <div className="seller-details">
            <motion.div 
              className="seller-avatar"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {safeAd.seller.name.charAt(0)}
            </motion.div>
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
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="ad-actions"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button 
          className={`save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSaveAd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHeart /> {saved ? 'Saved' : 'Save'}
        </motion.button>
        <motion.button 
          className="share-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaShareAlt /> Share
        </motion.button>
        <WizardButton 
          type="primary"
          className="inquiry-btn"
        >
          Make an Offer
        </WizardButton>
      </motion.div>
    </motion.div>
  );
}

export default AdDetail;


