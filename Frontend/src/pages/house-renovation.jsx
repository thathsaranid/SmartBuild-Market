import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/css/architecture-design.css";

const teamMembers = [
  {
    name: "Daniel Johnson",
    profession: "Architecture Designer",
    image: "images/Aimg1.jpg",
    rating: 4,
  },
  {
    name: "James Thompson",
    profession: "Architecture Designer",
    image: "images/Aimg2.jpg",
    rating: 4,
  },
  {
    name: "Oliv Williams",
    profession: "Architecture Designer",
    image: "images/Aimg3.jpg",
    rating: 5,
  },
  {
    name: "Aria Voss",
    profession: "Architecture Designer",
    image: "images/Aimg4.jpg",
    rating: 4,
  },
  {
    name: "Emily Carter",
    profession: "Architecture Designer",
    image: "images/Aimg5.jpg",
    rating: 4,
  },
  {
    name: "Zayn Rivers",
    profession: "Architecture Designer",
    image: "images/Aimg6.jpg",
    rating: 4,
  },
  {
    name: "Liam Jayden",
    profession: "Architecture Designer",
    image: "images/Aimg7.jpg",
    rating: 4,
  },
  {
    name: "Jonathan Johnson",
    profession: "Architecture Designer",
    image: "images/Aimg8.jpg",
    rating: 4,
  },
  {
    name: "Robbort Jemis",
    profession: "Architecture Designer",
    image: "images/Aimg9.jpg",
    rating: 4,
  },
];

const HouseRenovation = () => {
  return (
    <section className="architecture-section" style={{marginTop:"10rem"}}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={3}
        className="swiper-architecture mySwiper container"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index} className="card">
            <div className="card-content">
              <div className="image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="media-icons">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="name-profession">
                <span className="name">{member.name}</span>
                <span className="profession">{member.profession}</span>
              </div>
              <div className="rating">
                {[...Array(5)].map((_, i) =>
                  i < member.rating ? (
                    <i key={i} className="fas fa-star"></i>
                  ) : (
                    <i key={i} className="far fa-star"></i>
                  )
                )}
              </div>
              <div className="button">
                <button className="hire">
                  <a href="#">Hire Me</a>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HouseRenovation;
