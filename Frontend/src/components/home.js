import React, { useEffect } from "react";
import { Carousel } from 'react-bootstrap';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000, // Durée de l'animation en ms
      once: false,     // Animation qui se répète au scroll
    });
  }, []);

  return (
    <>
      <section className="container-fluid p-0">
        <Carousel interval={2000} className="mt-5">
          <Carousel.Item>
            <img
              src="R (1).jpeg"
              className="d-block w-100 animate-pulse animate-infinite"
              alt="Bouquet de Roses"
              style={{ maxHeight: '780px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h1>Bouquet de Roses</h1>
              <h6>Un classique intemporel pour chaque occasion.</h6>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="R (3).jpeg"
              className="d-block w-100 animate-pulse animate-infinite"
              alt="Bouquet Exotique"
              style={{ maxHeight: '720px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h1>Bouquet Exotique</h1>
              <h6>Des fleurs rares venues du monde entier.</h6>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="bouquet1.jpg"
              className="d-block w-100 animate-pulse animate-infinite"
              alt="Bouquet Personnalisé"
              style={{ maxHeight: '720px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h1>Bouquet Personnalisé</h1>
              <h6>Créez un bouquet unique selon vos envies.</h6>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-8" data-aos="fade-right">
            <div className="position-relative p-4 h-100 shadow-lg" style={{ backgroundColor: '#b2a5b2' }}>
              <div className="row align-items-center">
                <div className="col-6 shadow-lg">
                  <img src="bouquet3.jpg" alt="Lavender" className="img-fluid animate-pulse animate-infinite" />
                </div>
                <div className="col-6">
                  <h2 className="h1 mb-3">Wedding Collection</h2>
                  <p className="mb-3">
                    Choisi le bouquet de votre jour-j et personnalisé le comme vous le souhaitez.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 shadow-lg" data-aos="fade-up">
            <div className="bg-light p-4 h-100 animate-infinite">
              <img src="bouquet4.jpg" alt="Tulips" className="img-fluid mb-3" />
            </div>
          </div>

          <div className="col-md-4 shadow-lg" data-aos="fade-up">
            <div className="bg-light p-4 h-100  animate-infinite">
              <img src="F4.jpeg" alt="Rose tea" className="img-fluid" />
            </div>
          </div>

          <div className="col-md-8" data-aos="fade-left">
            <div className="position-relative bg-pink-light p-4 h-100 shadow-lg" style={{ backgroundColor: '#fde9fd' }}>
              <div className="row align-items-center">
                <div className="col-6">
                  <h2 className="h1 mb-3">La meilleure qualité de fleurs</h2>
                  <p className="mb-3">Ne regrettez jamais nos produits.</p>
                </div>
                <div className="col-6 shadow-lg">
                  <img src="R5.jpeg" alt="Women's day" className="img-fluid animate-pulse animate-infinite" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
