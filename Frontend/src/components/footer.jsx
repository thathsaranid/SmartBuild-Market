import React from "react";
import { useLocation, Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  // Define pages that shouldn't show the footer
  const hiddenFooterPages = [
    "/casual",
    "/electrical",
    "/farmhouse",
    "/hardware",
    "/historic-formal",
    "/plumbing-materials",
    "/relaxed",
    "/traditional",
    "/structural-materials",
    "/sophisticated",
    "/safety-materials",
    "/finishing-materials",
  ];
  
  const shouldShowFooter = !hiddenFooterPages.includes(location.pathname);
  
  // Content organized by sections
  const footerContent = {
    company: {
      title: "Company",
      links: [
        { name: 'About Us', path: '/#about' },
        { name: 'Services', path: '/#services' },
        { name: 'Projects', path: '/#projects' },
        { name: 'Contact', path: '/#contact' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    products: {
      title: "Products",
      links: [
        { name: 'Building Materials', path: '/material' },
        { name: 'Electrical Supplies', path: '/electrical' },
        { name: 'Plumbing Materials', path: '/plumbing-materials' },
        { name: 'Safety Equipment', path: '/safety-materials' },
        { name: 'Tools & Hardware', path: '/hardware' },
      ],
    },
    services: {
      title: "Services",
      links: [
        { name: 'Interior Design', path: '/interior-design' },
        { name: 'Architecture Design', path: '/architecture-design' },
        { name: 'House Renovation', path: '/house-renovation' },
        { name: 'Machine Rental', path: '/rent' },
        { name: 'Construction Jobs', path: '/all-jobs' },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Shipping Policy', path: '/shipping' },
        { name: 'Refund Policy', path: '/refund' },
        { name: 'Cookie Policy', path: '/cookies' },
      ],
    },
    contact: {
      phone: '+94 76 470 5801',
      phone2: '+94 77 808 1873',
      email: 'SmartBuildMarket@gmail.com',
      address: '37/2 Rathnapura Road, Madola, Avissawella',
    },
  };

  if (!shouldShowFooter) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-br from-neutral to-neutral-dark text-white pt-16 pb-8">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold">
                <span className="text-primary-light">SmartBuild</span>
                <span className="text-secondary-light ml-1">Market</span>
              </h3>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your one-stop marketplace for all construction needs. We connect you with quality materials, skilled workers, and professional services to make your construction projects successful.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-200 uppercase tracking-wider">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="py-2 px-4 rounded-l-md w-full text-sm text-neutral focus:outline-none"
                />
                <button className="bg-primary hover:bg-primary-dark text-white rounded-r-md px-4 transition-colors">
                  <SendIcon fontSize="small" />
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Get the latest updates on new products and special sales
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-semibold mb-4 text-secondary-light relative inline-block">
              {footerContent.company.title}
              <span className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-secondary-light"></span>
            </h4>
            <ul className="space-y-2.5">
              {footerContent.company.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-primary-light transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-base font-semibold mb-4 text-secondary-light relative inline-block">
              {footerContent.products.title}
              <span className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-secondary-light"></span>
            </h4>
            <ul className="space-y-2.5">
              {footerContent.products.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-primary-light transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-base font-semibold mb-4 text-secondary-light relative inline-block">
              {footerContent.services.title}
              <span className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-secondary-light"></span>
            </h4>
            <ul className="space-y-2.5">
              {footerContent.services.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-primary-light transition-colors text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-semibold mb-4 text-secondary-light relative inline-block">
              Contact Us
              <span className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-secondary-light"></span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center group">
                <PhoneIcon className="text-primary-light mr-3 group-hover:text-secondary-light transition-colors" fontSize="small" />
                <a href={`tel:${footerContent.contact.phone}`} className="text-gray-300 group-hover:text-primary-light transition-colors text-sm">
                  {footerContent.contact.phone}
                </a>
              </div>
              <div className="flex items-center group">
                <PhoneIcon className="text-primary-light mr-3 group-hover:text-secondary-light transition-colors" fontSize="small" />
                <a href={`tel:${footerContent.contact.phone2}`} className="text-gray-300 group-hover:text-primary-light transition-colors text-sm">
                  {footerContent.contact.phone2}
                </a>
              </div>
              <div className="flex items-center group">
                <EmailIcon className="text-primary-light mr-3 group-hover:text-secondary-light transition-colors" fontSize="small" />
                <a href={`mailto:${footerContent.contact.email}`} className="text-gray-300 group-hover:text-primary-light transition-colors text-sm">
                  {footerContent.contact.email}
                </a>
              </div>
              <div className="flex items-start group">
                <LocationOnIcon className="text-primary-light mr-3 mt-1 group-hover:text-secondary-light transition-colors" fontSize="small" />
                <span className="text-gray-300 text-sm">
                  {footerContent.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media & Bottom Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-3 mb-4 md:mb-0">
              <a
                href="#"
                className="bg-neutral-light hover:bg-primary text-white p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon fontSize="small" />
              </a>
              <a
                href="#"
                className="bg-neutral-light hover:bg-primary text-white p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon fontSize="small" />
              </a>
              <a
                href="#"
                className="bg-neutral-light hover:bg-primary text-white p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon fontSize="small" />
              </a>
              <a
                href="#"
                className="bg-neutral-light hover:bg-primary text-white p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="small" />
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4">
              {footerContent.legal.links.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-gray-400 hover:text-gray-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-sm mt-8">
            &copy; {currentYear} <span className="text-primary-light">SmartBuild</span> <span className="text-secondary-light">Market</span>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
