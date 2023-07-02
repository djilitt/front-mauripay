import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import BigModal from '../components/BigModal';
import TableComponent from '../components/TableComponent';


function Home() {
    const [data, setData] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [showSpinner, setShowSpinner] = React.useState(false);

    const handleDetailsClick = (item) => {
        // console.log("item", item);
        setShowSpinner(true);
        fetch('http://localhost:3000/' + item)
            .then((response) => response.json())
            .then((data) => {

                // var button = document.getElementById('full-width-modal');
                // button.style.display = 'none';
                const modal = document.getElementById('full-width-modal');
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();

                setShowSpinner(false);
                if (data.length == 0) {
                    setSelectedData({ data: "no data is inserted" })
                }
                else {
                    setSelectedData(data);
                }

                setModalVisible(true);
                console.log("selectedData", selectedData);
            })
            .catch((error) => console.error(error));
    };


    const testes = [
        { id: 1, name: "transfertTest", description: "test transfert", table: "datatransfert" },
        { id: 2, name: "transfertAgenceTest", description: "test agence", table: "datatransfertAgence" },
        { id: 3, name: "verificationTest", description: "test verification", table: "dataverification" },
        { id: 4, name: "retraittest", description: "test retrait", table: "dataretrait" },
        { id: 5, name: "depottest", description: "test depot", table: "datadepot" },
        { id: 6, name: "testuser", description: "test user", table: "data" },
        { id: 7, name: "forgotTest", description: "test forgot", table: "forgot" },
        { id: 8, name: "reponseTest", description: "test reponse", table: "reponse" },
        { id: 9, name: "codeTest", description: "test code", table: "code" },
        { id: 10, name: "retraitAgenceTest", description: "test retrait agence", table: "dataretraitAgence" },
        { id: 11, name: "verificationFacturesTest", description: "test verification factures", table: "dataverificationFactures" },
        { id: 12, name: "factureTest", description: "test factures", table: "datafactures" },
        { id: 13, name: "checkPhoneTest", description: "test checkPhone ",table: "checkPhone" },
    ]

// verificationCartes validations validates updates updatePasswords  questions imageProfiles credits

// resetPasswords


    React.useEffect(() => {
        const ts = document.getElementById('totalsuccess');
        if (ts) {
            ts.textContent = testes.length.toString();

        }

    }, []);


    const calculatePercentage = (value, total) => {
        const percentage = (parseInt(value) / parseInt(total)) * 100;
        return percentage.toFixed(1).toString() + '%';
    }


    const testf = async (testes) => {
        console.log("test", testes);
        try {
            const response = await fetch('http://localhost:3000/' + testes.name);
            const data = await response.json();
            // console.log(testes.name, data);
            console.log("heloooo", data[0].Test);
            if (data[0].Test == "success") {
                return { [testes.id]: data };
            }
            else {
                return { [testes.id]: null };
            }
        } catch (error) {
            console.error("erore", error);
            return { [testes.id]: null };
        }
    };


    const alltestes = async () => {
        console.log("alltestes");
        try {

            let mergedData = {};
            var tableBody = document.getElementById('tbodytest');
            tableBody.innerHTML = '';

            const successCntSpan = document.getElementById('successcnt');
            successCntSpan.textContent = '0';
            for (const test of testes) {

                var newRow = document.createElement('tr');
                newRow.id = test.id;

                var cell1 = document.createElement('td');
                cell1.textContent = test.id;

                var cell2 = document.createElement('td');
                cell2.textContent = test.name;

                var cell3 = document.createElement('td');
                cell3.textContent = test.description;

                var cell4 = document.createElement('td');
                cell4.id = 'td' + test.id;
                var spinnerDiv = document.createElement('div');
                spinnerDiv.className = 'spinner-border spinner-border-sm';
                spinnerDiv.setAttribute('role', 'status');
                spinnerDiv.id = 'spinner' + test.id;
                cell4.appendChild(spinnerDiv);

                var cell5 = document.createElement('td');
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-primary';
                button.addEventListener('click', () => handleDetailsClick(test.table));
                button.textContent = 'Details';
                cell5.appendChild(button);


                newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
                newRow.appendChild(cell4);
                newRow.appendChild(cell5);

                // Append the new row to the table body
                tableBody.appendChild(newRow);

                const trElements = tableBody.getElementsByTagName('tr');
                const trCount = trElements.length;

                const response = await testf(test);
                if (response[test.id] !== null) {
                    document.getElementById('spinner' + test.id).remove();
                    document.getElementById('td' + test.id).innerHTML = `
                    <i class="mdi mdi-circle text-success"></i> Success
                        
                    `;


                    let currentValue = parseInt(successCntSpan.textContent);

                    currentValue += 1;

                    successCntSpan.textContent = currentValue.toString();

                    const percentage = calculatePercentage(successCntSpan.textContent, document.getElementById('totalsuccess').textContent);
                    document.getElementById('porcentage').textContent = percentage;

                } else {
                    document.getElementById('spinner' + test.id).remove();
                    document.getElementById('td' + test.id).innerHTML = `
                    <i class="mdi mdi-circle text-danger"></i> Failed
                        
                    `;
                }

                mergedData = { ...mergedData, ...response };
                if (Object.keys(mergedData).length === testes.length) {
                    break;
                }
            }


            setData(mergedData);
            console.log("rep", mergedData);
        } catch (error) {
            console.error(error);
        }
    };


    const closeModal = () => {
        setModalVisible(false);
    };


    return (
        <div>

            <div id="spinner" className={`spinner-wrapper ${showSpinner ? '' : 'd-none'}`}>
                <div className="spinner-border avatar-lg text-primary" role="status"></div>
            </div>

            {selectedData && (
                <div
                    className={`modal fade ${modalVisible ? 'show' : ''}`}
                    tabIndex="-1"
                    style={{ display: modalVisible ? 'block' : 'none' }}
                >
                    <div className="modal-dialog modal-full-width">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="fullWidthModalLabel">
                                    Test Details
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">

                                {selectedData.data ? (

                                    <div className="alert alert-danger alert-dismissible bg-danger h-10 w-10 text-white border-0 fade show" role="alert">
                                        {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                                        <strong>Error - </strong> {selectedData.data}
                                    </div>
                                    // <h2>{selectedData.data}</h2>
                                ) : (
                                    <TableComponent data={selectedData} />
                                )}

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            
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
                                            <ol className="breadcrumb m-0">

                                            </ol>
                                        </div>
                                        <h4 className="page-title">Home</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <button onClick={alltestes}
                                                type="button"
                                                className="btn btn-primary m-3"
                                                data-bs-toggle="modal"
                                                data-bs-target="#full-width-modal"
                                            >
                                                Test All
                                            </button>

                                            <button onClick={alltestes}
                                                type="button"
                                                className="btn btn-primary m-3"
                                            >
                                                Archive
                                            </button>

                                            
                                            <BigModal />
                                            {/* <h1>home</h1> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
