// Offer detail page, fetches a single offer by id from URL params
// Displays product image, price, details, and owner information
// "Acheter" button navigates to /payment (striped) with the offer data
import "./Offer.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/offers/" + id,
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
              <div className="offer-details"> <p>{data.product_price} €</p>
              {data.product_details?.map((detail, index) => {
                const key = Object.keys(detail)[0];
                return (
                  <div className="detail-row" key={index}>
                    <span className="detail-key">{key}</span>
                    <span className="detail-value">{detail[key]}</span>
                  </div>
                );
              })}
              <p className="detail-description">{data.product_description} €</p>
              <div className="avatar-username">
                {data.owner?.account?.avatar?.secure_url && (
                  <img className="avatar-img" src={data.owner.account.avatar.secure_url} alt="avatar" />
                )}
                <p>{data.owner?.account?.username}</p>
              </div>
            
              <button
                className="buy-btn"
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      id: data._id,
                      title: data.product_name,
                      amount: data.product_price,
                    },
                  })
                }
              >
                Acheter
              </button></div>
             
            </aside>
          </section>
        )}
      </div>
    </main>
  );
};

export default Offer;
