import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart, FaHeart , FaHome} from "react-icons/fa";
import {
  logout,
  whoIsAuthenticated,
  isAuthenticated,
} from "../state/auth-slice";
import '../App.css';


export function NavbarComponent() {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    window.location.href = "/";
  };
  const { fullname } = useSelector(whoIsAuthenticated);
  const authenticated = useSelector(isAuthenticated);

  const compteLabel = fullname || "Se Connecter";
  const cart = useSelector((state) => state.cart.cart || []);
  const cartItemCount = cart.length;

  const menuItems = [
    { to: "/",icon:<FaHome size={25}/> , label: "Home" },
    { to: "/Bouquets", label: "Bouquets" },
    { to: "/fleurs", label: "Fleurs" },
    { to: "/whishlist",  label:<FaHeart size={25} />} ,
    { 
      to: "/cart", 
      label: <FaShoppingCart size={25} /> // Icône pour Panier 
    },
  
  ];

  return (
    <nav className="menu-item navbar navbar-expand-lg navbar-light  fixed-top shadow py-3" style={{ backgroundColor: '#725c72' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="logo.png"
            alt="flower"
            width="35"
            className="d-inline-block align-top me-2"
          />
          <span className="h3 font-weight-bold m-0" style={{ color: '#ffffff' }}>Green Garden's</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {menuItems.map((item) => (
            <li className="nav-item" key={item.to}>
            {item.label.type && item.label.type.name === "FaShoppingCart" ? ( // Vérifie si c'est l'icône panier
              <div className="position-relative">
                <Link
                  to={item.to}
                  className={`nav-link ${
                    location.pathname === item.to ? "text-danger fw-bold" : ""
                  }`}
                >
                  {item.label} {/* Affiche l'icône panier */}
                </Link>
          
                {cartItemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: "10px",
                      marginLeft: "-10px",
                      marginTop: "1px",
                    }}
                  >
                    {cartItemCount} {/* Nombre d'articles dans le panier */}
                  </span>
                )}
              </div>
            ) : (
              <Link
                to={item.to}
                className={`nav-link ${
                  location.pathname === item.to ? "text-danger fw-bold" : ""
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
          
            ))}
            
            <div className="dropdown">
              <Link
                to={authenticated ? "#" : "/compte"}
                className={`nav-link ${
                  authenticated ? "dropdown-toggle" : ""
                } ${
                  location.pathname === "/compte" ? "text-danger fw-bold" : ""
                }`}
                id="userDropdown"
                role="button"
                data-bs-toggle={authenticated ? "dropdown" : undefined}
                aria-expanded="false"
              >
                {compteLabel}
                <FaUserCircle size={20} className="mx-2" />
              </Link>

              {authenticated && (
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
