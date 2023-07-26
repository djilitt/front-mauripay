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

    // const [filterValue, setFilterValue] = React.useState("All");
    const [secondFilterValue, setSecondFilterValue] = React.useState("AllEndpoint");

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState(null);
    const [showSpinner, setShowSpinner] = React.useState(false);

    const [singleSelection, setSingleSelection] = React.useState('');
    const [multipleSelection, setMultipleSelection] = React.useState([]);
    // const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [isTheadVisible, setIsTheadVisible] = React.useState(true);
    
    const [tableData,setTableData] = React.useState([]);


    // const options = [
    //     {
    //         label: 'Alaskan/Hawaiian Time Zone',
    //         options: [
    //             { value: 'AK', label: 'Alaska' },
    //             { value: 'HI', label: 'Hawaii' }
    //         ]
    //     },
    //     {
    //         label: 'Pacific Time Zone',
    //         options: [
    //             { value: 'CA', label: 'California' },
    //             { value: 'NV', label: 'Nevada' },
    //             { value: 'OR', label: 'Oregon' },
    //             { value: 'WA', label: 'Washington' }
    //         ]
    //     },
    //     {
    //         label: 'Mountain Time Zone',
    //         options: [
    //             { value: 'AZ', label: 'Arizona' },
    //             { value: 'CO', label: 'Colorado' },
    //             { value: 'ID', label: 'Idaho' },
    //             { value: 'MT', label: 'Montana' },
    //             { value: 'NE', label: 'Nebraska' },
    //             { value: 'NM', label: 'New Mexico' },
    //             { value: 'ND', label: 'North Dakota' },
    //             { value: 'UT', label: 'Utah' },
    //             { value: 'WY', label: 'Wyoming' }
    //         ]
    //     }
    // ];

    // const handleSelectChange = () => {
    //     console.log("selectedOptions", selectedOptions);
    //     // setSelectedOptions(filteredTestes2);
    //     setSecondFilterValue(e.target.value);
    // };

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

        { id: 1,  name: "testtransferts", description: "test transfert", table: "datatransfert", type: "client", label: "transfert" },
        { id: 2,  name: "testtransferagences", description: "test agence", table: "datatransfertAgence", type: "client", label: "transfert" },
        { id: 3,  name: "testverifications", description: "test verification", table: "dataverification", type: "client", label: "verification" },
        { id: 4,  name: "testretraits", description: "test retrait", table: "dataretrait", type: "client", label: "retrait" },
        { id: 5,  name: "testdepots", description: "test depot", table: "datadepot", type: "client", label: "depot" },
        { id: 6,  name: "testlogintest", description: "test user", table: "data", type: "client", label: "clientuser" },
        { id: 7,  name: "testforgot", description: "test forgot", table: "forgot", type: "client", label: "reset client password" },
        { id: 8,  name: "testreponse", description: "test reponse", table: "reponse", type: "client", label: "reset client password" },
        { id: 9,  name: "testcodes", description: "test code", table: "code", type: "client", label: "reset client password" },
        { id: 10, name: "testretraitAgences", description: "test retrait agence", table: "dataretraitAgence", type: "client", label: "retrait" },
        { id: 11, name: "testverificationFactures", description: "test verification factures", table: "dataverificationFactures", type: "client", label: "verification" },
        { id: 12, name: "testfactures", description: "test factures", table: "datafactures", type: "client", label: "factures" },
        { id: 13, name: "testcheckPhones", description: "test checkPhone ", table: "checkPhone", type: "client", label: "reset client password" },
        { id: 14, name: "testresetPasswords", description: "test rest password ", table: "resetPasswords", type: "client", label: "reset client password" },

        { id: 15, name: "testAdmin", description: "test admin", table: "dataAdmin", type: "admin", label: "admin" },
        { id: 16, name: "testaddDepot", description: "test add depot", table: "addDepot", type: "admin", label: "depot admin" },
        { id: 17, name: "testaddRestrait", description: "test add retrait", table: "addRetrait", type: "admin", label: "retrait admin" },
        { id: 18, name: "testLibererRetrait", description: "test liberer retrait", table: "libererRetrait", type: "admin", label: "retrait admin" },
        { id: 19, name: "testcanceledWithdrawal", description: "test canceled withdrawal", table: "canceledWithdrawal", type: "admin", label: "retrait admin" },
        { id: 20, name: "testlibererTransfert", description: "test liberer transfert", table: "libererTransfert", type: "admin", label: "transfert admin" },
        { id: 21, name: "testannulerTransfert", description: "test annuler transfert", table: "annulerTransfert", type: "admin", label: "transfert admin" },
        { id: 22, name: "testaddAgency", description: "test add agency", table: "addAgency", type: "admin", label: "Agency admin" },
        { id: 23, name: "testgetAgency", description: "test get agency", table: "getAgency", type: "admin", label: "Agency admin" },
        { id: 24, name: "testdeleteAgency", description: "test delete agency", table: "deleteAgency", type: "admin", label: "Agency admin" },
        { id: 25, name: "testupdateAgency", description: "test update agency", table: "updateAgency", type: "admin", label: "Agency admin" },

        { id: 26, name: "testchangeAgencyStatus", description: "test change agency status", table: "changeAgencyStatus", type: "admin", label: "Agency admin" },
        { id: 47, name: "testgetFee", description: "test get Fee", table: "getFee", type: "admin", label: "Fee admin" },
        { id: 48, name: "testchangeFeeStatus", description: "testchangeFeeStatus", table: "changeFeeStatus", type: "admin", label: "Fee admin" },
        { id: 27, name: "testupdateFee", description: "test update fee", table: "updateFee", type: "admin", label: "Fee admin" },
        { id: 28, name: "testdeleteFee", description: "test delete fee", table: "deleteFee", type: "admin", label: "Fee admin" },
        { id: 29, name: "testaddFee", description: "test add fee", table: "addFee", type: "admin", label: "Fee admin" },
        { id: 30, name: "testaddBank", description: "test add Bank", table: "addBank", type: "admin", label: "Bank admin" },
        { id: 31, name: "testupdatebank", description: "test update Bank", table: "updatebank", type: "admin", label: "Bank admin" },
        { id: 32, name: "testpayerFacture", description: "test payer Facture", table: "payerFacture", type: "admin", label: "Facture admin" },
        { id: 33, name: "testannulerFacture", description: "test annuler Facture", table: "annulerFacture", type: "admin", label: "Facture admin" },
        { id: 34, name: "testcreateClient", description: "test create Client", table: "createClient", type: "admin", label: "Client admin" },
        { id: 35, name: "testgetClient", description: "test get Client", table: "getClient", type: "admin", label: "Client admin" },
        { id: 36, name: "testgetClientProgresse", description: "test get Client Progresse ", table: "getClientProgresse", type: "admin", label: "Client admin" },
        { id: 37, name: "testcheckClient", description: "test check Client", table: "checkClient", type: "admin", label: "Client admin" },
        { id: 38, name: "testvalidateClient", description: "test validate Client ", table: "validateClient", type: "admin", label: "Client admin" },
        { id: 39, name: "teststatementClient", description: "test statement Client", table: "statementClient", type: "admin", label: "Client admin" },
        { id: 40, name: "testresetClientPassword", description: "test reset Client Password", table: "resetClientPassword", type: "admin", label: "Client admin" },
        { id: 41, name: "testgetUser", description: "test  get User", table: "getUser", type: "admin", label: "User admin" },
        { id: 49, name: "testresetPasswordAdmin", description: "test reset Password Admin", table: "setStatus", type: "admin", label: "User admin" },
        { id: 42, name: "testsetStatus", description: "test setStatus", table: "setStatus", type: "admin", label: "User admin" },
        { id: 43, name: "testrateCountry", description: "test rate Country", table: "rateCountry", type: "admin", label: "Country admin" },
        { id: 44, name: "testcreateCountry", description: "test create  Country", table: "createCountry", type: "admin", label: "Country admin" },
        { id: 45, name: "testcountryAddFee", description: "test country Add Fee", table: "countryAddFee", type: "admin", label: "Country admin" },
        { id: 46, name: "testcountryUpdateFee", description: "test country Update Fee", table: "countryUpdateFee", type: "admin", label: "Country admin" },

    ]

    // const convertToOptionsArray = (testes) => {
    //     return testes.map((item) => ({
    //       value: item.name,
    //       label: item.name
    //     }));
    //   };

    const [filterValue, setFilterValue] = React.useState('All');
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [filteredOptions, setFilteredOptions] = React.useState(testes);



    const handleSelectChange = (selected) => {
        console.log("selected", selected);
        if (selected && selected.some((option) => option.value === "AllEndpoint")) {
            // If "AllEndpoint" is selected, set all options as selected
            setSelectedOptions(convertToOptionsArray(filteredOptions));
        } else {
            setSelectedOptions(selected);
        }
    };

    const handleFilterChange = (e) => {
        const filter = e.target.value;

        if (filter === 'All') {
            setFilteredOptions(testes); // Show all options
        } else {
            const filtered = testes.filter((item) => item.type === filter);
            setFilteredOptions(filtered); // Show filtered options
        }

        setFilterValue(filter);
        setSelectedOptions([]);
    };

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
        setIsTheadVisible(false);
        const div = document.getElementById('div');
        if (div) {
            div.classList.remove('row', 'justify-content-center');
        }


        try {
            const t = document.getElementById('m');
            // table.style.display = 'flex';
            t.style.display = '';

            console.log("alltestes");
            console.log(selectedOptions);

            let list_items = selectedOptions.map((option) => option.value);

            let mergedData = {};
            var tableBody = document.getElementById('tbodytest2');
            tableBody.innerHTML = '';

            for (const test of list_items) {
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
                if (Object.keys(mergedData).length === list_items.length) {
                    break;
                }
            }
            const download = document.getElementById('download');
            download.style.display = '';
            // setData(mergedData);
            // console.log("rep", mergedData);
        } catch (error) {
            console.error(error);
        }
    };


    const closeModal = () => {
        setModalVisible(false);
    };

    function convertToOptionsArray(testes) {
        const options = [];

        const groupedByLabel = testes.reduce((result, item) => {
            if (!result[item.label]) {
                result[item.label] = [];
            }
            result[item.label].push({ value: item, label: item.name });
            return result;
        }, {});

        for (const [label, values] of Object.entries(groupedByLabel)) {
            options.push({ label, options: values });
        }
        options.unshift({ value: "AllEndpoint", label: "All Endpoints" });


        return options;
    }

    const handleClick = () => {
        setIsTheadVisible(false);
        alltestes2();
    };


    // const my = convertToOptionsArray(testes);
    // console.log("my", my);

    // const handleFilterChange = (e) => {
    //     setFilterValue(e.target.value);
    // };

    // const handleFilterChange2 = (e) => {
    //     console.log("e.target.value", e.target.value);
    //     setSecondFilterValue(e.target.value);


    // };

    // const filteredTestes = filterValue === "All" ? testes : testes.filter(item => item.type.toLowerCase() === filterValue.toLowerCase());

    // const filteredTestes2 = secondFilterValue === "AllEndpoint" ? filteredTestes : filteredTestes.filter(item => item.id === parseInt(secondFilterValue));

    // const handleClick = async () => {
    //     setIsTheadVisible(false);
    //     try {
    //         // Rest of your code
    //         let tableBody = document.getElementById('tbodytest2');
    //         if (tableBody) {
    //             tableBody.innerHTML = '';
    //             // Rest of your code
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const addData = async () => {
        // console.log("tabel big data", tabel);
        setShowSpinner(true);
        // const labels=props.data

        let tabel = [];
        const array = selectedOptions;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            tabel.push(element.label);
        }
        const requests = tabel.map((label) => {

            const modifiedString = label === 'testAdmin' ? 'dataAdmin' : label.replace('test', '');
            console.log("modifiedString", modifiedString);
            return fetch('http://localhost:3000/' + modifiedString)
                .then((response) => response.json())
                .then((data) => ({
                    name: label,
                    data: data,
                })

                ) // Map the fetched data to the expected format
                .catch((error) => console.error(error));
        });

        try {
            const responses = await Promise.all(requests);
            
            const calculatePercentage = (success, total) => {
                return (success / total) * 100;
            };
            
                let nbr = 0;
                let nbrs = 0;
        
                
                const ar=[]
                // Iterate over the data array and check the Test value
                responses.forEach((item, index) => {
                    const alldata = {};
                    const countData = item.data.length;
                    const count = item.data.filter((entry) => entry.Test === 'success').length;
                    const percentage = calculatePercentage(count, countData);
                    const t = Number(percentage) > 80 ? "Valide" : "Invalide";
        
                    console.log("test hun movo normal T n p t", countData, count, percentage, t);
        
                    alldata.id = index + 1;
                    alldata.name = item.name;
                    alldata.percentage = percentage;
                    alldata.t = t;
                    alldata.result = t
                    
                    ar.push(alldata);
                    
                    if (t === 'Valide') {
                        nbr++;
                    } else {
                        nbrs++;
                    }
                });

                console.log("ar hun moho normal", ar);
                // alert(ar);
                // setAlldatabig();
                setTableData([ar,[nbr, nbrs]]);
                // alldatabig.push();
                console.log("tableData hun moho normal", tableData);
            
        
            console.log("responses", JSON.stringify(responses));
            setShowSpinner(false);
        } catch (error) {
            console.error(error);
            setShowSpinner(false);
        }

    };

    function k() {
        console.log("ok got it");
    }


    const addALLData = async () => {

        setShowSpinner(true);
        const requests = testes.map((item) => {
            const table = item.name.replace("test", "insertR");
            return fetch('http://localhost:3000/' + table)
                .then((response) => response.json())
                .then((data) => ({
                    name: item.name,
                    data: data,
                })

                ) // Map the fetched data to the expected format
                .catch((error) => console.error(error));
        });

        try {
            const responses = await Promise.all(requests);
            console.log("responses", JSON.stringify(responses));
            setShowSpinner(false);
        } catch (error) {
            console.error(error);
            setShowSpinner(false);
        }

    }


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
                                <div className="col-xl-3 col-md-6">
                                    
                                    <div className="card">
                                        
                                        <button
                                        onClick={addALLData}
                                        className="btn btn-danger"
                                        >
                                        add data
                                    </button>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
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
                                                        options={convertToOptionsArray(filteredOptions)}
                                                        isMulti
                                                        placeholder="Choose ..."
                                                        value={selectedOptions}
                                                        onChange={handleSelectChange}
                                                        className="custom-select"
                                                        classNamePrefix="react-select"
                                                    />
                                                    {/* <select
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
                                                    </select> */}
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
                                            
                                            </div>
                                            <BigModal data={tableData} />

                                            {/* <h1>home</h1> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card">
                                    <div className="card-body">
                                        {isTheadVisible && (
                                            <div id='div' className="row justify-content-center">
                                                <div className="col-md-5">
                                                    <img
                                                        src="assets/images/emptydata.jpg"
                                                        alt=""
                                                        height="300"
                                                        width="300"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div id='m' style={{ display: 'none' }}>
                                            {/* type="button" class="btn btn-info" */}
                                            <button id='download' onClick={addData} type="button" className='float-end btn btn-info' data-bs-toggle="modal" data-bs-target="#full-width-modal" style={{ display: 'none' }}>Raport <i className='uil-file-info-alt'></i></button>
                                            <table className="table">
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
