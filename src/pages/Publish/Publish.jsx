// Publish page — form to create a new offer (protected, requires login)
// Sends product data + optional image as FormData with auth token
// Redirects to the new offer page on success

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Publish.css";

const Publish = ({ isConnected }) => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [etat, setEtat] = useState("");
  const [couleur, setCouleur] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isConnected) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!productName || !productDescription || !productPrice || !marque || !taille || !etat || !couleur || !emplacement) {
      setErrorMessage("Tous les champs sont obligatoires");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_description", productDescription);
      formData.append("product_price", productPrice);
      formData.append(
        "product_details",
        JSON.stringify([
          { MARQUE: marque },
          { TAILLE: taille },
          { ÉTAT: etat },
          { COULEUR: couleur },
          { EMPLACEMENT: emplacement },
        ])
      );

      if (productImage) {
        formData.append("product_image", productImage);
      }

      const token = Cookies.get("userToken");

      const response = await axios.post(
        "http://localhost:3000/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navigate("/offers/" + response.data._id);
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="publish-card">
            <div className="publish-file-zone">
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={(e) => setProductImage(e.target.files[0])}
              />
              <label htmlFor="file-input" className="publish-file-btn">
                + Ajoute des photos
              </label>
              {productImage && <p>{productImage.name}</p>}
            </div>
          </div>

          <div className="publish-card">
            <div className="publish-row">
              <label>Titre</label>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="publish-row">
              <label>Décris ton article</label>
              <textarea
                placeholder="ex: porté quelques fois, taille correctement"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="publish-card">
            <div className="publish-row">
              <label>Marque</label>
              <input
                type="text"
                placeholder="ex: Nike"
                value={marque}
                onChange={(e) => setMarque(e.target.value)}
              />
            </div>
            <div className="publish-row">
              <label>Taille</label>
              <input
                type="text"
                placeholder="ex: 44"
                value={taille}
                onChange={(e) => setTaille(e.target.value)}
              />
            </div>
            <div className="publish-row">
              <label>État</label>
              <input
                type="text"
                placeholder="ex: Neuf"
                value={etat}
                onChange={(e) => setEtat(e.target.value)}
              />
            </div>
            <div className="publish-row">
              <label>Couleur</label>
              <input
                type="text"
                placeholder="ex: Blue"
                value={couleur}
                onChange={(e) => setCouleur(e.target.value)}
              />
            </div>
            <div className="publish-row">
              <label>Emplacement</label>
              <input
                type="text"
                placeholder="ex: Paris"
                value={emplacement}
                onChange={(e) => setEmplacement(e.target.value)}
              />
            </div>
          </div>

          <div className="publish-card">
            <div className="publish-row">
              <label>Prix</label>
              <input
                type="number"
                placeholder="0,00 €"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && <p className="publish-error">{errorMessage}</p>}

          <div className="publish-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Publish;
