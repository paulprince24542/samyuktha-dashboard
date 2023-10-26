import React from "react";

export default function SingleModalEdit() {
  return (
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
                  required
                />
                <input
                  name="participantname"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Full Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  required
                />
                <input
                  name="participantphone"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Phone Number"
                  aria-label="phonenumber"
                  aria-describedby="basic-addon1"
                  required
                />
                <input
                  name="college"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="College Name"
                  aria-label="college"
                  aria-describedby="basic-addon1"
                  required
                />
                <input
                  name="course"
                  className="mb-3 form-control"
                  type="text"
                  placeholder="Course Name"
                  aria-label="course"
                  aria-describedby="basic-addon1"
                  required
                />
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                   
                    id="flexCheckIndeterminate"
                  />
                  <label class="form-check-label" for="flexCheckIndeterminate">
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
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
