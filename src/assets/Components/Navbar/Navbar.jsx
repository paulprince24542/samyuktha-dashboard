import React from "react";
import "./Navbar.css";
import "./custom.scss";

const Navbar = () => {
  function logout() {
    localStorage.removeItem("userid");
    window.location.reload(false);
  }
  var navlink = [
    {
      name: "Star Of Samyuktha",
      id: "4efbe19c-12a9-4670-95e7-eb6f1cf8bccc",
      count: 1,
    },
    {
      name: "30s Reel",
      id: "44195d64-24f6-4d6e-9ae1-1609bcb82915",
      count: 1,
    },
    {
      name: "Ideathon",
      id: "5f32aa49-a0bb-4ce7-af96-2db5266f4753",
      count: 4,
    },
    {
      name: "Web Designing",
      id: "5faf4f42-fee6-4c80-bb70-5d4e022d4c7a",
      count: 2,
    },
    {
      name: "Best Singer",
      id: "72c9450f-c062-4115-85d1-7262474b6d92",
      count: 1,
    },
    {
      name: "Technical Quiz",
      id: "831868d2-a0ee-4cd9-bcb6-bc352774a7c1",
      count: 1,
    },
    {
      name: "Spot Dance",
      id: "71061614-199e-40e4-9659-8d57528af0c1",
      count: 1,
    },
    {
      name: "Treasure Hunt",
      id: "c3e39edf-62a1-473e-9e3c-9ad9e67913f1",
      count: 4,
    },
    {
      name: "Footbal 3 *3",
      id: "91464529-6176-45b7-9b60-d40b7e9415fc",
      count: 5,
    },
    {
      name: "Photography",
      id: "410a1bc0-050d-4a04-b99f-3b94c0b0d6b4",
      count: 1,
    },
    {
      name: "Word Hunt",
      id: "a6cb9012-0705-4053-8bd8-dfc11dee3e60",
      count: 1,
    },
    {
      name: "Fast Typing",
      id: "f92dbfc2-0838-448e-9ee9-3c81e501fa1f",
      count: 1,
    },
    {
      name: "Coding UG",
      id: "6fb6e213-31f9-4c39-8bf7-516079a98c1e",
      count: 1,
    },
    {
      name: "Coding PG",
      id: "ca2b6db4-50a4-4422-b857-c01fe719b9d8",
      count: 1,
    },
  ];
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
            <a href="/">
              <div className="sidebar-links">Home</div>
            </a>
            {navlink.map((navdata) => (
              <a
                href={
                  "/events/?eventid=" + navdata.id + "&count=" + navdata.count
                }
              >
                <div className="sidebar-links">{navdata.name}</div>
              </a>
            ))}
            <a href="/">
              <div
                className="sidebar-links"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </div>
            </a>

            {/* <div className="sidebar-links">Ideathon</div>
            <div className="sidebar-links">Web Designing</div>
            <div className="sidebar-links">Best Singer</div>
            <div className="sidebar-links">Technical Quiz</div>
            <div className="sidebar-links">Spot Dance</div>
            <div className="sidebar-links">Tresure Hunt</div>
            <div className="sidebar-links">Football 3 * 3</div>
            <div className="sidebar-links">Photography</div>
            <div className="sidebar-links">Code Crypt</div>
            <div className="sidebar-links">Word Hunt</div>
            <div className="sidebar-links">Speed Typing</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
