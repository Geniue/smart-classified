// src/pages/AdDetailPage.js
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdDetail from '../components/ads/AdDetail';

// Mock function - will be replaced with API call
const fetchAdDetail = (id) => {
  return {
    id,
    title: 'iPhone 13 Pro - Like New',
    description: 'iPhone 13 Pro 256GB in excellent condition. Used for only 3 months with original box and accessories. No scratches or dents. Battery health 100%.',
    price: 899,
    location: 'New York, NY',
    images: [
      'https://example.com/iphone1.jpg',
      'https://example.com/iphone2.jpg',
      'https://example.com/iphone3.jpg'
    ],
    labels: [
      { type: 'trending', text: 'Trending Now' },
      { type: 'reduced', text: 'Price Reduced 10%' }
    ],
    advertiser: {
      name: 'John Doe',
      joined: 'Member since 2022',
      rating: 4.8,
      contactMethods: ['message', 'phone']
    }
  };
};

function AdDetailPage() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const adData = fetchAdDetail(id);
      setAd(adData);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!ad) return <div>Ad not found</div>;

  return (
    <div className="ad-detail-page">
      <AdDetail ad={ad} />
    </div>
  );
}

export default AdDetailPage;