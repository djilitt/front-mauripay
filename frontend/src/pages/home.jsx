import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import BigModal from '../components/BigModal';


function Home() {
    const [data, setData] = React.useState([]);
    // const [ts,setTs] = React.useState(setData);
    //add this to testes  verificationTest retraittest depottest testuser forgotTest reponseTest codeTest retraitAgenceTest verificationFacturesTest
    const testes = [
        { id: 1, name: "transfertTest", description: "test transfert" },
        { id: 2, name: "transfertAgenceTest", description: "test agence" },
        { id: 3, name: "verificationTest", description: "test verification" },
        { id: 4, name: "retraittest", description: "test retrait" },
        { id: 5, name: "depottest", description: "test depot" },
        { id: 6, name: "testuser", description: "test user" },
        { id: 7, name: "forgotTest", description: "test forgot" },
        { id: 8, name: "reponseTest", description: "test reponse" },
        { id: 9, name: "codeTest", description: "test code" },
        { id: 10, name: "retraitAgenceTest", description: "test retrait agence" },
        { id: 11, name: "verificationFacturesTest", description: "test verification factures" },
        // { id: 12, name: "depotAgenceTest", description: "test depot agence" },
    ]

    
    // var ts=document.getElementById('totalsuccess');
    // ts.textContent=testes.length.toString();

    React.useEffect(() => {
        const ts = document.getElementById('totalsuccess');
        if (ts) {
            ts.textContent = testes.length.toString();

        }

    }, []);


    // var porcentage=document.getElementById('porcentage');
    // const calculatePercentage = (value, total) => {
        
    //     const percentage = (parseInt(value) / parseInt(total)) * 100;
    //     alert(value);
    //     porcentage.textContent=percentage.toString()  + '%';
    //     return percentage;

    // };

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
            console.log("heloooo",data[0].Test);
            if (data[0].Test=="success"){
                return { [testes.id]: data };
            }
            else {
                return { [testes.id]:null };
            }
        } catch (error) {
            console.error("erore",error);
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
                cell5.textContent = 'details';

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
                
                }else{
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

    // React.useEffect(() => {
    //     console.log(document.getElementById('ane'));
    // });



    return (
        <div>
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
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#full-width-modal"
                                            >
                                                Test All
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
