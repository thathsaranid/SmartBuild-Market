import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { cartItems, removeFromCart, getTotal } = useContext(CartContext);
  const { currentUser, login, register, logout } = useAuth();
  
  const [navbarActive, setNavbarActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [registerActive, setRegisterActive] = useState(false);
  const [contactInfoActive, setContactInfoActive] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumb, setPhoneNumb] = useState("");
  // role is set directly in the register function

  useEffect(() => {}, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarActive(false);
      setSearchActive(false);
      setLoginActive(false);
      setContactInfoActive(false);
      setCartVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    
    try {
      await login(email, password);
      setLoginActive(false);
      // Clear form data
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    
    try {
      // Split name into firstName and lastName
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : " "; // Ensure lastName is never empty
      
      await register({
        firstName,
        lastName,
        email,
        phoneNumb,
        password,
        role: "user" // Explicitly set role
      });
      
      setRegisterActive(false);
      // Clear form data
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumb("");
    } catch (error) {
      setRegisterError(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          SmartBuild <span> Market</span>
        </a>

        <nav className={`navbar ${navbarActive ? "active" : ""}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Service</a>
          <a href="#projects">Projects</a>
          <a href="#pricing">Pricing</a>
          <a href="#blogs">Blogs</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <>
            <div
              id="menu-btn"
              className="fas fa-bars"
              onClick={() => {
                setNavbarActive(!navbarActive);
                setSearchActive(false);
                setLoginActive(false);
                setRegisterActive(false);
              }}
            ></div>
            <div
              id="info-btn"
              className="fas fa-info-circle"
              onClick={() => {
                setContactInfoActive(!contactInfoActive);
                setLoginActive(false);
                setRegisterActive(false);
                setSearchActive(false);
              }}
            ></div>
            <div
              id="search-btn"
              className="fas fa-search"
              onClick={() => {
                setSearchActive(!searchActive);
                setNavbarActive(false);
                setLoginActive(false);
                setRegisterActive(false);
              }}
            ></div>
            {currentUser ? (
              <div
                id="user-btn"
                className="fas fa-user-circle"
                onClick={handleLogout}
                title="Logout"
              ></div>
            ) : (
              <div
                id="login-btn"
                className="fas fa-user"
                onClick={() => {
                  setLoginActive(!loginActive);
                  setNavbarActive(false);
                  setSearchActive(false);
                  setRegisterActive(false);
                }}
              ></div>
            )}
            <div
              id="cart-icon"
              className="fas fa-shopping-cart"
              onClick={() => setCartVisible(!cartVisible)}
              data-quantity={cartItems.length}
            >
              {cartItems.length > 0 && (
                <span className="cart-count" style={{ paddingLeft: "8px" }}>
                  {cartItems.length}
                </span>
              )}
            </div>
          </>
        </div>
        {contactInfoActive && (
          <div className={`contact-info ${contactInfoActive ? "active" : ""}`}>
            <div
              id="close-contact-info"
              className="fa fa-times"
              onClick={() => setContactInfoActive(false)}
            ></div>

            <div className="info">
              <i className="fas fa-phone"></i>
              <h3>phone number</h3>
              <p>+94 76 470 5801</p>
              <p>+94 77 808 1873</p>
            </div>

            <div className="info">
              <i className="fas fa-envelope"></i>
              <h3>email address</h3>
              <p>SmartBuildMarket@gmail.com</p>
            </div>

            <div className="info">
              <i className="fas fa-map-marker-alt"></i>
              <h3>office address</h3>
              {/* Sri Lankan location names preserved as is */}
              <p>37/2 Rathnapura Road, Madola, Avissawella</p>
            </div>

            <div className="share">
              <a href="#" className="fab fa-facebook-f"></a>
              <a href="#" className="fab fa-twitter"></a>
              <a href="#" className="fab fa-instagram"></a>
              <a href="#" className="fab fa-linkedin"></a>
            </div>
          </div>
        )}
        {searchActive && (
          <form
            action=""
            className={`search-form ${searchActive ? "active" : ""}`}
          >
            <input
              type="search"
              name=""
              placeholder="search here ..."
              id="search-box"
            />
            <label for="search-box" className="fas fa-search"></label>
          </form>
        )}

        {loginActive && !currentUser && (
          <form
            onSubmit={handleLogin}
            className={`login-form ${loginActive ? "active" : ""}`}
          >
            <h3>Login Form</h3>
            {loginError && <div className="error-message">{loginError}</div>}
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="box"
              required
            />
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="box"
              required
            />
            <div className="flex">
              <input type="checkbox" name="" id="remember-me" />
              <label htmlFor="remember-me">remember me</label>
              <a href="#">forgot password?</a>
            </div>
            <input
              type="submit"
              value="login now"
              className="btn"
              id="SignInBtn"
            />
            <p>
              don't have an account
              <button
                type="button"
                onClick={() => {
                  setLoginActive(false);
                  setRegisterActive(true);
                  setSearchActive(false);
                  setContactInfoActive(false);
                }}
              >
                create one!
              </button>
            </p>
          </form>
        )}

        {registerActive && !currentUser && (
          <form
            onSubmit={handleRegister}
            className={`register-form ${registerActive ? "active" : ""}`}
          >
            <h3>Register Form</h3>
            {registerError && <div className="error-message">{registerError}</div>}
            <input
              type="text"
              placeholder="enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="box"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              className="box"
              required
            />
            <input
              type="tel"
              value={phoneNumb}
              onChange={(e) => setPhoneNumb(e.target.value)}
              placeholder="enter your phone number"
              className="box"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter your password"
              className="box"
              required
            />
            <input type="submit" value="register now" className="btn" />
            <p>
              already have an account?
              <button
                type="button"
                onClick={() => {
                  setRegisterActive(false);
                  setLoginActive(true);
                }}
              >
                login now
              </button>
            </p>
          </form>
        )}
      </header>

      {cartVisible && (
        <div
          className={`cart ${cartVisible ? "active" : ""}`}
          style={{ marginTop: "8rem" }}
        >
          <div id="close-cart" onClick={() => setCartVisible(false)}>
            &times;
          </div>
          <h4 className="cart-title">Your Cart</h4>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-box">
                  <img src={item.img} alt={item.title} className="cart-img" />
                  <div className="detail-box">
                    <span className="cart-product-title">{item.title}</span>
                    <span className="cart-price">{item.price}</span>
                    <div className="cart-quantity">
                      <input type="number" value={item.quantity} min="1" />
                    </div>
                  </div>
                  <div
                    className="cart-remove"
                    onClick={() => removeFromCart(item.title)}
                  >
                    &times;
                  </div>
                </div>
              ))}
              <div className="total">
                <div className="total-title">Total</div>
                <div className="total-price">LKR {getTotal()}</div>
              </div>
              <button className="btn-buy">Pay Now</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
