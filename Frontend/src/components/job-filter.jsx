import React, { useState } from "react";

const JobFilter = ({ onFilterChange = () => {} }) => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    date: "",
    education: "",
    shifts: "",
    salary: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only include non-empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    onFilterChange(activeFilters);
  };

  // Handle dropdown item selection
  const handleDropdownSelect = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="job-filter" style={{ marginTop: "6rem" }}>
      <h1 className="heading">Filter jobs</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="box">
            <p>
              job title <span>*</span>
            </p>
            <input
              type="text"
              name="title"
              placeholder="keyword, category or company"
              value={filters.title}
              onChange={handleChange}
              maxLength="20"
              className="input"
            />
          </div>
          <div className="box">
            <p>job location</p>
            <input
              type="text"
              name="location"
              placeholder="city, state or country"
              value={filters.location}
              onChange={handleChange}
              maxLength="50"
              className="input"
            />
          </div>
        </div>

        <div className="dropdown-container">
          <div className="dropdown">
            <input
              type="text"
              readOnly
              placeholder="Date posted"
              name="date"
              value={filters.date}
              maxLength="20"
              className="output"
            />
            <div className="lists">
              <p className="items" onClick={() => handleDropdownSelect("date", "today")}>today</p>
              <p className="items" onClick={() => handleDropdownSelect("date", "3 days ago")}>3 days ago</p>
              <p className="items" onClick={() => handleDropdownSelect("date", "7 days ago")}>7 days ago</p>
              <p className="items" onClick={() => handleDropdownSelect("date", "10 days ago")}>10 days ago</p>
              <p className="items" onClick={() => handleDropdownSelect("date", "15 days ago")}>15 days ago</p>
              <p className="items" onClick={() => handleDropdownSelect("date", "30 days ago")}>30 days ago</p>
            </div>
          </div>

          <div className="dropdown">
            <input
              type="text"
              readOnly
              placeholder="Education Level"
              name="education"
              value={filters.education}
              maxLength="20"
              className="output"
            />
            <div className="lists">
              <p className="items" onClick={() => handleDropdownSelect("education", "Certificate Course")}>Certificate Course</p>
              <p className="items" onClick={() => handleDropdownSelect("education", "Diploma")}>Diploma</p>
              <p className="items" onClick={() => handleDropdownSelect("education", "NVQ")}>NVQ</p>
              <p className="items" onClick={() => handleDropdownSelect("education", "NCT")}>NCT</p>
              <p className="items" onClick={() => handleDropdownSelect("education", "Equivalent")}>Equivalent</p>
              <p className="items" onClick={() => handleDropdownSelect("education", "Bachlelor's Degree")}>Bachlelor's Degree</p>
              <p className="items" onClick={() => handleDropdownSelect("education", "Master's Degree")}>Master's Degree</p>
            </div>
          </div>

          <div className="dropdown">
            <input
              type="text"
              readOnly
              placeholder="Work shifts"
              name="shifts"
              value={filters.shifts}
              maxLength="20"
              className="output"
            />
            <div className="lists">
              <p className="items" onClick={() => handleDropdownSelect("shifts", "day shifts")}>day shifts</p>
              <p className="items" onClick={() => handleDropdownSelect("shifts", "night shifts")}>night shifts</p>
              <p className="items" onClick={() => handleDropdownSelect("shifts", "flexible shifts")}>flexible shifts</p>
              <p className="items" onClick={() => handleDropdownSelect("shifts", "afternoon shifts")}>afternoon shifts</p>
              <p className="items" onClick={() => handleDropdownSelect("shifts", "fixed shift")}>fixed shift</p>
            </div>
          </div>

          <div className="dropdown">
            <input
              type="text"
              readOnly
              placeholder="estimated"
              name="salary"
              value={filters.salary}
              maxLength="20"
              className="output"
            />
            <div className="lists">
              <p className="items" onClick={() => handleDropdownSelect("salary", "100,000 LKR or less")}>100,000 LKR or less</p>
              <p className="items" onClick={() => handleDropdownSelect("salary", "100,000 LKR - 500,000 LKR")}>100,000 LKR - 500,000 LKR</p>
              <p className="items" onClick={() => handleDropdownSelect("salary", "500,000 LKR - 1,000,000 LKR")}>500,000 LKR - 1,000,000 LKR</p>
              <p className="items" onClick={() => handleDropdownSelect("salary", "1,000,000 LKR - 1,500,000 LKR")}>1,000,000 LKR - 1,500,000 LKR</p>
              <p className="items" onClick={() => handleDropdownSelect("salary", "1,500,000 LKR - 2,000,000 LKR")}>1,500,000 LKR - 2,000,000 LKR</p>
              <p className="items" onClick={() => handleDropdownSelect("salary", "2,000,000 LKR or more")}>2,000,000 LKR or more</p>
            </div>
          </div>
        </div>

        <input type="submit" value="search job" className="btn" />
      </form>
    </section>
  );
};

export default JobFilter;
