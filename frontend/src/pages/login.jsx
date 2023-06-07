import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'
// import { Link } from 'react-router-dom'

function Login() {
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
                                        <h4 className="page-title">Login  </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {/* <div className="card"> */}
                                    {/* <div className="card-body"> */}
                                    <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#signup-modal">Sign</button>
                                    <button type="button" className="btn btn-success m-2"><i className="mdi mdi-thumb-up-outline"></i> </button>
                                    <button type="button" className="btn btn-warning m-2">Tester <i className="mdi mdi-wrench"></i> </button>
                                    {/* </div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="card">
                                    <div className="card-body">
                                        <table class="table table-bordered table-centered mb-0">
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th>Account No.</th>
                                                    <th>Balance</th>
                                                    <th class="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="table-user">
                                                        <img src="assets/images/users/avatar-6.jpg" alt="table-user" class="me-2 rounded-circle" />
                                                        Risa D. Pearson
                                                    </td>
                                                    <td>AC336 508 2157</td>
                                                    <td>July 24, 1950</td>
                                                    <td class="table-action text-center">
                                                        alo
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
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

export default Login