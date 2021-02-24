import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditUser = ({ user }) => {
  const [FirstName, setFirstName] = useState(user.firstname);
  const [LastName, setLastName] = useState(user.lastname);
  const [Address, setAddress] = useState(user.address);
  const [OrganizationName, setOrganizationName] = useState(
    user.organizationname
  );
  const [Phone, setPhone] = useState(user.phone);
  const [Email, setEmail] = useState(user.email);

  //Edit user

  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      const body = {
        FirstName,
        LastName,
        Address,
        OrganizationName,
        Phone,
        Email,
      };
      const response = await fetch(
        `https://uf5dnq4e49.execute-api.ap-south-1.amazonaws.com/dev/UpdateUser/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target={`#id${user.id}`}
        onClick={() => {
          setFirstName(user.FirstName);
          setLastName(user.LastName);
          setAddress(user.Address);
          setOrganizationName(user.OrganizationName);
          setPhone(user.Phone);
          setEmail(user.Email);
        }}
      >
        Edit
      </button>

      <div class="modal" id={`id${user.id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit User Details </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                  setFirstName(user.FirstName);
                  setLastName(user.LastName);
                  setAddress(user.Address);
                  setOrganizationName(user.OrganizationName);
                  setPhone(user.Phone);
                  setEmail(user.Email);
                }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <Formik
                initialValues={{
                  FirstName: FirstName,
                  LastName: LastName,
                  Email: Email,
                  Phone: Phone,
                }}
                validationSchema={Yup.object().shape({
                  FirstName: Yup.string().required("First Name is required"),
                  LastName: Yup.string().required("Last Name is required"),
                  Email: Yup.string()
                    .email("Email is invalid")
                    .required("Email is required"),
                  Phone: Yup.string()
                    .length(10, "Must be 10 digit number")
                    .required("Phone Required"),
                })}
                onSubmit={(fields) => {
                  console.log(
                    "SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 3)
                  );
                }}
                render={({ setFieldValue, errors, status, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="FirstName">First Name </label>
                      <Field
                        type="text"
                        name="FirstName"
                        className={
                          "form-control" +
                          (errors.FirstName && touched.FirstName
                            ? " is-invalid"
                            : "")
                        }
                        value={FirstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          setFieldValue("FirstName", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="FirstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="LastName">Last Name </label>
                      <Field
                        type="text"
                        name="LastName"
                        value={LastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setFieldValue("LastName", e.target.value);
                        }}
                        className={
                          "form-control" +
                          (errors.LastName && touched.LastName
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="LastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label>Address </label>
                      <Field
                        type="text"
                        className="form-control"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Organization Name </label>
                      <Field
                        type="text"
                        className="form-control"
                        value={OrganizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Phone">Phone </label>
                      <Field
                        type="text"
                        className={
                          "form-control" +
                          (errors.Phone && touched.Phone ? " is-invalid" : "")
                        }
                        name="Phone"
                        value={Phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setFieldValue("Phone", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="Phone"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Email">Email </label>
                      <Field
                        type="email"
                        name="Email"
                        className={
                          "form-control" +
                          (errors.Email && touched.Email ? " is-invalid" : "")
                        }
                        value={Email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setFieldValue("Email", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="Email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </Form>
                )}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
                onClick={(e) => UpdateUser(e)}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setFirstName(user.FirstName);
                  setLastName(user.LastName);
                  setAddress(user.Address);
                  setOrganizationName(user.OrganizationName);
                  setPhone(user.Phone);
                  setEmail(user.Email);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUser;
