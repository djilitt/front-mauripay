import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import BigModal from '../components/BigModal';
import Modaltest from '../components/modaltest';
import TableComponent from '../components/TableComponent';
import Select from 'react-select';


function Home() {
  
    const [data, setData] = React.useState([]);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const [filterValue, setFilterValue] = React.useState("All");
    const [secondFilterValue, setSecondFilterValue] = React.useState("AllEndpoint");

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [showSpinner, setShowSpinner] = React.useState(false);

    const [singleSelection, setSingleSelection] = React.useState('');
    const [multipleSelection, setMultipleSelection] = React.useState([]);
    const [selectedOptions, setSelectedOptions] = React.useState([]);

  const options = [
    {
      label: 'Alaskan/Hawaiian Time Zone',
      options: [
        { value: 'AK', label: 'Alaska' },
        { value: 'HI', label: 'Hawaii' }
      ]
    },
    {
      label: 'Pacific Time Zone',
      options: [
        { value: 'CA', label: 'California' },
        { value: 'NV', label: 'Nevada' },
        { value: 'OR', label: 'Oregon' },
        { value: 'WA', label: 'Washington' }
      ]
    },
    {
      label: 'Mountain Time Zone',
      options: [
        { value: 'AZ', label: 'Arizona' },
        { value: 'CO', label: 'Colorado' },
        { value: 'ID', label: 'Idaho' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'UT', label: 'Utah' },
        { value: 'WY', label: 'Wyoming' }
      ]
    }
  ];

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
      
    const handleSingleSelection = (event) => {
        setSingleSelection(event.target.value);
        console.log("singleSelection", singleSelection);
    };

    const handleMultipleSelection = (event) => {
        const selectedValues = Array.from(event.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setMultipleSelection(selectedValues);
        console.log("multipleSelection", multipleSelection);
    };




    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeMdl = () => {
        setModalIsOpen(false);
    };
    const handleDetailsClick = (item) => {
        // console.log("item", item);
        setShowSpinner(true);
        fetch('http://localhost:3000/' + item)
            .then((response) => response.json())
            .then((data) => {

                // var button  = document.getElementById('full-width-modal');
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

    const handleDetailsClick2 = (item) => {
        // console.log("item", item);
        setShowSpinner(true);
        fetch('http://localhost:3000/' + item)
            .then((response) => response.json())
            .then((data) => {

                // var button  = document.getElementById('full-width-modal');
                // button.style.display = 'none';
                const modal = document.getElementById('full-width-modal');
                // const modalInstance = bootstrap.Modal.getInstance(modal);
                // modalInstance.hide();

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
        { id: 1, name: "transfertTest", description: "test transfert", table: "datatransfert", type: "client" },
        { id: 2, name: "transfertAgenceTest", description: "test agence", table: "datatransfertAgence", type: "client" },
        { id: 3, name: "verificationTest", description: "test verification", table: "dataverification", type: "client" },
        { id: 4, name: "retraittest", description: "test retrait", table: "dataretrait", type: "client" },
        { id: 5, name: "depottest", description: "test depot", table: "datadepot", type: "client" },
        { id: 6, name: "testuser", description: "test user", table: "data", type: "client" },
        { id: 7, name: "forgotTest", description: "test forgot", table: "forgot", type: "client" },
        { id: 8, name: "reponseTest", description: "test reponse", table: "reponse", type: "client" },
        { id: 9, name: "codeTest", description: "test code", table: "code", type: "client" },
        { id: 10, name: "retraitAgenceTest", description: "test retrait agence", table: "dataretraitAgence", type: "client" },
        { id: 11, name: "verificationFacturesTest", description: "test verification factures", table: "dataverificationFactures", type: "client" },
        { id: 12, name: "factureTest", description: "test factures", table: "datafactures", type: "client" },
        { id: 13, name: "checkPhoneTest", description: "test checkPhone ", table: "checkPhone", type: "client" },
        { id: 14, name: "restTest", description: "test rest password ", table: "resetPasswords", type: "client" },
        { id: 15, name: "testAdmin", description: "test admin", table: "dataAdmin", type: "admin" },
        { id: 16, name: "testaddDepot", description: "test add depot", table: "addDepot", type: "admin" },
        { id: 17, name: "testaddRestrait", description: "test add retrait", table: "addRetrait", type: "admin" },
        { id: 18, name: "testLibererRetrait", description: "test liberer retrait", table: "libererRetrait", type: "admin" },
        { id: 19, name: "testcanceledWithdrawal", description: "test canceled withdrawal", table: "canceledWithdrawal", type: "admin" },
        { id: 20, name: "testlibererTransfert", description: "test liberer transfert", table: "libererTransfert", type: "admin" },
        { id: 21, name: "testannulerTransfert", description: "test annuler transfert", table: "annulerTransfert", type: "admin" },
        { id: 22, name: "testaddAgency", description: "test add agency", table: "addAgency", type: "admin" },
        { id: 23, name: "testgetAgency", description: "test get agency", table: "getAgency", type: "admin" },
        { id: 24, name: "testdeleteAgency", description: "test delete agency", table: "deleteAgency", type: "admin" },
        { id: 25, name: "testupdateAgency", description: "test update agency", table: "updateAgency", type: "admin" },
        { id: 26, name: "testchangeAgencyStatus", description: "test change agency status", table: "changeAgencyStatus", type: "admin" },
        { id: 27, name: "testupdateFee", description: "test update fee", table: "updateFee", type: "admin" },
        { id: 28, name: "testdeleteFee", description: "test delete fee", table: "deleteFee", type: "admin" },
        { id: 29, name: "testaddFee", description: "test add fee", table: "addFee", type: "admin" },
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

    const testf2 = async (testes) => {
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

    const alltestes2 = async () => {
        console.log("alltestes");
        console.log(filteredTestes);
        try {

            let mergedData = {};
            var tableBody = document.getElementById('tbodytest2');
            tableBody.innerHTML = '';

            for (const test of filteredTestes2) {
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
                button.addEventListener('click', () => handleDetailsClick2(test.table));
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

                const response = await testf2(test);
                if (response[test.id] !== null) {
                    document.getElementById('spinner' + test.id).remove();
                    document.getElementById('td' + test.id).innerHTML = `
                    <i class="mdi mdi-circle text-success"></i> Success
                    `;

                } else {
                    document.getElementById('spinner' + test.id).remove();
                    document.getElementById('td' + test.id).innerHTML = `
                    <i class="mdi mdi-circle text-danger"></i> Failed
                        
                    `;
                }

                mergedData = { ...mergedData, ...response };
                if (Object.keys(mergedData).length === filteredTestes2.length) {
                    break;
                }
            }


            // setData(mergedData);
            // console.log("rep", mergedData);
        } catch (error) {
            console.error(error);
        }
    };


    const closeModal = () => {
        setModalVisible(false);
    };



    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleFilterChange2 = (e) => {
        setSecondFilterValue(e.target.value);

    };
    
    const filteredTestes = filterValue === "All" ? testes : testes.filter(item => item.type.toLowerCase() === filterValue.toLowerCase());

    const filteredTestes2 = secondFilterValue === "AllEndpoint" ? filteredTestes : filteredTestes.filter(item => item.id === parseInt(secondFilterValue));

   
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
                                <div className="col-9">
                                    <div className="card">
                                        <div className="card-body">

                                        <div style={{ display: 'flex' }}>
                                        <div style={{ flexGrow: 1 }}>
                                        <h5 style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold' }}>Filter type</h5>
                                            
                                            <select
                                            className="form-control select2"
                                            data-toggle="select2"
                                            value={filterValue}
                                            onChange={handleFilterChange}
                                            style={{ width: '90px' }}
                                            >
                                            <option value="All">All</option>
                                            <option value="client">Client</option>
                                            <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                        <div style={{ flexGrow: 1 }}>
                                        <h5 style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold' }}>Filter Endpoints</h5>
                                        <Select
                                        options={options}
                                        isMulti
                                        placeholder="Choose ..."
                                        value={selectedOptions}
                                        onChange={handleSelectChange}
                                        className="custom-select"
                                        classNamePrefix="react-select"
                                        />
                                            <select
                                            className="form-control select2"
                                            data-toggle="select2"
                                            onClick={handleFilterChange2}
                                            style={{ width: '150px' }}
                                            >
                                            <option value="AllEndpoint">All</option>
                                            {filteredTestes.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                {item.name}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                        <div>
                                            <button
                                            data-bs-dismiss="modal"
                                            onClick={alltestes2}
                                            className="btn btn-rounded btn-info"
                                            type="submit"
                                            >
                                            valider
                                            </button>
                                        </div>
                                        </div>

                                            <div style={{ clear: 'both' }}></div>

                                            <div>
                                                {/* Modaltest Modal */}
                                                {/* <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#login-modal">Test</button>
                                                <Modaltest alltestes2={alltestes2} /> */}
                                            </div>
                                            <BigModal />

                                            {/* <h1>home</h1> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card">
                                    <div className="card-body">
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
                                            <tbody id='tbodytest2'>


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
        </div>
    );
}

export default Home;
