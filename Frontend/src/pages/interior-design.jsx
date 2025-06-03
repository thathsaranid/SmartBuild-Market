import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../assets/css/interior-design.css";
import "../assets/css/interior-responsive.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";

const reviews = [
  {
    imgSrc: "images/Re1.png",
    text: '"Absolutely love the interior design pieces from SmartBuild Market! The quality is amazing, and they perfectly match my home\'s style. Highly recommend!"',
    name: "Sarah M.",
    stars: 4.5,
  },
  {
    imgSrc: "images/Re2.png",
    text: '"SmartBuild Market has transformed my home! The designs are beautiful and fit perfectly with my vision. Very satisfied with my purchase!"',
    name: "John D.",
    stars: 4.5,
  },
  {
    imgSrc: "images/Re3.png",
    text: '"The variety and quality at SmartBuild Market are exceptional! I found exactly what I needed to create a cozy and stylish space. Will definitely shop here again!"',
    name: "Emily R.",
    stars: 4.5,
  },
  {
    imgSrc: "images/Re4.png",
    text: '"SmartBuild Market offers the best selection of interior design pieces. The items are stylish, durable, and affordable. Highly recommend to anyone looking to upgrade their home!"',
    name: "Michael T.",
    stars: 4.5,
  },
  {
    imgSrc: "images/Re5.png",
    text: "\"I'm in love with the interior design items from SmartBuild Market! They've added the perfect touch of style and comfort to my home. Highly recommend!\"",
    name: "Jessica P.",
    stars: 4.5,
  },
  {
    imgSrc: "images/Re6.png",
    text: '"SmartBuild Market made it so easy to find beautiful, high-quality décor for my home. The pieces are exactly what I was looking for, and delivery was fast!"',
    name: "Daniel K.",
    stars: 4.5,
  },
];

const InteriorDesignPage = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/design/design');
        if (response.data.success) {
          setDesigns(response.data.data);
        } else {
          setError('Failed to fetch designs');
        }
      } catch (err) {
        console.error('Error fetching designs:', err);
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleAddToCart = (design) => {
    addToCart({
      id: design._id,
      title: design.name,
      price: design.discountPrice || design.price,
      img: `http://localhost:3001${design.mainImage}`,
      quantity: 1
    });
    toast.success(`${design.name} added to cart!`);
  };

  return (
    <div className="interior interior-design-page w-full">
      {/* Banner Section */}
      <section className="home" id="home">
        <div className="content">
          <h3>
            Welcome! <span>Find Cute & Cozy Decorations</span> To Make Your Home
            Shine
          </h3>
          <p>
            Welcome to a world of charm and coziness! Find the perfect
            decorations to make your home warm, stylish, and full of love.
          </p>
          <a href="#products" className="btn">
            Shop Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container-custom" id="features">
        <h1 className="heading">
          Our <span>Features</span>
        </h1>

        <div className="box-container">
          <div className="box">
            <img src="images/feature-img-1.png" alt="Cozy Decorations" />
            <h3>Cute & Cozy Decorations</h3>
            <p>
              Discover the cutest and coziest decorations to make your home feel
              warm and inviting. From soft textures to charming designs, create
              a space that brings comfort and joy every day.
            </p>
            <a href="#" className="btn">
              Read More
            </a>
          </div>

          <div className="box">
            <img src="images/feature-img-2.png" alt="Free Delivery" />
            <h3>Free Delivery Service</h3>
            <p>
              Enjoy hassle-free shopping with our free delivery service. Get
              your favorite items delivered straight to your doorstep at no
              extra cost.
            </p>
            <a href="#" className="btn">
              Read More
            </a>
          </div>

          <div className="box">
            <img src="images/feature-img-3.png" alt="Easy Payments" />
            <h3>Easy Payments</h3>
            <p>
              Shopping is now more convenient with our easy payment options.
              Choose from multiple secure methods and complete your purchase
              smoothly and effortlessly.
            </p>
            <a href="#" className="btn">
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products container-custom" id="products">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Our <span className="text-yellow-500">Products</span>
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Try Again
            </button>
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p>No design products available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {designs.map((design) => (
              <div key={design._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={`http://localhost:3001${design.mainImage}`}
                    alt={design.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  {design.discountPrice && design.discountPrice < design.price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {Math.round(((design.price - design.discountPrice) / design.price) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{design.name}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{design.description}</p>
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star${i < Math.floor(design.rating || 4) ? '' : '-o'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({design.rating || 4})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {design.discountPrice && design.discountPrice < design.price ? (
                        <div className="flex items-center">
                          <span className="text-gray-400 line-through mr-2">
                            LKR {design.price.toFixed(2)}
                          </span>
                          <span className="text-primary font-bold">
                            LKR {design.discountPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-primary font-bold">
                          LKR {design.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(design)} 
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="categories bg-gray-50 py-16" id="categories">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Our <span className="text-yellow-500">Categories</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="h-64 flex items-center justify-center">
                <img src="images/C1.png" alt="Historic Formal Type" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mt-4">Historic Formal Type</h3>
              <p className="text-gray-600 mt-2">Elegant historic formal designs for a timeless interior.</p>
              <Link to="/historic-formal" className="btn mt-4 inline-block">
                Shop Now
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="h-64 flex items-center justify-center">
                <img src="images/C2.png" alt="Casual & Comforting Type" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mt-4">Casual & Comforting Type</h3>
              <p className="text-gray-600 mt-2">Relaxed and cozy designs for a comfortable home.</p>
              <Link to="/casual" className="btn mt-4 inline-block">
                Shop Now
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="h-64 flex items-center justify-center">
                <img src="images/C3.png" alt="Relaxed Modern Type" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mt-4">Relaxed Modern Type</h3>
              <p className="text-gray-600 mt-2">Sleek, stylish, and effortlessly comfortable modern design.</p>
              <Link to="/relaxed" className="btn mt-4 inline-block">
                Shop Now
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="h-64 flex items-center justify-center">
                <img src="images/C4.png" alt="Traditional Builder's Brick Type" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mt-4">Traditional Builder's Brick Type</h3>
              <p className="text-gray-600 mt-2">Classic brick designs for a timeless and sturdy home.</p>
              <Link to="/traditional" className="btn mt-4 inline-block">
                Shop Now
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="h-64 flex items-center justify-center">
                <img src="images/C5.png" alt="Sophisticated Serene Type" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mt-4">Sophisticated Serene Type</h3>
              <p className="text-gray-600 mt-2">Elegant and serene designs for a sophisticated living space.</p>
              <Link to="/sophisticated" className="btn mt-4 inline-block">
                Shop Now
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="h-64 flex items-center justify-center">
                <img src="images/C6.png" alt="Farmhouse Fresh Type" className="max-h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold mt-4">Farmhouse Fresh Type</h3>
              <p className="text-gray-600 mt-2">Rustic charm meets modern comfort for a fresh farmhouse feel.</p>
              <Link to="/farmhouse" className="btn mt-4 inline-block">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="review py-16" id="review">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-12 text-center">
            Customer <span className="text-yellow-500">Reviews</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                  <img 
                    src={review.imgSrc} 
                    alt={`Review by ${review.name}`} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <p className="text-gray-600 text-lg mb-6">{review.text}</p>
                <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
                <div className="flex justify-center text-yellow-400 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star${
                        i < Math.floor(review.stars) ? "" : "-half"
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteriorDesignPage;
