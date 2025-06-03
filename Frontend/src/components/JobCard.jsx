import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const JobCard = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  // Default image if job image is not available
  const defaultImage = '/images/job-placeholder.jpg';
  
  // Convert job.image to URL if it's a buffer/binary data
  const getImageUrl = () => {
    if (!job.image) return defaultImage;
    
    // If image is already a string URL
    if (typeof job.image === 'string') return job.image;
    
    // If image is an object with data and contentType (from MongoDB)
    if (job.image.data) {
      const base64String = arrayBufferToBase64(job.image.data.data);
      return `data:${job.image.contentType};base64,${base64String}`;
    }
    
    return defaultImage;
  };
  
  // Helper function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  
  // Time posted calculation
  const getTimePosted = () => {
    if (!job.createdAt) return 'Recently';
    
    const now = new Date();
    const createdAt = new Date(job.createdAt);
    const diffMs = now - createdAt;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffDays < 30) {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return createdAt.toLocaleDateString();
    }
  };

  // Function to handle save job toggle
  const handleSaveJob = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <motion.div 
      className="job-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="job-card__header">
        <img 
          src={getImageUrl()}
          alt={job.company || 'Company logo'} 
          className="job-card__company-logo"
        />
        <div className="job-card__company-info">
          <h4 className="job-card__company-name">
            {job.company || 'Company Name'}
          </h4>
          <div className="job-card__posted-date">
            {getTimePosted()}
          </div>
        </div>
        <button 
          onClick={handleSaveJob}
          className={`job-card__save-btn ${isSaved ? 'job-card__save-btn--saved' : ''}`}
          title={isSaved ? "Unsave job" : "Save job"}
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </button>
      </div>
      
      <Link to={`/job/${job._id}`} className="job-card__content">
        <h3 className="job-card__title">{job.jobTitle}</h3>
        
        <div className="job-card__details">
          <div className="job-card__detail">
            <LocationOnIcon className="job-card__detail-icon" />
            <span>{job.location || 'Location'}</span>
          </div>
          
          <div className="job-card__detail">
            <BusinessCenterIcon className="job-card__detail-icon" />
            <span>{job.jobType || 'Full Time'}</span>
          </div>
          
          <div className="job-card__detail">
            <AttachMoneyIcon className="job-card__detail-icon" />
            <span>LKR {job.salary || 'Negotiable'}</span>
          </div>
        </div>
        
        <p className="job-card__description">
          {job.jobDescription || "Job description not available."}
        </p>
        
        <div className="job-card__skills">
          {job.skills && Array.isArray(job.skills) && job.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="job-card__skill">
              {skill}
            </span>
          ))}
          
          {!job.skills && (
            <span className="job-card__skill">
              <WorkIcon className="w-3 h-3 mr-1 inline-block" />
              Construction
            </span>
          )}
        </div>
      </Link>
      
      <div className="job-card__footer">
        <Link 
          to={`/job/${job._id}`} 
          className="job-card__apply-btn"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard; 