import React, { useEffect, useState } from "react";
import "./events.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { URL_endpoint } from "../../../config";

const Events = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      null;
    } else {
      Navigate("/login");
    }
  }, [localStorage.getItem("userid")]);
  const [data, setData] = useState([]);
  const [event, setEventName] = useState("qwdwqd");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);

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

  async function deleteParticipant(id) {
    console.log("Deleting");
    console.log(id);
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
                        data-bs-target="#exampleModal1"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          deleteParticipant(d.id);
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
                        data-bs-target="#exampleModal"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          deleteParticipant(d.id);
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
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Single Event Edit Modal End */}

        {/* Group Event Edit Modal Start */}
        <div
          class="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Group Event Edit Modal End */}
      </div>
    </>
  );
};

export default Events;
