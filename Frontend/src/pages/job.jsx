import React from "react";
import JobCard from "../components/job-card";

const Job = () => {
  return (
    <>
      <div className="home-container">
        <section className="home">
          <form action="" method="post">
            <h3>Find your next job</h3>
            <p>
              job title <span>*</span>
            </p>
            <input
              type="text"
              name="title"
              placeholder="keyword, category or company"
              required
              maxlength="20"
              className="input"
            />
            <p>job location</p>
            <input
              type="text"
              name="location"
              placeholder="city, state or country"
              required
              maxlength="50"
              className="input"
            />
            <input
              type="submit"
              value="search job"
              name="search"
              className="btn"
            />
          </form>
        </section>
      </div>
      <section className="category">
        <h1 className="heading">job categories</h1>

        <div className="box-container">
          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Structural Engineer</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Construction Manager</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Project Management</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Equipment Operator</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Safety Manager</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Construction Inspector</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Flooring Installer</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Ironworker</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Carpenter</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Roofer</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Glazier</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Surveyor</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Civil Engineer</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Tile Setter</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Brick Mason</h3>
              <span>2200 jobs</span>
            </div>
          </a>

          <a href="#" className="box">
            <i className="fa fa-briefcase"></i>
            <div>
              <h3>Plumber</h3>
              <span>2200 jobs</span>
            </div>
          </a>
        </div>
      </section>
      <section className="jobs-container">
        <h1 className="heading">All Jobs</h1>

        <div className="box-container">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href="/all-jobs" className="btn">
            view all
          </a>
        </div>
      </section>
    </>
  );
};

export default Job;
