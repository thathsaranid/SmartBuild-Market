import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../assets/css/product.css";

const Traditional = () => {
  const products = [
    {
      title: "Lamp Set",
      price: "LKR 2500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqyZyenG-T8NltM_OeonMcELejgfuVPy1NfgGxtU2Og3N2oyfbJLPcF9OM9hftgww-8jWuGf61JUvMibLq1nKsYjhWCGiMB-EvtXAfieqF7NJdkdAdTfnw5tyTEKGqfQXf82GbKlvqYTGriJVmzGu76VKlxfF6LalXaKpjRewgw2h4aJoGjjS2kbHryJvF/s320/T1.jpeg",
    },
    {
      title: "Root Clock",
      price: "LKR 6500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtmLzs2pifzHWR_HQXyM5zf5CUUUjAG4wF9UrrBWQ0wDfmyZA62F5vz-rRKzYIF0g9U0kXUZpfu__qPXqO8IVB5uzMhhZoI5IA5P6E2spDMWzEwdGZoIo1OkOQCONykZF5dd0Fi-IlN8JTMmTvxx9wG2wA_xbR0RWy5AqYNxQrN4lx7EHfh5XJqVe32poA/s320/T2.jpeg",
    },
    {
      title: "Wall Art",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLLN0ab0DKG_MaMRiU8KWwuiIQfgJ0rSkYLqKkXRL2_Fg_K5kxLLSGi-MxYXx6ewWbi11eZFlvmRaxn2z7edkewEfN3UPdkU_FGG3gP9-R0HcZvXmiAQmH3GU8R9IjSxGNcELPsP2rkZesmIch8kygskliNef2dmBB8cMhRqNzPosPI_JGVa2cooG9s5x-/s320/T3.jpeg",
    },
    {
      title: "Mirro with Table",
      price: "LKR 50000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4i-UZuNt4krz2X_ZR73z3recP3uCakxvTnGJXAjf-DFe_z7Mozk0lAcVd696hZ3OCuqkXKMp4c5rLbe2Wn6IA8T3choyTgt0DkzCwsM_ttjPZfZZCIFfnM4h0DLFAuNrRFUNRPOP1GteIdf-XjEs8Kt1zzJeWK91PvCzrrsbgkBrl3JQNOdEShtvEqgmP/s320/38%20Best%20Mirror%20DeT4.jpeg",
    },
    {
      title: "Lamp Set",
      price: "LKR 12000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiL3rQFrh5GOna3QgqKzqrzgnoTsLfIqQdOo_AgDUWhWq9IfZHNiwZPAqsLUr3IuMSrbuAmG0FfSjoPj23PMi2efETl_7AUsu0E_WbyjBa1v81B_BoSjytc_HqZHI8EZTUpS_VlrFj2See0KnW85UKf6cBP5xmID1nKoE_zkH_oLcL2tuC5GlScWZ9tlaaV/s320/T5.jpeg",
    },
    {
      title: "Wall Art",
      price: "LKR 45000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgq5XJ8Ha_kDaQCFQkioviRZOErdrQukL6tY1MiClIEbozkRDJDy4qVKYTfBqjXvoRGiCP3CD5ef1J0fSnWipSLTmt8ooJmRfrfsVyqiqgPQq4s_vXSL-VFyg3VxpK_WvR3XTTRhDxntmq-2cXAaALZYLDcKC6jIHtv0zXl_BZ_2GBUd2V3F61GlWO__q_1/s320/T6.jpeg",
    },
    {
      title: "Wall Candles Rack",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiL3rQFrh5GOna3QgqKzqrzgnoTsLfIqQdOo_AgDUWhWq9IfZHNiwZPAqsLUr3IuMSrbuAmG0FfSjoPj23PMi2efETl_7AUsu0E_WbyjBa1v81B_BoSjytc_HqZHI8EZTUpS_VlrFj2See0KnW85UKf6cBP5xmID1nKoE_zkH_oLcL2tuC5GlScWZ9tlaaV/s320/T5.jpeg",
    },
    {
      title: "Wood Shelves",
      price: "LKR 3500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4n3CV4EShUXRAN7EX-LEh_8PNe3NjMQoLaDDxd87ufcmgTxdLBGSFKL6qi3QdA0-kC_ZG0vLr2V7Illd-0AKUyxnwBUT1rjLPPr6byX47NeGQFlukIRvqadccANNpnJCtMKC6VNYr10ykwD9xi91DNxCRpWVl7jTbN8uC3BqmtvMrs_NOhmNiAI-Pdylj/s320/T8.jpeg",
    },
    {
      title: "Wall Plant Rack",
      price: "LKR 4500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHmcjbzgJ4tY0IJD23Hnx4zDOz2Kx2fj8YDdaW0XQ4Thr-5Z9jShUE9cgIE965ie5VoKra3fGHABacovW1WOf72OK3DCsSKCkMoiA7akuhGt6YSgWK9Uu3wjuL-RokrRnv1LbWDTMObPyFfXBZPrkiOyBh58K8bmOIloz0XD-Wo1KW9W1rOe9iYTgVtSA2/s320/T9.jpeg",
    },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Traditional Builder's Collection</h2>
        
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

export default Traditional;
