// Home page — fetches and displays all offers with search filtering
// Supports pagination (20 items per page), resets to page 1 on new search
import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ title }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/offers?title=${title}&page=${page}`,
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [title, page]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [title]);

  const totalPages = data ? Math.ceil(data.count / 20) : 1;

  return (
    <main className="home">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
          <section>
            {data.offers.map((element) => {
              return (
                <Link to={"/offers/" + element._id} key={element._id}>
                  <article>
                    {element.product_image?.secure_url && (
                      <img
                        src={element.product_image.secure_url}
                        alt="aperçu de l'offre"
                      />
                    )}
                    <div className="offer-info">
                      <p className="offer-brand">{element.product_details?.[0]?.MARQUE}</p>
                      <p className="offer-size">{element.product_details?.[1]?.TAILLE}</p>
                      <p className="offer-price">{element.product_price} €</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </section>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Précédent
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Suivant
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
