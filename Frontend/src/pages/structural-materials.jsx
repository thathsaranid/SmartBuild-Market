import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const StructuralMaterials = () => {
  const products = [
    {
      title: "Bricks (1 per)",
      price: "LKR 20.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIpSwwYutzMgqk_-pIPbhyphenhyphenXYOpU293ohu2FerWxBuXyD2iI8WPCpklUjjAdHwntEPFT82bztqLzEzXy69_htnFjcokVezcX0e45PgZjgk_PZL95PuLtkm0MswE-W2q-qqXfjtPNJ4B_Nxlm1u7P2DiWW-Y6nfXXEzos01bH-aDwQMdbPh4kv0Q6BRlfE0V/s320/S1jpeg.jpeg",
    },
    {
      title: "Cement",
      price: "LKR 3500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7ju5CrjMmEb-1qpVfQfshegN76ye8iE5d7136I8ljAFnpCqcjMaicQ5Xpitk1UeTazBxViuMBZ6CaoPkXmXjQ4G4dMOWLEypKtbIuQCTc_mpMW68dH4JgUKBR9_TXsbQn1HFTfi9VsiiMhkKcP2kUxVFOtWbu-cxRPTL624BbWjRh2HOM9zzyxCu2fl6c/s320/S2.1.jpeg",
    },
    {
      title: "Sand (1 cube)",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCakUJXiXGKtwJKrECg9AMQKyiEnNl5u3TU9UpULbn0PGrMRzAwI6l2JY67HUgtrG1CYyuQQpQPHABxJTGcdo4mzDDmsiIRPbOHdI7W3K6oNTB3MeqcoXq7CwRfioLUeX6nAOU2RGYVMcnKlSZk-9Zr0OFUBUZyIyI_P52Gfzd77nFphNgEm_y6OEq-eQa/s320/S3.1.jpeg",
    },
    {
      title: "Reinforcement",
      price: "LKR 2000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikmFqgTjxWTtN4vn-XJ3o_QxlmR8BN9qDuUv4tUGMMAvL9fwbvsHYDQGJZv0DjbTiNkCPaSHWPh-43vpErDtz0Tb3BSO6tSB5OjaCYYvdK-rCFAD107u48xuHxUc9yROWkda0flmqtacTNP6GVCHqbA64My2TsJbWgbTmQqX2hg9rfeZ63VAlJPJNWoYcu/s320/S4.1.jpeg",
    },
    {
      title: "Red Soil (1 cube)",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiar8FG2Z7ufag9PQAWQAh-AYYuK5ONKjO1SaAVpnMrLRfNMjCAu4-qhC5ycX4a6y-kcV7KPz-nNWE6HDyC1NTEzfG59Ez5x71dnqIFzC6bUy7Ekivaj2j5Utl2TuPpBEd9GXL-BTabymu3VGRqSIGjlvEDY58mjnJegpyFzioZbsg12kj7NBHRpiB1C-9R/s320/S5.1.jpeg",
    },
    {
      title: "Stone (1 cube)",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhc1F-LuyYj7_PEZehcP1EwId-Spqg0apGnhZi2xv3aM0QOb5gXABiFw4hfihpxsc4JKJmNycjYMkKmqG1KTnM7ikiVH1bkge5qaXQT0n5TvslSCYugmoOXeYCL644QG54WEfOI8qowiRI1l67SAr41iBptrfXcRvDLWbU8NllkF5S9EVt8SWgqNPSEETJI/s320/S6.1.jpeg",
    },
    {
      title: "Cement Block (per 1)",
      price: "LKR 30.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXEOMjaLqKGcXzag0eaGTl0mEgIIOBXC5DRjQngaWmvxNHjZJJFPO74DNqx8v8xOBszOFdXzR5BGDQLJFcA2oJ4jxJhsX5lUc0P0NkM3bVTBSNVE0y1lntyLs8O6LOkF7B1b0-tPIBxcO4Mn1M12iUloTnkPZXsBpcP8ZJzXZKacUuT9fKWFRrkBLPQMPj/s320/S7.1.jpeg",
    },
    {
      title: "Cement",
      price: "LKR 2000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjcrAZ_euy74tElWC6hesUy2b8l9fdMIN02r9vuSBrW_Kf2MDZIvj3nY8ju7Lcf1XtaURlsimBU4QOB0r9Mp8ZcFu9iDE2MHFZOyYK2ehflVaanpeGYzfI6IojaNoD8auSb7l74kGMaYHnKA8tFdpbmSwsi2Jr8VDKQ7QmR4COi63dD2P8Cpl1JT7BT4ayN/s320/S8.1.jpeg",
    },
    {
      title: "Reinforcement",
      price: "LKR 15000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFfxxxHFU-7_xlcH6h2lfxu0APqEsPzsQiWGxd8xz7n6i3scBsgzeTq-KSW0JgAEajChdYSdLgQDmv8ZlD32lQt7h-3UFCA02I1UzfR8PnrhEa4nBvUvYCl7lmBDtTzIKpbO7O32198ZlTKklMODN7m0fe0YI1LCQw63vnzfUF5ak2tzgggBbCIWygF55I/s320/S9.1.jpeg",
    },
    {
      title: "Bricks (1 per)",
      price: "LKR 10.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIpSwwYutzMgqk_-pIPbhyphenhyphenXYOpU293ohu2FerWxBuXyD2iI8WPCpklUjjAdHwntEPFT82bztqLzEzXy69_htnFjcokVezcX0e45PgZjgk_PZL95PuLtkm0MswE-W2q-qqXfjtPNJ4B_Nxlm1u7P2DiWW-Y6nfXXEzos01bH-aDwQMdbPh4kv0Q6BRlfE0V/s320/S1jpeg.jpeg",
    },
    {
      title: "Cement",
      price: "LKR 2900.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtja8W-rtFHT27X8czf6boWfyCRVZEJRcWDMW0ehaaDmyGIvyP4rDlffjJOqPGF1ZbJUakdjyU1DJfisDWZdO7gs4VfW_6zYfXjKim_9ZipWgVIPmH2lKdryvSNMreQkHZRDr3TYWajr7AOxg3tUxvmEvHSkiwZfYOBTceZfT1onm4LdPB4XxTXidIgvP4/s264/S10.jpeg",
      },
      {
        title: "Sand (1 cube)",
        price: "LKR 14000.00",
        img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCakUJXiXGKtwJKrECg9AMQKyiEnNl5u3TU9UpULbn0PGrMRzAwI6l2JY67HUgtrG1CYyuQQpQPHABxJTGcdo4mzDDmsiIRPbOHdI7W3K6oNTB3MeqcoXq7CwRfioLUeX6nAOU2RGYVMcnKlSZk-9Zr0OFUBUZyIyI_P52Gfzd77nFphNgEm_y6OEq-eQa/s320/S3.1.jpeg",
      },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="shop" style={{backgroundColor:"black", width:"100%"}}
    >
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

export default StructuralMaterials;
