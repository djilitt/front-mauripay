import React, { useEffect, useState } from 'react';
import PieChart from './pieChart';

const Table = React.forwardRef((props, ref) => {
    const [allDatas, setAllDatas] = useState([]);

    // const [showSpinner, setShowSpinner] = useState(false);
    const [check, setCheck] = useState(false);
    const [dataLength, setDataLength] = useState(props?.myProp[0]);
    const [data, setData] = useState([]);

    const currentDate = new Date();

    // Extract the day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();

    // Extract the hours and minutes
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // setDataLength(props.myProp[0])

    console.log("props.myProp Table", props.myProp);


    return (
        <>
            {/* <div id="spinner" className={`spinner-wrapper ${showSpinner ? '' : 'd-none'}`}>
                <div className="spinner-border avatar-lg text-primary" role="status"></div>
            </div> */}

            <div className="row" ref={ref}>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="clearfix">
                                    <div className="float-start mb-3">
                                        <img src="assets/images/users/mauripay.png" alt="" height="35" />
                                    </div>
                                    <div className="float-end">
                                        <h4 className="m-0 d-print-none">Unit Test Report</h4>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-sm-6"></div>

                                </div>


                                <div className="row mt-4">
                                    <div className="col-sm-4">
                                        <h6>Date</h6>
                                        <address>
                                            <b>{day}/{month}/{year}</b>
                                            <br />
                                            {hours}h{minutes}
                                            <br />
                                        </address>
                                    </div>

                                    <div className="col-sm-4"></div>

                                    <div className="col-sm-4">
                                        <div className="text-sm-end">

                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <div className="card">
                                                <div className="card-body">
                                                    <table className="table mt-4">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Name</th>
                                                                {/* <th>Reponse</th> */}
                                                                <th>pourcentage</th>
                                                                <th className="text-end">Test</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {props.myProp[0] ? (
                                                                props.myProp[0].map((item) => (

                                                                    <tr key={item.id}>
                                                                        <td>{item.id}</td>
                                                                        <td>
                                                                            <b>{item.name}</b> <br />
                                                                            {/* {item.description} */}
                                                                        </td>
                                                                        {/* <td>reponse</td> */}
                                                                        <td>
                                                                            <div className="progress-w-percent mb-0">
                                                                                <span className="progress-value">{parseFloat(item.percentage.toFixed(1))}% </span>
                                                                                <div className="progress progress-sm">
                                                                                    <div
                                                                                        
                                                                                        className={`progress-bar bg-${item.result == 'Valide' ? 'success' : 'danger'}`}
                                                                                        role="progressbar"
                                                                                        style={{ width: `${item.percentage}%` }}
                                                                                        aria-valuenow={item.percentage}
                                                                                        aria-valuemin="0"
                                                                                        aria-valuemax="100"
                                                                                    ></div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="text-end"><b>{item.result} <i class={`mdi mdi-circle text-${item.result == 'Valide' ? 'success' : 'danger'}`}></i></b></td>
                                                                    </tr>
                                                                ))) : (
                                                                <p>Loading data...</p> // or any other placeholder
                                                            )}

                                                            {/* <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <b>Laptop</b> <br />
                                                                    Brand Model VGN-TXN27N/B 11.1" Notebook PC
                                                                </td>
                                                                <td>1</td>
                                                                <td>
                                                                    <div className="progress-w-percent mb-0">
                                                                        <span className="progress-value">56% </span>
                                                                        <div className="progress progress-sm">
                                                                            <div
                                                                                className="progress-bar bg-success"
                                                                                role="progressbar"
                                                                                style={{ width: '56%' }}
                                                                                aria-valuenow="56"
                                                                                aria-valuemin="0"
                                                                                aria-valuemax="100"
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-end">$1799.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>
                                                                    <b>Warranty</b> <br />
                                                                    Two Year Extended Warranty - Parts and Labor
                                                                </td>
                                                                <td>3</td>
                                                                <td>
                                                                    <div className="progress-w-percent mb-0">
                                                                        <span className="progress-value">16% </span>
                                                                        <div className="progress progress-sm">
                                                                            <div
                                                                                className="progress-bar bg-danger"
                                                                                role="progressbar"
                                                                                style={{ width: '16%' }}
                                                                                aria-valuenow="16"
                                                                                aria-valuemin="0"
                                                                                aria-valuemax="100"
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-end">$1497.00</td>
                                                            </tr> */}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end table-responsive*/}
                                    </div>
                                    {/* end col */}
                                </div>

                                <div className="row">
                                    <div className="">
                                        <PieChart data={props.myProp[1]} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="clearfix pt-3">
                                            <h4 className="text-muted">Notes:</h4>
                                            the testing process for the endpoints of our application was conducted  successfully. The majority of the test cases passed, indicating that the API is functioning as intended. However, a few issues were identified during the testing, including [briefly describe the issues]. These issues should be addressed and resolved to ensure the optimal performance and reliability of the API.
                                        </div>
                                    </div>

                                </div>
                                <div className="row"></div>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="row"></div>
            </div>
        </>
    );
});

export default Table;
