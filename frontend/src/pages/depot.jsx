import LeftSidebar from '../components/LeftSidebar'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'
import React, { useEffect, useState } from 'react';

// import { Link } from 'react-router-dom'

function Depot() {

    const [data, setData] = useState([]);
    const [results, setResults] = useState([]);
    const [table, setTable] = useState(null);
    const [randomly, setRandomly] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/userActive')
            .then((response) => response.json())
            .then((data) => {
                setResults(data)
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                console.log("erooore")
            });
    }, []);

    console.log("dattaa", results)

    const handleTestClick = () => {

        setShowMessage(false);
        setShowSpinner(true);


        fetch('http://localhost:3000/depottest')
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
                                data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.repExcepte.toString()}</td>
                                        <td className="maxlen">{item.reponse}</td>

                                        <td>
                                            {item.Test === 'success' ? (
                                                <><i className="mdi mdi-circle text-success"></i>{item.Test}</>
                                            ) : (
                                                <><i className="mdi mdi-circle text-danger"></i>{item.Test}</>
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
    console.log("table first", table);

    const addrandomly = () => {

        setShowSpinner(true);
        fetch('http://localhost:3000/randomdeposits')
            .then((response) => response.json())
            .then((data) => {
                setShowSpinner(false);
                setRandomly(data)
                setShowSuccessAlert(true);

            })
            .catch((error) => console.error(error));

        console.log("rand", randomly);
    }


    const [formData, setFormData] = useState({
        email: '',
        code: '',
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
        const forme = document.getElementById('signup-modal')
        // Send the form data to the server
        fetch('http://localhost:3000/insertdepot', {
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
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content modal-filled bg-success">
                            <div className="modal-body p-4">
                                <div className="text-center">
                                    <i className="dripicons-checkmark h1"></i>
                                    <h4 className="mt-2">Well Done!</h4>
                                    {/* <p className="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p> */}
                                    <button type="button" className="btn btn-light my-2" data-bs-dismiss="modal" onClick={handleContinue}>Continue</button>
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
                                        <h4 className="page-title">Depot</h4>
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
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Number</label>
                                                    <select onChange={handleChange} name="email" className="form-control select2" data-toggle="select2">
                                                        <option>Select</option>
                                                        {results && results.length > 0 && results.map(user => (
                                                            <option key={user.email} value={JSON.stringify(user)}>
                                                                {user.email}
                                                            </option>
                                                        ))}
                                                    </select>



                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Code</label>
                                                    <input name='code' className="form-control" onChange={handleChange} type="text" required="" id="password" placeholder="Password" />
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
    )
}

export default Depot