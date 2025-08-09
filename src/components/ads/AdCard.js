// src/components/ads/AdCard.js
import { Link } from 'react-router-dom';
import SmartLabels from './SmartLabels';

function AdCard({ ad }) {
  return (
    <div className="ad-card">
      <Link to={`/ad/${ad.id}`}>
        <div className="ad-media">
          {ad.images && ad.images.length > 0 ? (
            <img src={ad.images[0]} alt={ad.title} />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>
        <div className="ad-content">
          <h3 className="ad-title">{ad.title}</h3>
          <SmartLabels labels={ad.labels} />
          <div className="ad-price">${ad.price}</div>
          <div className="ad-location">{ad.location}</div>
        </div>
      </Link>
    </div>
  );
}

export default AdCard;