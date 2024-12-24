import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isAuthenticated,
  loginUser,
  logout,
  whoIsAuthenticated,
} from "../state/auth-slice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(isAuthenticated);
  const { fullname } = useSelector(whoIsAuthenticated);

  const [formData, setFormData] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div>
      {authenticated ? (
        <div>
          <h3>Bienvenue, {fullname}!</h3>
          <button style={{backgroundColor:'#725c72'}} onClick={() => dispatch(logout())}>Déconnexion</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={formData.login}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit"   style={{ backgroundColor: '#725c72' }} >Connexion</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
