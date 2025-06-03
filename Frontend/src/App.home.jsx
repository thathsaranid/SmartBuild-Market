import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConstructionIcon from '@mui/icons-material/Construction';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessIcon from '@mui/icons-material/Business';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import HandymanIcon from '@mui/icons-material/Handyman';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { inquiryAPI } from './services/api';

const reviews = [
  {
    text: "SmartBuild Market made my construction project so much easier! From high-quality materials to reliable contractors, everything was available in one place. Highly recommended!",
    name: "James W.",
    image: "images/pic-2.png",
    rating: 5,
  },
  {
    text: "I was struggling to find affordable and trustworthy renovation services until I found SmartBuild Market. The entire process was seamless, and the results were beyond my expectations!",
    name: "Sophia L.",
    image: "images/pic-1.png",
    rating: 5,
  },
  {
    text: "Excellent platform for job seekers in the construction industry! I found my dream job through SmartBuild Market within days. Thank you for this opportunity!",
    name: "Michael D.",
    image: "images/pic-3.png",
    rating: 5,
  },
  {
    text: "Their machine rental service saved me a lot of money! The equipment was well-maintained, and the rental process was hassle-free. Will definitely use it again!",
    name: "Emma T.",
    image: "images/pic-4.png",
    rating: 5,
  },
  {
    text: "The architecture design services were outstanding. They turned my ideas into a stunning reality, and I couldn't be happier with the outcome!",
    name: "David R.",
    image: "images/pic-5.png",
    rating: 5,
  },
  {
    text: "A fantastic platform for all construction needs! From material supply to interior design, everything was handled professionally and efficiently.",
    name: "Olivia M.",
    image: "images/pic-6.png",
    rating: 5,
  },
  {
    text: "Their machine rental service was excellent! The equipment was in perfect condition, and the rental process was quick and easy. Highly recommended!",
    name: "Emily S.",
    image: "images/pic-7.png",
    rating: 5,
  },
  {
    text: "SmartBuild Market is a game-changer! I found high-quality materials and skilled professionals all in one place. The process was smooth, and the results were amazing!",
    name: "Daniel K.",
    image: "images/pic-8.png",
    rating: 5,
  },
];

const projects = [
  {
    imgSrc: "images/project-1.1.jpg",
    alt: "project 1",
    title: "Dream Home",
    description: "construction, design",
    link: "images/project-1.jpg",
  },
  {
    imgSrc: "images/project-2.jpg",
    alt: "project 2",
    title: "Dream Home",
    description: "construction, design",
    link: "images/project-2.jpg",
  },
  {
    imgSrc: "images/project-4.jpg",
    alt: "project 4",
    title: "Dream Home",
    description: "construction, design",
    link: "images/project-4.jpg",
  },
  {
    imgSrc: "images/project-5.jpg",
    alt: "project 5",
    title: "Dream Home",
    description: "construction, design",
    link: "images/project-5.jpg",
  },
  {
    imgSrc: "images/project-6.jpg",
    alt: "project 6",
    title: "Dream Home",
    description: "construction, design",
    link: "images/project-6.jpg",
  },
  {
    imgSrc: "images/project-7.jpg",
    alt: "project 7",
    title: "Dream Home",
    description: "construction, design",
    link: "images/project-7.jpg",
  },
];

const blogs = [
  {
    imgSrc: "images/blog-1.jpg",
    title: "The Power of Teamwork in Construction Projects",
    content: "Successful construction projects rely on strong teamwork. Learn how collaboration, communication, and coordination among workers, contractors, and designers lead to efficient and high-quality results.",
  },
  {
    imgSrc: "images/blog-2.jpg",
    title: "The Future of Smart Construction: Trends to Watch",
    content: "The construction industry is evolving rapidly with the adoption of smart technologies. From AI-powered designs to eco-friendly building materials, discover the latest trends shaping the future of construction.",
  },
  {
    imgSrc: "images/blog-3.jpg",
    title: "The Importance of Experience in the Construction Industry",
    content: "Experience plays a vital role in delivering high-quality construction work. Discover how skilled professionals use their expertise to solve challenges, improve efficiency, and ensure project success.",
  },
  {
    imgSrc: "images/blog-4.jpg",
    title: "Benefits of Renting Construction Equipment Over Buying",
    content: "Renting construction machines is a cost-effective and flexible solution for many projects. Learn how equipment rentals can save money, reduce maintenance costs, and provide access to the latest technology.",
  },
  {
    imgSrc: "images/blog-5.jpg",
    title: "Why Renting Machines is a Smart Choice for Construction",
    content: "Renting construction equipment can save money and increase efficiency. This blog highlights the advantages of machine rentals and how they help contractors complete projects on time and within budget.",
  },
  {
    imgSrc: "images/blog-6.jpg",
    title: "The Importance of Interior Design in Modern Homes",
    content: "Interior design is key to creating a home that reflects your personality. Learn how thoughtful design can improve the flow, functionality, and ambiance of modern living spaces, making them more comfortable and stylish.",
  },
];

const servicesData = [
  {
    icon: "/images/service-1.png",
    title: "Building Construction",
    description: "Our building construction services connect you with top-quality materials and skilled professionals to bring your vision to life.",
    link: "#contact",
  },
  {
    icon: "/images/service-2.png",
    title: "House Renovation",
    description: "Our house renovation services seamlessly blend modern design with expert craftsmanship to transform your living space into your dream home.",
    link: "/house-renovation",
  },
  {
    icon: "/images/service-3.png",
    title: "Architecture Design",
    description: "Our architecture design services blend innovative creativity with practical expertise to transform your ideas into inspiring, functional spaces.",
    link: "/architecture-design",
  },
  {
    icon: "/images/service-4.png",
    title: "Material Supply",
    description: "Our material supply services deliver premium, reliable construction materials to build your projects on a solid foundation.",
    link: "/material",
  },
  {
    icon: "/images/service-5.png",
    title: "Construction Consultation",
    description: "Our construction consulting services provide expert guidance and strategic solutions to ensure successful project planning and execution.",
    link: "#contact",
  },
  {
    icon: "/images/service-6.png",
    title: "Interior Design",
    description: "Our interior design services create stylish, functional, and personalized spaces that reflect your vision and enhance your living or working environment.",
    link: "/interior-design",
  },
  {
    icon: "/images/service-7.png",
    title: "Rent Machine",
    description: "We offer a wide range of high-quality construction equipment for rent, ensuring efficiency, reliability, and cost-effectiveness for your projects.",
    link: "/rent",
  },
  {
    icon: "/images/service-8.png",
    title: "Job Opportunities",
    description: "Our job opportunities section connects skilled professionals with top construction companies, helping you find the perfect career in the industry.",
    link: "/all-jobs",
  },
];

const pricingPlans = [
  {
    icon: <HomeIcon className="text-4xl" />,
    title: "Our Basic Plan",
    price: "100,000",
    features: [
      "Interior Design",
      "Refurbishment",
      "Material Supply",
      "Maintenance",
      "24/7 support",
    ],
  },
  {
    icon: <ApartmentIcon className="text-4xl" />,
    title: "Premium Plan",
    price: "200,000",
    features: [
      "Interior Design",
      "Refurbishment",
      "Material Supply",
      "Maintenance",
      "24/7 support",
    ],
  },
  {
    icon: <BusinessIcon className="text-4xl" />,
    title: "Ultimate Plan",
    price: "3,500,000",
    features: [
      "Interior Design",
      "Refurbishment",
      "Material Supply",
      "Maintenance",
      "24/7 support",
    ],
  },
];

const HomePage = () => {
  const location = useLocation();
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const heroRef = useRef(null);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Scroll to section based on hash
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1); // remove the # character
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Scroll to about section when clicking on arrow
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      await inquiryAPI.submitInquiry(contactForm);
      setSubmitSuccess(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        type: 'general'
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('Failed to submit your message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      {/* Hero Section - Updated with better UI */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center" id="home">
        <Swiper
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="absolute inset-0 w-full h-full"
        >
          <SwiperSlide>
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ 
                backgroundImage: "url('/images/home-slide-1.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="container-custom">
                  <motion.div 
                    className="max-w-xl text-white ml-4 sm:ml-8 md:ml-12"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">We Provide <span className="text-primary">Best Service</span></h2>
                    <p className="text-lg text-gray-200 mb-8 font-light">
                      At SmartBuild Market, we offer top-quality materials, trusted contractors, and job opportunities—all in one place. With a seamless experience and competitive pricing, we make construction hassle-free. Build with confidence!
                    </p>
                    <a 
                      href="#about" 
                      className="btn-primary px-8 py-3 rounded-md inline-block font-medium hover:shadow-lg transform transition hover:-translate-y-1"
                    >
                      Get Started
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ 
                backgroundImage: "url('/images/home-slide-2.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="container-custom">
                  <motion.div 
                    className="max-w-xl text-white ml-4 sm:ml-8 md:ml-12"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">Making Dream <span className="text-primary">Come to Life</span></h2>
                    <p className="text-lg text-gray-200 mb-8 font-light">
                      At SmartBuild Market, we turn your construction dreams into reality. Whether it's building your dream home or finding the perfect materials and services, our platform connects you with the best in the industry. Let us help you create the space you've always envisioned, with ease and expertise.
                    </p>
                    <a 
                      href="#about" 
                      className="btn-primary px-8 py-3 rounded-md inline-block font-medium hover:shadow-lg transform transition hover:-translate-y-1"
                    >
                      Get Started
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide>
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ 
                backgroundImage: "url('/images/home-slide-3.2.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="container-custom">
                  <motion.div 
                    className="max-w-xl text-white ml-4 sm:ml-8 md:ml-12"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">From Concept <span className="text-primary">to Creation</span></h2>
                    <p className="text-lg text-gray-200 mb-8 font-light">
                      At SmartBuild Market, we take your ideas from vision to reality. From selecting the best materials to finding skilled professionals, our platform ensures a smooth journey from concept to creation. Build with confidence, knowing every step is in expert hands.
                    </p>
                    <a 
                      href="#about" 
                      className="btn-primary px-8 py-3 rounded-md inline-block font-medium hover:shadow-lg transform transition hover:-translate-y-1"
                    >
                      Get Started
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        
        {/* Scroll Down Arrow */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.button
            onClick={scrollToAbout}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary transition-all duration-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDownwardIcon />
          </motion.button>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <video 
                  src="/images/about-vid.mp4" 
                  className="rounded-lg shadow-lg w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                We will provide you the best work which you dreamt for!
              </h3>
              <p className="text-gray-600 mb-6">
                At SmartBuild Market, we are dedicated to bringing your dream construction projects to life. From premium materials to skilled professionals, we ensure the highest quality work at every step. Your vision is our priority, and we work tirelessly to make sure your dreams are realized with precision and excellence.
              </p>
              
              <a href="#services" className="btn-primary inline-block px-8 py-3 rounded-md">Read More</a>
            </motion.div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
              <p className="text-gray-600">years of experience</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">1500+</h3>
              <p className="text-gray-600">projects completed</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">790+</h3>
              <p className="text-gray-600">satisfied clients</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">450+</h3>
              <p className="text-gray-600">active workers</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              >
                <Link 
                  to={service.link} 
                  className="block p-6 h-full hover:bg-gray-50 transition-colors"
                >
                  <motion.div className="flex justify-center mb-4">
                    <motion.img 
                      src={service.icon} 
                      alt={service.title} 
                      className="h-16" 
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold mb-3 text-center text-gray-800 transition-colors"
                    whileHover={{ color: "#FF6B35" }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-gray-600 text-center mb-4">{service.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <a href={project.link} className="block">
                  <img 
                    src={project.imgSrc} 
                    alt={project.alt} 
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="transition-all transform group-hover:translate-y-0 translate-y-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-sm opacity-80">{project.description}</p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary rounded-full p-3 text-white">
                        <AddIcon />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Clients Reviews</h2>
          
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
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
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="testimonials-slider"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full">
                  <p className="text-gray-600 mb-6 italic">{review.text}</p>
                  <div className="flex items-center">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-4">
                    <span className="text-lg">LKR </span>
                    {plan.price}
                    <span className="text-sm text-gray-500">+ more</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="btn-primary inline-block w-full py-3 rounded-md">Choose Plan</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Contact Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                className="w-full h-[400px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426833.60722515074!2d79.99994791941032!3d6.962145893835387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3a99e4c1f47cd%3A0xee25998579adfb13!2sAvissawella!5e1!3m2!1sen!2slk!4v1738760889064!5m2!1sen!2slk"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg shadow-md p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {submitError}
                </div>
              )}
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Name" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="Email" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    placeholder="Phone" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    name="type"
                    value={contactForm.type}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="service">Service Request</option>
                    <option value="rental">Rental Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="job">Job Application</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Message" 
                    rows="5" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full py-3 rounded-md"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Blogs Section */}
      <section id="blogs" className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Blogs</h2>
          
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
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
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            className="blogs-slider"
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={blog.imgSrc} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{blog.content}</p>
                    <a href="#" className="btn-primary inline-block px-6 py-2 rounded-md self-start">
                      Read More
                    </a>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      
      {/* Client Logos Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            loop={true}
            autoplay={{
              delay: 2000,
            }}
            modules={[Autoplay]}
            className="logo-container"
          >
            <SwiperSlide>
              <div className="flex items-center justify-center p-4">
                <img src="images/client-logo.1.png" alt="client 1" className="max-h-20 grayscale hover:grayscale-0 transition-all" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center p-4">
                <img src="images/client-logo.2.png" alt="client 2" className="max-h-20 grayscale hover:grayscale-0 transition-all" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center p-4">
                <img src="images/client-logo.3.png" alt="client 3" className="max-h-20 grayscale hover:grayscale-0 transition-all" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center p-4">
                <img src="images/client-logo.4.png" alt="client 4" className="max-h-20 grayscale hover:grayscale-0 transition-all" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center p-4">
                <img src="images/client-logo.5.png" alt="client 5" className="max-h-20 grayscale hover:grayscale-0 transition-all" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center p-4">
                <img src="images/client-logo.6.png" alt="client 6" className="max-h-20 grayscale hover:grayscale-0 transition-all" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-primary text-white py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join SmartBuild Market today and connect with quality materials, skilled professionals, and job opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/material" className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors">
              Shop Now
            </Link>
            <Link to="/all-jobs" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-colors">
              Find Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 