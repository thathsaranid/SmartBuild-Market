import React from "react";

const JobCard = ({ job }) => {
  // Fallback data in case job props are not passed
  const {
    title = "Plumber",
    company = "Nimna Holdings (pvt)Ltd",
    location = "Avissawella, Sri Lanka",
    salary = "30,000 LKR - 60,000 LKR",
    type = "part-time",
    shift = "day shift",
    logo = "images/icon-6.png",
    postedAt = "3 days ago",
    detailsUrl = "https://jobeka.lk/company/Nimna-Holdings-Pvt-Ltd-3768",
  } = job || {};

  return (
    <div className="box">
      <div className="company">
        <img src={logo} alt={`${company} logo`} />
        <div>
          <h3>{company}</h3>
          <p>{postedAt}</p>
        </div>
      </div>
      <h3 className="job-title">{title}</h3>
      <p className="location">
        <i className="fas fa-map-marker-alt"></i>
        <span>{location}</span>
      </p>
      <div className="tags">
        <p>
          <i className="fa-solid fa-rupee-sign"></i>{" "}
          <span>{salary}</span>
        </p>
        <p>
          <i className="fas fa-briefcase"></i>
          <span>{type}</span>
        </p>
        <p>
          <i className="fas fa-clock"></i>
          <span>{shift}</span>
        </p>
      </div>
      <div className="flex-btn">
        <a
          href={detailsUrl}
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          view details
        </a>
        <button type="submit" className="far fa-heart" name="save"></button>
      </div>
    </div>
  );
};

export default JobCard;
