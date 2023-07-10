import React from 'react'

function BigModal(props) {
    return (
        <div>

            <div
                id="full-width-modal"
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                
                aria-labelledby="fullWidthModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-full-width">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="fullWidthModalLabel">
                                Test All Endpoints
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-hidden="true"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="clearfix">
                                        <div className="float-start mb-3">

                                            <img
                                                src="assets/images/users/mauripay.png"
                                                alt=""
                                                height="29" />

                                        </div>
                                        <div className="float-end">
                                            <h4 className="m-0 d-print-none"></h4>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive">
                                                <table className="table mt-4">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Work</th>
                                                            <th>Test</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id='tbodytest'>
    

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="clearfix pt-3">
                                                {/* <h6 className="text-muted">Notes:</h6> */}
                                                <small>
                                                    
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="float-end mt-3 mt-sm-0">
                                                <p>
                                                    <b>Total Endpoint </b>
                                                    <span className="float-end" id='totalsuccess'>10</span>
                                                </p>
                                                <p>
                                                    <b className="m-1">Endpoint Success </b>
                                                    <span className="float-end" id='successcnt'>0</span>
                                                </p>
                                                <h3 id='porcentage'>0%</h3>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>

                                    <div className="d-print-none mt-4"></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <a
                                href="javascript:window.print()"
                                className="btn btn-primary"
                            >
                                <i className="mdi mdi-printer"></i> Print
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BigModal