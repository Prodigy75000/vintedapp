// Signup page — creates a new account with username, email, password
// On success, stores the token in a cookie (7-day expiry) and redirects to home

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Signup.css";

export default function Signup({ setIsConnected }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/user/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          newsletter: formData.newsletter,
        },
      );

      Cookies.set("userToken", response.data.token, { expires: 7 });
      setIsConnected(true);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <label className="signup-newsletter">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) =>
              setFormData({ ...formData, newsletter: e.target.checked })
            }
          />
          S'inscrire à notre newsletter
        </label>
        <p className="signup-disclaimer">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        {errorMessage && <p className="signup-error">{errorMessage}</p>}
        <button type="submit">S'inscrire</button>
        <p className="signup-link">
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </p>
      </form>
    </div>
  );
}
