import "./Offer.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(useParams()); // { id : "69b178197659fbfd4f9ebe26" }
  // destructuring direct :
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id,
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="offer">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            {data.product_image?.secure_url && (
              <img
                src={data.product_image.secure_url}
                alt="grand aperçu de l'offre"
              />
            )}
            <aside>
              <p>{data.product_price} €</p>
              <button>Acheter</button>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
};

export default Offer;
