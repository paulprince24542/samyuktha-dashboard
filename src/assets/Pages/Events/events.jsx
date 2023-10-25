import React, { useEffect, useState } from "react";
import "./events.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

const Events = () => {
  const [data, setData] = useState([]);
  const [event, setEventName] = useState("");

  const [searchParams] = useSearchParams();
  console.log(searchParams.get("id"));

  async function getList() {
    var url = `http://localhost:8888/v1/api/admin/events/single/${searchParams.get(
      "id"
    )}`;
    var response = await fetch(url);
    try {
      const responseJson = await response.json();
      console.log();
      setEventName(responseJson[0].eventname);
      setData(responseJson);
     
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getList();
  }, []);
  var i = 0;
  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mt-5 mb-3">{event} Event</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Participant Name</th>
              <th scope="col">Participant Email</th>
              <th scope="col">Participant Phone Number</th>
              <th scope="col">Course Name</th>
              <th scope="col">College Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr>
                <th scope="row">{(i = i + 1)}</th>
                <td>{d.participantname}</td>
                <td>{d.participantemail}</td>
                <td>{d.participantphone}</td>
                <td>{d.coursename}</td>
                <td>{d.collegename}</td>
                <td className="d-flex justify-content-evenly">
                  <button type="button" className="btn btn-primary">
                    Change
                  </button>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Events;
