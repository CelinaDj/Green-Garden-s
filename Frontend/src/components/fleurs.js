import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFleurs } from "../state/fleur-slice";
import {  FaSpinner } from "react-icons/fa";
import { selectToken } from "../state/auth-slice";
import { addToCart } from "../state/cart-slice";
import {
  isAuthenticated,

} from "../state/auth-slice";

const Fleurs = () => {
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState();
    const authenticated = useSelector(isAuthenticated);
  const { fleurs, loading, error } = useSelector((state) => state.fleurs);
  const token = useSelector(selectToken); 
   const handleAddToCart = (bouquet) => {
      setLoadingId(bouquet.id);
      dispatch(addToCart(bouquet));
      setTimeout(() => {
        setLoadingId(null);
      }, 1000);
    };
  useEffect(() => {
    dispatch(fetchFleurs(token));
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="container py-5">
      <h1
        className="text-center mb-4 animate__animated animate__zoomIn animate__delay-1s"
        style={{ marginTop: "50px" }}
      >
        Nos Meilleurs Fleurs
      </h1>
      <div className=" row g-4">
        {fleurs.map((fleur) => (
          <div className="col-12 col-md-6 col-lg-4 " key={fleur.id}>
            <div
              className=" animate__animated animate__zoomIn animate__delay-1s shadow-lg d-flex align-items-center border rounded shadow-sm  p-1 "
              style={{
                width: "100%",
                height: "200px",
                overflow: "hidden",
                transition: "transform 0.3s ease",
              }}
            >
              <div style={{ width: "40%", height: "100%" }}>
                <img
                  src={fleur.image}
                  alt={fleur.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "3px",
                  }}
                />
              </div>

              <div
                style={{
                  width: "60%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h2
                  className="mb-2 text-truncate"
                  style={{ fontSize: "1rem", whiteSpace: "nowrap" }}
                >
                  {fleur.name}
                </h2>
                <p
                  className="text-muted mb-1 text-truncate"
                  style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}
                >
                  {fleur.description}
                </p>
                {fleur.price && (
                  <p className="fw-bold" style={{ fontSize: "0.9rem" }}>
                    Prix: {fleur.price} da
                  </p>
                )}
                <button
                  className="btn btn-dark w-100 mt-2"
                  style={{ backgroundColor: "#725c72" }}
                  onClick={() => handleAddToCart(fleur)}
                  disabled={loadingId === fleur.id || !authenticated}
                >
                  {loadingId === fleur.id ? (
                    <FaSpinner className="fa-spin" size={24} color="white" />
                  ) : (
                    "Ajouter au panier"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Fleurs;
