// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import BrowseAds from './pages/BrowseAds';
import PostAd from './pages/PostAd';
import AdDetailPage from './pages/AdDetailPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<BrowseAds />} />
            <Route path="/post-ad" element={<PostAd />} />
            <Route path="/ad/:id" element={<AdDetailPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;