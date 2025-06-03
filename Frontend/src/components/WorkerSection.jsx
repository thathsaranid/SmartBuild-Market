import React, { useState, useEffect } from 'react';
import { workerAPI } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';

const WorkerSection = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        const response = await workerAPI.getAllWorkers();
        setWorkers(response.data || []);
      } catch (err) {
        console.error('Error fetching workers:', err);
        setError('Failed to load workers');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const renderWorkerImage = (worker) => {
    if (worker.image && worker.image.data) {
      try {
        const buffer = worker.image.data.data || worker.image.data;
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const contentType = worker.image.contentType || 'image/jpeg';
        return `data:${contentType};base64,${base64String}`;
      } catch (err) {
        return null;
      }
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Filter workers by type
  const interiorDesigners = workers.filter(worker => 
    worker.workingType?.toLowerCase() === 'interior designer' || 
    worker.jobRole?.toLowerCase() === 'interior designer'
  );

  const renovationWorkers = workers.filter(worker => 
    ['carpenter', 'mason', 'painter', 'plumber', 'electrician'].includes(worker.workingType?.toLowerCase()) ||
    ['carpenter', 'mason', 'painter', 'plumber', 'electrician'].includes(worker.jobRole?.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Interior Design Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {interiorDesigners.slice(0, 4).map((worker) => (
              <motion.div
                key={worker._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-1 aspect-h-1">
                  {renderWorkerImage(worker) ? (
                    <img
                      src={renderWorkerImage(worker)}
                      alt={worker.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <PersonIcon style={{ fontSize: 64 }} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">
                    {worker.firstName} {worker.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <WorkIcon className="w-4 h-4 mr-1" />
                    <span>{worker.jobRole || worker.workingType}</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Home Renovation Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {renovationWorkers.slice(0, 4).map((worker) => (
              <motion.div
                key={worker._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-1 aspect-h-1">
                  {renderWorkerImage(worker) ? (
                    <img
                      src={renderWorkerImage(worker)}
                      alt={worker.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <PersonIcon style={{ fontSize: 64 }} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">
                    {worker.firstName} {worker.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <WorkIcon className="w-4 h-4 mr-1" />
                    <span>{worker.jobRole || worker.workingType}</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-workers"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            View All Workers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkerSection; 