import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../assets/css/product.css";

const Casual = () => {
  const products = [
    {
      title: "Bathroom Design Set",
      price: "LKR 1500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiosTm817v5_9l75L10U4ljdrrA5bO9HDFFc_7sSf9M-1zP5fYbvOS2NcSFPbFGJ5uyE3EaqNcXIm6sHMd60MnaReCBSKC5SfgAVrlVZhdvmy4NLXazKqbXY_GsOCb-2Kjk7acmnk2Qz-JOErzKa_M4HyIerFsV8BUyWIIkvMdr2EmT214nT0v3H0h6dR5O/s320/C4.jpeg",
    },
    {
      title: "Swing Chair",
      price: "LKR 6500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_ay27DzXYeeqwZrAa6jGSqs1YyfyTTSsBALUsn1UGVa1Em-W2QPjagxqZ4XBaCpLx-Xn5OBuDhnp4ezKdzkvMQWhih7oHIncSLd-sPARXxvogxWHQIgQOkfMrLJx4nvKFhnSQbtKXogruRhNBozroLXqRRl_aWxzNq85-SuUj8V8hyphenhyphenv0qz1AYVb4RZ0Ro/s320/C2.jpeg",
    },
    {
      title: "Cute Pots with Vase",
      price: "LKR 1700.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbbnZi7-zbOuOFvNBvyHSKW9ETCgL6_zzvsFzdmxsca2Ct2YoysTuaIXT3JIDrQNEZyLMqZQRQZsHzCIN_BvueJrr6dGqsycGiHj0Wbm_3z2ecuaysYekWyWAQizBzTrFWgOGBAd497ybTfbZM62evxIT0-kfo2jS271dbaOIvUWr4reAPC3ySHGx6fowH/s320/C5.jpeg",
    },
    {
      title: "Pampas with Vase",
      price: "LKR 1500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiN4s8tem-lGqtP9FcAnKhFlwQHmhjuaz8th7-Bj0SkUOFCkhXDf_NOzjZ4wSUC9WCeb67ckUBqxgooRUjsrNwjvkwY7tLyTl_hmyX2pmSM3JmVn0DyRlTv3ViWV0MILJcPZaCZJywAsYcNckO3_w3VhXAU1aP4sLekbMgpKfOWFxqvN09D174pxrQtkGua/s320/C1.jpeg",
    },
    {
      title: "Small Cupboard",
      price: "LKR 18000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2RHD17Ytm8ltXbIJdJv8-XDPDSCkpbr9_9dSCZQ3gKzHG3BEggKM3RsK9wf4U2HUorvkhoSnzfuKuF_UQMzOPN1yc4rRJ48Nh6qfRquLQbVETXVw0hyZIWR3k-9JF5ZD8_UbzHZu7y8UP1WJstrJ2DAAWQSMz1Jr6dPcbd93s8OqFa76W4jiyVZKDSIB9/s320/C6.1.jpeg",
    }, 
    {
      title: "Dinner Table Candles",
      price: "LKR 790.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRiY2vLhrITVthGqMCLCFo2Dy-Wsro8wzuP-C2uNdNayDqgSben1IKHnrY52rjXlmh_9CG8YaboMC9_qRNRIiVpFdRmCzXww1vAUXU7DHTltRGfRCnJXMdDlnjLuoAn7qml2PrOQfziUHgulvjiNnK1xDc1gemxQsxC-TyswF-N_WsxRVSx97lmhLLWmBA/s320/C7.jpeg",
    }, 
    {
      title: "Cusion Chair",
      price: "LKR 3600.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_MdQUHX9bdrP5BwIHv6x8ryhL-v2JXolm3NpFtatn09-_IKOJoOA4umLgYflPow9iaK3aJ1lhpLXuThkeF1fSwRjrTjO3-zPVWcn1fpAP83y3uu1s5xSvi7y-XG2Tu-RNmLOeXPp0q6T-qYHyj1H2pUtiNgdGtZM67o_gJTYh738Bb0CyEntBHe2kS9G3/s320/C8.jpeg",
    }, 
    {
      title: "Relaxing Chair",
      price: "LKR 5500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOAdzBiNpJFKINyHq9fGLqGFXCcQRlJpTwhEQLrOyD3yD4NltekVEfsvceWQRS8TA3ZYXA_DHcwuimyQn5OOwbluCASxBEzYxznR_2ipi5VQ6u9LrAUi2bmHUICgpuKS0OV94hQFyKJ2E3bbdToCTeT25ofrM5XAltk2e7WH5NdTecsBegQ3hi9qMWs9Xk/s320/C9.jpeg",
    }, 
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Casual & Comforting Collection</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="relative h-64">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
                >
                  <i className="fa-solid fa-bag-shopping"></i>
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-yellow-600 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Casual;
