import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";
import { URL_endpoint } from "../../../config";

const Home = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventid: "",
    participantemail: "",
    participantname: "",
    participantphone: "",
    college: "",
    course: "",
    userid: localStorage.getItem("userid"),
    paymentpaid: true,
  });
  const [groupData, setGroupData] = useState({
    eventid: "",
    participant1email: "",
    participant1name: "",
    participant1phone: "",
    participant2name: "",
    participant2phone: "",
    participant3name: "",
    participant3phone: "",
    participant4name: "",
    participant4phone: "",
    participant5name: "",
    participant5phone: "",
    college: "",
    course: "",
    userid: localStorage.getItem("userid"),
    paymentpaid: true,
  });
  const eventData = [
    {
      eventId: "4efbe19c-12a9-4670-95e7-eb6f1cf8bccc",
      eventName: "Star Of Samyuktha",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "44195d64-24f6-4d6e-9ae1-1609bcb82915",
      eventName: "30s Reel",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "5f32aa49-a0bb-4ce7-af96-2db5266f4753",
      eventName: "Ideathon",
      eventType: "group",
      teamStrength: "3",
    },
    {
      eventId: "5faf4f42-fee6-4c80-bb70-5d4e022d4c7a",
      eventName: "Web Designing",
      eventType: "group",
      teamStrength: "1",
    },
    {
      eventId: "72c9450f-c062-4115-85d1-7262474b6d92",
      eventName: "Best Singer",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "831868d2-a0ee-4cd9-bcb6-bc352774a7c1",
      eventName: "Technical Quiz",
      eventType: "group",
      teamStrength: "3",
    },
    {
      eventId: "71061614-199e-40e4-9659-8d57528af0c1",
      eventName: "Spot Dance",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "c3e39edf-62a1-473e-9e3c-9ad9e67913f1",
      eventName: "Treasure Hunt",
      eventType: "group",
      teamStrength: "3",
    },
    {
      eventId: "91464529-6176-45b7-9b60-d40b7e9415fc",
      eventName: "Footbal 3 *3",
      eventType: "group",
      teamStrength: "4",
    },
    {
      eventId: "410a1bc0-050d-4a04-b99f-3b94c0b0d6b4",
      eventName: "Photography",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "a6cb9012-0705-4053-8bd8-dfc11dee3e60",
      eventName: "Word Hunt",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "f92dbfc2-0838-448e-9ee9-3c81e501fa1f",
      eventName: "Fast Typing",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "6fb6e213-31f9-4c39-8bf7-516079a98c1e",
      eventName: "Coding UG",
      eventType: "single",
      teamStrength: "1",
    },
    {
      eventId: "ca2b6db4-50a4-4422-b857-c01fe719b9d8",
      eventName: "Coding PG",
      eventType: "single",
      teamStrength: "1",
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("userid")) {
      Navigate("/login");
    }
  }, [localStorage.getItem("userid")]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGroupInputChange = (event) => {
    const { name, value } = event.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
    console.log(groupData);
  };

  const handleSingleReg = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    const rawResponse = await fetch(
      `${URL_endpoint}/v1/admin/event/single/participant/add`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      }
    );
    var res = await rawResponse.json();
    console.log(res);
    if (res.status == true) {
      window.alert("Participant Added");
      window.location.reload(false);
    }
  };

  const handleGroupReg = async (event) => {
    console.log("eerg");
    event.preventDefault();
    const rawResponse = await fetch(
      `${URL_endpoint}/v1/admin/event/group/participant/add`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(groupData),
      }
    );
    var res = await rawResponse.json();
    if (res.status == true) {
      window.alert("Group Added");
      window.location.reload(false);
      // setGroupData({
      //   eventid: "",
      //   participant1email: "",
      //   participant1name: "",
      //   participant1phone: "",
      //   participant2name: "",
      //   participant2phone: "",
      //   participant3name: "",
      //   participant3phone: "",
      //   participant4name: "",
      //   participant4phone: "",
      //   participant5name: "",
      //   participant5phone: "",
      //   college: "",
      //   course: "",
      //   userid: localStorage.getItem("userid"),
      //   paymentpaid: true,
      // });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-center gap-5">
          <div className="card p-3">
            <div className="card-body text-center">
              <h3 className="card-title">Single Event Registrations</h3>
              <p className="card-text h5">100</p>
            </div>
          </div>
          <div className="card p-3">
            <div className="card-body text-center">
              <h3 className="card-title">Group Event Registrations</h3>
              <p className="card-text h5">100</p>
            </div>
          </div>
        </div>
        <div className="d-flex gap-5 mt-5 justify-content-center">
          <button
            className="btn btn-primary d-flex gap-2 align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#single"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "1.2em" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span>Single Event</span>
          </button>
          <button
            className="btn btn-primary d-flex gap-2 align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "1.2em" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <span>Group Event</span>
          </button>
        </div>
      </div>
      <div
        class="modal fade"
        id="single"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Register for single event
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSingleReg}>
              <div class="modal-body">
                <select
                  name="eventid"
                  className="form-select mb-3"
                  aria-label="Default select example"
                  value={formData.eventid}
                  onChange={handleInputChange}
                  required
                >
                  <option selected>Select an event</option>
                  {eventData.map((event) => {
                    if (event.eventType === "single") {
                      return (
                        <option key={event.eventId} value={event.eventId}>
                          {event.eventName}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
                <input
                  name="participantname"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Full Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={formData.participantname}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="participantemail"
                  className="mb-3 form-control"
                  type="email"
                  placeholder="Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  value={formData.participantemail}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="participantphone"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Phone Number"
                  aria-label="phonenumber"
                  aria-describedby="basic-addon1"
                  value={formData.participantphone}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="college"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="College Name"
                  aria-label="college"
                  aria-describedby="basic-addon1"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Course Name"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="group"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Register for group events
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleGroupReg}>
                <select
                  name="eventid"
                  className="form-select mb-3"
                  aria-label="Default select example"
                  value={groupData.eventid}
                  onChange={handleGroupInputChange}
                  required
                >
                  <option selected>Select an event</option>
                  {eventData.map((event) => {
                    if (event.eventType === "group") {
                      return (
                        <option key={event.eventId} value={event.eventId}>
                          {event.eventName}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
                <input
                  name="participant1email"
                  className="mb-3 form-control"
                  type="email"
                  placeholder="Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  value={groupData.participant1email}
                  onChange={handleGroupInputChange}
                  required
                />

                <div className="row">
                  <div className="col-md-6">
                    <input
                      name="participant1name"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 1 Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={groupData.participantname}
                      onChange={handleGroupInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      name="participant1phone"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 1 Phone"
                      aria-label="phonenumber"
                      aria-describedby="basic-addon1"
                      value={groupData.participantphone}
                      onChange={handleGroupInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      name="participant2name"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 2 Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={groupData.participantname}
                      onChange={handleGroupInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      name="participant2phone"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 2 Phone"
                      aria-label="phonenumber"
                      aria-describedby="basic-addon1"
                      value={groupData.participantphone}
                      onChange={handleGroupInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      name="participant3name"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 3 Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={groupData.participantname}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      name="participant3phone"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 3 Phone"
                      aria-label="phonenumber"
                      aria-describedby="basic-addon1"
                      value={groupData.participantphone}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      name="participant4name"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 4 Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={groupData.participantname}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      name="participant4phone"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Participant 4 Phone"
                      aria-label="phonenumber"
                      aria-describedby="basic-addon1"
                      value={groupData.participantphone}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        name="participant5name"
                        className="mb-3 form-control"
                        type="text"
                        placeholder="Participant 5 Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={groupData.participantname}
                        onChange={handleGroupInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        name="participant5phone"
                        className="mb-3 form-control"
                        type="text"
                        placeholder="Participant 5 Phone"
                        aria-label="phonenumber"
                        aria-describedby="basic-addon1"
                        value={groupData.participantphone}
                        onChange={handleGroupInputChange}
                      />
                    </div>
                  </div>
                  <input
                    name="college"
                    className="mb-3 form-control"
                    type="text"
                    placeholder="College Name"
                    aria-label="college"
                    aria-describedby="basic-addon1"
                    value={groupData.college}
                    onChange={handleGroupInputChange}
                    required
                  />
                  <input
                    name="course"
                    className="mb-3 form-control"
                    type="text"
                    placeholder="Course Name"
                    aria-label="course"
                    aria-describedby="basic-addon1"
                    value={groupData.course}
                    onChange={handleGroupInputChange}
                    required
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
