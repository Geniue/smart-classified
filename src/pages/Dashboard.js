// src/pages/Dashboard.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import MetricCard from '../components/dashboard/MetricCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import './css/Dashboard.css';

// Premium mock data with additional metrics
const fetchDashboardData = () => ({
  metrics: {
    totalViews: { value: 1245, trend: 'up', change: 12 },
    ctr: { value: 8.2, trend: 'up', change: 2.1 },
    inquiries: { value: 42, trend: 'up', change: 5 },
    saves: { value: 87, trend: 'up', change: 14 },
    conversion: { value: 3.8, trend: 'down', change: 0.4 }
  },
  performanceData: [
    { date: 'Jan', views: 120, clicks: 10, conversions: 4 },
    { date: 'Feb', views: 240, clicks: 18, conversions: 7 },
    { date: 'Mar', views: 380, clicks: 32, conversions: 12 },
    { date: 'Apr', views: 505, clicks: 42, conversions: 19 },
    { date: 'May', views: 680, clicks: 58, conversions: 26 }
  ],
  activeAds: [
    { 
      id: 1, 
      title: 'iPhone 13 Pro', 
      views: 320, 
      inquiries: 12,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1695822822491-d92cee704368?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 2, 
      title: 'Professional Camera Kit', 
      views: 180, 
      inquiries: 5,
      status: 'trending',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ]
});

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setData(fetchDashboardData());
      setLoading(false);
    };
    loadData();
  }, []);

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
        Preparing your dashboard...
      </motion.p>
    </motion.div>
  );

  return (
    <div className="dashboard-container">
      <motion.div 
        className="dashboard-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.header 
          className="dashboard-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>
            Advertiser <span className="highlight">Dashboard</span>
          </h1>
          
          <div className="dashboard-tabs">
            {['overview', 'performance', 'ads'].map(tab => (
              <motion.button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div 
                    className="underline"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="tab-content"
            >
              <div className="metrics-grid">
                {Object.entries(data.metrics).map(([key, metric]) => (
                  <MetricCard 
                    key={key}
                    title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    value={metric.value}
                    trend={metric.trend}
                    change={metric.change}
                  />
                ))}
              </div>

              <motion.div 
                className="quick-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2>Performance Snapshot</h2>
                <PerformanceChart data={data.performanceData} condensed />
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="tab-content"
            >
              <div className="full-width-chart">
                <h2>Detailed Performance Analytics</h2>
                <PerformanceChart data={data.performanceData} detailed />
              </div>
            </motion.div>
          )}

          {activeTab === 'ads' && (
            <motion.div
              key="ads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="tab-content"
            >
              <h2>Your Active Campaigns</h2>
              <div className="ads-grid">
                {data.activeAds.map((ad, index) => (
                  <motion.div
                    key={ad.id}
                    className={`ad-card ${ad.status}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onMouseEnter={() => setHoveredCard(ad.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="card-badge">{ad.status}</div>
                    <div className="ad-image">
                      <img src={ad.image} alt={ad.title} />
                      {hoveredCard === ad.id && (
                        <motion.div 
                          className="image-overlay"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </div>
                    <div className="ad-content">
                      <h3>{ad.title}</h3>
                      <div className="ad-metrics">
                        <div className="metric">
                          <span className="metric-value">{ad.views}</span>
                          <span className="metric-label">Views</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">{ad.inquiries}</span>
                          <span className="metric-label">Inquiries</span>
                        </div>
                      </div>
                      <div className="ad-actions">
                        <motion.button
                          className="view-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Analytics
                        </motion.button>
                        <motion.button
                          className="edit-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Edit Campaign
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;