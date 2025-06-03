import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../assets/css/product.css";

const Relaxed = () => {
  const products = [
    {
      title: "White Cushion Sofa",
      price: "LKR 30000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEinVEWE6hQ2ypEJ2FHlONudRcMEcrAGaOGO27zBfN9sUwdeLbJ2Ifa9J7eVUGY5IAe51KXAn81YcC-c3G5hCSrK1OQzX-WFhY62h6h3fR2KA-9CFTmLc_WgPSzdq0lgdKwAe6xs9euJsrM-CyZswJ4zOr7plzCcfXk2YArOETI7_UuyKjDZjdMTqXH1rh-x/s320/R1.jpeg",
    },
    {
      title: "White Mirror",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIIgMCcGkP3pr8bJadbbyde3hvBqPxzme8GaR2evU3Al7puk_xXi9uCwnRfsy2Ubgf-O6CA5i1rMCHqq_dONqIVJQj2xDmOCxf28E97hwTAtMfs2OwbBAMF2bMah836Q1KN0aFse_92DgEfOvXO_hSjqs_SZ0eJCUfnVejHaoX0WfgrfAD1Sm5NjzKDTdc/s320/R2.jpeg",
    },
    {
      title: "White Cupboard",
      price: "LKR 19000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiujBb09c0CZUe9J9PEwbsnKUJ_P1Crx5vlu8BzGAlAvkOS9TWth0re5hwAHdzNxpqtYt-VJeadrCUtPzlEIoPTxWzrjodbOqVr0ZJaCo-OuWLkxgMFa54V6EDtwXd0gMyX0t7KX0-0FDHw8Sy9SdJIjdIATAvjllMplTueX17e9sC4eBwdLfV2HWA4Bqgo/s320/R3.jpeg",
    },
    {
      title: "Pot & Plant Rack",
      price: "LKR 1500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmNya-YUiJ72j2HIiCPuXN4tmL1zCfhGvkHwWxydcb1nDw0lEUSaB4sUbYp4GbA_qhEDnM9KaObr9NSHIlDmltcy48WWmLHPpeLnA7Be8LbomuVd0XrfPxTGoXlUg9QIWcqRvwkTAIqJTln9lapW5rc2LeRt5DDnKjFFbsyHF-k6iZDBHcwLTpLP1j-3Tc/s320/R4.jpeg",
    },
    {
      title: "Book Shelf",
      price: "LKR 12000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2t_IfK4xzrIX2q9rLdoPvJYiaBbEyFU8-PUkC4pqVOmiLE3X7o7ab6g80UzHl7o3lP1r_IdDk5_jB4rIa2HhDM2CrvYqEg_Zo13hgvnPMutTPbwtDLdefV_cLcHWykODCK5i5hNYROrsW-Ba-9gcKCgY7Or5jU7Ch_h9126l4UhdSIrv66wQPdmdKphRR/s320/R5.jpeg",
    },
    {
      title: "Wood Table with Deco",
      price: "LKR 30000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiR_A5sJUpqamM9f-htjapf-sQF-LvPXhz_E0G-tcAn-603qwzpCEBCe6sabqDtfn1py_RrSfqANlOauYu18IIuEkqYPuf4AY62_HljJ5RVyv3RPSGhl4TiCxOmuQ3_QcSL3HtnCR4GVqIaltd7dbSZzdTUwSENyPRr6PO3f_ol9MKR7QwRNmpz0SnqmjNn/s320/R6.jpeg",
    },
    {
      title: "Wood Mirror",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJGOkpXyELSeSmPEqeNhp4IFOopuKdaZ8ILnViDrXbTonRC7nrs3o9LW1H0d3_XzyDarX7uDgqQmk1cyR12pGtApi25N5Lx4E-vuMo09a0U1vV2RbmwpRseQ3O_-5pib6VOgQ4eyVZyJgv2N26xHBi2HuxRyb4vRk1dGwU3cuAnl9rsqpHud3G4cY6awH2/s320/R7.jpeg",
    },
    {
      title: "Lamp Set",
      price: "LKR 35000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEilNVDRzn4ehqScW8biwgRBc7a-rkheWNZ6LOjCqBfXZwL3l2qvqpxrs5_FFKehE__KBlkTDgXNu2edwyltqCXQJwBHH1V1XOzYrR0oeK_oMf7iboDY6E1MsOmefSg7Q5nr-xQLcjxz_xDMJgGs5pdTo1sFrA75iL9egnqtqoRdqoGfk5kfFP3nmyJ9Wu2l/s320/R8.jpeg",
    },
    {
      title: "Plant Pot set",
      price: "LKR 5500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7UOc-1My6J1mi07g_iTO2W6ZaTZwa3Qncy7lq-fO2d-WiOw8fyrVwWQRpNwd2CEszm4Jd1Oja_s0kpJTYbdwjj5lAcTj-7oYu45_58LEpLMI9SXLL4XwpGLMYc6WB51T-02p0vBvIpT6vrzNO4lO_sL6ynrKXUf1nAuWCSZFyl3MlZFTyBvm9JiuoCmGk/s320/R9.jpeg",
    },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Relaxed Modern Collection</h2>
        
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

export default Relaxed;
