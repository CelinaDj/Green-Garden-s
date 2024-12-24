import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedBouquetsIds, toggleLike } from "../state/likes-slice";
import { addToCart } from "../state/cart-slice";
import { fetchBouquets } from "../state/bouquet-slice";
import {
  isAuthenticated,
  selectToken,
  whoIsAuthenticated,
} from "../state/auth-slice";

const Bouquets = () => {
  const dispatch = useDispatch();

  const { bouquets } = useSelector((state) => state.bouquets);
  const { likedBouquets } = useSelector((state) => state.likes);
  const authenticated = useSelector(isAuthenticated);
  const token = useSelector(selectToken);
  const { userId } = useSelector(whoIsAuthenticated);

  const [loadingId, setLoadingId] = useState();

  const [likesState, setLikesState] = useState({});

  useEffect(() => {
    dispatch(fetchBouquets(token));
    dispatch(fetchLikedBouquetsIds(userId));

    // Initialize local likes state with bouquet likes count
    const initialLikesState = {};
    bouquets.forEach((bouquet) => {
      initialLikesState[bouquet.id] = bouquet.likes;
    });
    setLikesState(initialLikesState);
  }, [bouquets, dispatch, token, userId]);

  const handleLike = (id) => {
    const userId = 1;
    dispatch(toggleLike({ bouquetId: id, userId, token }));
    const liked = likedBouquets.includes(id); // Check if the bouquet is already liked

    setLikesState((prevState) => ({
      ...prevState,
      [id]: liked ? prevState[id] - 1 : prevState[id] + 1, // Increment or decrement the likes count
    }));

    // Handle the Redux action
  };

  const handleAddToCart = (bouquet) => {
    setLoadingId(bouquet.id);
    dispatch(addToCart(bouquet));
    setTimeout(() => {
      setLoadingId(null);
    }, 1000);
  };

  return (
    <section className="container">
      <h1 className="text-center mb-4 animate__animated animate__zoomIn animate__delay-1s" style={{ marginTop: "100px" }}>
        Nos Meilleurs Collections 
      </h1>
      <div className="row g-4 ">
        {bouquets.map((bouquet) => {
          const isLiked = likedBouquets.includes(bouquet.id);
          return (
            <div className=" animate__animated animate__zoomIn animate__delay-1s col-sm-6 col-md-4 col-lg-3" key={bouquet.id}>
              <div className="card shadow-lg border-0">
                <div className="position-relative">
                  <img
                    src={bouquet.image}
                    className="card-img-top rounded-top"
                    alt="Bouquet"
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5
                      className="card-title text-truncate mb-0"
                      style={{ maxWidth: "200px" }}
                    >
                      {bouquet.name}
                    </h5>
                  
                  </div>

                  <p className="card-text text-muted">{bouquet.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <button
                    disabled={!authenticated}
                    onClick={() => handleLike(bouquet.id)}
                    className=" top-0 end-0 m-2 p-0 bg-transparent border-0 d-flex flex-column align-items-center"
                    style={{ zIndex: 1 }}
                  >
                    {isLiked && authenticated ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="gray" size={24} />
                    )}
                    <span style={{ fontSize: "16px", fontWeight: "500" }}>
                      {likesState[bouquet.id] || bouquet.likes}{" "}
                      {/* Display updated likes */}
                    </span>
                  </button>
                  {bouquet.price && (
                      <h6 className="d-inline-flex align-items-center rounded bg-danger bg-opacity-10 px-2 py-1 text-danger text-sm fw-medium border border-danger border-opacity-10 mb-0">
                        {bouquet.price} DA
                      </h6>
                    )}
                    </div>
                  <button
                    className="btn btn-dark w-100 mt-2"
                    style={{ backgroundColor: '#725c72' }}
                    onClick={() => handleAddToCart(bouquet)}
                    disabled={loadingId === bouquet.id || !authenticated}
                  >
                    {loadingId === bouquet.id ? (
                      <FaSpinner className="fa-spin" size={24} color="white" />
                    ) : (
                      "Ajouter au panier"
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Bouquets;
