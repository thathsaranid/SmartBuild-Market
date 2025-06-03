import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const FinishingMaterials = () => {
  const products = [
    {
      title: "Tile",
      price: "LKR 2400.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiMve0s-nKZZh01bON2t5IO5Hp6JPpMPQAaJrqbqaWH0gklfU-CmMM2d0LEz2-XSWvOzW0BLVL0eAifgqKioL25VTK7tMlHv14pzp9ogjbOBNO-Dc_6dW525j9kPs_X7yENZMpl7jZjWSBnT6fhyphenhyphenZ8sk-_YeyPwOcsVUg0q4Ns1VG9H6h2uWQOZWKET9jie/s320/F1.jpg",
    },
    {
      title: "Tile",
      price: "LKR 2500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiccNyiiSkDArULXck2vN8hzhLIO5RpfkRYSZE6FG6EL26ZtC5UQznfVrMX8dLfIze3m1eY2ZjU1uhktZvDGkTYrGvrt_27kqWrF25nhSzUgldfGsrI-Thoa5AqjLwzDOoLzwtYfUns187zfabjauN-jlg7eNCNgMJjKbh2WtCw4jLFekosL2hl4oCvH_B-/s320/F2.jpg",
    },
    {
      title: "Tile",
      price: "LKR 4900.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQJNaJLNM_hX0pqlE7Sog4xSo3OWeqP5knPx1RxoinqkUxzYDNg_wHgU3AnO7cfZE77VoeFBX7jTCzrwS4iDgfkvH-6OfV457O3SrT2IJ3OJDOmpUchb6WAxYUolDNJdz-t-jfImRSKKmTw38Wrj2eVNWZ_ttC3oI-JQoenj02-9-p7Bd9KpRRdZFR6Ygz/s320/F3.jpg",
    },
    {
      title: "Tile",
      price: "LKR 6900.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiWxC1MQjQy280AQZ3CcvOt8qRkeboTWM73nS2Aw4dupK7K1oQSY-U4EqRCZ5z-owe2Mq1AY5oYS1pOM1G10qxiKLGEnqjBZctD273QLM0iMJAZVeUJzfSrsCnX-EwiQTcYyIDj_oGHnThPuAnnmo4F36r94o0LQrQMcO6aNTRsJwGVAf0j637ZyEK54_p3/s320/F4.jpg",
    },
    {
      title: "Tile",
      price: "LKR 1000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsPwJhFdwc6tkNSqlpV75FS_gAqp8WsmeG40BnIIAMuRsHK0x_jSvePNR465Apr9LjmShs44B4b94Zm2AbJPM_U724KGu3Ixi6_ZzIJp5Mt658nfDD1Tf_wGY9yhyxvtpJZR1hyQRBT2m80SuX0pKS8v_R7J5LwhbdcNIbP8O76wYkZ6h94l9UNYfslFGG/s320/F5.jpg",
    },
    {
      title: "Tile",
      price: "LKR 5000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1V5FZlN5GdfgdKis4CY_qnfuXytoaiqqxMKUPHVikZke9hVgAiVzm9okC3u2RvRKg_1Qgv7XmhmxIQ-Z-U46PSfQGfVhsSEarx9BEE8H72H-IuB2lZrpgNJeCshYWMi9CpNaVRktdz7IlF3292nElT-cexSyVCoL4URoS3WQmnACUpQxCqCVpZMywOXQo/s320/F6.jpg",
    },
    {
      title: "Tile",
      price: "LKR 1900.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNSgPypi4z1HIV56y05LDM1kO6U0NxlZwmgAZ8Z4b2yWgMuKpCfD7DXLdv7BRvtSDnZ0bVTqwcBmCkInPgZ3jNVUmNVlT5-ydoD4Avghtz6J3ot7nWwZIba4qO-t-ePvYVZmGxyuYLL5iFFLraeWgHdJHhuC2J863067XGRrSq45htbQ9amtDsfzo4S7hJ/s320/F7.jpg",
    },
    {
      title: "Tile",
      price: "LKR 3500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCVJvNLwNu-9_9yXa1WkL-rMIstlCJvjoQFEyxZSxHnWDzrRYRxB6kwfM5yQiCkWPXy6oBJi-4K2Ni1V9rF1wn9_Quc5heVFj3DJNrGLWa3cdRuKXt0XohnQgh0DIRZWFNSHE44lOCJVBghWkZHPLVuTDqmd-9xZ8WJIA3x1iAfX8Th4Q11WKpGLMwcm_J/s320/F8.jpg",
    },
    {
      title: "Tile",
      price: "LKR 3000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhql83MeNweKRYV34rerGdHPGKW24wbETBcujnpMXuu_YFC66sKYCKyldSee8mIvnu1UK3kBS2hZxYxP63gFmTv9XmQQitB6syYxmI_e709MKbMHLcq6KEQ7xqDTNXzIH5_FJdkGGyfKNVoxE2dR5MHm7oYpm8WvB-6Lt0eNyMK5BZ4N3lmuTHKijIBBvj7/s320/F9.jpg",
    },
    {
      title: "Tile",
      price: "LKR 1900.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_oq8EBjEeieHtyFtp0LCUW5ca8QileAvi27P7xMBYZRJxtM3VR4AKPC3Ohj_Kl0VrU3dK93nJXuBs1nT1vbQEue71jqyeyj6HYqO6oehdNhWkAZSS8LF1yxOnUUgTMeVJvO7mW5V2SlHAeVvYUJBhyphenhyphenYsAoKO9RUpSLo0PGnMpoDQE88vaLNjTF-0CSEcS/s320/F10.jpg",
    },
    {
      title: "Tile",
      price: "LKR 3500.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnNlRxK_sP3F0xVKs6Vn84TU7Be3MkweiAgr9P-tXYFwqKqekFk1OdhXr4S-6_o7HcyIwbdXEUrOnj2YdF6-LrMH8kt7lBbFmVNE1YiQ4iqfDO65ea2lKBC0TG8csV78XvYcHg5o-O5xXQrRY55sqjyPGUNxg2e30StOiUmy6ShYZA8K6_p01VOXLr2k3i/s320/F11.jpg",
    },
    {
      title: "Tile",
      price: "LKR 3000.00",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnsYjUyRqXWHRvix2bmS9dya8LZCgiDakU2TTQx_IBY2_lBP0y7P7mku4EdPvM0T6xW29TSCktD-SqiV3GiYqAFLopBfTzMJQRZQbNbD11TyikRk22vcwf5IeEB4QiMz-24y7VZltD7K7IibqKA-K6Rj59TLJBIQwa1OzNkpW8v_2r60CDkhd0KtU62_RZ/s320/F12.jpg",
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

export default FinishingMaterials;
