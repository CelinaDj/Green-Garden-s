// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { FaShoppingCart, FaHeart , FaHome} from "react-icons/fa";
// import {
//   logout,
//   whoIsAuthenticated,
//   isAuthenticated,
// } from "../state/auth-slice";
// import '../App.css';

// export function NavbarComponent() {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());

//     window.location.href = "/";
//   };
//   const { fullname } = useSelector(whoIsAuthenticated);
//   const authenticated = useSelector(isAuthenticated);

//   const compteLabel = fullname || "Se Connecter";
//   const cart = useSelector((state) => state.cart.cart || []);
//   const cartItemCount = cart.length;

//   const menuItems = [
//     { to: "/",icon:<FaHome size={25}/> , label: "Home" },
//     { to: "/Bouquets", label: "Bouquets" },
//     { to: "/fleurs", label: "Fleurs" },
//     { to: "/whishlist",  label:<FaHeart size={25} />} ,
//     {
//       to: "/cart",
//       label: <FaShoppingCart size={25} /> // Icône pour Panier
//     },

//   ];

//   return (
//     <nav className="menu-item navbar navbar-expand-lg navbar-light  fixed-top shadow py-3" style={{ backgroundColor: '#725c72' }}>
//       <div className="container">
//         <Link className="navbar-brand d-flex align-items-center" to="/">
//           <img
//             src="logo.png"
//             alt="flower"
//             width="35"
//             className="d-inline-block align-top me-2"
//           />
//           <span className="h3 font-weight-bold m-0" style={{ color: '#ffffff' }}>Green Garden's</span>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             {menuItems.map((item) => (
//             <li className="nav-item" key={item.to}>
//             {item.label.type && item.label.type.name === "FaShoppingCart" ? ( // Vérifie si c'est l'icône panier
//               <div className="position-relative">
//                 <Link
//                   to={item.to}
//                   className={`nav-link ${
//                     location.pathname === item.to ? "text-danger fw-bold" : ""
//                   }`}
//                 >
//                   {item.label} {/* Affiche l'icône panier */}
//                 </Link>

//                 {cartItemCount > 0 && authenticated && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{
//                       fontSize: "10px",
//                       marginLeft: "-10px",
//                       marginTop: "1px",
//                     }}
//                   >
//                     {cartItemCount} {/* Nombre d'articles dans le panier */}
//                   </span>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to={item.to}
//                 className={`nav-link ${
//                   location.pathname === item.to ? "text-danger fw-bold" : ""
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             )}
//           </li>

//             ))}

//             <div className="dropdown">
//               <Link
//                 to={authenticated ? "#" : "/compte"}
//                 className={`nav-link ${
//                   authenticated ? "dropdown-toggle" : ""
//                 } ${
//                   location.pathname === "/compte" ? "text-danger fw-bold" : ""
//                 }`}
//                 id="userDropdown"
//                 role="button"
//                 data-bs-toggle={authenticated ? "dropdown" : undefined}
//                 aria-expanded="false"
//               >
//                 {compteLabel}
//                 <FaUserCircle size={20} className="mx-2" />
//               </Link>

//               {authenticated && (
//                 <ul className="dropdown-menu" aria-labelledby="userDropdown">
//                   <li>
//                     <button className="dropdown-item" onClick={handleLogout}>
//                       Déconnexion
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, logout, isAuthenticated, whoIsAuthenticated } from "../state/auth-slice";
// import { FaUserCircle } from "react-icons/fa";
// import { FaShoppingCart, FaHeart, FaHome } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import "../App.css";

// export function NavbarComponent() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false); // Gérer l'état du modal
//   const [formData, setFormData] = useState({ login: "", password: "" });
//   const { fullname } = useSelector(whoIsAuthenticated);
//   const authenticated = useSelector(isAuthenticated);
//   const cart = useSelector((state) => state.cart.cart || []);
//   const cartItemCount = cart.length;
//   const error = useSelector((state) => state.auth.error);

//   // Gérer le changement des champs de formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Gérer la soumission du formulaire de connexion
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//     if (!error) {
//       setShowModal(false); // Fermer le modal si la connexion réussie
//     }
//   };

//   // Gérer la déconnexion
//   const handleLogout = () => {
//     dispatch(logout());
//     window.location.href = "/";
//   };

//   const compteLabel = fullname || "Se Connecter";

//   const menuItems = [
//     { to: "/", icon: <FaHome size={25} />, label: "Home" },
//     { to: "/Bouquets", label: "Bouquets" },
//     { to: "/fleurs", label: "Fleurs" },
//     { to: "/whishlist", label: <FaHeart size={25} /> },
//     {
//       to: "/cart",
//       label: <FaShoppingCart size={25} />, // Icône pour Panier
//     },
//   ];

//   return (
//     <>
//       {/* Modal pour la connexion */}
//       <div
//         className={`modal fade ${showModal ? "show" : ""}`}
//         id="loginModal"
//         tabIndex="-1"
//         aria-labelledby="loginModalLabel"
//         aria-hidden={!showModal}
//         style={{ display: showModal ? "block" : "none" }}
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="loginModalLabel">
//                 {authenticated ? `Bienvenue, ${fullname}!` : "Connexion"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => setShowModal(false)}
//               ></button>
//             </div>

//             {authenticated ? (
//               <div className="modal-body">
//                 <button
//                   className="btn btn-danger"
//                   onClick={handleLogout}
//                   style={{ backgroundColor: '#725c72' }}
//                 >
//                   Déconnexion
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label htmlFor="login" className="form-label">
//                       Login
//                     </label>
//                     <input
//                       type="text"
//                       name="login"
//                       className="form-control"
//                       placeholder="Login"
//                       value={formData.login}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="password" className="form-label">
//                       Mot de passe
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       className="form-control"
//                       placeholder="Mot de passe"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   {error && <div className="alert alert-danger">{error}</div>}
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Fermer
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     style={{ backgroundColor: "#725c72" }}
//                   >
//                     Se connecter
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Navbar */}
//       <nav className="menu-item navbar navbar-expand-lg navbar-light fixed-top shadow py-3" style={{ backgroundColor: '#725c72' }}>
//         <div className="container">
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//             <img
//               src="logo.png"
//               alt="flower"
//               width="35"
//               className="d-inline-block align-top me-2"
//             />
//             <span className="h3 font-weight-bold m-0" style={{ color: '#ffffff' }}>Green Garden's</span>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               {menuItems.map((item) => (
//                 <li className="nav-item" key={item.to}>
//                   <Link
//                     to={item.to}
//                     className={`nav-link ${location.pathname === item.to ? "text-danger fw-bold" : ""}`}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//               <div className="dropdown">
//                 <Link
//                   to="#"
//                   className={`nav-link ${authenticated ? "dropdown-toggle" : ""}`}
//                   id="userDropdown"
//                   role="button"
//                   data-bs-toggle={authenticated ? "dropdown" : undefined}
//                   aria-expanded="false"
//                   onClick={() => !authenticated && setShowModal(true)} // Ouvrir le modal si non connecté
//                 >
//                   {compteLabel}
//                   <FaUserCircle size={30} className="mx-2" />
//                 </Link>

//                 {authenticated && (
//                   <ul className="dropdown-menu" aria-labelledby="userDropdown">
//                     <li>
//                       <button className="dropdown-item" onClick={handleLogout}>
//                         Déconnexion
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, logout, isAuthenticated, whoIsAuthenticated } from "../state/auth-slice";
// import { FaUserCircle } from "react-icons/fa";
// import { FaShoppingCart, FaHeart, FaHome } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import "../App.css";

// export function NavbarComponent() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false); // Gérer l'état du modal
//   const [formData, setFormData] = useState({ login: "", password: "" });
//   const { fullname } = useSelector(whoIsAuthenticated);
//   const authenticated = useSelector(isAuthenticated);
//   const cart = useSelector((state) => state.cart.cart || []); // Récupérer les éléments du panier
//   const cartItemCount = cart.length;
//   const error = useSelector((state) => state.auth.error);
//   const [flowerIndex, setFlowerIndex] = useState(0); // Indice de la fleur à afficher
//   const flowers = [
//     "/images/logo.png",
//     "/images/logo.png",
//     "/images/logo.png", // Remplacez avec le chemin de vos images de fleurs
//     "/images/logo.png"
//   ];

//   // Gérer le changement des champs de formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Gérer la soumission du formulaire de connexion
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//     if (!error) {
//       setShowModal(false); // Fermer le modal si la connexion réussie
//     }
//   };

//   // Gérer la déconnexion
//   const handleLogout = () => {
//     dispatch(logout());
//     window.location.href = "/";
//   };

//   const compteLabel = fullname || "Se Connecter";

//   const menuItems = [
//     { to: "/", icon: <FaHome size={25} />, label: "Home" },
//     { to: "/Bouquets", label: "Bouquets" },
//     { to: "/fleurs", label: "Fleurs" },
//     { to: "/whishlist", label: <FaHeart size={25} /> },
//     {
//       to: "/cart",
//       label: (
//         <>
//           <FaShoppingCart size={25} /> {/* Icône pour Panier */}
//           {cartItemCount > 0 && authenticated && (
//             <span className="badge bg-danger rounded-pill position-absolute" style={{ fontSize: "12px", top: "-5px", right: "-5px" }}>
//               {cartItemCount}
//             </span>
//           )}
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//     {/* Appliquer un flou à l'arrière-plan quand le modal est ouvert */}
//     <div className={showModal ? "backdrop blur" : ""}></div>

//     {/* Modal pour la connexion */}
//     <div
//       className={`modal fade ${showModal ? "show" : ""}`}
//       id="loginModal"
//       tabIndex="-1"
//       aria-labelledby="loginModalLabel"
//       aria-hidden={!showModal}
//       style={{ display: showModal ? "block" : "none" }}
//     >
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="loginModalLabel">
//               {authenticated ? `Bienvenue, ${fullname}!` : "Connexion"}
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//               onClick={() => setShowModal(false)}
//             ></button>
//           </div>

//           {authenticated ? (
//             <div className="modal-body">
//               <button
//                 className="btn btn-danger"
//                 onClick={handleLogout}
//                 style={{ backgroundColor: "#725c72" }}
//               >
//                 Déconnexion
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="login" className="form-label">
//                     Nom d'utilisateur
//                   </label>
//                   <input
//                     type="text"
//                     name="Nom d'utilisateur"
//                     className="form-control"
//                     placeholder="UserName"
//                     value={formData.login}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     className="form-control"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 {error && <div className="alert alert-danger">{error}</div>}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Fermer
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   style={{ backgroundColor: "#725c72" }}
//                 >
//                   Se connecter
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>

//       {/* Navbar */}
//       <nav className="menu-item navbar navbar-expand-lg navbar-light fixed-top shadow py-3" style={{ backgroundColor: '#725c72' }}>
//         <div className="container">
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//             <img
//               src="logo.png"
//               alt="flower"
//               width="35"
//               className="d-inline-block align-top me-2"
//             />
//             <span className="h3 font-weight-bold m-0" style={{ color: '#ffffff' }}>Green Garden's</span>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               {menuItems.map((item) => (
//                 <li className="nav-item" key={item.to}>
//                   <Link
//                     to={item.to}
//                     className={`nav-link ${location.pathname === item.to ? "text-danger fw-bold" : ""}`}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//               <div className="dropdown">
//                 <button
//                   className={`nav-link ${authenticated ? "dropdown-toggle" : ""}`}
//                   id="userDropdown"
//                   role="button"
//                   data-bs-toggle={authenticated ? "dropdown" : undefined}
//                   aria-expanded="false"
//                   onClick={() => !authenticated && setShowModal(true)} // Ouvrir le modal si non connecté
//                 >
//                   {compteLabel}
//                   <FaUserCircle size={30} className="mx-2" />
//                 </button>

//                 {authenticated && (
//                   <ul className="dropdown-menu" aria-labelledby="userDropdown">
//                     <li>
//                       <button className="dropdown-item" onClick={handleLogout}>
//                         Déconnexion
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, logout, isAuthenticated, whoIsAuthenticated } from "../state/auth-slice";
// import { FaUserCircle } from "react-icons/fa";
// import { FaShoppingCart, FaHeart, FaHome } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import "../App.css";

// export function NavbarComponent() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false); // Gérer l'état du modal
//   const [formData, setFormData] = useState({ login: "", password: "" });
//   const { fullname } = useSelector(whoIsAuthenticated);
//   const authenticated = useSelector(isAuthenticated);
//   const cart = useSelector((state) => state.cart.cart || []); // Récupérer les éléments du panier
//   const cartItemCount = cart.length;
//   const error = useSelector((state) => state.auth.error);
//   const [flowerIndex, setFlowerIndex] = useState(0); // Indice de la fleur à afficher
//   const flowers = [
//     "/logo.png", // Remplacez par l'image de la fleur 1
//   ];

//   // Changer l'image de la fleur toutes les 2 secondes
//   useEffect(() => {
//     if (showModal) {
//       const flowerInterval = setInterval(() => {
//         setFlowerIndex((prevIndex) => (prevIndex + 1) % flowers.length);
//       }, 2000); // 2000ms pour changer l'image toutes les 2 secondes

//       return () => clearInterval(flowerInterval); // Nettoyer l'intervalle quand le modal se ferme
//     }
//   }, [showModal]);

//   // Gérer le changement des champs de formulaire
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Gérer la soumission du formulaire de connexion
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//     if (!error) {
//       setShowModal(false); // Fermer le modal si la connexion réussie
//     }
//   };

//   // Gérer la déconnexion
//   const handleLogout = () => {
//     dispatch(logout());
//     window.location.href = "/";
//   };

//   const compteLabel = fullname || "Se Connecter";

//   const menuItems = [
//     { to: "/", icon: <FaHome size={25} />, label: "Home" },
//     { to: "/Bouquets", label: "Bouquets" },
//     { to: "/fleurs", label: "Fleurs" },
//     { to: "/whishlist", label: <FaHeart size={25} /> },
//     {
//       to: "/cart",
//       label: (
//         <>
//           <FaShoppingCart size={25} /> {/* Icône pour Panier */}
//           {cartItemCount > 0 && authenticated && (
//             <span className="badge bg-danger rounded-pill position-absolute" style={{ fontSize: "12px", top: "-5px", right: "-5px" }}>
//               {cartItemCount}
//             </span>
//           )}
//         </>
//       ),
//     },
//   ];

//   return (
//     <>

//       {/* Appliquer un flou à l'arrière-plan quand le modal est ouvert */}
//       <div className={showModal ? "backdrop blur" : ""}></div>

// {/* Modal pour la connexion */}

// <div
//   className={`modal fade ${showModal ? "show" : ""}`}
//   id="loginModal"
//   tabIndex="-1"
//   aria-labelledby="loginModalLabel"
//   aria-hidden={!showModal}
//   style={{ display: showModal ? "block" : "none" }}
// >
//   {/* Afficher l'image de la fleur dans le coin du modal */}
//   <div className="flower-image-container">
//     <img
//       src={flowers[flowerIndex]}
//       alt="Fleur"
//       className="flower-image"
//     />
//   </div>

//   <div className="modal-dialog modal-dialog-centered">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="loginModalLabel" style={{color:'#725c72'}}>
//           {authenticated ? `Bienvenue, ${fullname}!` : "Bienvenu Chez Green Garden's"}
//         </h5>

//         <button
//           type="button"
//           className="btn-close"
//           data-bs-dismiss="modal"
//           aria-label="Close"
//           onClick={() => setShowModal(false)}
//         ></button>

//       </div>

//       <div className="modal-body">
//         {authenticated ? (
//           <button
//             className="btn btn-danger"
//             onClick={handleLogout}
//             style={{ backgroundColor: "#725c72" }}
//           >
//             Déconnexion
//           </button>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="login" className="form-label">
//                 Nom d'utilisateur
//               </label>
//               <input
//                 type="text"
//                 name="login"
//                 className="form-control"
//                 placeholder="UserName"
//                 value={formData.login}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Mot de passe
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             {error && <div className="alert alert-danger">{error}</div>}
//           </form>
//         )}
//       </div>
//       <div className="modal-footer">

//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={() => setShowModal(false)}
//         >
//           Fermer
//         </button>
//         {!authenticated && (
//           <button
//             type="submit"
//             className="btn btn-primary"
//             style={{ backgroundColor: "#725c72" }}
//           >
//             Se connecter
//           </button>

//         )}

//       </div>
//     </div>
//   </div>
// </div>

//       {/* Navbar */}
//       <nav className="menu-item navbar navbar-expand-lg navbar-light fixed-top shadow py-3" style={{ backgroundColor: '#725c72' }}>
//         <div className="container">
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//             <img
//               src="logo.png"
//               alt="flower"
//               width="35"
//               className="d-inline-block align-top me-2"
//             />
//             <span className="h3 font-weight-bold m-0" style={{ color: '#ffffff' }}>Green Garden's</span>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               {menuItems.map((item) => (
//                 <li className="nav-item" key={item.to}>
//                   <Link
//                     to={item.to}
//                     className={`nav-link ${location.pathname === item.to ? "text-danger fw-bold" : ""}`}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//               <div className="dropdown">
//                 <button
//                   className={`nav-link ${authenticated ? "dropdown-toggle" : ""}`}
//                   id="userDropdown"
//                   role="button"
//                   data-bs-toggle={authenticated ? "dropdown" : undefined}
//                   aria-expanded="false"
//                   onClick={() => !authenticated && setShowModal(true)} // Ouvrir le modal si non connecté
//                 >
//                   {compteLabel}
//                   <FaUserCircle size={30} className="mx-2" />
//                 </button>

//                 {authenticated && (
//                   <ul className="dropdown-menu" aria-labelledby="userDropdown">
//                     <li>
//                       <button className="dropdown-item" onClick={handleLogout}>
//                         Déconnexion
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logout,
  isAuthenticated,
  whoIsAuthenticated,
} from "../state/auth-slice";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart, FaHeart, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

export function NavbarComponent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // Gérer l'état du modal
  const [formData, setFormData] = useState({ login: "", password: "" });
  const { fullname } = useSelector(whoIsAuthenticated);
  const authenticated = useSelector(isAuthenticated);
  const cart = useSelector((state) => state.cart.cart || []); // Récupérer les éléments du panier
  const cartItemCount = cart.length;
  const error = useSelector((state) => state.auth.error);

  // Générer des fleurs avec des tailles et positions aléatoires
  const generateFlowers = (count) => {
    const flowers = [];
    for (let i = 0; i < count; i++) {
      flowers.push({
        id: i,
        src: "/flr.png", // Chemin de l'image de la fleur
        top: `${Math.random() * 100}%`, // Position verticale aléatoire
        left: `${Math.random() * 100}%`, // Position horizontale aléatoire
        size: `${Math.random() * 50 + 20}px`, // Taille aléatoire entre 20px et 70px
      });
    }
    return flowers;
  };

  const [backgroundFlowers, setBackgroundFlowers] = useState(
    generateFlowers(15)
  ); // 15 fleurs

  // Gérer le changement des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire de connexion
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    if (!error) {
      setShowModal(false); // Fermer le modal si la connexion réussie
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const compteLabel = fullname || "Se Connecter";

  const menuItems = [
    { to: "/", icon: <FaHome size={25} />, label: "Home" },
    { to: "/Bouquets", label: "Bouquets" },
    { to: "/fleurs", label: "Fleurs" },
    { to: "/whishlist", label: <FaHeart size={25} /> },
    {
      to: "/cart",
      label: (
        <>
          <FaShoppingCart size={25} /> {/* Icône pour Panier */}
          {cartItemCount > 0 && authenticated && (
            <span
              className="badge bg-danger rounded-pill position-absolute"
              style={{ fontSize: "12px", top: "-5px", right: "-5px" }}
            >
              {cartItemCount}
            </span>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {/* Appliquer un flou à l'arrière-plan quand le modal est ouvert */}
      <div className={showModal ? "backdrop blur" : ""}></div>

      {/* Modal pour la connexion */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        {/* Conteneur pour les fleurs dans l'arrière-plan */}
        <div className="modal-background">
          {backgroundFlowers.map((flower) => (
            <img
              key={flower.id}
              src={flower.src}
              alt="Fleur"
              className="background-flower"
              style={{
                top: flower.top,
                left: flower.left,
                width: flower.size,
                height: flower.size,
              }}
            />
          ))}
        </div>

        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="loginModalLabel"
                style={{ color: "#725c72" }}
              >
                {authenticated
                  ? `Bienvenue, ${fullname}!`
                  : "Bienvenue Chez Green Garden's"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {authenticated ? (
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                  style={{ backgroundColor: "#725c72" }}
                >
                  Déconnexion
                </button>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      name="login"
                      className="form-control"
                      placeholder="UserName"
                      value={formData.login}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                
                  {error && <div className="alert alert-danger">{error}</div>}
                
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#725c72" }}
                  >
                    Se connecter
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className="menu-item navbar navbar-expand-lg navbar-light fixed-top shadow py-3"
        style={{ backgroundColor: "#725c72" }}
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="logo.png"
              alt="flower"
              width="35"
              className="d-inline-block align-top me-2"
            />
            <span
              className="h3 font-weight-bold m-0"
              style={{ color: "#ffffff" }}
            >
              Green Garden's
            </span>
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
                  <Link
                    to={item.to}
                    className={`nav-link ${
                      location.pathname === item.to ? "text-danger fw-bold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <div className="dropdown">
                <button
                  className={`nav-link ${
                    authenticated ? "dropdown-toggle" : ""
                  }`}
                  id="userDropdown"
                  role="button"
                  data-bs-toggle={authenticated ? "dropdown" : undefined}
                  aria-expanded="false"
                  onClick={() => !authenticated && setShowModal(true)} // Ouvrir le modal si non connecté
                >
                  {compteLabel}
                  <FaUserCircle size={30} className="mx-2" />
                </button>

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
    </>
  );
}
