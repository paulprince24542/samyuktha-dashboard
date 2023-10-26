import React, { useEffect, useState } from "react";
import "./events.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { URL_endpoint } from "../../../config";

// import SingleModalEdit from "../../Components/Modals/SingleModalEdit";
// import GroupModalEdit from "../../Components/Modals/GroupModalEdit";

const Events = () => {
  const Navigate = useNavigate();

  //Input States

  // User Authorization
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      null;
    } else {
      Navigate("/login");
    }
  }, [localStorage.getItem("userid")]);

  const [data, setData] = useState([]);
  const [event, setEventName] = useState("");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);
  const [deleteValue, setDeleteValue] = useState();

  var [userid, setUserid] = useState("");
  var [email, setEmail] = useState("");
  var [name, setName] = useState("");
  var [phone, setPhone] = useState("");
  var [college, setCollege] = useState("");
  var [course, setCourse] = useState("");
  var [participant2, setParticipant2] = useState("");
  var [participant3, setParticipant3] = useState("");
  var [participant4, setParticipant4] = useState("");
  var [participant5, setParticipant5] = useState("");
  var [payment, setPayment] = useState();

  const [searchParams] = useSearchParams();

  async function getList() {
    console.log("Fetching Data");
    var participantCount = searchParams.get("count");
    var eventid = searchParams.get("eventid");
    if (participantCount == 1) {
      try {
        var API_URL = `${URL_endpoint}/v1/admin/event/single?eventid=${eventid}`;
        var response = await fetch(API_URL);
        const responseJson = await response.json();
        console.log(responseJson);
        setData(responseJson.data);
        localStorage.setItem("eventname", responseJson.data[0].eventname);
        setCount(1);
        if (responseJson.data.length > 0) {
          setStatus(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        var API_URL = `${URL_endpoint}/v1/admin/event/group?eventid=${eventid}`;
        var response = await fetch(API_URL);
        const responseJson = await response.json();
        console.log(responseJson);
        setData(responseJson.data);
        localStorage.setItem("eventname", "New");
        setCount(2);
        if (responseJson.data.length > 0) {
          setStatus(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    getList();
  }, []);
  var i = 0;

  // Delete Participant
  async function deleteParticipant(id) {
    if (count == 1) {
      const rawResponse = await fetch(
        `${URL_endpoint}/v1/admin/event/delete/single`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      const content = await rawResponse.json();
      console.log(content);
      window.location.reload(false);
    } else {
      const rawResponse = await fetch(
        `${URL_endpoint}/v1/admin/event/delete/group`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      const content = await rawResponse.json();
      console.log(content);
      window.location.reload(false);
    }
  }

  function editSingleValues(data) {
    setEmail(data.participantemail);
    setName(data.participantname);
    setPhone(data.participantphone);
    setCourse(data.coursename);
    setCollege(data.collegename);
    setPayment(data.paymentpaid);
    setUserid(data.id);
  }

  async function submitSingleValues(e) {
    var eventid = searchParams.get("eventid");
    e.preventDefault();
    const rawResponse = await fetch(
      `${URL_endpoint}/v1/admin/event/single/update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventid: eventid,
          participantemail: email,
          participantname: name,
          participantphone: phone,
          college: college,
          course: course,
          paymentpaid: payment,
          userid: userid,
        }),
      }
    );
    const content = await rawResponse.json();
    console.log(content);
    if (content.status == true) {
      window.location.reload(false);
    }
  }

  function editGroupValues(data) {
    setEmail(data.participant1email);
    setName(data.participant1name);
    setPhone(data.participant1phone);
    setCourse(data.coursename);
    setCollege(data.collegename);
    setParticipant2(data.participant2name);
    setParticipant3(data.participant3name);
    setParticipant4(data.participant4name);
    setParticipant5(data.participant5name);
    setPayment(data.paymentpaid);
    setUserid(data.id);
  }

  async function submitGroupValues(e) {
    var eventid = searchParams.get("eventid");
    e.preventDefault();
    const rawResponse = await fetch(
      `${URL_endpoint}/v1/admin/event/group/update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventid: eventid,
          participant1email: email,
          participant1name: name,
          participant1phone: phone,
          college: college,
          course: course,
          participant2name: participant2 || "",
          participant3name: participant3 || "",
          participant4name: participant4 || "",
          participant5name: participant5 || "",
          paymentpaid: payment,
          userid: userid,
        }),
      }
    );
    const content = await rawResponse.json();
    console.log(content);
    if (content.status == true) {
      window.location.reload(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <h3 className="mt-5 mb-3">{localStorage.getItem("eventname")} Event</h3>
        {count == 2 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Course</th>
                <th scope="col">College</th>
                <th scope="col">Participant 2</th>
                <th scope="col">Participant 3</th>
                <th scope="col">Participant 4</th>
                <th scope="col">Participant 5</th>
                <th scope="col">Payment Status</th>
                <th></th>
              </tr>
            </thead>
            {status == true ? (
              <tbody>
                {data.map((d) => (
                  <tr>
                    <th scope="row">{(i = i + 1)}</th>
                    <td>{d.participant1name}</td>
                    <td>{d.participant1email}</td>
                    <td>{d.participant1phone}</td>
                    <td>{d.coursename}</td>
                    <td>{d.collegename}</td>
                    <td>{d.participant2name || "Null"}</td>
                    <td>{d.participant3name || "Null"}</td>
                    <td>{d.participant4name || "Null"}</td>
                    <td>{d.participant5name || "Null"}</td>
                    <td>{JSON.stringify(d.paymentpaid)}</td>
                    <td className="d-flex justify-content-evenly flex-column">
                      {/* <button type="button" className="mb-2 btn btn-success">
                        Send Mail
                      </button> */}
                      <button
                        type="button"
                        className="mb-2 btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#groupEditModal"
                        onClick={() => {
                          editGroupValues(d);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => {
                          setDeleteValue(d.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <center>
                {" "}
                <h3 className="mt-3">No Records Found</h3>
              </center>
            )}
          </table>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Participant Name</th>
                <th scope="col">Participant Email</th>
                <th scope="col">Participant Phone Number</th>
                <th scope="col">Course Name</th>
                <th scope="col">College Name</th>
                <th scope="col">Payment Status</th>
                <th></th>
              </tr>
            </thead>
            {status == true ? (
              <tbody>
                {data.map((d) => (
                  <tr>
                    <th scope="row">{(i = i + 1)}</th>

                    <td>{d.participantname}</td>
                    <td>{d.participantemail}</td>
                    <td>{d.participantphone}</td>
                    <td>{d.coursename}</td>
                    <td>{d.collegename}</td>
                    <td>{JSON.stringify(d.paymentpaid)}</td>
                    <td className="d-flex justify-content-evenly">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#singleEditModal"
                        onClick={() => {
                          editSingleValues(d);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => {
                          setDeleteValue(d.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <center>
                <h3 className="mt-3">No Records Found</h3>
              </center>
            )}
          </table>
        )}

        {/* Single Event Edit Modal Start */}
        <div
          class="modal fade"
          id="singleEditModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Details
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="modal-body">
                    <input
                      name="participantemail"
                      className="mb-3 form-control"
                      type="email"
                      placeholder="Email"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                    <input
                      name="participantname"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Full Name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    <input
                      name="participantphone"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Phone Number"
                      aria-label="phonenumber"
                      aria-describedby="basic-addon1"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                    />
                    <input
                      name="college"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="College Name"
                      aria-label="college"
                      aria-describedby="basic-addon1"
                      value={college}
                      onChange={(e) => {
                        setCollege(e.target.value);
                      }}
                      required
                    />
                    <input
                      name="course"
                      className="mb-3 form-control"
                      type="text"
                      placeholder="Course Name"
                      aria-label="course"
                      aria-describedby="basic-addon1"
                      value={course}
                      onChange={(e) => {
                        setCourse(e.target.value);
                      }}
                      required
                    />
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        checked={payment}
                        onChange={(e) => {
                          console.log(e.target.checked);
                          setPayment(e.target.checked);
                          e.target.checked ? true : false;
                        }}
                      />
                      <label
                        class="form-check-label"
                        for="flexCheckIndeterminate"
                      >
                        Payment Paid
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={(e) => {
                    submitSingleValues(e);
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <SingleModalEdit /> */}
        {/* Single Event Edit Modal End */}

        {/* Group Event Edit Modal Start */}
        {/* <GroupModalEdit/> */}
        <div
          class="modal fade"
          id="groupEditModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit your record.
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <input
                  name="participantemail"
                  className="mb-3 form-control"
                  type="email"
                  placeholder="Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  required
                />
                <input
                  name="participantname"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Full Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <input
                  name="participantphone"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Phone Number"
                  aria-label="phonenumber"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  required
                />
                <input
                  name="college"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="College Name"
                  aria-label="college"
                  aria-describedby="basic-addon1"
                  value={college}
                  onChange={(e) => {
                    setCollege(e.target.value);
                  }}
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Course Name"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Participant 2"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  value={participant2}
                  onChange={(e) => {
                    setParticipant2(e.target.value);
                  }}
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Participant 3"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  value={participant3}
                  onChange={(e) => {
                    setParticipant3(e.target.value);
                  }}
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Participant 4"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  value={participant4}
                  onChange={(e) => {
                    setParticipant4(e.target.value);
                  }}
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Participant 5"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  value={participant5}
                  onChange={(e) => {
                    setParticipant5(e.target.value);
                  }}
                  required
                />
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckIndeterminate"
                    checked={payment}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      setPayment(e.target.checked);
                      e.target.checked ? true : false;
                    }}
                  />
                  <label class="form-check-label" for="flexCheckIndeterminate">
                    Payment Paid
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={(e) => {
                    submitGroupValues(e);
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Group Event Edit Modal End */}

        {/* Delete Modal Start */}

        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Deleting your record.
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Your record is going to be deleted. Please confirm.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    deleteParticipant(deleteValue);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Modal End */}
      </div>
    </>
  );
};

export default Events;
