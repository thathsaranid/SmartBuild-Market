import "../assets/css/job.css";
import "../assets/css/job-responsive.css";
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import { jobAPI } from "../services/api";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterListIcon from '@mui/icons-material/FilterList';
import { toast } from "react-toastify";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    salary: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

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

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 120 }
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getAllJobs(filters);
        
        // Check if we got an array of jobs directly
        if (Array.isArray(response)) {
          setJobs(response);
          // Check if we're using mock data
          if (response.length > 0 && response[0]._id.startsWith('mock-')) {
            setUsingMockData(true);
          }
        } 
        // Check for common API response patterns
        else if (response && response.data && Array.isArray(response.data)) {
          setJobs(response.data);
        }
        // If we still don't have valid jobs, use fallback
        else {
          console.warn('Unexpected response format from jobs API:', response);
          setJobs(fallbackJobs);
          setUsingMockData(true);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(`Failed to load jobs: ${err.message || 'Unknown error'}`);
        
        // Use fallback jobs if API fails
        setJobs(fallbackJobs);
        setUsingMockData(true);
        
        // Show toast notification
        toast.error("Could not connect to job server. Showing placeholder data instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const fallbackJobs = [
    {
      _id: "1",
      jobTitle: "Plumber",
      company: "Nimna Holdings (pvt)Ltd",
      location: "Avissawella, Sri Lanka",
      salary: "30,000 - 60,000",
      jobType: "Part-Time",
      image: "images/icon-6.png",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      skills: ["Plumbing", "Maintenance", "Repair"],
      jobDescription: "We are looking for an experienced plumber to join our team. The ideal candidate should have experience in residential and commercial plumbing services."
    },
    {
      _id: "2",
      jobTitle: "Electrician",
      company: "Lanka Electric Co",
      location: "Colombo, Sri Lanka",
      salary: "40,000 - 70,000",
      jobType: "Full-Time",
      image: "images/icon-7.png",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      skills: ["Electrical", "Wiring", "Maintenance"],
      jobDescription: "Seeking a licensed electrician with at least 3 years of experience. Must be familiar with residential and commercial electrical systems."
    },
    {
      _id: "3",
      jobTitle: "Construction Worker",
      company: "Build Right Construction",
      location: "Kandy, Sri Lanka",
      salary: "25,000 - 45,000",
      jobType: "Full-Time",
      image: "images/icon-8.png",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      skills: ["Construction", "Physical Labor", "Equipment Operation"],
      jobDescription: "Looking for hardworking construction workers to join our growing team. Experience with construction equipment and tools is a plus."
    },
    {
      _id: "4",
      jobTitle: "Interior Designer",
      company: "Elegant Interiors",
      location: "Galle, Sri Lanka",
      salary: "50,000 - 90,000",
      jobType: "Contract",
      image: "images/icon-9.png",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      skills: ["Interior Design", "AutoCAD", "3D Modeling"],
      jobDescription: "Seeking a creative interior designer with a strong portfolio. Must have experience with AutoCAD and 3D modeling software."
    },
    {
      _id: "5",
      jobTitle: "Carpenter",
      company: "Woodcraft Solutions",
      location: "Negombo, Sri Lanka",
      salary: "35,000 - 55,000",
      jobType: "Full-Time",
      image: "images/icon-10.png",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      skills: ["Carpentry", "Woodworking", "Furniture Making"],
      jobDescription: "Experienced carpenter needed for custom furniture projects. Must have skills in fine woodworking and attention to detail."
    },
  ];

  // Use API data or fallback if empty
  const displayJobs = jobs.length > 0 ? jobs : fallbackJobs;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      jobType: "",
      salary: "",
    });
  };

  // Render jobs grid or loading state
  const renderJobs = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-500 text-center max-w-md">
            <p className="text-lg font-semibold mb-2">Oops! Something went wrong</p>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (displayJobs.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center max-w-md">
            <p className="text-lg font-semibold mb-2">No jobs found</p>
            <p className="text-gray-600">
              We couldn't find any jobs matching your criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      );
    }

    return (
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayJobs.map((job) => (
          <motion.div key={job._id} className="h-full w-full" variants={childVariants}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-neutral mb-6">Find Your Next Construction Job</h1>
          
          {usingMockData && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
              <p className="font-bold">Using demonstration data</p>
              <p>The job server connection could not be established. Showing sample job listings instead.</p>
            </div>
          )}
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleFilterChange}
                    placeholder="Job title, keywords, or company"
                    className="input pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LocationOnIcon className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City or district"
                    className="input pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  className="filter-toggle-btn flex items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FilterListIcon className="mr-1" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
            </div>
            
            {/* Additional Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BusinessCenterIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <select
                      name="jobType"
                      value={filters.jobType}
                      onChange={handleFilterChange}
                      className="input pl-10 w-full"
                    >
                      <option value="">All Types</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AttachMoneyIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <select
                      name="salary"
                      value={filters.salary}
                      onChange={handleFilterChange}
                      className="input pl-10 w-full"
                    >
                      <option value="">All Ranges</option>
                      <option value="0-30000">Below 30,000 LKR</option>
                      <option value="30000-50000">30,000 - 50,000 LKR</option>
                      <option value="50000-100000">50,000 - 100,000 LKR</option>
                      <option value="100000+">Above 100,000 LKR</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Jobs Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {renderJobs()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
