import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { materialAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedIcon from '@mui/icons-material/Verified';

// Register Swiper modules
import SwiperCore from 'swiper';
SwiperCore.use([Navigation, Pagination, Autoplay]);

// Fallback products moved outside component
const fallbackProducts = [];

const Material = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Materials" },
    { value: "structural", label: "Structural Materials" },
    { value: "electrical", label: "Electrical Supplies" },
    { value: "plumbing", label: "Plumbing Materials" },
    { value: "finishing", label: "Finishing Materials" },
    { value: "safety", label: "Safety Equipment" },
    { value: "tools", label: "Tools & Hardware" },
  ];

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  // Fetch products only once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await materialAPI.getAllMaterials();
        
        const formattedProducts = Array.isArray(data) ? data.map(material => {
          let imageUrl = 'images/default-product.png';
          
          if (material.image && material.image.data) {
            try {
              const buffer = material.image.data.data || material.image.data;
              const base64String = btoa(
                Array.from(new Uint8Array(buffer))
                  .map(byte => String.fromCharCode(byte))
                  .join('')
              );
              const contentType = material.image.contentType || 'image/jpeg';
              imageUrl = `data:${contentType};base64,${base64String}`;
            } catch (err) {
              console.error('Error processing image:', err);
            }
          }
          
          return {
            _id: material._id,
            name: material.material || 'Unknown Material',
            title: material.material || 'Unknown Material',
            category: material.materialType || 'general',
            price: parseFloat(material.price) || 0,
            supplier: material.supplierName || 'Unknown Supplier',
            dateAdded: material.dateAdded || new Date().toISOString().split('T')[0],
            description: `${material.materialType || 'Construction'} - Supplied by ${material.supplierName || 'Unknown'}`,
            rating: 4,
            quantity: 100,
            img: imageUrl,
            image: imageUrl
          };
        }) : [];
        
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setError("Failed to load materials. Please try again later.");
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array since we only want to fetch once

  // Memoize the filter and sort logic
  useEffect(() => {
    const applyFiltersAndSort = () => {
      let result = [...products];
      
      if (category !== "all") {
        result = result.filter(product => 
          product.category?.toLowerCase() === category.toLowerCase() ||
          product.materialType?.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        result = result.filter(product => 
          product.title?.toLowerCase().includes(term) || 
          product.name?.toLowerCase().includes(term) || 
          product.material?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.materialType?.toLowerCase().includes(term) ||
          product.supplierName?.toLowerCase().includes(term)
        );
      }
      
      result = result.filter(product => {
        const price = typeof product.price === 'string' 
          ? parseFloat(product.price.replace(/[^\d.]/g, "")) 
          : product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      });
      
      switch(sort) {
        case "price-low":
          result.sort((a, b) => {
            const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^\d.]/g, "")) : a.price;
            const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^\d.]/g, "")) : b.price;
            return priceA - priceB;
          });
          break;
        case "price-high":
          result.sort((a, b) => {
            const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^\d.]/g, "")) : a.price;
            const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^\d.]/g, "")) : b.price;
            return priceB - priceA;
          });
          break;
        case "name-asc":
          result.sort((a, b) => (a.title || a.name || a.material || "").localeCompare(b.title || b.name || b.material || ""));
          break;
        case "name-desc":
          result.sort((a, b) => (b.title || b.name || b.material || "").localeCompare(a.title || a.name || a.material || ""));
          break;
        default:
          break;
      }
      
      setFilteredProducts(result);
    };

    applyFiltersAndSort();
  }, [category, searchTerm, sort, priceRange, products]); // Only re-run when these values change

  // Reset filters
  const handleResetFilters = () => {
    setCategory("all");
    setSearchTerm("");
    setSort("featured");
    setPriceRange([0, 50000]);
  };

  // Render product grid with motion animations
  const renderProducts = () => {
    if (loading) {
      return (
        <motion.div 
          className="flex justify-center items-center min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Try Again
          </button>
        </motion.div>
      );
    }

    if (filteredProducts.length === 0) {
      return (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-2xl font-bold mb-2">No products found</div>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button 
            onClick={handleResetFilters}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Reset Filters
          </button>
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div 
              key={product._id} 
              variants={itemVariants}
              layout
            >
              <ProductCard
                product={{
                  _id: product._id,
                  title: product.name || product.material,
                  price: product.price,
                  image: product.img,
                  description: product.description,
                  rating: product.rating,
                  quantity: product.quantity || 10
                }}
                addToCart={() => addToCart(product)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      role: "Construction Manager",
      text: "Excellent quality materials and prompt delivery. The customer service was outstanding!",
      rating: 5,
      avatar: "/images/user1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Interior Designer",
      text: "Great selection of materials for all my interior design projects. Very reliable supplier!",
      rating: 5,
      avatar: "/images/user2.jpg"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Contractor",
      text: "Best prices in the market and the quality is always consistent. Highly recommended!",
      rating: 5,
      avatar: "/images/user3.jpg"
    }
  ];

  // Update the Reviews section
  const renderReviews = () => (
    <motion.section 
      className="review py-16 bg-gray-50" 
      id="review"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our <span className="text-primary">Customers</span> Say
        </h2>

        <div className="reviews-slider">
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{review.name}</h3>
                      <p className="text-gray-600 text-sm">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  <div className="text-yellow-400 text-lg">
                    {"★".repeat(review.rating)}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-neutral text-white py-20 md:py-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url(/images/banner-1.png)" }}
        ></div>
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Quality Building Materials for Every Project
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              Find the perfect materials for your construction needs. From structural elements to finishing touches, we have everything to build your vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="btn-primary text-center px-8 py-3 rounded-md">
            Shop Now
          </a>
              <button onClick={() => setShowFilters(!showFilters)} className="btn-outline border-white text-white hover:bg-white hover:text-neutral px-8 py-3 rounded-md">
                Browse Categories
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                <VerifiedIcon fontSize="large" />
              </div>
              <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the highest quality materials from trusted suppliers for your projects.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                <LocalShippingIcon fontSize="large" />
              </div>
              <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery service to get your materials when you need them.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                <AttachMoneyIcon fontSize="large" />
              </div>
              <h3 className="font-bold text-xl mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">Get the best value for your money with our fair and transparent pricing.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                <SupportAgentIcon fontSize="large" />
              </div>
              <h3 className="font-bold text-xl mb-2">Expert Support</h3>
              <p className="text-gray-600">Our knowledgeable team is always ready to assist with your questions and needs.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section 
        id="products" 
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Products</h2>
              <p className="text-gray-600">Find the perfect materials for your construction project</p>
            </div>

            {/* Search Bar */}
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            </div>

          {/* Filters and Products */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-1/4 bg-white p-6 rounded-lg shadow-sm ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={handleResetFilters} className="text-primary text-sm hover:text-primary-dark">
                  Reset All
              </button>
            </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <CategoryIcon className="mr-2 text-gray-500" fontSize="small" />
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.value} className="flex items-center">
                      <input 
                        type="radio" 
                        id={cat.value} 
                        name="category"
                        checked={category === cat.value}
                        onChange={() => setCategory(cat.value)}
                        className="mr-2 text-primary focus:ring-primary"
                      />
                      <label htmlFor={cat.value} className="text-sm cursor-pointer">
                        {cat.label}
                      </label>
              </div>
                  ))}
            </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <AttachMoneyIcon className="mr-2 text-gray-500" fontSize="small" />
                  Price Range
                </h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">LKR {priceRange[0]}</span>
                  <span className="text-sm text-gray-500">LKR {priceRange[1]}</span>
            </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

              {/* Sort By */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <SortIcon className="mr-2 text-gray-500" fontSize="small" />
                  Sort By
                </h4>
                <select 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
              {renderProducts()}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get all the building materials you need delivered right to your doorstep. Quality materials, competitive prices, and excellent service.
          </p>
          <button className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors">
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Reviews Section */}
      {renderReviews()}
    </div>
  );
};

export default Material;
