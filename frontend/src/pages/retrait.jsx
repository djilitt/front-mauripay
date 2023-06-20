import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Retrait() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [results, setResults] = useState([]);
  const [table, setTable] = useState(null);
  const [table2, setTable2] = useState(null);
  const [randomly, setRandomly] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/userActive")
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        console.log("erooore");
      });
  }, []);

  const handleTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);

    fetch("http://localhost:3000/retraittest")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContent = (
          <table className="table table-bordered table-centered mb-0">
            <thead>
              <tr>
                <th>Email</th>
                <th>Expected</th>
                <th>Response</th>
                <th>Test</th>
                <th>Etat</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.repExcepte.toString()}</td>
                    <td className="maxlen">{item.reponse}</td>

                    <td>
                      {item.Test === "success" ? (
                        <>
                          <i className="mdi mdi-circle text-success"></i>
                          {item.Test}
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-circle text-danger"></i>
                          {item.Test}
                        </>
                      )}
                    </td>
                    <td>{item.etat}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        );
        setData(data);
        setTable(tableContent);
        console.log("data", data);
        console.log("table", table);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowMessage(true);
        console.error(error);
      });
  };
  const handleTestClick2 = () => {
    setShowMessage(false);
    setShowSpinner(true);

    fetch("http://localhost:3000/retraitAgenceTest")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContent2 = (
          <table className="table table-bordered table-centered mb-0">
            <thead>
              <tr>
                <th>Email</th>
                <th>Expected</th>
                <th>Response</th>
                <th>Test</th>
                <th>Etat</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.repExcepte.toString()}</td>
                    <td className="maxlen">{item.reponse}</td>

                    <td>
                      {item.Test === "success" ? (
                        <>
                          <i className="mdi mdi-circle text-success"></i>
                          {item.Test}
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-circle text-danger"></i>
                          {item.Test}
                        </>
                      )}
                    </td>
                    <td>{item.etat}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        );
        setData2(data2);
        setTable2(tableContent2);
        console.log("data2", data2);
        console.log("table2", table2);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowMessage(true);
        console.error(error);
      });
  };
  console.log("table second", table);

  const addrandomly = () => {
    setShowSpinner(true);
    fetch("http://localhost:3000/randomretrait")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly(data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error(error));

    console.log("rand", randomly);
  };
  const addrandomly2 = () => {
    setShowSpinner(true);
    fetch("http://localhost:3000/randomretraitAgence")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly(data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error(error));

    console.log("rand", randomly);
  };

  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });
  const [formData2, setFormData2] = useState({
    password:"",
  montant:"",
  fournisseur:"imara",
  agence:"",
  commune:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    const forme = document.getElementById("signup-modal");
    // Send the form data to the server
    fetch("http://localhost:3000/insertretrait", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        console.log("Form submitted successfully:", data);
        setShowSuccessAlert(true);

        // Handle success response from the server
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error response or network failure
      });
  };
  const handleSubmit2 = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    const forme = document.getElementById("signup-modal");
    // Send the form data to the server
    fetch("http://localhost:3000/insertretrait", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        console.log("Form submitted successfully:", data);
        setShowSuccessAlert(true);

        // Handle success response from the server
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error response or network failure
      });
  };

  const handleContinue = () => {
    setShowSuccessAlert(false);
  };
  return (
    <>
      <div
        id="spinner"
        className={`spinner-wrapper ${showSpinner ? "" : "d-none"}`}
      >
        <div
          className="spinner-border avatar-lg text-primary"
          role="status"
        ></div>
      </div>

      {showSuccessAlert && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content modal-filled bg-success">
              <div className="modal-body p-4">
                <div className="text-center">
                  <i className="dripicons-checkmark h1"></i>
                  <h4 className="mt-2">Well Done!</h4>
                  {/* <p className="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p> */}
                  <button
                    type="button"
                    className="btn btn-light my-2"
                    data-bs-dismiss="modal"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Topbar />
      <div className="container-fluid">
        <div className="wrapper">
          <LeftSidebar />
          <div className="content-page">
            <div className="content">
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0"></ol>
                    </div>
                    <h4 className="page-title">Retrait</h4>
                  </div>
                </div>
              </div>
           
          

              <div className="row">
                <div className="col-12">
                <div className="card">
                    <div className="card-body">
                      <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                        <li className="nav-item">
                          <a
                            href="#Retrait"
                            data-bs-toggle="tab"
                            aria-expanded="true"
                            className="nav-link rounded-0 active"
                          >
                            Retrait
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#RetraitAg"
                            data-bs-toggle="tab"
                            aria-expanded="true"
                            className="nav-link rounded-0 "
                          >
                            Retrait Agence
                          </a>
                        </li>
                        </ul>
                        <div className="tab-content">
                        <div className="tab-pane show active" id="Retrait">
                          <h5 className="mb-3 text-uppercase bg-light ">
                            <button
                              type="button"
                              className="btn btn-primary m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#signup-modal1"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={addrandomly}
                              className="btn btn-success m-2"
                            >
                              Add Randomly
                            </button>
                          </h5>
                          <div
                                    id="signup-modal1"
                                    className="modal fade"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                        <div className="text-center mt-2 mb-4">
                                            <span>
                                            <img
                                                src="assets/images/users/mauripay.png"
                                                alt=""
                                                height="29"
                                            />
                                            </span>
                                        </div>
                                        <form onSubmit={handleSubmit} className="ps-3 pe-3">
                                            <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">
                                                Email
                                            </label>
                                            <select
                                                onChange={handleChange}
                                                name="email"
                                                className="form-control select2"
                                                data-toggle="select2"
                                            >
                                                <option>Select</option>
                                                {results &&
                                                results.length > 0 &&
                                                results.map((user) => (
                                                    <option
                                                    key={user.email}
                                                    value={JSON.stringify(user)}
                                                    >
                                                    {user.email}
                                                    </option>
                                                ))}
                                            </select>
                                            </div>
                                            <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Code
                                            </label>
                                            <input
                                                name="code"
                                                className="form-control"
                                                onChange={handleChange}
                                                type="text"
                                                required=""
                                                id="password"
                                                placeholder="Password"
                                            />
                                            </div>
                                            <div className="mb-3 text-center">
                                            <button className="btn btn-primary" type="submit">
                                                Save
                                            </button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                          {/* transfert */}

                          <div className="text-center">
                            <button
                              type="submit"
                              onClick={handleTestClick}
                              className="btn btn-warning mt-2"
                            >
                              <i className="mdi mdi-content-save"></i> Tester
                            </button>
                          </div>
 
                          <div className="row">
                            <div className="card">
                            <div className="card-body">
                                <div id="tb" className="table-responsive">
                                <div className="col-12 text-center">
                                    {table2 !== null ? (
                                    table2
                                    ) : (
                                    <div
                                        id="message"
                                        className={showMessage ? "" : "d-none"}
                                    >
                                        No data is available
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>                        </div>
                        <div className="tab-pane " id="RetraitAg">
                          <h5 className="mb-3 text-uppercase bg-light ">
                            <button
                              type="button"
                              className="btn btn-primary m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#signup-modal2"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={addrandomly2}
                              className="btn btn-success m-2"
                            >
                              Add Randomly
                            </button>
                          </h5>
                          <div
                                    id="signup-modal2"
                                    className="modal fade"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                        <div className="text-center mt-2 mb-4">
                                            <span>
                                            <img
                                                src="assets/images/users/mauripay.png"
                                                alt=""
                                                height="29"
                                            />
                                            </span>
                                        </div>
                                        <form onSubmit={handleSubmit2} className="ps-3 pe-3">
                                            <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">
                                                Email
                                            </label>
                                            <select
                                                onChange={handleChange2}
                                                name="email"
                                                className="form-control select2"
                                                data-toggle="select2"
                                            >
                                                <option>Select</option>
                                                {results &&
                                                results.length > 0 &&
                                                results.map((user) => (
                                                    <option
                                                    key={user.email}
                                                    value={JSON.stringify(user)}
                                                    >
                                                    {user.email}
                                                    </option>
                                                ))}
                                            </select>
                                            </div>
                                            <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Code
                                            </label>
                                            <input
                                                name="code"
                                                className="form-control"
                                                onChange={handleChange2}
                                                type="text"
                                                required=""
                                                id="password"
                                                placeholder="Password"
                                            />
                                            </div>
                                            <div className="mb-3 text-center">
                                            <button className="btn btn-primary" type="submit">
                                                Save
                                            </button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              onClick={handleTestClick2}
                              className="btn btn-warning mt-2"
                            >
                              <i className="mdi mdi-content-save"></i> Tester
                            </button>
                          </div>
                           
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    <div id="tb" className="table-responsive">
                      <div className="col-12 text-center">
                        {table2 !== null ? (
                          table2
                        ) : (
                          <div
                            id="message"
                            className={showMessage ? "" : "d-none"}
                          >
                            No data is available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                        </div>
                        </div>
                        </div>
                </div>
             </div>
             </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Retrait;
