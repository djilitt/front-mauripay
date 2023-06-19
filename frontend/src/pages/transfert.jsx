import LeftSidebar from '../components/LeftSidebar'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'
import React, { useEffect, useState } from 'react';

function Transfert() {

    const [agences, setAgences] = useState([]);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        tel_bf: '',
        password: '',
    });


    const [formData2, setFormData2] = useState({
        email: '',
        tel_bf: '',
        password: '',
    });


    const [formData3, setFormData3] = useState({
        email: '',
        ville: '',
        commune: '',
        agence: '',
    });


    useEffect(() => {
        fetch("http://localhost:3000/agencelist")
                .then(response => response.json())
                .then(data => {
                    // Handle the data here
                    setAgences(data.agences);
                    console.log(data);
                })
                .catch(error => {
                    // Handle any errors
                    console.error("Error:", error);
                });
        
    
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/userActive")
            .then(response => response.json())
            .then(data => {
                // Handle the data here
                setData(data);
                
                console.log(data);
            })
            .catch(error => {
                // Handle any errors
                console.error("Error:", error);
            });
    
    }, []);




    const [selectedVille, setSelectedVille] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const [selectedAgence, setSelectedAgence] = useState('');


    const uniqueVilles = [...new Set(agences.map(agence => agence.ville))];
    const uniqueCommunes = [...new Set(agences.filter(agence => agence.ville === selectedVille).map(agence => agence.commune))];
    const uniqueAgences = [...new Set(agences.filter(agence => agence.commune === selectedCommune).map(agence => agence.agence))];


    const handleVilleChange = e => {
        const selectedVille = e.target.value;
        setSelectedVille(selectedVille);
        setSelectedCommune('');
        setSelectedAgence('');
        setFormData3({
            ...formData3,
            [e.target.name]: e.target.value
        });
    };


    const handleCommuneChange = e => {
        const selectedCommune = e.target.value;
        setSelectedCommune(selectedCommune);
        setSelectedAgence('');
        setFormData3({
            ...formData3,
            [e.target.name]: e.target.value
        });
    };


    const handleAgenceChange = e => {
        const selectedAgence = e.target.value;
        setSelectedAgence(selectedAgence);
        setFormData3({
            ...formData3,
            [e.target.name]: e.target.value
        });
    };


    const filteredAgences = agences.filter(agence => {
        return (
            (selectedVille === '' || agence.ville === selectedVille) &&
            (selectedCommune === '' || agence.commune === selectedCommune) &&
            (selectedAgence === '' || agence.agence === selectedAgence)
        );
    });








    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleChange2 = (e) => {
        setFormData2({
            ...formData2,
            [e.target.name]: e.target.value
        });
    };

    const handleChange3 = (e) => {
        setFormData3({
            ...formData3,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = (e) => {
        // setShowSpinner(true);
        e.preventDefault();
        // const forme = document.getElementById('signup-modal')
        // Send the form data to the server
        fetch('http://localhost:3000/insertVerification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                // setShowSpinner(false);
                console.log('Form submitted successfully:', data);
                

                // Handle success response from the server
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle error response or network failure
            });
    };


    const handleSubmit2 = (e) => {
        // setShowSpinner(true);
        e.preventDefault();
        // const forme = document.getElementById('signup-modal')
        // Send the form data to the server
        fetch('http://localhost:3000/inserttransfert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData2)
        })
            .then((response) => response.json())
            .then((data) => {
                // setShowSpinner(false);
                console.log('Form submitted successfully:', data);
                // setShowSuccessAlert(true);

                // Handle success response from the server
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle error response or network failure
            });
    };


    const handleSubmit3 = (e) => {
        // setShowSpinner(true);
        e.preventDefault();
        // const forme = document.getElementById('signup-modal')
        // Send the form data to the server
        fetch('http://localhost:3000/agence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData3)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Form submitted successfully:', data);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };


    const handleTestClick = () => {
        fetch('http://localhost:3000/verificationTest')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {

                console.error(error);
            });
    };


    const handleTestClick2 = () => {
        fetch('http://localhost:3000/transfertTest')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const handleTestClick3 = () => {//transfertAgenceTest
        fetch('http://localhost:3000/transfertAgenceTest')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    const randomverifications = () => {
        fetch('http://localhost:3000/randomverifications')
            .then((response) => response.json())
            .then((data) => {
                console.log("data of randomverifications", data);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const randomagence = () => {   //agenceRandom
        fetch('http://localhost:3000/agenceRandom')
            .then((response) => response.json())
            .then((data) => {
            
                console.log("data of randomagence", data);
            
            })
            .catch((error) => {

                console.error(error);
            });
    }
    
    const randomtransfert = () => {   

        fetch('http://localhost:3000/randomtransfert')
        .then((response) => response.json())
            .then((data) => {
            
                console.log("data of randomtransfert", data);
            
            })
            .catch((error) => {

                console.error(error);
            });
    }
    // const handleContinue = () => {
    //     setShowSuccessAlert(false);
    // };
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
                                            <ol className="breadcrumb m-0">

                                            </ol>
                                        </div>
                                        <h4 className="page-title">Transfert</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                                <li className="nav-item">
                                                    <a href="#aboutme" data-bs-toggle="tab" aria-expanded="true" className="nav-link rounded-0 active">
                                                        Verification
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#timeline" data-bs-toggle="tab" aria-expanded="false" className="nav-link rounded-0 ">
                                                    Transfert
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#settings" data-bs-toggle="tab" aria-expanded="false" className="nav-link rounded-0">
                                                    Transfert Egencie
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane show active" id="aboutme">
                                                    {/* <h5 className="text-uppercase">
                                                        <i className="mdi mdi-briefcase me-1"></i>
                                                        Experience
                                                    </h5> */}
                                                    <p>verifications</p>
                                                    {/* <h5 className="mb-3 mt-4 text-uppercase">
                                                        <i className="mdi mdi-cards-variant me-1"></i>
                                                        Projects
                                                        
                                                    </h5> */}
                                                    <h5 className="mb-3 text-uppercase bg-light ">
                                                        {/* <i className="mdi mdi-office-building me-1"></i> */}
                                                        {/* <button type="submit" className="btn btn-success mt-2"><i className="mdi mdi-content-save"></i> Save</button> */}
                                                        <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#signup-modal">Add</button>
                                                        <button type="button" onClick={randomverifications} className="btn btn-success m-2">Add Randomly</button>
                                                    </h5>
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
                                                                            <select onChange={handleChange} name="email" className="form-control select2" data-toggle="select2">
                                                                                <option>Select</option>
                                                                                {data && data.length > 0 && data.map(user => (
                                                                                    <option key={user.email} value={JSON.stringify(user)}>
                                                                                        {user.email}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                        {/* <div className="mb-3">
                                                                            <label htmlFor="password" className="form-label">Email</label>
                                                                            <input name='password' className="form-control" type="password" required="" id="password" placeholder="email" />
                                                                        </div> */}
                                                                        <div className="mb-3">
                                                                            <label htmlFor="emailaddress" className="form-label">Destinataire Number</label>
                                                                            <input onChange={handleChange} name='tel_bf' className="form-control" type="text" id="email" required="" placeholder="tb_lf" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="password" className="form-label">Montent</label>
                                                                            <input onChange={handleChange} name='montant' className="form-control" type="text" required="" id="passworde" placeholder="montent" />
                                                                        </div>
                                                                        <div className="mb-3 text-center">
                                                                            <button className="btn btn-primary" type="submit">Save</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* transfert */}
                                                   
                                                    <div className="text-center">
                                                        <button type="submit" onClick={handleTestClick} className="btn btn-warning mt-2"><i className="mdi mdi-content-save"></i> Tester</button>
                                                    </div>
                                                    <div className="table-responsive"></div>
                                                </div>
                                                <div className="tab-pane show " id="timeline">
                                                    {/* <h5 className="text-uppercase">
                                                        <i className="mdi mdi-briefcase me-1"></i>
                                                        Experience
                                                    </h5> */}
                                                    <p>trnsfert</p>
                                                    {/* <h5 className="mb-3 mt-4 text-uppercase">
                                                        <i className="mdi mdi-cards-variant me-1"></i>
                                                        Projects
                                                        
                                                    </h5> */}
                                                    <h5 className="mb-3 text-uppercase bg-light ">
                                                        {/* <i className="mdi mdi-office-building me-1"></i> */}
                                                        {/* <button type="submit" className="btn btn-success mt-2"><i className="mdi mdi-content-save"></i> Save</button> */}
                                                        <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#signup-modal">Add</button>
                                                        <button type="button" onClick={randomtransfert} className="btn btn-success m-2">Add Randomly</button>
                                                    </h5>
                                                    <div id="signup-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-body">
                                                                    <div className="text-center mt-2 mb-4">
                                                                        <span><img src="assets/images/users/mauripay.png" alt="" height="29" /></span>
                                                                    </div>

                                                                    <form onSubmit={handleSubmit2} className="ps-3 pe-3">
                                                                        <div className="mb-3">
                                                                            <label htmlFor="emailaddress" className="form-label">Email</label>
                                                                            <select onChange={handleChange2} name="email" className="form-control select2" data-toggle="select2">
                                                                                <option>choose the number</option>
                                                                                {data && data.length > 0 && data.map(user => (
                                                                                    <option key={user.email} value={JSON.stringify(user)}>
                                                                                        {user.email}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                        {/* <div className="mb-3">
                                                                            <label htmlFor="password" className="form-label">Email</label>
                                                                            <input name='password' className="form-control" type="password" required="" id="password" placeholder="email" />
                                                                        </div> */}
                                                                        <div className="mb-3">
                                                                            <label htmlFor="emailaddress" className="form-label">Destinataire Number</label>
                                                                            <input onChange={handleChange2} name='tel_bf' className="form-control" type="text" id="email" required="" placeholder="tb_lf" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="password" className="form-label">Montent</label>
                                                                            <input onChange={handleChange2} name='montant' className="form-control" type="text" required="" id="passworde" placeholder="montent" />
                                                                        </div>
                                                                        <div className="mb-3 text-center">
                                                                            <button className="btn btn-primary" type="submit">Save</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="text-center">
                                                        <button type="submit" onClick={handleTestClick2} className="btn btn-warning mt-2"><i className="mdi mdi-content-save"></i> Tester</button>
                                                    </div>
                                                    <div className="table-responsive"></div>
                                                </div>
{/* uthwwhtuwth */}

                                            <div className="tab-pane " id="settings">
                                                    <h4>transfert</h4>
                                                    <h5 className="mb-3 text-uppercase bg-light ">
                                                     
                                                        <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#signup-modal2">Add</button>
                                                        <button type="button" onClick={randomagence}  className="btn btn-success m-2">Add Randomly</button>
                                                    </h5>
                                                    <div id="signup-modal2" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-body">
                                                                    <div className="text-center mt-2 mb-4">
                                                                        <span><img src="assets/images/users/mauripay.png" alt="" height="29" /></span>
                                                                    </div>

                                                                    <form onSubmit={handleSubmit3} className="ps-3 pe-3">
                                                                      
                                                            <div className="mb-3">
                                                                <label htmlFor="emailaddress" className="form-label">Email</label>
                                                                <select onChange={handleChange3} name="email" className="form-control select2" data-toggle="select2">
                                                                    <option>Select</option>
                                                                    {data && data.length > 0 && data.map(user => (
                                                                        <option key={user.email} value={JSON.stringify(user)}>
                                                                            {user.email}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="mb-3">
                                                                            <label htmlFor="emailaddress" className="form-label">Destinataire Number</label>
                                                                            <input onChange={handleChange3} name='tel_bf' className="form-control" type="text" id="email" required="" placeholder="tb_lf" />
                                                                        </div>
                                                            <div className="mb-3">
                                                            <label>Ville:</label>
                                                            <select name='ville' value={selectedVille}  className="form-control select2" data-toggle="select2" onChange={handleVilleChange}>
                                                                <option value="">All</option>
                                                                {uniqueVilles.map(ville => (
                                                                    <option key={ville} value={ville}>{ville}</option>
                                                                ))}
                                                            </select>
                                                          </div>
                                                            <div className="mb-3">
                                                            <label>Commune:</label>
                                                            <select name='commune' value={selectedCommune}  className="form-control select2" data-toggle="select2" onChange={handleCommuneChange}>
                                                                <option value="">All</option>

                                                                {uniqueCommunes.map(commune => (
                                                                    <option key={commune} value={commune}>{commune}</option>
                                                                ))}
                                                            </select>
                                                            </div>
                                                            <div className="mb-3">
                                                            <label>Agence:</label>
                                                            <select name='agence' value={selectedAgence}  className="form-control select2" data-toggle="select2" onChange={handleAgenceChange}>
                                                                <option value="">All</option>
                                                                {uniqueAgences.map(agence => (
                                                                    <option key={agence} value={agence}>{agence}</option>
                                                                ))}
                                                            </select>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="emailaddress" className="form-label">Destinataire Number</label>
                                                                <input onChange={handleChange3} name='montant' className="form-control" type="text" id="email" required="" placeholder="montant" />
                                                            </div>
                                                            <div className="mb-3">
                                                            <button className="btn btn-primary" type="submit">Save</button>

                                                            
                                                            </div>
                                                            {filteredAgences.map(agence => (
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
                                                        <button type="submit" onClick={handleTestClick3} className="btn btn-warning mt-2"><i className="mdi mdi-content-save"></i> Tester</button>
                                                    </div>
                                                </div>  
{/* ehrbeqjrekrnekr */}

                                                
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

export default Transfert