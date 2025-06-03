import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const SafetyMaterials = () => {
  const products = [
    {
      title: "Safety Gloves",
      price: "LKR 200.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzgZNPS8srAmq8F6xrDu1xetFZDZRkDo7vFd3vvUJmUsqQdnAq3Nj3Hh80O6aJeLHh-baTIDmyW7thzc9OA3uZoYcQlRQzqgwGqo0E62sjYTNoP3O5A6DqKXlz0QtRFzatkXvkToiVwbW4Zx6r1cT8w28Z2JAGeYhHa8_Fg0RS51s0quPa76-UC06pza5m/s320/Safty1.jpg",
    },
    {
      title: "Safety Helmet",
      price: "LKR 500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhajZfW0_ZlWJEo2hIxt2Shy-p6Sjgir3YkmoeR8ACRehc19FU_QY3w5pNPZwibAEC7CEFOtJzmNXi_T7OlXN2LVP1Dzhg0SG_El5SRuP215IApU5AV_2eYlAD-bVF_cAFpmq2sAFpK7dUStxNePODzI8V2PQu-576bH9WdQNLyQzPQ8JwBdbWV4qEPD7Cv/s320/Safty2.jpg",
    },
    {
      title: "Soundproof Headset with Helmet",
      price: "LKR 49000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEij4woaoU9P3pPmD4lAqS821IrKKpOJRFazG_u0kTzrnZbjkwC1EqQEN1GDGLdLSx8Ji9OlgtAE5Zqq7JRdj7hruM2douyhItLPzslfXmEMRfm4khDlcJkT2G5gYKvtSYwMx5GsXPOnq77pvOrfINMMVmoNciVAa1wWtWjiK-N5NeQdL2XeXN9wQFG0wHUS/s320/Safty3.jpg",
    },
    {
      title: "Safety Headset",
      price: "LKR 69000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSFj85xx2-N6xGou1mFu_QqiyUyhZMwnOW9KJpq3YmX58_ZcoaDG1lsXhjdFWM6eU0Ov6wiEJL9oAfVZ1-ugDe_0KkAWDcK1mADFDi-AK7mx4guaArE8QFd3F45oYJF62gW4euCyBWQEOEAXCEGrhDFyicc3wwr3LZIhAvvdOSTrl8mbHP_IIGM3sLiatR/s320/Safty4.jpg",
    },
    {
      title: "Safety Item Set",
      price: "LKR 10000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1cHjZJIRdqTQJqDFj1uXu4mGC4-9tdB8E9SEFFqP9Pbh_na8gOid5Ql-T7OEfv66n-HQCpx4_P_cBrbqqvvjKOEUtbGk7hA2uOkXukmAw_to0gOQu6NZPnvdLccdaH1Ecf5r99-CElz5hLyxp0TK96axT32BoR6AGUpu8ezpF-xqvYQp7YkbOD0HeGDl6/s320/Safty5.jpg",
    },
    {
      title: "Black Safety Boot",
      price: "LKR 10000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2Zul3RNEIiAQJ479Mq8RsewNKbfOeiHMKdiXBkqru0wLsxP57TAK2V2XCZlbtQaB2glAUBynDTQHOtbUC2zwpe3obTOikdNNwibH5O_YPcwJuGaafuCT4hzS8xVJM3xBM22zm820p7AS-UR5EGMP-zKPjjRKeMq9aAseX7UZfTS9Xv6fh0o1KdAlbbA4P/s320/Safty6.jpg",
    },
    {
      title: "Safety Boot",
      price: "LKR 19000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgH6s4VNYsg_ZvPKhLcjTJHfHViaXkYq-sFarYCGsnPOzf9SV4DN2mCInp1S-h7GYyzdKOYfz31w9c3qOWKoSuZojT2k4jGR8U6MFVgcNbgAX-j6KqFjIPc4-gR0BInVh8XuGdOVgFMlNdV2lvGUlVtZFSfc5-nVoeMZLJHFaT4Do1XPXQGmIgv4JNNo6zG/s320/Safty7.jpg",
    },
    {
      title: "Safety Jacket",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_QHUdb9AcFgD4LQWCfRv7K2SYJOUIa0ha9ltJi5oJXHZXP_GmKBrCZ9B5bwCXGRhKh_PFwy_py6BfE4BmrT_ZtqFmi0AV1808ASnntQFPUZMtv7Szlemdr5af5dM3i6DkrU_4nFEor83NYzuPV0L9hw0AuJjoAthIbUrkYJalUhbP5rM1dL3vZ3NhHVXj/s320/Safty8jpg.jpg",
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

export default SafetyMaterials;
