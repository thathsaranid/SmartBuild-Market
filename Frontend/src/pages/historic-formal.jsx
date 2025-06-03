import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../assets/css/product.css";

const HistoricFormal = () => {
  const products = [
    {
      title: "Wood Simple Table",
      price: "LKR 10000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNy_R18vlIucVaZ_5uC-06fQSxblt4-1aL-xfy49J7AIN_7rLXPOAMNDeAmn5pBS2Mk7x3w8DtwTS8t1wPUvhFtOu-omCpPTUSRnmoAR8IvssNjTO1dzZ1g2h4AYf70CyWpLW_iNmN-SlBNcyxDKGxfC_o9XZPsaI5LZrp54UWs9nXIaCoECbhW5yRmYYz/w180-h320/H3.jpeg",
    },
    {
      title: "Dressing Table",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgI9gKjstyu4Ud7V4PjMmXAUdK0T27xs_NiSzbC4A3zMAjTB6rgPcSeePW3QajhfA63IQaulO8oVvcgmt-IBz_SBAsv1EK35SIsraMMiqywSkULawbX-ghDFrkjjHxeQ8Jq_Xlks4lvYpvXqhfdHK5OewZC5gCPaOvusqRRxHOKomoUgtZHvZjxiS3qRzwv/s320/H2.jpeg",
      price: "LKR 25000.00",
    },
    {
      title: "King Type Chair",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCTnBw-V_g6BmszrjAiyLrnyMWqsgZOONcFzNpiPHbhImoAQBBxFZHEZxgIY5B7FiBoEfx9ha98LCPHm8yYueMRXC_6BuiPdyFxLRNW_itE-HZ-hxZ9kl-Hgm91tzwTZaP1EZICOblrcPRkYZWPQLHd8YHbsB6_lnb1oM3mBBtOrB_W25CWQzFh7Iamg40/w225-h400/H9.jpeg",
      price: "LKR 19000.00",
    },
    {
      title: "Full Dressing Table Set",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK6CU1lPWtFvNLxzI_F-WIAOi4owq8wRM_cknaQR9yd9Iwb-KubgcNhU7owYK0vqp0Vtojw8YxB2O_i9cbOCpHeQLT0u9O0bEqFO8rYlLFIqQ03z3U2fsOnmYfcy225ZxRPgjdnAm7g6AadUB76KX42k8R1KJP36Zn7i2MGcCLdXFKh-xVeHz0hJ8VagPJ/s320/H8.jpeg",
      price: "LKR 29000.00",
    },
    {
      title: "Colourful Table Lamp Set",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiV1EjTBKL_nAMyUV3luqzkHDSRjSvuNcvobGO3IQFE2B2PsBE5It9KFBWJQT2OJaD4uOwZwPjq1GnB3rpsYRnpiFKJgW4x4rP5jpHTw_MH5TevBGIKb3rbPxHESXuG4mHnhSAU7LdF9bgQue3mxAwJYbIQ4bZL27rz1GaHzESCuMWQ7VITd-Tf7Ewp3QmP/s320/H7.jpeg",
      price: "LKR 12000.00",
    },
    {
      title: "Table Lamp Set",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzAC7_KQLk826iuLH6QUHy6ANtR2kyNBVxt-jsNqb4sVFNhTwkRAFqqyedvGJ0ldTqway8FXE0AOe34JjtNQyz4kQnPww6t98sxSKnQUL0Sa9PjlxSkgXdhhfQITMOVuBx-3fCXERF-IKvztnu9KiNuVf1L7TUPhJYLj102wjdtZZ-DgkHdwNTGP1xqt_D/w233-h400/H6.jpeg",
      price: "LKR 10000.00",
    },
    {
      title: "Book Cupboard",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHrgLGrx9SpqTra_0768plMm4bcptQrYNv1tEGtxthncQfXjxYuVOXrSPBJFE9Vvh_RQIjaVCOB9chFq8Z_SXoojzIUapmWZaIf05tmGBFOzUP5w-PpLSyu1TLnkxmAU2ADo97aAxn2c43NTwD4sbHmw7M1R005X-NUqK4J1KNFvoHhTbD5OmmyG31rzzi/s320/H1.jpeg",
      price: "LKR 13000.00",
    },
    {
      title: "Dressing Table",
      img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnhmxeiPdpeDM3HVpHYwAowRWzE5xI8X0yR4fW9gOzN5uqFxEiTiyfDeke-crA9wUBuZYGFsEvty7ebTgBA_Yylbx3FUOI6Y2FTcDYTvF6L3hyWNhMqqJI9ulF3XUnm2lfNFsHbl7lPyofOZxPoAqkBzYwpjy9ZttB9oK9A4m57f5e1uCQNKQH1jitd1lI/w224-h400/H4.jpeg",
      price: "LKR 35000.00",
    },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Historic Formal Collection</h2>
        
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

export default HistoricFormal;
