
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Table from './Table';

function BigModal(props) {

    // const [showSpinner, setShowSpinner] = useState(false);
    // const [tableData, setTableData] = useState([]);
    // const [alldatabig, setAlldatabig] = useState([]);
    // const [allDatas, setAllDatas] = useState(props?.data);
    // const [data, setData] = useState([]);


    const tableRef = useRef(null);
    // const [a, setA] = useState(0)
    console.log("props.data", props.data);


    const handleDownloadPDF = () => {

        const input = tableRef.current;
        // setA(1000000000)
        // addData();

        html2canvas(input).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // Width of A4 size in mm (approx. 8.27 inches)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('test_raport.pdf');
        });
    };

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
                            {/* <DownloadTableAsPDF /> */}

                            <Table ref={tableRef} myProp={props.data} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleDownloadPDF}><i className='uil-down-arrow'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BigModal