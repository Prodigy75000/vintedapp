// Header — displays logo, search bar, auth buttons, and "Vends tes articles"
// Shows logout button when connected, signup/login links otherwise
// "Vends tes articles" redirects to /publish if logged in, /login if not
import "./Header.css";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isConnected, handleToken, title, setTitle }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>
        <div className="search-bar">
          <svg viewBox="0 0 24 24" className="search-icon">
            <path d="M10 2a8 8 0 105.3 14.7l4 4a1 1 0 001.4-1.4l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher des articles"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {isConnected ? (
          <button
            className="btn-auth"
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="btn-auth">
            <Link to="/signup">S'inscrire</Link>
            <span className="btn-auth-separator">|</span>
            <Link to="/login">Se connecter</Link>
          </div>
        )}
        <button
          className="btn-sell"
          onClick={() => navigate(isConnected ? "/publish" : "/login")}
        >
          Vends tes articles
        </button>
      </div>
    </header>
  );
};

export default Header;
