import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default image if product image is not available
  const defaultImage = '/images/material-placeholder.jpg';
  
  // Convert product.image to URL if it's a buffer/binary data
  const getImageUrl = () => {
    // If product has img property already processed
    if (product.img) return product.img;
    
    // If product has no image data
    if (!product.image) return defaultImage;
    
    // If image is already a string URL
    if (typeof product.image === 'string') return product.image;
    
    // If image is an object with data and contentType (from MongoDB)
    if (product.image.data) {
      try {
        // If data is already a base64 string
        if (typeof product.image.data === 'string' && product.image.data.startsWith('data:')) {
          return product.image.data;
        }
        
        // Convert buffer data to base64
        const buffer = product.image.data.data || product.image.data;
        let base64String;
        
        if (buffer instanceof Uint8Array) {
          base64String = btoa(String.fromCharCode.apply(null, buffer));
        } else if (typeof Buffer !== 'undefined' && buffer instanceof Buffer) {
          base64String = Buffer.from(buffer).toString('base64');
        } else {
          // Fallback method for other array-like objects
          base64String = btoa(
            new Uint8Array(buffer).reduce(
              (data, byte) => data + String.fromCharCode(byte), 
              ''
            )
          );
        }
        
        const contentType = product.image.contentType || 'image/jpeg';
        return `data:${contentType};base64,${base64String}`;
      } catch (err) {
        console.error('Error processing image:', err);
        return defaultImage;
      }
    }
    
    return defaultImage;
  };
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const imageUrl = getImageUrl();
    const productName = product.title || product.name || 'Product';
    const productPrice = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(/[^\d.]/g, "")) 
      : product.price;
    
    addToCart({
      id: product._id,
      title: productName,
      price: productPrice || 0,
      img: imageUrl,
      quantity: 1
    });
  };
  
  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="text-yellow-500 text-sm" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalfIcon key={i} className="text-yellow-500 text-sm" />);
      } else {
        stars.push(<StarOutlineIcon key={i} className="text-yellow-500 text-sm" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  // Stock status display
  const getStockStatus = () => {
    const quantity = product.quantity || 0;
    
    if (quantity <= 0) {
      return <span className="text-red-500 text-xs font-medium">Out of Stock</span>;
    } else if (quantity <= 10) {
      return <span className="text-orange-500 text-xs font-medium">Low Stock</span>;
    } else {
      return <span className="text-green-600 text-xs font-medium">In Stock</span>;
    }
  };
  
  return (
    <motion.div 
      className="h-full w-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image with Overlay */}
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={getImageUrl()} 
            alt={product.title || product.name} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
          />
          
          {/* Price tag */}
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-primary-dark font-semibold text-sm shadow-sm">
            LKR {product.price?.toLocaleString() || '0'}
          </div>
          
          {/* Quick actions overlay */}
          <div 
            className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Link 
              to={`/product/${product._id}`}
              className="p-2 bg-white rounded-full text-neutral hover:text-primary hover:shadow-md transition-all"
              title="View Details"
            >
              <VisibilityIcon />
            </Link>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-primary rounded-full text-white hover:bg-primary-dark hover:shadow-md transition-all"
              disabled={product.quantity === 0}
              title="Add to Cart"
            >
              <ShoppingCartIcon />
            </button>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Category */}
          {product.category && (
            <span className="inline-block text-xs text-gray-500 mb-1">
              {product.category}
            </span>
          )}
          
          {/* Product Title */}
          <Link to={`/product/${product._id}`}>
            <h3 className="font-medium text-base text-neutral-800 mb-1 hover:text-primary transition-colors">
              {product.title || product.name}
            </h3>
          </Link>
          
          {/* Product Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {product.description || "Premium construction material for your building needs."}
          </p>
          
          {/* Product Rating and Stock */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                {product.rating && (
                  <span className="text-xs text-gray-500">({product.rating})</span>
                )}
              </div>
              {getStockStatus()}
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors ${
                product.quantity === 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
              disabled={product.quantity === 0}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>{product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 