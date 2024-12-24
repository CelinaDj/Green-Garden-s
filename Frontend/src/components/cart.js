import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaShoppingCart } from "react-icons/fa";
import { handlePurchase, purchaseCart } from "../state/cart-slice";
import {
  isAuthenticated,
  selectToken,
  whoIsAuthenticated,
} from "../state/auth-slice";
import { removeFromCart } from "../state/cart-slice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart || []);
  const authenticated = useSelector(isAuthenticated);
  const token = useSelector(selectToken);
  const { userId } = useSelector(whoIsAuthenticated);
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  const handlePurchaseClick = () => {
    dispatch(handlePurchase({ userId, cart, token }));
  };
  if (!authenticated) {
    return (
      <section className="container">
        <div
          className="   animate__animated animate__zoomIn animate__delay-1s d-flex flex-column align-items-center justify-content-center  p-4 text-center "
          style={{ marginTop: "200px" }}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-circle  bg-opacity-20"

            style={{ width: "80px", height: "80px", backgroundColor: '#b2a5b2' }}
          >
            <FaShoppingCart size={40}   style={{Color: '#725c72'}}/>
          </div>

          <h4 className="  animate__animated animate__zoomIn animate__delay-1s mt-4 fw-semibold">
            vous devez se connecter pour ajouter un bouquet a votre panier 
          </h4>
        </div>
      </section>
    );
  }
  return (
    <section className=" container">
      <h1 className="animate__animated animate__zoomIn animate__delay-1s text-center mb-4" style={{ marginTop: "100px" }}>
        Votre panier
      </h1>
      <div className=" row justify-content-center g-2">
        {cart.length > 0 ? (
          cart.map((bouquet) => (
            <div
              className="animate__animated animate__zoomIn animate__delay-1s shadow-lg col-12 col-md-8 mb-4 border rounded  rounded-lg mx-auto"
              key={bouquet.id}
            >
              <div className="rounded  d-flex flex-column flex-md-row align-items-center">
                <div className="  rounded me-md-3 mb-3 mb-md-0">
                  <img
                    src={bouquet.image}
                    className="rounded"
                    alt={bouquet.name}
                    style={{
                      width: "110px",
                      height: "110px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h5 className="card-title text-truncate mb-0">
                    {bouquet.name}
                  </h5>
                  <p className="card-text text-muted">{bouquet.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="d-inline-flex align-items-center rounded bg-danger bg-opacity-10 px-2 py-1 text-danger text-sm fw-medium border border-danger border-opacity-10 mb-0">
                      {bouquet.price} DA
                    </h6>
                    <button
                      className="text-danger bg-transparent border-0 hover:text-red-700"
                      onClick={() => handleRemove(bouquet.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="d-flex flex-column align-items-center justify-content-center p-4 text-center"
            style={{
              minHeight: "400px",
              borderRadius: "0.5rem",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle  bg-opacity-10"
              style={{ width: "80px", height: "80px", backgroundColor: '#b2a5b2' }}
            >
              <FaShoppingCart size={40} style={{Color: '#725c72'}} />
            </div>

            <h2 className="mt-4 fw-semibold">votre carte est vide </h2>
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-dark mt-4 d-flex align-items-center gap-2"
            onClick={handlePurchaseClick}
          >
            <FaShoppingCart />
            Acheter
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
