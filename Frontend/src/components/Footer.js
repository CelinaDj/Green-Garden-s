import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer shadow-lg bg-dark text-light py-2 mt-5 px-0 m-0 w-100 position-relative">
      <div className="container">
        <div className="row">
          
          <div className="col-md-4 mb-3">
            <h5>À propos</h5>
            <p>
              Nous proposons les plus beaux bouquets de fleurs adaptés à chaque
              occasion. La satisfaction de nos clients est notre priorité !
            </p>
          </div>

          
          <div className="col-md-4 mb-3">
            <h5>Liens rapides</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/bouquets" className="text-light text-decoration-none">
                  Bouquets
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Suivez-nous</h5>
            <div>
              <a
                href="https://www.facebook.com"
                className="text-light me-3"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com"
                className="text-light me-3"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.twitter.com"
                className="text-light"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        
        <div className="text-center mt-3">
          <p className="mb-0">
            © {new Date().getFullYear()} Green Garden's. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
