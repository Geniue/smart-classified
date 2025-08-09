// src/components/common/Footer.js
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} SmartClassified. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;