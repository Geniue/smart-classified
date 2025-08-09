// src/components/common/Header.js
import { Link } from 'react-router-dom';
import { FaAd, FaUser, FaPlus } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <FaAd /> SmartClassified
        </Link>
        <nav>
          <Link to="/post-ad" className="nav-link">
            <FaPlus /> Post Ad
          </Link>
          <Link to="/dashboard" className="nav-link">
            <FaUser /> Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;