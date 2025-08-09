// src/pages/BrowseAds.js
import { useState } from 'react';
import AdCard from '../components/ads/AdCard';
import SearchBar from '../components/common/SearchBar';
import CategoryFilter from '../components/forms/CategoryFilter';

// Mock data - will be replaced with real API calls later
const mockAds = [
  {
    id: 1,
    title: 'iPhone 13 Pro - Like New',
    price: 899,
    location: 'New York',
    images: ['https://images.unsplash.com/photo-1695822822491-d92cee704368?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    labels: [{ type: 'trending', text: 'Trending Now' }]
  },
  {
    id: 2,
    title: 'Professional Camera Equipment',
    price: 1200,
    location: 'Los Angeles',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    labels: [{ type: 'top-rated', text: 'Top Rated' }]
  },
  // More mock ads...
];



function BrowseAds() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAds = mockAds.filter(ad => {
    // Apply filters here
    if (searchQuery && !ad.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="browse-ads-page">
      <h1>Browse Classified Ads</h1>
      
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
      />
      
      <div className="filters-section">
        <CategoryFilter 
          selected={filters.category}
          onChange={category => setFilters({...filters, category})}
        />
        {/* Add more filters here */}
      </div>
      
      <div className="ads-grid">
        {filteredAds.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}

export default BrowseAds;