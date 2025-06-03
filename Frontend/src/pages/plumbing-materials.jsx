import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const PlumbingMaterials = () => {
  const products = [
    {
      title: "Hand Shower",
      price: "LKR 15000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_Et05S4H6L1P1LFSCq9A1vGeTwgaBX9LHKuE71jQXsn75tSPwQL2dQgfZ2NLvVc4v80ePmNa3JyDmURJJFjO2PfRUMateHBVi2jE1EJpy3fx_JQysMv1qZfmWln7c9YHUaC-CiHb7gVkv9jkSVoJXGGHSt5PV8tvE_2Zg7HVjoWzf1RLPnEUYJX5OcZrl/s320/P1.jpg",
    },
    {
      title: "Bathroom Sink with Tap",
      price: "LKR 25000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpdB9ICaATzhGWIW6AiLG1_1QCBwqMXqc4Zn9ava7bUq2ez_AQweQNc5F_CS_UCk7OV6XK_hg4AxTC3F3BgBjOpp8a02JdWwayylgaL7fWEWJd6LXPg9tS_eBgE74178O_OVFx6nxIEOgjjhh4GrOrIOkvOT0Jkuh_ch_Jv6f3d6iLF3YsAT3QyyuReMeg/s320/P2.jpg"
    },
    {
      title: "Gold Colour Tap",
      price: "LKR 900.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7FvFiNs2z_vjNE-2pwT-aB9aezSKQfmetriOSM_8TmRGmixf8gDzc3_vx4IiAI_BIA8CtazUC0DLsmVPHRr71KQNMOttj9UJchIyN9NYwd0MtfmwtK1HypChQvB_7HN9Oprfub5p59tBb458LIf9lFRvDSz4Sj5076mWdtLbJgfkaXGQO1QBMOujI8Ovd/s320/P3.jpg",
    },
    {
      title: "Kitchen Shower Tap",
      price: "LKR 13000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhj90Ppkj5PWGIi4jz-n4syZv-1rgFrHdBUDvDjqKASfZUSi-zBotdgfBtzxOHhPffHrnx2ThIjMndfW55EhHMdEWwj3myKfCm99aWfJtHejxcjGoU0mhul3_LqsDGy_1ksj6SIas67XKSKAvcv8gAM2YQ5kAEn6HEG_wnT11i-TgbInz8z1yQ_GWCH2FTs/s320/P4.jpg",
    },
    {
      title: "Kitchen Mordern Tap",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi804QmyDH6l_x0M1qVfJ8Y8JK2ZZp1X7YR2gTWK17maqG1aEGEVPNl_YI6yBVnuuJR8VuRcsDvMBjSVcb4NC8MFixk1mVVzYuppjookN8crpMi2uejGUOKqvWvo9m2ToJIpT9G6Z5GPCKgCp7atGqoZRS7nAMoMFjP-E8GDcQMKjDpGvlQLTAbKLw_yvvI/s320/P5.jpg",
    },
    {
      title: "Mordern Bathroom Sink Tap",
      price: "LKR 1500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqs_EnZo_XENz35X2XG6OoFzPz8TPM3Hc5Yyc2PRQyDLttmW7T5s2VWPiEPUCZ_gU8JASJ2a98_CipPevQQToPt4iNvqzMXST_VowGRkfkmHYv4Ydut58fKZW3zc9QzQ4cnFpSXnbcbbPwsqwPJLAhwoCvXLi4bFWzmLtD_RCqqDp8lL0SPqqxQPKYPwKr/s320/P6.jpg",
    },
    {
      title: "Bathroom Sink Tap",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTDk-c1OdS3ZJ2SNy4qHm_Ga6maeBnff5vtaLXudemmejsuPRd5jlE7eiA-8yMp0IZI9aL8Xt47SxBPBybqeCVFjVI1bQ9PyVU-eHBMAIzSfr02sntx9fdFa_Yw4JQ6XTlTXj5bnUUQtOLE0QNETdU8eV8R-oHJWQqUqIhzvexGplFhVpkzg2rQ_ANHq-Z/s320/P7.jpg",
    },
    {
      title: "Bathroom Shower set",
      price: "LKR 35000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimkVGiH5Eo-QHcXxJAMPJy1be_J3xEzu2H50rO4iiKOJU3stkMF-wEQ_Y6QosI4h83U0doC2fqD65EqnNrA01uwh4ZbkBGv6xxbG5ymd_Xret47WBJf93N9oG0kePYpAWgos5Yr39wLiIs6AwTX4kGqBn6UXFHqoJbLXtHB0_BRbW2VZ56IKF2vmzrdxaw/s320/P8.jpg",
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

export default PlumbingMaterials;
