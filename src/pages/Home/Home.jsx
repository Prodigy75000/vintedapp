import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ title }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/offers?title=${title}`,
        );
        // console.log(response.data); // {count: 32, offers: Array(32)}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [title]);

  return (
    <main className="home">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            {data.offers.map((element) => {
              return (
                <Link to={"/offers/" + element._id}>
                  <article key={element._id}>
                    {element.product_image?.secure_url && (
                      <img
                        src={element.product_image.secure_url}
                        alt="aperçu de l'offre"
                      />
                    )}
                    <p>{element.product_price} €</p>
                    <p>{element.product_details?.[0]?.MARQUE}</p>
                    <p>{element.product_details?.[1]?.TAILLE}</p>
                  </article>
                </Link>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
