import React from "react";
import "./Navbar.css";
import "./custom.scss";

const Navbar = () => {
  return (
    <div>
      <div className="container-fluid">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Dashboard Samyuktha
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            ></div>
          </div>
        </nav>
      </div>
      <div className="container">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Events Lists
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="sidebar-links">Star Of Samyuktha</div>
            <div className="sidebar-links">Ideathon</div>
            <div className="sidebar-links">Web Designing</div>
            <div className="sidebar-links">Best Singer</div>
            <div className="sidebar-links">Technical Quiz</div>
            <div className="sidebar-links">Spot Dance</div>
            <div className="sidebar-links">Tresure Hunt</div>
            <div className="sidebar-links">Football 3 * 3</div>
            <div className="sidebar-links">Photography</div>
            <div className="sidebar-links">Code Crypt</div>
            <div className="sidebar-links">Word Hunt</div>
            <div className="sidebar-links">Speed Typing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
