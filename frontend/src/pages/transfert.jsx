import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import React, { useEffect, useState } from "react";

function Transfert() {
  const [agences, setAgences] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    tel_bf: "",
    password: "",
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [table, setTable] = useState(null);
  const [table2, setTable2] = useState(null);
  const [table3, setTable3] = useState(null);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [randomly, setRandomly] = useState(null);
  const [randomly2, setRandomly2] = useState(null);
  const [randomly3, setRandomly3] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const [formData2, setFormData2] = useState({
    email: "",
    tel_bf: "",
    password: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const URL = "http://localhost";
  const Port = 3000;
  const uri = `${URL}:${Port}`;

  const [formData3, setFormData3] = useState({
    email: "",
    ville: "",
    commune: "",
    agence: "",
  });

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

  useEffect(() => {
    fetch(uri+"/userActive")
      .then((response) => response.json())
      .then((data) => {
        // Handle the data here
        setData(data);

        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  }, []);

  const [selectedVille, setSelectedVille] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedAgence, setSelectedAgence] = useState("");

  const uniqueVilles = [...new Set(agences.map((agence) => agence.ville))];
  
  const uniqueCommunes = [
    ...new Set(
      agences
        .filter((agence) => agence.ville === selectedVille)
        .map((agence) => agence.commune)
    ),
  ];

  const uniqueAgences = [
    ...new Set(
      agences
        .filter((agence) => agence.commune === selectedCommune)
        .map((agence) => agence.agence)
    ),
  ];

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
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgenceChange = (e) => {
    const selectedAgence = e.target.value;
    setSelectedAgence(selectedAgence);
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const filteredAgences = agences.filter((agence) => {
    return (
      (selectedVille === "" || agence.ville === selectedVille) &&
      (selectedCommune === "" || agence.commune === selectedCommune) &&
      (selectedAgence === "" || agence.agence === selectedAgence)
    );
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange2 = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange3 = (e) => {
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    fetch(uri+"/insertVerification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const modalElement = document.getElementById('signup-modal');
        if (modalElement) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
        setShowSuccessAlert(true);
        console.log("Form submitted successfully:", data);

        // Handle success response from the server
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error("Error submitting form:", error);
        // Handle error response or network failure
      });
  };

  const handleSubmit2 = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    // const forme = document.getElementById('signup-modal')
    // Send the form data to the server
    fetch(uri+"/inserttransfert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData2),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const modalElement = document.getElementById('signup-modal2');
        if (modalElement) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }

        console.log("Form submitted successfully:", data);
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

  const handleSubmit3 = (e) => {
    setShowSpinner(true);
    e.preventDefault();
    
    fetch(uri+"/inserttransfertagence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData3),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const modalElement = document.getElementById('signup-modal3');
        if (modalElement) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }

        console.log("Form submitted successfully:", data);
      })
      .catch((error) => {
        setShowSpinner(false);
      setShowDangerAlert(true);
        console.error("Error submitting form:", error);
      });
  };

  const handleTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);

    const div = document.getElementById('div31');
        if (div) {
            div.classList.remove('row', 'justify-content-center');
        }

    fetch(uri+"/testverifications")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContent = (
            <table className="table table-bordered table-centered mb-0">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>excepted Solde</th>
                  <th>excepted Destinataire</th>
                  <th>Response</th>
                  <th>Test</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.email}</td> 
                      <td>{item.exceptedSolde.toString()}</td>
                      <td>{item.exceptedDestinataire.toString()}</td>
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

document.addEventListener('click', function(event) {
    // Code to execute when the document is clicked
    setShowSuccessAlert(false);   
    setShowDangerAlert(false);

});

  const handleTestClick2 = () => {
    setShowMessage(false);
    setShowSpinner(true);

    const div = document.getElementById('div32');
        if (div) {
            div.classList.remove('row', 'justify-content-center');
        }

    fetch(uri+"/testtransferts")
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
          setData2(data);
          setTable2(tableContent2);
          console.log("data", data2);
          console.log("table", table2);
        })
        .catch((error) => {
          setShowSpinner(false);
          setShowMessage(true);
          console.error(error);
        });
    
  };

  const handleTestClick3 = () => {
    setShowMessage(false);
    setShowSpinner(true);

    const div = document.getElementById('div33');
        if (div) {
            div.classList.remove('row', 'justify-content-center');
        }

    //testtransferagences
    fetch(uri+"/testtransferagences")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContent3 = (
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
          setData3(data);
          setTable3(tableContent3);
          console.log("data", data3);
          console.log("table", table3);
        })
        .catch((error) => {
          setShowSpinner(false);
          setShowMessage(true);
          console.error(error);
        });
    
  };

  const randomverifications = () => {
    setShowSpinner(true);
    fetch(uri+"/insertRverifications")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly(data);
        setShowSuccessAlert(true);
        console.log("data of randomverifications", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error(error);
      });
  };

  const randomagence = () => {
    setShowSpinner(true);
    //agenceRandom
    fetch(uri+"/insertRtransferagences")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly2(data);
        setShowSuccessAlert(true);
        console.log("data of randomagence", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error(error);
      });
  };

  const randomtransfert = () => {
    setShowSpinner(true);
    fetch(uri+"/insertRtransferts")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly3(data);
        setShowSuccessAlert(true);

        console.log("data of randomtransfert", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);

        console.error(error);
      });
  };


  return (
    <>
    <div id="spinner" className={`spinner-wrapper ${showSpinner ? '' : 'd-none'}`}>
                <div className="spinner-border avatar-lg text-primary" role="status"></div>
            </div>

            {showSuccessAlert && (
                <div id="myModal" style={{ display: 'block',backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} className="modal fade show " tabIndex="-1" role="dialog" aria-hidden="true">
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
                    Transfert

                    <i className="fas fa-people-arrows m-2 fs-3 text-info"></i>

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
                            href="#aboutme"
                            data-bs-toggle="tab"
                            aria-expanded="true"
                            className="nav-link rounded-0 active"
                          >
                            Verification
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#timeline"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link rounded-0 "
                          >
                            Transfert
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#settings"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link rounded-0"
                          >
                            Transfert Egencie
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane show active" id="aboutme">
                        <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                    Verifications    Endpoint           <i className="fas fa-check-circle fs-4 text-success"></i>

                  </h1>                         
                  <h5 className="mb-3 text-uppercase bg-light ">
                          
                            <button
                              type="button"
                              className="btn btn-primary m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#signup-modal"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={randomverifications}
                              className="btn btn-success m-2"
                            >
                              Add Randomly
                            </button>
                          </h5>
                          <div
                            id="signup-modal"
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
                                    onSubmit={handleSubmit}
                                    className="ps-3 pe-3"
                                  >
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                      <select
                                        onChange={handleChange}
                                        name="email"
                                        className="form-control select2"
                                        data-toggle="select2"
                                      >
                                        <option>Select</option>
                                        {data &&
                                          data.length > 0 &&
                                          data.map((user) => (
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
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Destinataire Number
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        name="tel_bf"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="tb_lf"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="password"
                                        className="form-label"
                                      >
                                        Montent
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        name="montant"
                                        className="form-control"
                                        type="text"
                                        required=""
                                        id="passworde"
                                        placeholder="montent"
                                      />
                                    </div>
                                    <div className="mb-3 text-center">
                                      <button
                                        className="btn btn-primary"
                                        type="submit"
                                      >
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
                                    <div id='div31' className="row justify-content-center">
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
                        <div className="tab-pane show " id="timeline">
                        <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                    Transfert        Endpoint                <i className="fas fa-money-bill-wave fs-4 text-warning"></i>


                  </h1>    
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
                              onClick={randomtransfert}
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

                                  <form
                                    onSubmit={handleSubmit2}
                                    className="ps-3 pe-3"
                                  >
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                      <select
                                        onChange={handleChange2}
                                        name="email"
                                        className="form-control select2"
                                        data-toggle="select2"
                                      >
                                        <option>choose the number</option>
                                        {data &&
                                          data.length > 0 &&
                                          data.map((user) => (
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
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Destinataire Number
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="tel_bf"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="tb_lf"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="password"
                                        className="form-label"
                                      >
                                        Montent
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="montant"
                                        className="form-control"
                                        type="text"
                                        required=""
                                        id="passworde"
                                        placeholder="montent"
                                      />
                                    </div>
                                    <div className="mb-3 text-center">
                                      <button
                                        className="btn btn-primary"
                                        type="submit"
                                      >
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
                                    <div id='div32' className="row justify-content-center">
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
                        <div className="tab-pane " id="settings">
                        <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                    Transfert Agences        Endpoint                       <i className="fas fa-exchange-alt fs-4 text-info"></i>


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
                              onClick={randomagence}
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
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                      <select
                                        onChange={handleChange3}
                                        name="email"
                                        className="form-control select2"
                                        data-toggle="select2"
                                      >
                                        <option>Select</option>
                                        {data &&
                                          data.length > 0 &&
                                          data.map((user) => (
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
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Destinataire Number
                                      </label>
                                      <input
                                        onChange={handleChange3}
                                        name="tel_bf"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="tb_lf"
                                      />
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
                                        onChange={handleChange3}
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
                              onClick={handleTestClick3}
                              className="btn btn-warning mt-2"
                            >
                            <i className="mdi mdi-wrench"></i>Tester
                            </button>
                          </div>
                          <div className="row">
                            
                            <div id="tb" className="table-responsive">
                            <div className="col-12 text-center p-2">
                                {table3 !== null ? (
                                table3
                                ) : (
                                <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                >
                                    <div id='div33' className="row justify-content-center">
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

export default Transfert;
