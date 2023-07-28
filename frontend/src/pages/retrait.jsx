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
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  const [selectedVille, setSelectedVille] = useState("");
  const [agences, setAgences] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedAgence, setSelectedAgence] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(true);
  const URL = "http://localhost";
  const Port = 3000;
  const uri = `${URL}:${Port}`;
  useEffect(() => {
    fetch(uri+"/userActive")
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        console.log("erooore");
      });
  }, []);
  const filteredAgences = agences.filter((agence) => {
    return (
      (selectedVille === "" || agence.ville === selectedVille) &&
      (selectedCommune === "" || agence.commune === selectedCommune) &&
      (selectedAgence === "" || agence.agence === selectedAgence)
    );
  });
  const handleVilleChange = (e) => {
    const selectedVille = e.target.value;
    setSelectedVille(selectedVille);
    setSelectedCommune("");
    setSelectedAgence("");
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };
  const handleCommuneChange = (e) => {
    const selectedCommune = e.target.value;
    setSelectedCommune(selectedCommune);
    setSelectedAgence("");
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    fetch(uri+"/agencelist")
      .then((response) => response.json())
      .then((data) => {
        // Handle the data here
        setAgences(data.agences);
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }, []);
  const uniqueAgences = [
    ...new Set(
      agences
        .filter((agence) => agence.commune === selectedCommune)
        .map((agence) => agence.agence)
    ),
  ];
  const uniqueCommunes = [
    ...new Set(
      agences
        .filter((agence) => agence.ville === selectedVille)
        .map((agence) => agence.commune)
    ),
  ];

  const handleTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);

    const div = document.getElementById('div4');
    if (div) {
      div.classList.remove('row', 'justify-content-center');
    }

    fetch(uri+"/testretraits")
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
                      {item.Test ==="success" ? (
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

    const div = document.getElementById('div3');
    if (div) {
      div.classList.remove('row', 'justify-content-center');
    }
    fetch(uri+"/testretraitAgences")
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
    fetch(uri+"/insertRretraits")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly(data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error(error));
      setShowSpinner(false);
      setShowDangerAlert(true);

    console.log("rand", randomly);
  };
  const addrandomly2 = () => {
    setShowSpinner(true);
    fetch(uri+"/insertRretraitAgences")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly(data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error(error));
      setShowSpinner(false);
      setShowDangerAlert(true);

    console.log("rand", randomly);
  };
  const handleSubmit3 = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    
    fetch(uri+"/addretraitagences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData2),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setFormData2(formData2)
        const modalElement = document.getElementById('signup-modal3');
        if (modalElement) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
        setShowSuccessAlert(true)
       
        console.log("Form submitted successfully:", data);
      })
      .catch((error) => {
        setShowSpinner(false);
         setShowDangerAlert(true);
        console.error("Error submitting form:", error);
      });
  };

  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });
  const [formData2, setFormData2] = useState({
    email: "",
    montant: "",
    fournisseur: "imara",
    agence: "",
    commune: ""
  });
  const [formData3, setFormData3] = useState({
    email: "",
    ville: "",
    commune: "",
    agence: "",
  });
  const uniqueVilles = [...new Set(agences.map((agence) => agence.ville))];
  const handleChange3 = (e) => {
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgenceChange = (e) => {
    const selectedAgence = e.target.value;
    setSelectedAgence(selectedAgence);
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };

  document.addEventListener('click', function (event) {
    // Code to execute when the document is clicked
    setShowSuccessAlert(false);
    setShowDangerAlert(false);

  });

  const handleSubmit = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    // const forme = document.getElementById("signup-modal");
    // Send the form data to the server
    fetch(uri+"/insertretrait", {
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

        const modalElement = document.getElementById('signup-modal1');
        if (modalElement) {
          const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        }

        setShowSuccessAlert(true);

        // Handle success response from the server
      })
      .catch((error) => {
        setShowSpinner(false);
      setShowDangerAlert(true);
        console.error("Error submitting form:", error);
        // Handle error response or network failure
      });
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
        <div id="myModal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} className="modal fade show " tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-sm ">
            <div className="modal-content modal-filled bg-success">
              <div className="modal-body p-4 ">
                <div className="text-center">
                  <i className="dripicons-checkmark h1"></i>
                  <h4 className="mt-2">Well Done!</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

{showDangerAlert && (
        <div id="danger-alert-modal" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content modal-filled bg-danger">
                    <div className="modal-body p-4">
                        <div className="text-center">
                            <i className="dripicons-wrong h1"></i>
                            <h4 className="mt-2">Error</h4>
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
                    <h1 className="page-title mb-3  text-uppercase fw-normal fs-4">      
                       Retrait
<i className="fas fa-user-minus m-2 fs-3 text-danger"></i>

                       </h1>
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
                        <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                    retrait           Endpoint




<i className="fas fa-money-bill-wave fs-4  m-1 text-danger"></i>


                  </h1>       
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
                              <i className="mdi mdi-wrench"></i> Tester
                            </button>
                          </div>
                          <div className="row">

                            <div id="tb" className="table-responsive">
                              <div className="col-12 text-center p-2">
                                {table !== null ? (
                                  table
                                ) : (
                                  <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                  >
                                    <div id='div4' className="row justify-content-center">
                                      <div className="col-md-5">
                                        <img
                                          src="assets/images/emptydata.jpg"
                                          alt=""
                                          height="300"
                                          width="300"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane " id="RetraitAg">
                        <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                    Retrait Agences Endpoint
<i className="fas fa-building fs-4 m-1 text-warning"></i>


                  </h1>       
                          <h5 className="mb-3 text-uppercase bg-light ">

                          <button
                              type="button"
                              className="btn btn-primary m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#signup-modal3"
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
                            id="signup-modal3"
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

                                  <form
                                    onSubmit={handleSubmit3}
                                    className="ps-3 pe-3"
                                  >
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
                                      <label>Ville</label>
                                      <select
                                        name="ville"
                                        value={selectedVille}
                                        className="form-control select2"
                                        data-toggle="select2"
                                        onChange={handleVilleChange}
                                      >
                                        <option value="">All</option>
                                        {uniqueVilles.map((ville) => (
                                          <option key={ville} value={ville}>
                                            {ville}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label>Commune</label>
                                      <select
                                        name="commune"
                                        value={selectedCommune}
                                        className="form-control select2"
                                        data-toggle="select2"
                                        onChange={handleCommuneChange}
                                      >
                                        <option value="">All</option>

                                        {uniqueCommunes.map((commune) => (
                                          <option key={commune} value={commune}>
                                            {commune}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label>Agence</label>
                                      <select
                                        name="agence"
                                        value={selectedAgence}
                                        className="form-control select2"
                                        data-toggle="select2"
                                        onChange={handleAgenceChange}
                                      >
                                        <option value="">All</option>
                                        {uniqueAgences.map((agence) => (
                                          <option key={agence} value={agence}>
                                            {agence}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Montant
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="montant"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="montant"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <button
                                        className="btn btn-primary"
                                        type="submit"
                                      >
                                        Save
                                      </button>
                                    </div>
                                    {filteredAgences.map((agence) => (
                                      <div key={agence.id}>
                                        {/* Render the agence details */}
                                      </div>
                                    ))}
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
                              <i className="mdi mdi-wrench"></i> Tester
                            </button>
                          </div>
                          <div className="row">

                            <div id="tb" className="table-responsive">
                              <div className="col-12 text-center p-2">
                                {table2 !== null ? (
                                  table2
                                ) : (
                                  <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                  >
                                    <div id='div3' className="row justify-content-center">
                                      <div className="col-md-5">
                                        <img
                                          src="assets/images/emptydata.jpg"
                                          alt=""
                                          height="300"
                                          width="300"
                                        />
                                      </div>
                                    </div>
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


              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Retrait;
