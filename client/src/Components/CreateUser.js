import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateUser = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [OrganizationName, setOrganizationName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");

  const onSubmitForm = async (e) => {
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
      const response = await fetch("http://localhost:5000/CreateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">New User</h1>
      <center>
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
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
            console.log("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 3));
          }}
          render={({ setFieldValue, errors, status, touched }) => (
            <Form
              onSubmit={onSubmitForm}
              className="col-md-6"
              Style="text-align:left;"
            >
              <div className="form-group">
                <label htmlFor="FirstName">First Name </label>
                <Field
                  type="text"
                  name="FirstName"
                  className={
                    "form-control" +
                    (errors.FirstName && touched.FirstName ? " is-invalid" : "")
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
                    (errors.LastName && touched.LastName ? " is-invalid" : "")
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
              <div className="form-group">
                <button type="submit" className="btn btn-success mt-3">
                  Add
                </button>
              </div>
            </Form>
          )}
        />
      </center>
    </Fragment>
  );
};

export default CreateUser;
