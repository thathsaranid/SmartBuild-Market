import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Sophisticated = () => {
  const products = [
    {
      title: "Flower Vase",
      price: "LKR 15000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0RTjvU9Q9U7CIFVbBx3lXpVi70zsWektDUsBhWehUVMPTtJvaJ2LrjlNCX7XBvKCgIDATVNu3Ru9h-vTVkWcT38yLVbV6RS43tvJLcPdVtdiZwwRtkW8Nxdi_8HoZPomGFRdJczKQnS638_gOREkd1OVCqQboJPYYHpDnFK1pUPXgASiomKi17zX7y3xY/s320/S1.jpeg",
    },
    {
      title: "Table Lamp",
      price: "LKR 5000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk1HB8tcoynXcwizPz2L8JyjWNjjfCD_2kUZWIfklpOCneCwSMhe-D68GHmjBeUvC1E3d-zPIS_VSxBUn38D4LhTrfY1nMl6MjXuoI2YodcCdrypQ0xeuvlH7GLJtQVVnZBHCeMfQLrK0jZHlCPVpEXnWZVA8vDsX8IP4wvKQhikGhBWymnU4hBQA6NL7i/s320/S2.jpeg",
    },
    {
      title: "Shelf Clock",
      price: "LKR 10000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVFuWcE-09HbKwOVxo3MhpsKIQVw-uxtr0Pe-cRUbgytyh0TEe392Qr2HDprt0KyEcfeck1DIKIpzUuA4n-D3xx5XTIy8bE1LMhYXc3yoQgS4YsIjK1PMCtVjQ9ljK0cAJfq08TpPApj4rnMqskeLjnjHjugx12iWrD3gPco8vM3nOVUXzmoo0J0yJf0nV/s320/S3.jpeg",
    },
    {
      title: "Plant Wall",
      price: "LKR 2000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgV5pSL4mb2oZeJyEAdWFDuc-CKHAG7prR6f8Y-54IlKVUKo0cngirOHdVJbi2haHRxX7DQSAmOSwcHAry_j6pzTKyUJUxDlvrqlh6vedaeNrRRKBWD__o6TeInbrAT__s4uTyKDg-nzMldB5U1T5kxuuLaMrKwve4tfd4qrxccbWavD1EofUNZHtTQHQN6/s320/S4.jpeg",
    },
    {
      title: "Plant Wall Set",
      price: "LKR 12000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsH6JUY6n6WDnQ34c9WV3_HZViXySzOwYm0FhmLMEeH1Q13Oii5eAZ2EF5qqtJP2So03pvUIo5EUBzgiI_Bb-ul-t2wYJ3VxTFnaPnKyp4AlqvIyoeBek2yY-JWFW4yWLGR6yAcCy1Hkx8EAHo1pqHrQmEM1tv4SbNbCRfe8FopHTe0yMvJNTl2lB9_1OP/s320/S5.jpeg",
    },
    {
      title: "Wall Plant Pot",
      price: "LKR 500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGvDcZ91EyyBj632ZBxE3gULppMzR0Nu6xZjooG674jGzJnQFWv4H095zvDpvsCYf6ubWWSbuRE3bT_284-hQgCgsBERTmGo64TuW2663j55E1Y1anp2MzawP-uAYrfTbWi7m7ylFX6nV7vvkZlJAl_eKq-M0ies8uyZht1xf3IP60_h6CW_dVKPKs-ZS9/s320/S6.jpeg",
    },
    {
      title: "Wall Deco",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirw14nKmh__ClrkNjW9Sdrvd0hEgeaaNR3dCQSzAayoutWE19zc5H_pYLK6alT0D1q8nAi6uZFZsjD0ebQzXdtEQyNKo3d63eZH72I1ytiibwjc7LwMCtTv2Q1Cr6-vpUDpkiekNwBOWkqdveVBdFtbftEoLpnlXMI9eQKvTBtrXzKMA5OdjP-_7ebAF0I/s320/S7.jpeg",
    },
    {
      title: "Entryway Table",
      price: "LKR 35000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjc-WPcjY-ztnEd8ZGatmcssUj8lWo1Kk4XdppQH5vbPpNmNG0KP-8rPXTVXvwo9dSP6hV45nj4a-IXs0p7O55O5YLBMfX2oaXtVXrzrpgHJ7ajTlrysSd_w1PbXp3UN6rQKw6_EaSe2Ize0i6MXALRmwxi9EXL1MBSIuagBzxB8g40Svq1W2I1uKsZ43cz/s320/S8.jpeg",
    },
    {
      title: "Table and Mirror Set",
      price: "LKR 30000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkGACE7h9y4PhVveD2WqC69LEBILr_7VbbW144UP39-Hsn3YzckjaQt8muYuWRbLfCIXuUrBM9sH35eCl9O35P63uRX6Ku6747RUiCkmqbX5US58yfiVt2uAEopsv992MfJ28XHDbkqEUaBGbgk1GGLUQNZMIg2_-gOiXsU-mgYNI8vLVo_EkpqqSEaN8Z/s320/S9.jpeg",
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

export default Sophisticated;
