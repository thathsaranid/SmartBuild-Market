import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { 
  HiOutlineShoppingCart, 
  HiOutlineMagnifyingGlass, 
  HiOutlineUser, 
  HiArrowRightOnRectangle, 
  HiOutlineCog6Tooth,
  HiXMark
} from 'react-icons/hi2';

const NavbarComponent = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, getTotal } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
        { name: 'Materials', path: '/material' },
        { name: 'Machine Rent', path: '/rent' },
    { name: 'Jobs', path: '/all-jobs' },
        { name: 'Interior Design', path: '/interior-design' },
        { name: 'About', path: '/#about' },
        { name: 'Contact', path: '/#contact' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-primary">
              SmartBuild<span className="text-yellow-500">Market</span>
            </a>
          </div>

            {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={`nav-${item.path}-${index}`}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-yellow-500'
                    : 'text-gray-700 hover:text-yellow-500'
                }`}
                            >
                              {item.name}
              </a>
                          ))}
                        </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button 
              onClick={() => setSearchActive(!searchActive)}
              className="p-2.5 rounded-full text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 transition-colors duration-200"
              aria-label="Search"
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
              </button>

              {/* Cart Button */}
              <button 
              onClick={() => setCartVisible(!cartVisible)}
              className="p-2.5 rounded-full text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 transition-colors duration-200 relative"
              aria-label="Shopping Cart"
              >
              <HiOutlineShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

            {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2.5 rounded-full text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 transition-colors duration-200"
                  aria-label="User Menu"
                >
                  <HiOutlineUser className="h-5 w-5" />
                  </button>
              
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name || user.firstName}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {user.role === 'admin' && (
                        <button
                          onClick={() => navigate('/admin')}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-500 transition-colors duration-200"
                        >
                          <HiOutlineCog6Tooth className="mr-3 h-5 w-5" />
                          Admin Dashboard
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-500 transition-colors duration-200"
                      >
                        <HiOutlineUser className="mr-3 h-5 w-5" />
                        Profile
                      </button>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-500 transition-colors duration-200"
                      >
                        <HiArrowRightOnRectangle className="mr-3 h-5 w-5" />
                        Sign out
                      </button>
                    </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2.5 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 text-sm font-medium transition-colors duration-200"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Cart Sidebar */}
      {cartVisible && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Cart</h2>
                          <button
                onClick={() => setCartVisible(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                          >
                <HiXMark className="h-5 w-5" />
                          </button>
                        </div>
                    </div>

          <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <HiOutlineShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={`cart-item-${item.id}-${index}`} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg">
                    <img 
                      src={item.img || item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">LKR {item.price}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                          </div>

          {cartItems.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">LKR {getTotal()}</span>
                      </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Proceed to Checkout
              </button>
                    </div>
                  )}
                </div>
              )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={`mobile-nav-${item.path}-${index}`}
                href={item.path}
                className={`block px-4 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-yellow-500 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
              >
                {item.name}
              </a>
                    ))}
                  </div>
                </div>
              )}
    </nav>
  );
};

export default NavbarComponent; 