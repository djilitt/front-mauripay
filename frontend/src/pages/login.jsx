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

    // useEffect(() => {
    //     fetch('http://localhost:3000/all')
    //         .then((response) => response.json())
    //         .then((data) => setData(data))
    //         .catch((error) => console.error(error));
    // }, []);



    const handleTestClick = () => {

        setShowMessage(false);
        setShowSpinner(true);








        fetch('http://localhost:3000/all')
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
        fetch('http://localhost:3000/randomusers')
            .then((response) => response.json())
            .then((data) => setRandomly(data))
            .catch((error) => console.error(error));

        console.log("rand", randomly);
    }


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
        e.preventDefault();

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
                console.log('Form submitted successfully:', data);
                // Handle success response from the server
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle error response or network failure
            });
    };


    return (
        <>
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
                                    <button onClick={handleTestClick} type="button" className="btn btn-warning m-2">Tester <i className="mdi mdi-wrench"></i></button>
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


                                                <div
                                                    id="spinner"
                                                    className={`spinner-border avatar-md text-primary ${showSpinner ? '' : 'd-none'
                                                        }`}
                                                    role="status"
                                                >
                                                    <div class="loader">
                                                        <i class="loader-el"></i>
                                                        <i class="loader-el"></i>
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

export default Login;
