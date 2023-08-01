import LeftSidebar from "../components/LeftSidebar";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import React, { useEffect, useState } from "react";

function ResetPassword() {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [dataforgott, setDataForgot] = useState([]);
  const [datacode, setDataCode] = useState([]);
  const [dataresspass, setDataRessPass] = useState([]);

  const [selectedValueQ1, setSelectedValueQ1] = useState("");
  const [selectedValueQ2, setSelectedValueQ2] = useState("");

  const [selectedValueQc1, setSelectedValueQc1] = useState("");
  const [selectedValueQc2, setSelectedValueQc2] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [tableforgot, setTableForgot] = useState(null);
  const [tablecode, setTableCode] = useState(null);

  const [tablereponse, setTableReponse] = useState(null);
  const [tableresepass, setTableRessPass] = useState(null);
  const [datareponse, setDataReponse] = useState([]);
  const [data3, setData3] = useState([]);
  const [randomly, setRandomly] = useState(null);
  const [randomly2, setRandomly2] = useState(null);
  const [randomly3, setRandomly3] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const URL = "http://localhost";
  const Port = 3000;
  const uri = `${URL}:${Port}`;

  const [formData, setFormData] = useState({
    telephone: "",
    nni: ""
  });

  const [formData4, setFormData4] = useState({
    telephone: "",
    ni: "",
    password: "",
    confirmation: ""
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  const [formData2, setFormData2] = useState({
    q1: "",
    q2: "",
    r1: "",
    r2: "",
    tel: "",
    nni: ""
  });

  const [formData3, setFormData3] = useState({
    q1: "",
    q2: "",
    r1: "",
    r2: "",
    tel: "",
    nni: ""
  });

  const handleChangeQ2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedValueQ2(selectedValue);
    setSelectedValueQ1((prevValue) => {
      if (prevValue === selectedValue) {
        return ""; // Reset the value in q1 if it conflicts with q2
      }
      return prevValue;
    });

    // Update the formData2 object with the selected value
    setFormData2((prevFormData2) => ({
      ...prevFormData2,
      q2: selectedValue,
    }));
  };


  const handleChangeQ1 = (event) => {
    const selectedValue = event.target.value;
    setSelectedValueQ1(selectedValue);
    setSelectedValueQ2((prevValue) => {
      if (prevValue === selectedValue) {
        return ""; // Reset the value in q2 if it conflicts with q1
      }
      return prevValue;
    });


    // Update the formData2 object with the selected value
    setFormData2((prevFormData2) => ({
      ...prevFormData2,
      q1: selectedValue,
    }));
  };


  const handleChangeQc2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedValueQc2(selectedValue);
    setSelectedValueQc1((prevValue) => {
      if (prevValue === selectedValue) {
        return ""; // Reset the value in q1 if it conflicts with q2
      }
      return prevValue;
    });

    // Update the formData3 object with the selected value
    setFormData3((prevFormData3) => ({
      ...prevFormData3,
      q2: selectedValue,
    }));
  };


  const handleChangeQc1 = (event) => {
    const selectedValue = event.target.value;
    setSelectedValueQc1(selectedValue);
    setSelectedValueQc2((prevValue) => {
      if (prevValue === selectedValue) {
        return ""; // Reset the value in q2 if it conflicts with q1
      }
      return prevValue;
    });


    // Update the formData3 object with the selected value
    setFormData3((prevFormData3) => ({
      ...prevFormData3,
      q1: selectedValue,
    }));
  };


  const filteredOptionsQ2 = questions.filter(
    (question) =>
      JSON.stringify(question) !== selectedValueQ1 // Remove the selected value from options
  );

  useEffect(() => {
    fetch(uri + "/questionslist")
      .then((response) => response.json())
      .then((data) => {
        // Handle the data here
        setQuestions(data.questions);

        console.log(data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true)
        // Handle any errors
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(uri + "/userActive")
      .then((response) => response.json())
      .then((data) => {
        // Handle the data here
        setData(data);

        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error("Error:", error);
      });
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleChange3 = (e) => {
    setFormData3({
      ...formData3,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange2 = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange4 = (e) => {
    setFormData4({
      ...formData4,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setShowSpinner(true);
    setShowMessage(false)
    e.preventDefault();
    console.log("forgot route")
    // const forme = document.getElementById('signup-modal')
    // Send the form data to the server
    fetch(uri + "/insertForgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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

        setShowSuccessAlert(true)
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

  const handleSubmitReponse = (e) => {
    setShowMessage(false);
    setShowSpinner(true);

    e.preventDefault();

    // Send the form data to the server
    fetch(uri + "/insertReponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData2),
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

        setShowSuccessAlert(true);
        console.log("Form submitted successfully ress", data);
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
    setShowMessage(false)
    e.preventDefault();
    // const forme = document.getElementById('signup-modal')
    // Send the form data to the server
    console.log("formData3", formData3)
    fetch(uri + "/insertCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData3),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const modalElement = document.getElementById('signup-modal5');
        if (modalElement) {
          const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        }

        setShowSuccessAlert(true);
        console.log("Form submitted successfully:", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error("Error submitting form:", error);
        // Handle error response or network failure
      });
  };

  const handleSubmit4 = (e) => {
    setShowSpinner(true);
    e.preventDefault();

    fetch(uri + "/insertRest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData4),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const modalElement = document.getElementById('signup-modal4');
        if (modalElement) {
          const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        }

        setShowSuccessAlert(true);
        console.log("Form submitted successfully:", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);

        console.error("Error submitting form:", error);
      });
  };

  const handleResponseTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);
    const div = document.getElementById('div44');
    if (div) {
      div.classList.remove('row', 'justify-content-center');
    }
    fetch(uri + "/testreponse")
      .then((response) => response.json())
      .then((datareponse) => {
        setShowSpinner(false);
        const tableContentreponse = (
          <table className="table table-bordered table-centered mb-0">
            <thead>
              <tr>
                <th>telephone</th>
                <th>nni</th>
                <th>q1</th>
                <th>q2</th>
                <th>r1</th>
                <th>r2</th>
                <th>repExcepted</th>
                <th>Response</th>
                <th>Test</th>
              </tr>
            </thead>
            <tbody>
              {datareponse.length > 0 &&
                datareponse.map((item) => (
                  <tr key={item.id}>
                    <td>{item.telephone}</td>
                    <td>{item.nni.toString()}</td>
                    <td>{item.q1.toString()}</td>
                    <td>{item.q2.toString()}</td>
                    <td>{item.r1.toString()}</td>
                    <td>{item.r2.toString()}</td>
                    <td>{item.repExcepte.toString()}</td>
                    <td className="maxlen">{item.reponse}</td>
                    <td>
                      {item.Test === "success" ? (
                        <>
                          <i className="mdi mdi-circle text-success"></i>
                          {item.Test}
                        </>
                      ) : item.Test === "failed" ? (
                        <>
                          <i className="mdi mdi-circle text-danger"></i>
                          {item.Test}
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-circle text-warning"></i>
                          {item.Test}
                        </>
                      )}
                    </td>


                  </tr>
                ))}
            </tbody>
          </table>
        );
        setDataReponse(datareponse);
        setTableReponse(tableContentreponse);
        console.log("datareponse", datareponse);
        console.log("tablereponse", tablereponse);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        setShowMessage(true);
        console.error(error);
      });
  };

  const handleforgotTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);
    const div = document.getElementById('div41');
    if (div) {
      div.classList.remove('row', 'justify-content-center');
    }

    fetch(uri + "/testforgot")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContentforgot = (
          <table className="table table-bordered table-centered mb-0">
            <thead>
              <tr>
                <th>telephone</th>
                <th>nni</th>
                <th>RepExcepted</th>
                <th>Response</th>
                <th>Test</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.telephone}</td>
                    <td>{item.nni.toString()}</td>
                    <td>{item.repExcepte.toString()}</td>
                    <td className="maxlen">{item.reponse}</td>

                    <td>
                      {item.Test === "success" ? (
                        <>
                          <i className="mdi mdi-circle text-success"></i>
                          {item.Test}
                        </>
                      ) : item.Test === "failed" ? (
                        <>
                          <i className="mdi mdi-circle text-danger"></i>
                          {item.Test}
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-circle text-warning"></i>
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
        setTableForgot(tableContentforgot);
        console.log("dataforgott", dataforgott);
        console.log("tableforgot", tableforgot);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        setShowMessage(true);
        console.error(error);
      });

  };

  const handleResetPassTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);
    const div = document.getElementById('div43');
    if (div) {
      div.classList.remove('row', 'justify-content-center');
    }
    fetch(uri + "/testresetPasswords")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContentrespass = (
          <table className="table table-bordered table-centered mb-0">
            <thead>
              <tr>
                <th>telephone</th>
                <th>nni</th>
                <th>password</th>
                <th>passcomfirmation</th>
                <th>RepExcepted</th>
                <th>Response</th>
                <th>Test</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.telephone}</td>
                    <td>{item.nni.toString()}</td>
                    <td>{item.password.toString()}</td>
                    <td>{item.passwordConfirmation.toString()}</td>
                    <td>{item.repExcepte.toString()}</td>
                    <td className="maxlen">{item.reponse}</td>
                    <td>
                      {item.Test === "success" ? (
                        <>
                          <i className="mdi mdi-circle text-success"></i>
                          {item.Test}
                        </>
                      ) : item.Test === "failed" ? (
                        <>
                          <i className="mdi mdi-circle text-danger"></i>
                          {item.Test}
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-circle text-warning"></i>
                          {item.Test}
                        </>
                      )}
                    </td>


                  </tr>
                ))}
            </tbody>
          </table>
        );
        setDataRessPass(data);
        setTableRessPass(tableContentrespass);
        console.log("data", dataresspass);
        console.log("table", tableforgot);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        setShowMessage(true);
        console.error(error);
      });

  };

  document.addEventListener('click', function (event) {
    // Code to execute when the document is clicked
    setShowSuccessAlert(false);
    setShowDangerAlert(false);
  });

  const handlecodeTestClick = () => {
    setShowMessage(false);
    setShowSpinner(true);
    const div = document.getElementById('div42');
    if (div) {
      div.classList.remove('row', 'justify-content-center');
    }

    //transfertAgenceTest
    fetch(uri + "/testcodes")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        const tableContentcode = (
          <table className="table table-bordered table-centered mb-0">
            <thead>
              <tr>
                <th>Code</th>
                <th>Expected</th>
                <th>Response</th>
                <th>Test</th>

              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.code}</td>
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
        setDataCode(data);
        setTableCode(tableContentcode);
        console.log("data", data3);
        console.log("table", table3);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        setShowMessage(true);
        console.error(error);
      });
  };
  const randomresetpassword = () => {
    setShowSpinner(true);
    //
    fetch(uri + "/insertRresetPasswords")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setRandomly2(data);
        setShowSuccessAlert(true);
        console.log("data of randomresetpassword", data);
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
    fetch(uri + "/agenceRandom")
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

  const randomforgots = () => {
    setShowSpinner(true);
    fetch(uri + "/randomforgots")
      .then((response) => response.json())
      .then((data) => {
        setShowSuccessAlert(true);
        setData(data);
        setShowSpinner(false);
        console.log("data of randomforgots", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error(error);
      });
  };

  const randomcode = () => {
    setShowSpinner(true);
    fetch(uri + "/insertRcodes")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setShowSuccessAlert(true);
        console.log("data of randomcode", data);
      })
      .catch((error) => {
        setShowSpinner(false);
        setShowDangerAlert(true);
        console.error(error);
      });
  };


  const randomreponse = () => {
    setShowSpinner(true);
    fetch(uri + "/insertRreponse")
      .then((response) => response.json())
      .then((data) => {
        setShowSpinner(false);
        setShowSuccessAlert(true);
        console.log("data of randomreponse", data);
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
                      Reset Password <i className="fas fa-user-cog  m-1 fs-3 text-info"></i></h1>
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
                            href="#forgt"
                            data-bs-toggle="tab"
                            aria-expanded="true"
                            className="nav-link rounded-0 active"
                          >
                            Forgot
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#Res"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link rounded-0"
                          >
                            Reponse
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#Code"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link rounded-0"
                          >
                            Code
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#Pass"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link rounded-0"
                          >
                            Reset Password
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane  show active " id="forgt">
                          <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                            Forgot Endpoint <i className="fas fa-question-circle fs-4 text-warning"></i>


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
                              onClick={randomforgots}
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
                                    onSubmit={handleSubmit}
                                    className="ps-3 pe-3"
                                  >
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        telephone
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        name="telephone"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="numero"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        NNI
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        name="nni"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="nni"
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
                              onClick={handleforgotTestClick}
                              className="btn btn-warning mt-2"
                            >
                              <i className="mdi mdi-wrench"></i>Tester
                            </button>
                          </div>
                          <div className="row">

                            <div id="tb" className="table-responsive">
                              <div className="col-12 text-center p-2">
                                {tableforgot !== null ? (
                                  tableforgot
                                ) : (
                                  <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                  >
                                    <div id='div41' className="row justify-content-center">
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
                        <div className="tab-pane " id="Code">
                          <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                            Code Endpoint <i className="fas fa-key f4-4 text-info"></i>
                          </h1>
                          <h5 className="mb-3 text-uppercase bg-light ">
                            <button
                              type="button"
                              className="btn btn-primary m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#signup-modal5"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={randomcode}
                              className="btn btn-success m-2"
                            >
                              Add Randomly
                            </button>

                          </h5>
                          <div
                            id="signup-modal5"
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
                                        telephone
                                      </label>
                                      <input
                                        onChange={handleChange3}
                                        name="tel"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="numero"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        NNI
                                      </label>
                                      <input
                                        onChange={handleChange3}
                                        name="nni"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="nni"
                                      />
                                    </div>

                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        question 1
                                      </label>
                                      <select
                                        onChange={handleChangeQc1}
                                        name="q1"
                                        className="form-control select2"
                                        data-toggle="select2"
                                        value={selectedValueQc1}
                                      >
                                        <option>Select</option>
                                        {questions &&
                                          questions.length > 0 &&
                                          questions.map((question) => (
                                            <option key={question.id} value={JSON.stringify(question.question)}>
                                              {question.question}
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        question 2
                                      </label>
                                      <select
                                        onChange={handleChangeQc2}
                                        name="q2"
                                        className="form-control select2"
                                        data-toggle="select2"
                                        value={selectedValueQc2}
                                      >
                                        <option>Select</option>
                                        {filteredOptionsQ2 &&
                                          filteredOptionsQ2.length > 0 &&
                                          filteredOptionsQ2.map((question) => (
                                            <option key={question.id} value={JSON.stringify(question.question)}>
                                              {question.question}
                                            </option>
                                          ))}
                                      </select>
                                    </div>

                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        reponse 1
                                      </label>
                                      <input
                                        onChange={handleChange3}
                                        name="r1"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="reponse1"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        reponse 2
                                      </label>
                                      <input
                                        onChange={handleChange3}
                                        name="r2"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="reponse2"
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
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              onClick={handlecodeTestClick}
                              className="btn btn-warning mt-2"
                            >
                              <i className="mdi mdi-wrench"></i>Tester
                            </button>
                          </div>
                          <div className="row">

                            <div id="tb" className="table-responsive">
                              <div className="col-12 text-center p-2">
                                {tablecode !== null ? (
                                  tablecode
                                ) : (
                                  <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                  >
                                    <div id='div42' className="row justify-content-center">
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

                        <div className="tab-pane " id="Pass">
                          <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                            Reset Password  Endpoint <i className="fas fa-undo fs-4 text-warning"></i>
                          </h1>
                          <h5 className="mb-3 text-uppercase bg-light ">
                            <button
                              type="button"
                              className="btn btn-primary m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#signup-modal4"
                            >
                              Add
                            </button>
                            <button onClick={randomresetpassword} type="button" className="btn btn-success m-2">add randomly</button>

                          </h5>
                          <div
                            id="signup-modal4"
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
                                    onSubmit={handleSubmit4}
                                    className="ps-3 pe-3"
                                  >
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        telephone
                                      </label>
                                      <input
                                        onChange={handleChange4}
                                        name="telephone"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="numero"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        NNI
                                      </label>
                                      <input
                                        onChange={handleChange4}
                                        name="ni"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="nni"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Password
                                      </label>
                                      <input
                                        onChange={handleChange4}
                                        name="password"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="Password"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        Password Confirmation

                                      </label>
                                      <input
                                        onChange={handleChange4}
                                        name="confirmation"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="confirmation"
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
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              onClick={handleResetPassTestClick}
                              className="btn btn-warning mt-2"
                            >
                              <i className="mdi mdi-wrench"></i>Tester
                            </button>
                          </div>
                          <div className="row">
                            <div id="tb" className="table-responsive">
                              <div className="col-12 text-center p-2">
                                {tableresepass !== null ? (
                                  tableresepass
                                ) : (
                                  <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                  >
                                    <div id='div43' className="row justify-content-center">
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
                        <div className="tab-pane " id="Res">
                          <h1 className="page-title mb-4 text-uppercase fw-normal fs-4">
                            Reponse Endpoint  <i className="fas fa-reply fs-4 text-success"></i>
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
                              onClick={randomreponse}
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
                                    onSubmit={handleSubmitReponse}
                                    className="ps-3 pe-3"
                                  >
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        telephone
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="tel"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="numero"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        question 1
                                      </label>
                                      <select
                                        onChange={handleChangeQ1}
                                        name="q1"
                                        className="form-control select2"
                                        data-toggle="select2"
                                        value={selectedValueQ1}
                                      >
                                        <option>Select</option>
                                        {questions &&
                                          questions.length > 0 &&
                                          questions.map((question) => (
                                            <option key={question.id} value={JSON.stringify(question.question)}>
                                              {question.question}
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        question 2
                                      </label>
                                      <select
                                        onChange={handleChangeQ2}
                                        name="q2"
                                        className="form-control select2"
                                        data-toggle="select2"
                                        value={selectedValueQ2}
                                      >
                                        <option>Select</option>
                                        {filteredOptionsQ2 &&
                                          filteredOptionsQ2.length > 0 &&
                                          filteredOptionsQ2.map((question) => (
                                            <option key={question.id} value={JSON.stringify(question.question)}>
                                              {question.question}
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        reponse 1
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="r1"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="reponse1"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        reponse 2
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="r2"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="reponse2"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                      >
                                        NNI
                                      </label>
                                      <input
                                        onChange={handleChange2}
                                        name="nni"
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        required=""
                                        placeholder="nni"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <button
                                        className="btn btn-primary"
                                        type="submit">
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
                              onClick={handleResponseTestClick}
                              className="btn btn-warning mt-2"
                            >
                              <i className="mdi mdi-wrench"></i>Tester</button>
                          </div>
                          <div className="row">
                            <div id="tb" className="table-responsive">
                              <div className="col-12 text-center p-2">
                                {tablereponse !== null ? (
                                  tablereponse
                                ) : (
                                  <div
                                    id="message"
                                    className={showMessage ? "" : "d-none"}
                                  >
                                    <div id='div44' className="row justify-content-center">
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

export default ResetPassword;
