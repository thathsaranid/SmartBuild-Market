import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const Farmhouse = () => {
  const products = [
    {
      title: "Wood Bench",
      price: "LKR 20000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVD1dq_2aHL-N27aFLDUnck-irUVwTIpxVN67_4rY_jaSjsC9ZOmcFwPSTbJPdPcJdHuNUs8WqLPup8K6en0nUXwGHjgLUJCgJNvgoK-t_pIhLH3_FhK7F8WTxrIFi8um7uEu_LlCb2u2tibVgbxH56LbViABKOBsiAEkCTpwrO7n7_WvQsdDcvcoSqabA/s320/F1.jpeg",
    },
    {
      title: "Click Wall",
      price: "LKR 25000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDJ2AKK4_pS-JxHf9csU04FofdaWo5lzI6C1gm9lbaOEoOR5CTcnjPykyyhzf4_tDF-r38QxzTdo7K53ip2hyphenhyphenlBLa1u4bHZQJounuOJjfFph_vLRsc7lblF2B5QAai54kQBgaONF4u7c_cejz516FfUN-WmowzNVSVDuN59qr_769ZGfQe6HXVeJx-6Mmx/s320/F2.jpeg",
    },
    {
      title: "Wood Cupboard",
      price: "LKR 49000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfWa_ohNZobrPEPJW8Jg5RDvSDOhLTX2FL3MhKGcuCENk-e7WjjqSj19iVAn9Xjl_SBXQIdLD4Ph1YipL8aMsBP0UilJPekMo0mwa9g7KhuqNiqMoUT-gz2qjc7ER0EfnblN-C0q-WwkOkVN331_7Le13XUu0Tvs8M0U_qP57bnVzu8C9I0K_vp7r08uCP/s320/F3.jpeg",
    },
    {
      title: "Table with Chair",
      price: "LKR 69000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGw8RFfUyVx5kZThrnlOARIaSNZDfwFsr3cpGsYvcUpTVFss4oT77G_kdRyjTDcwOgos9_xNCknemEnFWh8XPR4RlX-wuA6eqgZrgd-waPZgVXR7VeFZeJlzB6xFMLlbShAB0b2JIiySzEMgguoJmCq4Ecky14jGVnSR2_HVUH7YHE2fIEBJw8MSZjYRRP/s320/F4.jpeg",
    },
    {
      title: "Colourful Table Deco Set",
      price: "LKR 10000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUaQ580QgwMFEokCsE5Sj5v_EtT9LUzXh5VaZX3t_6rIadtaruwP0bxkE04oSZ8LB3pQNc_Mqhn99DDnynSUCTT4XQC0OJsCfHfTpOvkF5n6D9qkGcGMHsRdSKC1E6L5dAVtyrWSWKT5a4LPGYWpij2oBTrryIH4Wu5uSgJxobTwYp96r0jWSiBr7QsWh3/s320/F5.jpeg",
    },
    {
      title: "Coffee Table Deco set",
      price: "LKR 5000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPc1uv3vOf3RlsUIXiiBqKV9TzvAz_mopBP2wy4dHQ1wdgCOzzyTSxvjuD3IfxsMw_nXQwZg5QCHB5xPCdWaAVf1mdkTdSjQ3t066ViGbSPSu2_9dLFhCE8k3ChCMBmr1Z_E46Mj9o9HZeb04_6Bu3Hmwl_rtzTdLhulK7eXdqLVJI1KYZ4MUbtL2K4IAH/s320/F6.jpeg",
    },
    {
      title: "Wood Kitchen Item Set",
      price: "LKR 19000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfbnzt7WMwv8hj0jOsmhYXNj1C2ZGsusRNaHwShY6Z0NpX4cqNRfxNNOkRkNVnrpDDpZLy8c4PXphKs9VbRoKb2ycUX0iQuN_lnnUMSHKpUGCFQ9yfmrCbM9XNv-OBKpgBRBNRerf0Ec1UvVIL_31yIUaG5c-nj1vkYSMm8uJBYcPQmmJRx3u1v3TMqtUX/s320/F7.jpeg",
    },
    {
      title: "Dressing Table",
      price: "LKR 35000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJovzYXPgq_bpHIUxS59e-rp3kX2cI0GLeNs6flAbqShElUzS1wia5xgdYL1_wMmDZe7SuPhicLRCAB5RykSkvihHvH4PV7D6-S9ZkakHllddKbcWsZqXfYU4YuUHGf3wjlbPgUaBmtqgjO3jxHfJKnFkyYNoSGEX9V64YrsHeweNs4LXUZof59Fip9BVh/s320/F8.jpeg",
    },
    {
      title: "Book Store Cupboard",
      price: "LKR 30000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGLR1mPvUaTZk8GXt-ZK9InsRHyxiUHoMDWlY8MCw-jt350JKaBHeZ2L7zAS397rOP_Jku3f2NxLrN_I6ZdCBvHw1irjARgMj8rNzP8sDROD8YdkPJJzm8z_Un63oDGJ59O2YTRiWRl8GBDNSglUjS7vD2dyOoI6yDlOkxG25Lh2GNyLadAByEv50a33MM/s320/F9.jpeg",
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

export default Farmhouse;
