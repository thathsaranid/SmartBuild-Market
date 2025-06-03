import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import WorkerSection from '../components/WorkerSection';

const HomePage = () => {
  return (
    <div>
      {/* ... existing sections ... */}
      
      {/* Workers Section */}
      <WorkerSection />
      
      {/* ... remaining sections ... */}
    </div>
  );
};

export default HomePage; 