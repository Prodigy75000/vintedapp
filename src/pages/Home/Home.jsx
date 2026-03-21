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
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${title}`,
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
              // console.log(element);
              // {
              //     "_id": "69b178197659fbfd4f9ebe26",
              //     "product_name": "Vestido",
              //     "product_description": "Vestido camisero estampado, tegido fluido satinado, talla S.",
              //     "product_price": 25,
              //     "product_details": [
              //         {
              //             "MARQUE": "STRADIVARIUS"
              //         },
              //         {
              //             "ÉTAT": "NEUF AVEC ÉTIQUETTE"
              //         },
              //         {
              //             "COULEUR": "MULTICOLORE"
              //         },
              //         {
              //             "EMPLACEMENT": " ANDALUCÍA, ESPAÑA"
              //         }
              //     ],
              //     "product_pictures": [
              //     ],
              //     "owner": {
              //         "account": {
              //             "username": "Eudora51",
              //             "avatar": {
              //                 "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1773238290/api/vinted-v2/users/69b178117659fbfd4f9ebe0b/avatar.png",
              //             }
              //         },
              //         "_id": "69b178117659fbfd4f9ebe0b"
              //     },
              //     "product_image": {
              //         "secure_url": "https://res.cloudinary.com/lereacteur/image/upload/v1773238297/api/vinted-v2/offers/69b178197659fbfd4f9ebe26/preview.jpg",
              //     }
              // }
              return (
                <Link to={"/offers/" + element._id}>
                  <article key={element._id}>
                    <div className="owner-profile">
                      {element.owner?.account?.avatar?.secure_url && (
                        <img
                          src={element.owner.account.avatar.secure_url}
                          alt="portrait de l'ouner"
                        />
                      )}
                      <p>{element.owner?.account?.username}</p>
                    </div>
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
