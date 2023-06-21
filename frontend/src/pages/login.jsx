import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import '../App.css'





function Login() {

    const [data, setData] = useState([]);
    const [table, setTable] = useState(null);
    const [randomly, setRandomly] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(true);
    const [showModal, setShowModal] = useState(true);




    const handleTestClick = () => {

        setShowMessage(false);
        setShowSpinner(true);


        fetch('http://localhost:3000/testuser')
            .then((response) => response.json())
            .then((data) => {
                setShowSpinner(false);
                const tableContent = (
                    <table className="table table-bordered table-centered mb-0">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Expected</th>
                                <th>Response</th>
                                <th>Test</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 &&
                                data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>
                                        <td>{item.repExcepte.toString()}</td>
                                        <td className="maxlen">{item.reponse}</td>
                                        <td>
                                            {item.Test === 'success' ? (
                                                <><i className="mdi mdi-circle text-success"></i>{item.Test}</>
                                            ) : (
                                                <><i className="mdi mdi-circle text-danger"></i>{item.Test}</>
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
    console.log("table first", table);

    const addrandomly = () => {

        setShowSpinner(true);
        fetch('http://localhost:3000/randomusers')
            .then((response) => response.json())
            .then((data) => {
                setShowSpinner(false);
                setRandomly(data)
                setShowSuccessAlert(true);
                // setTimeout(function () {
                    // Show the modal using Bootstrap's modal method
                    // var myModal = new bootstrap.Modal(document.getElementById('myModal'));
                    // myModal.show();
                    // setShowSuccessAlert(false);
                // }, 1000);

            })
            .catch((error) => console.error(error));

        console.log("rand", randomly);
    }

    document.addEventListener('click', function(event) {
        // Code to execute when the document is clicked
        setShowSuccessAlert(false);
    });


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        setShowSpinner(true);
        e.preventDefault();
        // const forme = document.getElementById('signup-modal')
        // Send the form data to the server
        fetch('http://localhost:3000/insertuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                setShowSpinner(false);
                console.log('Form submitted successfully:', data);

                const modalElement = document.getElementById('signup-modal');
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
                console.error('Error submitting form:', error);
                // Handle error response or network failure
            });
    };

    const handleContinue = () => {
        setShowSuccessAlert(false);
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
                                        <h4 className="page-title">Login</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#signup-modal">Add</button>
                                    <button onClick={addrandomly} type="button" className="btn btn-success m-2">add randomly</button>
                                    <button onClick={handleTestClick} type="button" className="btn btn-warning m-2">Test <i className="mdi mdi-wrench"></i></button>
                                    {/* <div class="spinner-grow text-warning" role="status"></div> */}
                                </div>
                            </div>

                            <div id="signup-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <div className="text-center mt-2 mb-4">
                                                <span><img src="assets/images/users/mauripay.png" alt="" height="29" /></span>
                                            </div>
                                            <form onSubmit={handleSubmit} className="ps-3 pe-3">
                                                <div className="mb-3">
                                                    <label htmlFor="emailaddress" className="form-label">Email</label>
                                                    <input name='email' onChange={handleChange} className="form-control" type="text" id="email" required="" placeholder="Email" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input name='password' className="form-control" onChange={handleChange} type="password" required="" id="password" placeholder="Password" />
                                                </div>
                                                <div className="mb-3 text-center">
                                                    <button className="btn btn-primary" type="submit">Save</button>
                                                </div>
                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card">
                                    <div className="card-body">
                                        <div id='tb' className="table-responsive">
                                            <div className="col-12 text-center">

                                                {table !== null ? (
                                                    table
                                                ) : (
                                                    <div id="message" className={showMessage ? '' : 'd-none'}>
                                                        No data is available
                                                    </div>
                                                )}




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

export default Login;
