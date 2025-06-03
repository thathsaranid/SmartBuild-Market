import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Electrical = () => {
  const products = [
    {
      title: "Morden Lamp",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOuyNX-5F9uEztb43uLvYCz8hoIYqsOR0NxJvaOzNhlmmDq9Vp2eu4N_fmcZtLVwzyz_XjJuS8d2JVz0wuoFhhcdGiZY4pKovIUTwnIuV4ZS6ONB3a6t82f0UglIs4ZPO_XkJm9qSTYxL-ZxLBcQEXh8THUGVjAuYeO-IGjNY2aWExtO_GI668D9jHrKAS/s320/E1.jpg",
    },
    {
      title: "Roof Top Lamp set",
      price: "LKR 25000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0RyyR8FK8pysw8y7vSigvB-yonXjhGapRft-OmNzhxpSMxIf1LqvvoUsMSyRi7i6cagTQW4jnij8vCysPcVCKJhbFBhl3gOKVudYNnuqtVVBKew6uPEvvn4AiiiYW7njhoNw5TgTccaWYy2JsjaO3ekLM0Nc-xH_QcUcdSc-xXToNRZ8GD9rZZ6sYzOBI/s320/E2.jpg",
    },
    {
      title: "Roof Top Lamp",
      price: "LKR 49000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEinGf0EZuWeG0S7cUlsBnM6XrLD3DVFOUgdaXnNQ3fMI8AE8VF6F0V7Nj0JeQdFHcw9dysnmcS_tU4LXmzl8HCsr8PCtot9LTMc61zygFBWQrFjl7Ms76u1-hFr68ipYrWvy7B9L6IkK3obwWHoVy45WIa01cN9nPsFtGB3_MVROiEpmUKcLNUdA5CN6cj-/s320/E3.jpg",
    },
    {
      title: "Coffe shop Lamp set",
      price: "LKR 69000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0gyre9xbtfMjZsF-Cyhc03DIXDhbbvIHBsH9FKuW7FXLEw8M7m-JtkzN_kBMi2ehLWU84gw4-PZ_BJP9sVUbfxUlaDgPjzgGzewCxMb4Vz7usLxcu79mHyiaUezCCEE1vwteP0xY-OORULlIPudygLb_GAta5u-OtQJpSFvlYho_JdBJOH5B0-SXwWkwd/s320/E4.jpg",
    },
    {
      title: "Mordern Lamp Set",
      price: "LKR 10000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGwf4QqMkIW5YVr0_6m0QkHo3Hd5kLWkxyCyQpj-mQE5gK1WrVcQF3_aqwIoH22GWYvfdkCS6z8hO2xuervTIMhSoOgMhR_og-z4o-iCyyS_r7HLvC-uUH3XN-E96b1imqfL8KedHm2KBppg_2KfG7oGBS8amviYgMYzWFijs6hpkpigpJyQfekyYj5Mpo/s320/E5.jpg",
    },
    {
      title: "Double Lamp set",
      price: "LKR 5000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKAiegmus_WUxc9bs2UxTTm0UaTXzTi3mROfKVlvn8tjwhKsxYGxrgDQB_mSkyR8xbnBmXTQ7c9GKun3_GpzrGyDGo5g2Iv2YNSTIcxbJDbyQnKFBPOKA04TvFd3rnrlY0yirBB-BEfyVPjRWX8eH8Q6OtqdFtGvaQJYvMtnuDQllCeqsG4zGNf45e98Cy/s320/E6.jpg",
    },
    {
      title: "Wall Lamp",
      price: "LKR 19000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHU7n945Nb4KU9wmj810kLkSHoF02jOFcFFjoscG8EMH9UyOx5hXs-qbk_tnI-8d8q_ykVHvBAIYBzWiYXTsi28HDfVZup4d9iZtPy3tj1jKnSIjlemkj6GrdxI6kfhiZiLfDj_9QmwdOsaC_YXjOD6XQfdQA4zh6FgZAAeiT9WUyFg__IgvnqSLH_LoSS/s320/E7.jpg",
    },
    {
      title: "Butterfly Lamp set",
      price: "LKR 35000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2APiPmllbadFsEsoclN-9cn-ZOmW_WIUO7l1xmnDDLvhqIINFYJNp1nHVlPOfeLVYd1i1W8UtewbwxR39zy6yY3w1l50tDLXfBJPMBr14EYcn175jw0F6f3nz7fC3vsDSG9N1fVAQfF91Pa6-nxhPWw-iLjtnH-mUyoAtL8achp696sqSlNSQ3wZqDuhc/s320/E8.jpg",
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

export default Electrical;
