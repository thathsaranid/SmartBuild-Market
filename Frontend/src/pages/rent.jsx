import React, { useState, useEffect } from "react";
import { machineAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import "../assets/css/rent.css";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import CategoryIcon from '@mui/icons-material/Category';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Rent = () => {
  const [machines, setMachines] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [sortOrder, setSortOrder] = useState("priceAsc");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Categories for the filter
  const categories = [
    "Earth-moving equipment",
    "Hauling vehicles",
    "Lifting equipment",
    "Specialized",
    "Material Handling",
    "Concrete Equipment",
    "Road Construction",
    "Compaction Equipment"
  ];

  // Fetch machines from API
  useEffect(() => {
    fetchMachines();
  }, []);

  // Apply filters and sort when any filter criteria changes
  useEffect(() => {
    applyFilters();
  }, [machines, searchTerm, selectedCategory, priceRange, sortOrder]);

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const response = await machineAPI.getAllMachines();
      console.log('Fetched machines data:', response);
      setMachines(response || []);
      setFilteredMachines(response || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError("Failed to load machine rentals. Please ensure the backend server is running at http://localhost:3001");
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let results = [...machines];

    // Apply search term filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(
        (machine) =>
          machine.brand.toLowerCase().includes(search) ||
          machine.model.toLowerCase().includes(search) ||
          machine.category?.toLowerCase().includes(search) ||
          machine.type?.toLowerCase().includes(search) ||
          machine.description.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter(
        (machine) => machine.category === selectedCategory
      );
    }

    // Apply price filter
    results = results.filter(
      (machine) => 
        parseInt(machine.price) >= priceRange[0] && 
        parseInt(machine.price) <= priceRange[1]
    );

    // Apply sorting
    if (sortOrder === "priceAsc") {
      results.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortOrder === "priceDesc") {
      results.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortOrder === "nameAsc") {
      results.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortOrder === "nameDesc") {
      results.sort((a, b) => b.brand.localeCompare(a.brand));
    }

    setFilteredMachines(results);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange([0, 100000]);
    setSortOrder("priceAsc");
    setFilteredMachines(machines);
  };

  const handleRentClick = (machine) => {
    navigate('/#contact');
  };

  const calculateRentalPrice = () => {
    if (!selectedMachine || !rentalDuration) return 0;
    
    const dailyRate = parseFloat(selectedMachine.dailyRate);
    if (isNaN(dailyRate)) return 0;
    
    let totalPrice = dailyRate * rentalDuration;
    
    // Apply discount for longer rentals
    if (rentalDuration > 7) {
      totalPrice = totalPrice * 0.9; // 10% discount for more than a week
    }
    
    return totalPrice.toLocaleString();
  };

  const handleRentalSubmit = (e) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    // Here you would integrate with a real payment system
    toast.success("Rental request submitted successfully! You'll receive a confirmation shortly.");
    setShowRentalForm(false);
    setSelectedMachine(null);
    setStartDate(null);
    setEndDate(null);
    setRentalDuration(1);
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case "Earth-moving equipment":
        return <ConstructionIcon className="category-icon" />;
      case "Hauling vehicles":
        return <LocalShippingIcon className="category-icon" />;
      case "Lifting equipment":
        return <HomeRepairServiceIcon className="category-icon" />;
      case "Material Handling":
        return <HomeRepairServiceIcon className="category-icon" />;
      default:
        return <CategoryIcon className="category-icon" />;
    }
  };

  // Helper function to render machine images from buffer data
  const renderMachineImage = (machine) => {
    if (machine.image && machine.image.data) {
      try {
        // Handle different types of data
        if (typeof machine.image.data === 'string') {
          // If it's a string (from mock data), return a placeholder
          return '/images/machine-placeholder.jpg';
        }
        
        // Handle array buffer and buffer object
        const buffer = machine.image.data.data || machine.image.data;
        
        // Convert buffer to base64
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        const contentType = machine.image.contentType || 'image/jpeg';
        return `data:${contentType};base64,${base64String}`;
      } catch (err) {
        console.error('Error processing image:', err);
        return '/images/machine-placeholder.jpg';
      }
    }
    
    return '/images/machine-placeholder.jpg';
  };

  return (
    <div className="rental-page">
      <section className="rental-hero">
        <div className="rental-hero-content">
          <h1>Construction Equipment Rental</h1>
          <p>Find the right equipment for your construction project</p>
          <div className="search-bar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterAltIcon />
              Filters
            </button>
          </div>
        </div>
      </section>

      <div className="rental-container">
        {/* Filter sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="filter-sidebar"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="filter-header">
                <h3>Filters</h3>
                <button onClick={() => setShowFilters(false)} className="close-filter">
                  &times;
                </button>
              </div>
              
              <div className="filter-section">
                <h4>Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-section">
                <h4>Price Range (LKR)</h4>
                <div className="price-inputs">
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
              </div>
              
              <div className="filter-section">
                <h4>Sort By</h4>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="nameAsc">Name: A to Z</option>
                  <option value="nameDesc">Name: Z to A</option>
                </select>
              </div>
              
              <button onClick={resetFilters} className="reset-filters">
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content - Machine listings */}
        <div className="machines-grid">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading machines...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchMachines}>Try Again</button>
            </div>
          ) : filteredMachines.length === 0 ? (
            <div className="no-results">
              <p>No machines found matching your criteria</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : (
            <>
              <div className="results-count">
                <p>
                  Showing {filteredMachines.length} out of {machines.length} machines
                </p>
        </div>
              
              <div className="machines-list">
                {filteredMachines.map((machine) => (
                  <div className="machine-card" key={machine._id} onClick={() => setSelectedMachine(machine)}>
                    <div className="machine-image">
                      <img 
                        src={renderMachineImage(machine)} 
                        alt={`${machine.brand} ${machine.model}`}
                        className="machine-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/machine-placeholder.jpg';
                        }}
                      />
                      <div className={`machine-status ${machine.availability}`}>
                        {machine.availability === 'available' ? 'Available' : machine.availability}
                      </div>
                    </div>
                    <div className="machine-info">
                      <h3>{machine.brand} {machine.model}</h3>
                      <div className="machine-details">
                        <div className="machine-type">
                          {getIconForCategory(machine.category)}
                          <span>{machine.type}</span>
                        </div>
                        <p className="machine-category">{machine.category}</p>
                      </div>
                      <div className="machine-specs">
                        {machine.country && (
                          <span className="spec-item">Origin: {machine.country}</span>
                        )}
                        {machine.year && (
                          <span className="spec-item">Year: {machine.year}</span>
                        )}
                      </div>
                      <div className="machine-price">
                        <PriceCheckIcon />
                        <span>LKR {machine.dailyRate || machine.price}/day</span>
                      </div>
                      <button className="rent-now-btn" onClick={(e) => {
                        e.stopPropagation();
                        handleRentClick(machine);
                      }}>
                        Rent Now
                      </button>
        </div>
            </div>
          ))}
        </div>
            </>
          )}
        </div>
      </div>

      {/* Machine Details Modal */}
      {selectedMachine && !showRentalForm && (
        <div className="modal-overlay" onClick={() => setSelectedMachine(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedMachine(null)}>
              &times;
            </button>
            
            <div className="machine-modal-content">
              <div className="machine-modal-image">
                <img
                  src={renderMachineImage(selectedMachine)}
                  alt={`${selectedMachine.brand} ${selectedMachine.model}`}
                />
              </div>
              
              <div className="machine-modal-details">
                <h2>{selectedMachine.brand} {selectedMachine.model}</h2>
                <p className="machine-category">
                  {getIconForCategory(selectedMachine.category)}
                  {selectedMachine.category} - {selectedMachine.type}
                </p>
                
                <div className="machine-specs">
                  <div className="spec-item">
                    <strong>Model Number:</strong> {selectedMachine.modelNumber}
                  </div>
                  <div className="spec-item">
                    <strong>Country of Origin:</strong> {selectedMachine.country}
                  </div>
                  <div className="spec-item">
                    <strong>Daily Rate:</strong> LKR {selectedMachine.price}
                  </div>
                  <div className="spec-item">
                    <strong>Availability:</strong> 
                    <span className={`availability ${selectedMachine.availability || 'available'}`}>
                      {selectedMachine.availability || 'Available'}
                    </span>
                  </div>
                </div>
                
                <div className="machine-description">
                  <h3>Description</h3>
                  <p>{selectedMachine.description}</p>
                </div>
                
                <div className="rental-conditions">
                  <h3>Rental Conditions</h3>
                  <p>{selectedMachine.rentalConditions || "Standard rental conditions apply. Security deposit required. The equipment must be returned in the same condition."}</p>
                </div>
                
                <div className="machine-modal-actions">
                  <button
                    className="rent-button"
                    onClick={() => handleRentClick(selectedMachine)}
                    disabled={selectedMachine.availability === 'unavailable'}
                  >
                    Proceed to Rent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rental Form Modal */}
      {selectedMachine && showRentalForm && (
        <div className="modal-overlay" onClick={() => setShowRentalForm(false)}>
          <div className="modal-content rental-form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowRentalForm(false)}>
              &times;
            </button>
            
            <h2>Rent {selectedMachine.brand} {selectedMachine.model}</h2>
            
            <form onSubmit={handleRentalSubmit} className="rental-form">
              <div className="form-group">
                <label>Rental Period</label>
                <div className="date-pickers">
                  <div className="date-picker-container">
                    <label>Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        if (endDate && date > endDate) {
                          setEndDate(null);
                        }
                        
                        if (endDate) {
                          const diffTime = Math.abs(endDate - date);
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          setRentalDuration(diffDays || 1);
                        }
                      }}
                      minDate={new Date()}
                      placeholderText="Select start date"
                      required
                    />
                  </div>
                  
                  <div className="date-picker-container">
                    <label>End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        
                        if (startDate) {
                          const diffTime = Math.abs(date - startDate);
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          setRentalDuration(diffDays || 1);
                        }
                      }}
                      minDate={startDate || new Date()}
                      placeholderText="Select end date"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Duration</label>
                <div className="duration-display">
                  <CalendarMonthIcon />
                  <span>{rentalDuration} {rentalDuration === 1 ? 'day' : 'days'}</span>
                </div>
              </div>
              
              <div className="rental-summary">
                <h3>Rental Summary</h3>
                <div className="summary-line">
                  <span>Daily Rate:</span>
                  <span>LKR {selectedMachine.dailyRate}</span>
                </div>
                <div className="summary-line">
                  <span>Duration:</span>
                  <span>{rentalDuration} {rentalDuration === 1 ? 'day' : 'days'}</span>
                </div>
                {rentalDuration > 7 && (
                  <div className="summary-line discount">
                    <span>Discount:</span>
                    <span>10% (weekly discount)</span>
                  </div>
                )}
                <div className="summary-line total">
                  <span>Total Price:</span>
                  <span>LKR {calculateRentalPrice()}</span>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-rental">
                  Confirm Rental
                </button>
                <button
                  type="button"
                  className="cancel-rental"
                  onClick={() => setShowRentalForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Reviews and Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            {[
              {
                stars: 5,
                text: "SmartBuild Market made our construction project so much easier! The rental process was smooth, and the vehicles were in excellent condition.",
                name: "Rohan D.",
                location: "Colombo",
                image: "images/profile-1.png"
              },
              {
                stars: 5,
                text: "We rented an excavator for our site, and it was delivered on time and worked perfectly. The customer support team was also very helpful.",
                name: "Kavindu P.",
                location: "Avissawella",
                image: "images/profile-2.png"
              },
              {
                stars: 5,
                text: "Finding construction vehicles at the best price was a challenge until we found SmartBuild Market. They offer a great selection and flexible rental options.",
                name: "Nimal S.",
                location: "Anuradhapura",
                image: "images/profile-3.png"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      
      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <h2>How to Rent Equipment</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse & Select</h3>
              <p>Browse our equipment catalog and select the machine you need for your project.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose Dates</h3>
              <p>Select your rental period with start and end dates that fit your project timeline.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Confirm & Pay</h3>
              <p>Review your order, make the payment, and receive your booking confirmation.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Receive Equipment</h3>
              <p>Get your equipment delivered to your site and start your project with confidence.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rent;
