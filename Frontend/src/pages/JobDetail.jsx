import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { jobAPI } from '../services/api';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareIcon from '@mui/icons-material/Share';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    skills: '',
    experience: '0',
  });
  const [resume, setResume] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        
        // First try to get a job from the API
        try {
          const jobData = await jobAPI.getJobById(id);
          
          // Check if we got a valid job back
          if (jobData && (jobData._id || jobData.id)) {
            setJob(jobData);
            return;
          }
        } catch (apiError) {
          console.log("API fetch failed, trying mock data...");
        }
        
        // If API call failed or returned no job, try to get mock job
        const mockJob = getMockJob(id);
        if (mockJob) {
          setJob(mockJob);
          setUsingMockData(true);
          return;
        }
        
        // If no mock job was found for this ID either, use the first mock job as fallback
        const fallbackJob = getMockJob('1');
        if (fallbackJob) {
          setJob(fallbackJob);
          setUsingMockData(true);
          setError('The requested job was not found. Showing a sample job instead.');
          return;
        }
        
        // If all else fails
        throw new Error('Job not found');
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError(err.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id]);
  
  // Get mock job data for development
  const getMockJob = (mockId) => {
    const mockJobs = [
      {
        _id: "1",
        jobTitle: "Senior Plumber",
        company: "Nimna Holdings (pvt)Ltd",
        location: "Avissawella, Sri Lanka",
        salary: "30,000 - 60,000",
        jobType: "Full-Time",
        image: "/images/company-logo-1.png",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        skills: ["Plumbing", "Maintenance", "Repair", "Installation"],
        experience: "3+ years",
        education: "Technical certification preferred",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        jobDescription: "We are looking for an experienced plumber to join our growing team. The ideal candidate should have extensive experience in residential and commercial plumbing services.",
        responsibilities: [
          "Install, repair and maintain plumbing systems, fixtures, and equipment",
          "Diagnose and troubleshoot plumbing issues efficiently",
          "Follow building codes and safety standards",
          "Provide excellent customer service and explain plumbing issues clearly",
          "Maintain records of work performed and materials used"
        ],
        requirements: [
          "Proven experience as a plumber for at least 3 years",
          "Valid plumbing license",
          "Knowledge of water supply, drainage systems, and heating systems",
          "Physical stamina and problem-solving skills",
          "Excellent communication skills"
        ],
        benefits: [
          "Competitive salary based on experience",
          "Health insurance",
          "Paid time off",
          "Vehicle and tools provided",
          "Training and certification opportunities"
        ]
      },
      {
        _id: "2",
        jobTitle: "Electrician",
        company: "Lanka Electric Co",
        location: "Colombo, Sri Lanka",
        salary: "40,000 - 75,000",
        jobType: "Full-Time",
        image: "/images/company-logo-2.png",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        skills: ["Electrical Wiring", "Circuit Installation", "Troubleshooting", "Maintenance"],
        experience: "2+ years",
        education: "Technical certification required",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        jobDescription: "Lanka Electric Co is seeking a qualified electrician to join our team for residential and commercial electrical installations and repairs.",
        responsibilities: [
          "Install, maintain, and repair electrical systems",
          "Read and interpret electrical blueprints and schematics",
          "Troubleshoot and diagnose electrical problems",
          "Ensure compliance with local electrical codes",
          "Complete thorough documentation of all work performed"
        ],
        requirements: [
          "Proven experience as an electrician for at least 2 years",
          "Valid electrician license",
          "Knowledge of electrical systems and safety standards",
          "Ability to work independently and as part of a team",
          "Problem-solving skills and attention to detail"
        ],
        benefits: [
          "Competitive salary with performance bonuses",
          "Health and dental insurance",
          "Paid holidays and vacation time",
          "Professional development opportunities",
          "Company van and tools provided"
        ]
      },
      {
        _id: "3",
        jobTitle: "Construction Worker",
        company: "Build Right Construction",
        location: "Kandy, Sri Lanka",
        salary: "25,000 - 45,000",
        jobType: "Full-Time",
        image: "/images/company-logo-3.png",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        skills: ["Construction", "Physical Labor", "Equipment Operation", "Safety Procedures"],
        experience: "1+ years",
        education: "No formal education required",
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        jobDescription: "Looking for hardworking construction workers to join our growing team. Experience with construction equipment and tools is a plus.",
        responsibilities: [
          "Prepare construction sites, materials, and tools",
          "Load and unload construction materials",
          "Remove debris, garbage, and dangerous materials from sites",
          "Assist contractors, such as carpenters and electricians as needed",
          "Follow construction plans and instructions from site supervisors"
        ],
        requirements: [
          "Previous experience in construction preferred",
          "Knowledge of construction equipment and tools",
          "Physical strength and stamina",
          "Ability to work in various weather conditions",
          "Commitment to safety procedures"
        ],
        benefits: [
          "Weekly pay",
          "On-the-job training",
          "Opportunity for overtime",
          "Potential for advancement",
          "Transportation provided from central locations"
        ]
      }
    ];
    
    return mockJobs.find(job => job._id === mockId) || null;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          resume: 'File size should be less than 5MB'
        });
        return;
      }
      
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setFormErrors({
          ...formErrors,
          resume: 'Only PDF, DOC, and DOCX files are allowed'
        });
        return;
      }
      
      setResume(file);
      setFormErrors({
        ...formErrors,
        resume: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
      errors.phone = 'Phone number should have 10 digits';
    }
    
    if (!formData.coverLetter.trim()) errors.coverLetter = 'Cover letter is required';
    if (!resume) errors.resume = 'Resume is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setFormSubmitting(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', id);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('experience', formData.experience);
      if (resume) formDataToSend.append('resume', resume);
      
      // For development, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, use real API call:
      // await jobAPI.submitApplication(formDataToSend);
      
      toast.success('Your application has been submitted successfully!');
      setShowApplicationForm(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: '',
        skills: '',
        experience: '0',
      });
      setResume(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container-custom py-12 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error && !job) {
    return (
      <div className="container-custom py-12 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist or has been removed.'}</p>
          <button 
            onClick={() => navigate('/all-jobs')}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
          >
            Back to All Jobs
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowBackIosNewIcon fontSize="small" className="mr-1" />
          Back to Jobs
        </button>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center rounded-full p-2 hover:bg-gray-100 transition-colors"
            title={isSaved ? "Remove from saved jobs" : "Save job"}
          >
            {isSaved ? (
              <BookmarkIcon className="text-primary" />
            ) : (
              <BookmarkBorderIcon className="text-gray-500" />
            )}
          </button>
          
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${job.jobTitle} - ${job.company}`,
                  text: `Check out this job: ${job.jobTitle} at ${job.company}`,
                  url: window.location.href,
                })
                .catch((error) => console.log('Error sharing', error));
              } else {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
              }
            }}
            className="flex items-center rounded-full p-2 hover:bg-gray-100 transition-colors"
            title="Share job"
          >
            <ShareIcon className="text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Demo data notification */}
      {usingMockData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p className="font-bold">Showing demonstration data</p>
          <p>You are viewing sample job content as the requested job could not be found.</p>
        </div>
      )}
      
      {/* Error notification */}
      {error && job && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Job header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="bg-gray-100 md:w-1/4 p-6 flex items-center justify-center">
            {job.image ? (
              <img 
                src={job.image} 
                alt={`${job.company} logo`} 
                className="max-w-[150px] max-h-[150px] object-contain"
              />
            ) : (
              <div className="bg-primary text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                {job.company.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="md:w-3/4 p-6 md:p-8">
            <motion.h1 
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {job.jobTitle}
            </motion.h1>
            
            <h2 className="text-xl text-primary mb-4">{job.company}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600">
              <div className="flex items-center">
                <LocationOnIcon className="text-gray-400 mr-2" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center">
                <BusinessCenterIcon className="text-gray-400 mr-2" />
                <span>{job.jobType}</span>
              </div>
              
              <div className="flex items-center">
                <AttachMoneyIcon className="text-gray-400 mr-2" />
                <span>LKR {job.salary}</span>
              </div>
              
              {job.experience && (
                <div className="flex items-center">
                  <WorkIcon className="text-gray-400 mr-2" />
                  <span>Experience: {job.experience}</span>
                </div>
              )}
              
              {job.deadline && (
                <div className="flex items-center">
                  <CalendarMonthIcon className="text-gray-400 mr-2" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
              
              {job.createdAt && (
                <div className="flex items-center">
                  <AccessTimeIcon className="text-gray-400 mr-2" />
                  <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors mr-4"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Job details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-600 mb-6">{job.jobDescription}</p>
            
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Responsibilities</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Requirements</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Benefits</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About {job.company}</h2>
            <p className="text-gray-600">
              {job.companyDescription || `${job.company} is a leading company in the construction industry in Sri Lanka.`}
            </p>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Overview</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-500">Job Title</h3>
                <p className="font-semibold">{job.jobTitle}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Company</h3>
                <p className="font-semibold">{job.company}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Location</h3>
                <p className="font-semibold">{job.location}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Job Type</h3>
                <p className="font-semibold">{job.jobType}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Salary</h3>
                <p className="font-semibold">LKR {job.salary}</p>
              </div>
              
              {job.experience && (
                <div>
                  <h3 className="text-gray-500">Experience</h3>
                  <p className="font-semibold">{job.experience}</p>
                </div>
              )}
              
              {job.education && (
                <div>
                  <h3 className="text-gray-500">Education</h3>
                  <p className="font-semibold">{job.education}</p>
                </div>
              )}
              
              {job.deadline && (
                <div>
                  <h3 className="text-gray-500">Application Deadline</h3>
                  <p className="font-semibold">{new Date(job.deadline).toLocaleDateString()}</p>
                </div>
              )}
              
              {job.createdAt && (
                <div>
                  <h3 className="text-gray-500">Posted Date</h3>
                  <p className="font-semibold">{new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Required Skills</h2>
            
            {job.skills && job.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No specific skills listed for this position.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Apply for {job.jobTitle}</h2>
              <button 
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Your full name"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Your email address"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Your phone number"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Plumbing, Electrical, Carpentry"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Cover Letter *</label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full border ${formErrors.coverLetter ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Explain why you are a good fit for this position..."
                  ></textarea>
                  {formErrors.coverLetter && <p className="text-red-500 text-sm mt-1">{formErrors.coverLetter}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Resume/CV *</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleResumeChange}
                    className={`w-full border ${formErrors.resume ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    accept=".pdf,.doc,.docx"
                  />
                  <p className="text-gray-500 text-sm mt-1">Upload your resume (PDF, DOC, DOCX, max 5MB)</p>
                  {formErrors.resume && <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors flex items-center"
                >
                  {formSubmitting ? (
                    <>
                      <span className="mr-2">Submitting...</span>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail; 