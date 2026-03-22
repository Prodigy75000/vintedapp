import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login.css";

const Login = ({ setIsConnected }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main>
      <div className="login-container">
        <h2>Se connecter</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
             if (!email || !password) {
    setErrorMessage("Veuillez remplir tous les champs");
    return;
  }
            try {
              const response = await axios.post(
                "http://localhost:3000/user/login",
                {
                  email: email,
                  password: password,
                },
              );
              console.log(response.data);
              if (response.data.token) {
                Cookies.set("userToken", response.data.token);
                setIsConnected(true);
                navigate("/");
              }
            } catch (error) {
              if (error.response) {
                setErrorMessage(error.response.data.message);
              } else {
                console.log(error);
              }
            }
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />

          <button>Se connecter</button>
        </form>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <p className="login-link">
          <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
