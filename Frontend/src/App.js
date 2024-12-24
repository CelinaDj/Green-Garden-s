import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Bouquets from "./components/bouquet";
import Fleurs from "./components/fleurs";
import Compte from "./components/mon-compte";
import Home from "./components/home";
import 'animate.css';
import Cart from "./components/cart";
import Wishlist from "./components/whishlist";
import { NavbarComponent } from "./components/navbar";

function App() {
  return (
    <Router>
      {/* <BouquetFetcher /> */}
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Bouquets" element={<Bouquets />} />

        {/* <Route path="/Home" element={<Home />} /> */}
        <Route path="/Fleurs" element={<Fleurs />} />
        <Route path="/whishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Compte" element={<Compte />} />
      </Routes>
    </Router>
  );
}

export default App;
