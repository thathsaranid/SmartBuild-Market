import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Hardware = () => {
  const products = [
    {
      title: "Nuts set (10g)",
      price: "LKR 20.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh01nVg7-SCGOeTVICNOT8CSWpQbr2TySGBBSWwfJTIjRZQGcy5m1u58g5f8wz2oi1qmcJAleIdSOtTngVOm8bzmmIbc9j9vvRAmzb6gCcUusbTsWl1-xHs_0TlReXkZLXpiC0qV3rJZ7dh0lUIq7OI-yjNxGXEHNnkbIyJBPC5MCp0RJLIzA5GfbNhQnmF/s320/HF1.jpeg",
    },
    {
      title: "Screws Drywall (10g)",
      price: "LKR 18.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDzzO849EG6sRz55v9iG3I_As2Fk4vpm1Lw1F-g39IBXxIIE6FTFYeR8pcwgjMrQjIUk5O3bqR_4wdn7Bd3kkihcEdYgx6KZiPKfWkcF5avhE_Y8NGG2XXRX6ViwppxzZ0YJ8wWNaxHy9Qx6mVbhIzh64O1to5vKVY3-NqcHg1XrJyr7_wF1TVCBTy-bab/s320/HF2.jpeg",
    },
    {
      title: "Pipe Clamp Set",
      price: "LKR 400.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbOukUHX6zElhUsvbnObJG72_FwY5wPB8CccS4FkEvAcJGKiGCTkrQ7Heh18Xqhe0Hl3CXzfiBO201WoIT1p0HuM9QuvLBLAzPk4w7uG9X89mnmg4GGNz_EoryBmyWzgwUvS2t3ib-5DhKI5xC2uthwen9QpR-ZlakJ5LyaYMrh7Ss-p2liFLdckhAaKlq/s320/HF4.jpeg",
    },
    {
      title: "Heavy Hex Bolt Fastener",
      price: "LKR 10.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigT48lP25pvMrdkg5LRz4DMf-TpfwVhBuPAIElg4gPsWTl7O4HRGM9hrZ6uncg7RK-sxL6QAceh6eYDVT8jQ6qiGn7j61q0HByHeAb0a8pLWrjplGR-hYy8RoIq_e25d7q1XI76zF64hm0DYTr2wDR_et7pzjkZqX9m2aBZLjcWwShd9ggnz5_61-XC9-d/s320/HF9.jpeg",
    },
    {
      title: "Hex Bolts",
      price: "LKR 10.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpZ2QV3Zr-P9TtQsoyzO4P1nR9NZHPVdSmSjV7IiZVqvfZUOEKOD4GiXmiCjUUIpHsWQEhMxFvNXJeHLw39QPJoAOok9_IfRcif48WjM6awWcqK0NJU3bX4zTDRHyLx6iV1sm9zNfK2D6gBH_IvCLJTDv3k3W8JmobO8rHIejgfTeiYTVepO3HBA2nHO4R/s320/HF5.jpeg",
    },
    {
      title: "Longsclaw sword (10g)",
      price: "LKR 15.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEha87c3AEr3DiS_TnjCs_utPiCptk4JctyZycTDWtymVtdKOzxb4GA9EthdyAyvbeiVVhEGSpzdeiq1GWRA6NSJPtg3jb5OJS9HCRZXRN_BNmqqbLsWRB9MugaksVikKFOM6SBgfWccS2uMpmiOwUoBZmY_6nKduwPO_wIMT5Ni7dIyPj4YhvwztkvlwtVp/s320/HF6.jpeg",
    },
    {
      title: "Wood Screw Assortment Kit",
      price: "LKR 750.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7UDELL733lsF1IreaDGEIw3M726qxQZ9kEGx5ywWVpxjcpjA3Kgackhwlyls5JnqXADrJOYqNhteVdqC3nlw5wSy4FpX-Dj2hsWRthdJPbrTdmTPYAc7h0H0916FNixyWWo0gSfvsyTbSFFS4xUF6pbp-ltcX0YjQh0cwkDi1RrQTuLPwKrVxKePdz2yN/s320/HF7.jpeg",
    },
    {
      title: "Lag Eye Bolts (10g)",
      price: "LKR 17.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdcxvy2mbI9QdqrRcQIKGfvJ_YZQx7xwdD-Wic0j_GtdpDU-7I3NGCGFMLzMzQlFzq0zlT58N29KPoyCvt4-mIP1as6qY8PegLMOOxWFedoXLZiMpl4rKkrve_JHk0XEl8wnMRcIgeNmKuOg0QSOriz0CpKMwHvdwo8HFcTVy2nJx-JWigiAxIUP7YINTM/s320/HF8.jpeg",
    },
    {
      title: "Tapping Screw (10g)",
      price: "LKR 20.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigT48lP25pvMrdkg5LRz4DMf-TpfwVhBuPAIElg4gPsWTl7O4HRGM9hrZ6uncg7RK-sxL6QAceh6eYDVT8jQ6qiGn7j61q0HByHeAb0a8pLWrjplGR-hYy8RoIq_e25d7q1XI76zF64hm0DYTr2wDR_et7pzjkZqX9m2aBZLjcWwShd9ggnz5_61-XC9-d/s320/HF9.jpeg",
    },
    {
      title: "Plastic Screw (10g)",
      price: "LKR 12.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbyPe8cMON_ZYYd7lbcmOBilOLw7BECtm_95fTAOXhuCObEW8ASoHTLWhpQoFBZqmgJnMyXQxeMAV4uydexoI60x5NupO84g6Ub2NL-7-iR6DVfpok6iUekYInJW80qAUrjmhivCJr2nLtoOpUEI_S0T4WqWlbi2J8yymieUzWWVK0fKm7Zh4H79az01UZ/s320/HF10.jpeg",
    },
    {
      title: "Plastic Screw (10g)",
      price: "LKR 35.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjoNSC9yUi5Sa09lscyvAZAUyJSVVDMZSsA3vSfduW_5L3K-0v1hPWwkdkkfXG9GVD9xDNPWtqAzc5Bb3-fgYH4NnxcyN35jXCfq016f7kxRS6FWOlQLnSRs2F4kNnl3VZgf9Z2f7Jpp7AH2C2bMJnCwN1dsaGwFmsmujcB7IWUjQpsGkiWjLHaQoIvPEwH/s320/HF11.jpeg",
    },
    {
      title: "Thumb Screws",
      price: "LKR 10.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZfNaCrE-NmXC95Kg5KMvR_l5lv1wfgthBqw2Rp8WWRfhyphenhyphenTkLiB3-jQYKmr7Ds35xaptw8d-hPHXaMYgnA6ViDmG6FTVX0JWZ7AtzicyIDXr2q9tu3892-4OZ15xSBoY7GIkAIv18qu3FUtcz01Pbaan4RO16YOJrLkwfzUnA3HEK5RB3KF57eET99Q7rP/s320/HF12.jpeg",
    },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="shop container">
      <h2 className="section-title">Shop Products</h2>
      <div
        className="shop-content"
        style={{ maxWidth: "1080px", margin: "0 auto" }}
      >
        {products.map((product, index) => (
          <div className="product-box" key={index}>
            <img
              src={product.img}
              alt={product.title}
              className="product-img"
            />
            <h2 className="product-title">{product.title}</h2>
            <span className="price">{product.price}</span>
            <button onClick={() => addToCart(product)}>
              <i
                className="fa-solid fa-bag-shopping add-cart"
                style={{
                  backgroundColor: "#f5bf23",
                  padding: "4px",
                  width: "40px",
                  height: "40px",
                }}
              ></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hardware;
