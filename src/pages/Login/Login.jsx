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
      <div className="container">
        <h1>Se connecter</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
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
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Login;
