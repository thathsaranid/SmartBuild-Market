import React, { useState, useEffect } from 'react';
import { jobAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const JobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('listings');
  const [applications, setApplications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    jobType: 'Full-Time',
    salary: '',
    jobDescription: '',
    skills: ''
  });
  const [jobImage, setJobImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    if (activeTab === 'applications') {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getAllJobs();
      if (response && response.success && Array.isArray(response.data)) {
        setJobs(response.data);
      } else if (Array.isArray(response)) {
        setJobs(response);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await jobAPI.getAllApplications({}, token);
      if (response && response.success && Array.isArray(response.data)) {
        setApplications(response.data);
      } else if (Array.isArray(response)) {
        setApplications(response);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setJobImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        // Convert skills string to array before sending
        if (key === 'skills') {
          const skillsArray = formData[key].split(',').map(skill => skill.trim());
          formDataObj.append(key, JSON.stringify(skillsArray));
        } 
        // Map jobDescription to description to match backend model
        else if (key === 'jobDescription') {
          formDataObj.append('description', formData[key]);
        }
        // Handle company field (not in backend model)
        else if (key === 'company') {
          // Add company as part of the job title or in a custom field
          formDataObj.append('company', formData[key]);
        } 
        // Handle salary field (not in backend model)
        else if (key === 'salary') {
          // Add salary as a custom field
          formDataObj.append('salary', formData[key]);
        }
        else {
          formDataObj.append(key, formData[key]);
        }
      });
      
      // Add image if selected
      if (jobImage) {
        formDataObj.append('image', jobImage);
      }
      
      let result;
      if (showEditForm && selectedJob) {
        result = await jobAPI.updateJob(selectedJob._id, formDataObj);
        console.log('Job update result:', result);
        toast.success('Job updated successfully');
      } else {
        result = await jobAPI.addJob(formDataObj);
        console.log('Job add result:', result);
        toast.success('Job added successfully');
      }
      
      // Reset form and refetch jobs
      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      // Show more specific error message if available
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save job';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    
    // Convert skills array back to comma-separated string for editing
    const skillsString = Array.isArray(job.skills) ? job.skills.join(', ') : '';
    
    setFormData({
      jobTitle: job.jobTitle || '',
      company: job.company || '',
      location: job.location || '',
      jobType: job.jobType || 'Full-Time',
      salary: job.salary || '',
      jobDescription: job.jobDescription || '',
      skills: skillsString
    });
    
    setShowEditForm(true);
    setShowAddForm(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobAPI.deleteJob(jobId);
        toast.success('Job deleted successfully');
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job');
      }
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await jobAPI.updateApplicationStatus(applicationId, newStatus, token);
      toast.success(`Application status updated to ${newStatus}`);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      company: '',
      location: '',
      jobType: 'Full-Time',
      salary: '',
      jobDescription: '',
      skills: ''
    });
    setJobImage(null);
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedJob(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs Management</h1>
        
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'listings' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('listings')}
          >
            <BusinessCenterIcon className="mr-2" />
            Job Listings
          </button>
          
          <button
            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'applications' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('applications')}
          >
            <PeopleIcon className="mr-2" />
            Applications
          </button>
        </div>
      </div>
      
      {activeTab === 'listings' && (
        <>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="mb-6 bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-dark"
            >
              <AddIcon className="mr-2" />
              Add New Job
            </button>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {showEditForm ? 'Edit Job' : 'Add New Job'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="Full-Time">Full Time</option>
                      <option value="Part-Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., 30,000 - 50,000"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {showEditForm ? "Leave empty to keep existing image" : "Upload company logo"}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., Plumbing, Electrical, Carpentry"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark"
                  >
                    {showEditForm ? 'Update Job' : 'Add Job'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Job Title</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Company</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Location</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Salary</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Posted</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{job.jobTitle}</td>
                      <td className="py-3 px-4 text-sm">{job.company}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <LocationOnIcon className="w-4 h-4 mr-1 text-gray-500" />
                          {job.location}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          job.jobType?.includes('Full') ? 'bg-green-100 text-green-800' :
                          job.jobType?.includes('Part') ? 'bg-blue-100 text-blue-800' :
                          job.jobType?.includes('Contract') ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.jobType || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{job.salary || 'Negotiable'}</td>
                      <td className="py-3 px-4 text-sm">
                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit Job"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete Job"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500 mb-4">No job listings found.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
              >
                Add Your First Job
              </button>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'applications' && (
        <div className="mt-4">
          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Job Title</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Applied On</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{application.fullName}</td>
                      <td className="py-3 px-4 text-sm">{application.email}</td>
                      <td className="py-3 px-4 text-sm">{application.jobTitle}</td>
                      <td className="py-3 px-4 text-sm">
                        {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'interviewed' ? 'bg-purple-100 text-purple-800' :
                          application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex flex-wrap gap-1">
                          <select
                            value={application.status}
                            onChange={(e) => handleUpdateApplicationStatus(application._id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          
                          <button
                            onClick={() => window.open(`mailto:${application.email}`, '_blank')}
                            className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Contact
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500">No applications found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsManagement; 