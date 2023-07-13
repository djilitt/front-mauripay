const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require("./config/sequelize"); // Import the configured Sequelize instance
const logintest = require("./models/loginTest");
const depots = require("./models/depots");
const retraits = require("./models/retraits");
const transferts = require("./models/transferts");
const Logintests = require("./models/loginTest");
const verifications = require("./models/verifications");
const transferagences = require("./models/transfertAgences")
const cors = require('cors');
const retraitAgences = require("./models/retraitAgences")
const forgot = require("./models/forgots")
const reponse = require("./models/reponses")
const codes = require("./models/codes")
const resetPasswords = require("./models/resetPasswords")
const verificationFactures = require("./models/verificationFactures")
const checkPhones = require("./models/checkPhones");
const factures = require("./models/factures");
const forgots = require("./models/forgots");
const port = 3000;
const EndpointGenerator = require('./admin');
// admin models
const loginAdmin = require("./models/loginAdmin");
const addDepot = require("./models/addDepot");
const addRestrait = require("./models/addRetraits");
// const getAllRetrait =require("./models/g")
const libererRetrait = require("./models/libererRetraits")
const canceledWithdrawal = require("./models/canceledWithdrawals")
const libererTransfert = require("./models/libererTransferts")
const annulerTransfert = require("./models/annulerTransferts")
const addAgency = require("./models/addAgency")
const getAgency = require("./models/getAgency")
const deleteAgency = require("./models/deleteAgency")
const updateAgency = require("./models/updateAgency")
const changeAgencyStatus = require("./models/changeAgencyStatus")
const getFee = require("./models/getFee")
const changeFeeStatus = require("./models/changeFeeStatus")
const updateFee = require("./models/updateFee")
const deleteFee = require("./models/deleteFee")
const addFee = require("./models/addFee")
const setStatus = require("./models/setStatus")
const updatebank = require("./models/updatebank")
const payerFacture = require("./models/payerFacture")
const annulerFacture = require("./models/annulerFacture")
const createClient = require("./models/createClient")
const getClient = require("./models/getClients")
const getClientProgresse = require("./models/getClientProgresse")
const checkClient = require("./models/checkClients")
const validateClient = require("./models/validateClients")
const statementClient = require("./models/statementClient")
const resetClientPassword = require("./models/resetClientPassword")
const getUser = require("./models/getUser")
const rateCountry = require("./models/rateCountry")
const createCountry = require("./models/createCountry")
const countryAddFee = require("./models/countryAddFee")
const countryUpdateFee = require("./models/countryUpdateFee")
const addBank = require("./models/addBank")


app.use(cors());

app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.log(
            "Connection to the database has been established successfully."
        );
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

app.use(
    session({
        secret: "cadorim",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");


const phonenni = {
    "41234567": "234567890876",
    "23234343": "213456789",
    "23234343": "26799974"
}

app.post("/addlogintest", async (req, res) => {
    try {
        const { email, password, reponse, repExcepte } = req.body; // Assuming the data is sent in the request body
        const createdLogin = await logintest.create({
            email,
            password,
            reponse,
            repExcepte,
        });
        res.status(201).json(createdLogin);
        console.log("insterted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
        }
    });
});


function log(body) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/login", body)
        .then((response) => response)
        .catch((error) => error.response);
}
function logAdmin(body) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/login", body)
        .then((response) => response)
        .catch((error) => error.response);
}

//============ code user ====================================================================================
app.get("/data", async (req, res) => {
    try {
        const usersData = await logintest.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/insertuser", async (req, res) => {
    const { email, password, expected } = req.body;
    const createddepots = await logintest.create({
        email: email,
        password: password,
        repExcepte: 1,
    });
    console.log("user insterted");
    res.json({ message: 'Form submitted successfully' });
});


app.get("/testuser", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/data");
        const data = response2.data;


        for (const user of data) {
            const response = await log({
                email: user.email,
                password: user.password,
            });

            const updatedValues = {};

            updatedValues.reponse = JSON.stringify(response.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            if (
                response.data.success == Excepte ||
                response.data.credentials == Excepte
            ) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await logintest.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/data");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


//========================= code of depot=======================================================================

app.get("/userActive", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/data");
        const data = response2.data;
        const results = [];

        for (const user of data) {
            if (user.repExcepte == 1) {
                results.push({
                    email: user.email,
                    password: user.password,
                });
            }
        }
        console.log("result", results)
        res.json(results)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


function depotf(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/depot", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);

    // return {response: {data: "success"}}
}


app.get("/datadepot", async (req, res) => {
    try {
        const usersData = await depots.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/insertdepot", async (req, res) => {
    try {
        console.log("insertdepot d5al")
        const { email, code } = req.body;
        const selectedUser = JSON.parse(email);
        console.log("selectedUser", selectedUser)
        const createddepots = await depots.create({
            email: selectedUser.email,
            code: code,
            repExcepte: 1,
        });

        console.log("pussy")
        res.json({ "insert": "love u m7lak" })
        console.log("insterted");
    } catch (error) {
        console.log("insertdepot erore")
        console.log(error)
    }


});


app.get("/depottest", async (req, res) => {
    try {
        // await fillColumnsWithRandomValues(depots);
        const response2 = await axios.get("http://localhost:3000/datadepot");
        const data = response2.data;
        if (data.length == 0) {
            await fillColumnsWithRandomValues(depots);
        }

        for (const user of data) {
            console.log(user.email);
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });
            console.log("hun pass", pass.dataValues.password);

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });
            const tok = rep.data.token;

            const body = {
                code: user.code,
                password: pass.dataValues.password,
            };

            const rep2 = await depotf(body, tok);

            let etat = user.etat;
            let v = "failed";
            const updatedValues = {};
            let exp = user.repExcepte;

            let s = rep2.data ? true : false;

            if (s) {
                let reponse = JSON.stringify(rep2.data);
                updatedValues.reponse = reponse;
            } else {
                let reponse = JSON.stringify(rep2);
                updatedValues.reponse = reponse;
            }

            let reponse = rep2;

            if (user.repExcepte === s) {
                console.log("d5al user.repExpecte=='1'");
                v = "success";

                if (user.etat) {
                    etat = "used";

                    exp = 0;
                }
                if (rep2.status === 200) {
                    v = "success";
                    etat = "tested";
                    reponse = JSON.stringify(rep2.data);
                }
            } else {
                if (rep2 == 401) {
                    v = "success";
                    reponse = rep2;
                }
            }

            console.log("exp after", exp);

            updatedValues.repExcepte = exp;
            // updatedValues.reponse = reponse;
            updatedValues.etat = etat;
            updatedValues.Test = v;

            const rowsUpdated = await depots.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/datadepot");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//============ code of retraits  ====================================================================================


function retraitf(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/retraits", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);

    // return {response: {data: "success"}}
}


app.get("/dataretrait", async (req, res) => {
    try {
        const usersData = await retraits.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post("/insertretrait", async (req, res) => {
    const { email, code } = req.body;
    const selectedUser = JSON.parse(email);
    const createddepots = await retraits.create({
        email: selectedUser.email,
        code: code,
        repExcepte: 1,
    });
    res.status(201).json(createddepots);
    console.log("insterted");
});


app.get("/retraittest", async (req, res) => {
    try {

        const response2 = await axios.get("http://localhost:3000/dataretrait");
        const data = response2.data;
        if (data.length == 0) {
            await fillColumnsWithRandomValues(retraits);
        }

        for (const user of data) {
            console.log(user.email);
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });

            console.log("hun pass", pass.dataValues.password);

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });
            const tok = rep.data.token;

            const body = {
                code: user.code,
                password: pass.dataValues.password,
            };

            const rep2 = await retraitf(body, tok);
            console.log("rep2 222222222222222", rep2);
            let etat = user.etat;
            let v = "failed";
            const updatedValues = {};
            let exp = user.repExcepte;




            let s = rep2.data ? true : false;

            if (s) {
                let reponse = JSON.stringify(rep2.data);
                updatedValues.reponse = reponse;
            } else {
                let reponse = JSON.stringify(rep2);
                updatedValues.reponse = reponse;
            }

            if (user.repExcepte === s) {
                console.log("d5al user.repExpecte=='1'");
                v = "success";


                if (user.etat) {
                    etat = "used";

                    exp = 0;

                }
                if (rep2.status === 200) {

                    etat = "tested";
                    reponse = JSON.stringify(rep2.data);
                }
            } else {
                if (rep2 == 401) {
                    v = "success";
                    reponse = rep2;
                }
            }

            console.log("exp after", exp);

            updatedValues.repExcepte = exp;

            updatedValues.etat = etat;
            updatedValues.Test = v;

            const rowsUpdated = await retraits.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }
        const alldepot = await axios.get("http://localhost:3000/dataretrait");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//  ===================randomTransactions====================================================================================
app.get('/randomdeposits', async (req, res) => {
    fillColumnsWithRandomValues(depots);

    res.json({ message: 'Function executed successfully' });
});


app.get("/randomusers", async (req, res) => {
    fillColumnsWithRandomValues(Logintests);
    res.json({ message: "Function randomusers executed successfully" });
});


app.get("/verificationFactures", async (req, res) => {
    fillColumnsWithRandomValues(verificationFactures);
    res.json({ message: "Function verificationFactures executed successfully" });
});


app.get("/randomfactures", async (req, res) => {
    fillColumnsWithRandomValues(factures);
    res.json({ message: "Function randomfactures executed successfully" });
});


app.get("/randomretraitAgence", async (req, res) => {
    fillColumnsWithRandomValues(retraitAgences);
    res.json({ message: "Function randomretraitAgence executed successfully" });
})


app.get("/randomtransfert", async (req, res) => {
    fillColumnsWithRandomValues(transferts);

    res.json({ message: "Function randomtransfert executed successfully" });
});


app.get("/randomretrait", async (req, res) => {
    fillColumnsWithRandomValues(retraits);

    res.json({ message: "Function randomretrait executed successfully" });


});


app.get("/randomfacture", async (req, res) => {
    fillColumnsWithRandomValues(forgots);

    res.json({ message: "Function randomretrait executed successfully" });


});


app.get("/randomverifications", async (req, res) => {
    try {
        fillColumnsWithRandomValues(verifications);
        res.json({ message: "Function randomverifications executed successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})


async function generateRandomCode() {
    const min = 100000000000; // Minimum 12-digit number
    const max = 999999999999; // Maximum 12-digit number
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomCodeString = randomCode.toString();
    return randomCodeString


}


async function randomsociete() {
    const societe = ['SOMELEC', 'SNDE'];
    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * societe.length);

    // Retrieve the value at the random index
    const randomValue = values[randomIndex];

    return randomValue;
}


async function generateRandomNumber() {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumberString = randomNumber // Convert to string

    return randomNumberString;
}


async function generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}


async function generateRandomUser() {
    const response2 = await axios.get("http://localhost:3000/data");
    const data = response2.data;
    let results = []
    let number = 0
    // Generate a random 
    for (const user of data) {
        if (user.repExcepte == 1) {
            results.push({
                email: user.email,
                password: user.password,
            });
            number++
        }
    }
    console.log(number)

    const randomIndex = Math.floor(Math.random() * number);
    // Retrieve the random data
    return results[randomIndex];

}


function getRandomPair(strings) {
    const pairs = [];

    // Generate all combinations of two elements from the array
    for (let i = 0; i < strings.length; i++) {
        for (let j = i + 1; j < strings.length; j++) {
            pairs.push([strings[i], strings[j]]);
        }
    }

    // Select a random pair from the generated pairs
    const randomIndex = Math.floor(Math.random() * pairs.length);
    return pairs[randomIndex];
}

function getDates() {
    const today = new Date();
    const currentDate = formatDate(today);

    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);
    const fifteenDaysAgoDate = formatDate(fifteenDaysAgo);

    return { today: currentDate, fifteenDaysAgo: fifteenDaysAgoDate };
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}






const fillColumnsWithRandomValues = async (model) => {
    try {
        const response2 = await axios.get("http://localhost:3000/datadepot");
        const data = response2.data;
        console.log(typeof data)
        const usser = await axios.get("http://localhost:3000/userActive");
        const users = usser.data;
        const array_user = []

        for (const user of users) {
            array_user.push(user.email);
        }

        for (let index = 0; index < 10; index++) {
            const randomuser = await generateRandomUser();
            const Expediteur = randomuser.email
            const response2 = await axios.get("http://localhost:3000/agencelist");
            const data = response2.data;

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const getAllRetraitImar = await getAllRetraitImara({
                type: "retrait_agence"
            }, response.data.token);

            const geTtransfer = await geTtransfert(response.data.token)

            const getAllAgenci = await getAllAgencie(response.data.token)

            const getAllFe = await getAllFee(response.data.token)

            const getAllBan = await getAllBank(response.data.token)

            const getAllFacture = await getAllFactures(response.data.token)

            const getAllClient = await getAllClients(response.data.token)

            const getClientsChec = await getClientsCheck(response.data.token)

            const getAllUser = await getAllUsers(response.data.token)

            const getAllCountry = await getAllCountries(response.data.token)

            const agences = data.agences;
            const randomIndex = Math.floor(Math.random() * agences.length);
            const randomAgence = agences[randomIndex];
            const commune = randomAgence.commune;
            const agence = randomAgence.agence;

            const Number = await generateRandomNumber();
            const Password = await generateRandomString(4);
            const expected = 0;
            let zero = Math.round(Math.random());
            const expsold = Math.round(Math.random());
            const montant = expsold === 1 ? 1 : 1000000000;
            const code = await generateRandomCode();

            if (model == Logintests) {

                await model.create({
                    email: Number,
                    password: Password,
                    repExcepte: expected

                });
                return model
            }

            if (model == depots) {

                // Insert random values into the database
                await model.create(
                    {
                        email: Expediteur,
                        code: code,
                        repExcepte: expected
                    }
                );
                // Assign random values
                return model
            }

            if (model == retraits) {


                await model.create({
                    email: Expediteur,
                    code: code,
                    repExcepte: expected
                });
                return model
            }

            if (model == verifications) {
                await model.create({
                    email: Expediteur,
                    destinataire: '22000000',
                    exceptedDestinataire: expected,
                    exceptedSolde: expsold,
                    montant: montant,
                    repExcepte: expected
                });
                return model
            }

            if (model == transferagences) {

                const createdtranfert = await transferagences.create({
                    email: Expediteur,
                    destinataire: "22000000",
                    montant: 1,
                    repExcepte: 1,
                    commune: commune,
                    agence: agence,
                    fournisseur: "imara"
                });
                return model
            }

            if (model == transferts) {

                const randomPair = getRandomPair(array_user);

                const createdtranfert = await transferts.create({
                    email: randomPair[0],
                    destinataire: randomPair[1],
                    montant: 1,
                    repExcepte: 1,
                });
                return model
            }

            if (model == retraitAgences) {


                await model.create({
                    email: Expediteur,
                    montant: montant,
                    repExcepte: 1,
                    commune: commune,
                    agence: agence,
                    fournisseur: "imara"
                });
                return model
            }

            if (model == factures) {

                let zero = Math.round(Math.random());
                const expsold = Math.round(Math.random());
                const randomPair = getRandomPair(array_user);
                const montant = expsold === 1 ? 1 : 1000000000;
                const societe = zero === 1 ? 'SOMELEC' : 'SNDE'
                console.log("huuuuun zero", zero)
                const email_fc = randomPair[zero]

                await model.create({
                    email: email_fc,
                    password: Password,
                    refFacture: Math.round(Math.random() * 10000) + 20000,
                    montant: montant,
                    societe: societe,
                    repExcepte: expsold
                });
                return model
            }

            if (model == verificationFactures) {

                await model.create({
                    email: randomuser.email,
                    ref: Math.round(Math.random() * 10000) + 20000,
                    montant: montant,
                    repExcepte: expsold
                });
                return model
            }

            if (model == addDepot) {
                const randomPair = getRandomPair(array_user);
                await model.create({
                    type: "depot",
                    phone: randomPair[0],
                    amount: 1,
                    repExcepte: 1
                })
            }

            if (model == addRestrait) {
                const randomPair = getRandomPair(array_user);
                await model.create({
                    type: "retrait",
                    phone: randomPair[0],
                    amount: 1,
                    repExcepte: 1
                })
            }

            if (model == libererRetrait) {

                const list = getAllRetraitImar.data.data;
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }
                console.log("idArray ", idArray);
                randomId = [idArray[index], index]
                const randomIndex = Math.floor(Math.random() * 2);
                const exp = randomIndex ? 0 : 1;

                await model.create({
                    idR: randomId[randomIndex],
                    fee: 10,
                    repExcepte: exp
                })
            }

            if (model == canceledWithdrawal) {

                const list = getAllRetraitImar.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], index]
                const randomIndex = Math.floor(Math.random() * 2);
                const exp = randomIndex ? 0 : 1

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })

            }

            if (model == libererTransfert) {
                const list = geTtransfer.data.data
                const idArray = [];

                // console.log("listtttttttttt",list)
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], index]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    fee: 10,
                    repExcepte: exp
                })
            }

            if (model == annulerTransfert) {

                const list = geTtransfer.data.data
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], index]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })

            }

            if (model == addAgency) {

                await model.create({

                    fournisseur: "imara",
                    city: "Nouakchott",
                    commune: "EL mina",
                    agency: "Sixieme Garage capital",
                    phone: null,
                    repExcepte: 1

                })
            }

            if (model == getAgency) {

                const list = getAllAgenci.data.data
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                console.log("idArray ", list.length);
                randomId = [idArray[index], list.length + index + 10000]
                const randomIndex = Math.floor(Math.random() * 2);
                const exp = randomIndex ? 0 : 1;

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == deleteAgency) {

                const list = getAllAgenci.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })

            }

            if (model == updateAgency) {

                const list = getAllAgenci.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    fournisseur: "imara update",
                    city: "Nouakchott update",
                    commune: "EL mina update",
                    agency: "Sixieme Garage capital update",
                    phone: randomId[randomIndex],
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == changeAgencyStatus) {


                const list = getAllAgenci.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })

            }


            if (model == getFee) {

                const list = getAllFe.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == changeFeeStatus) {

                const list = getAllFe.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })

            }

            if (model == updateFee) {

                const list = getAllFe.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }


                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp,
                    email: "updated@gmail.com",
                    start: index + 3,
                    amount: 1,
                    end: index + 10,
                    type: "transfert",

                });

            }

            if (model == deleteFee) {

                const list = getAllFe.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == addFee) {

                const list = getAllFe.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: 1,
                    start: randomId[randomIndex],
                    amount: 1,
                    end: randomId[randomIndex] + 10,
                    type: "transfert"
                });

            }

            if (model == updatebank) {

                const list = getAllBan.data.banks
                const idArray = [];
                const name = [];

                const bank = await generateRandomString(3)

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                    name.push(item.title);
                }

                randomId = [idArray[index], list.length + index + 1000]
                randomId2 = [name[index], bank.toUpperCase()]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1

                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    title: randomId2[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == addBank) {
                const list = getAllBan.data.banks
                const idArray = [];

                const bank = await generateRandomString(3)

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.title);
                }

                randomId = [idArray[index], bank.toUpperCase()]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 1 : 0
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 1
                }

                await model.create({
                    title: randomId[randomIndex],
                    repExcepte: exp
                })

            }

            if (model == payerFacture) {
                const list = getAllFacture.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    fee: 10,
                    repExcepte: exp
                })
            }

            if (model == annulerFacture) {
                const list = getAllFacture.data.data
                const idArray = [];


                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    mssg: "message",
                    repExcepte: exp
                })
            }

            if (model == createClient) {

                const list = getAllClient.data.clients
                const idArray = [];

                const nom  = await generateRandomString(5)
                const prenom  = await generateRandomString(5)
                
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }
                genre=['Homme','Femme']

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    nom :nom,
                    prenom: prenom,
                    numero: Math.round(Math.random() * 41000000) + 49999999,
                    email:nom+"@example.mr",
                    genre:genre[randomIndex],
                    adresse:"adresse",
                    password:'1234', 
                    passwordConfirmation:'1234',
                    repExcepte:1
                });

            }

            if (model == getClient) {

                const list = getAllClient.data.clients
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == getClientProgresse) {

                const list = getAllClient.data.client_in_progress
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == checkClient) {

                const list = getAllClient.data.client_in_progress
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: 1
                })
            }

            if (model == validateClient) {

                const list = getAllClient.data.client_in_progress
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == statementClient) {

                const list = getAllClient.data.clients
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }
                const { today, fifteenDaysAgo } = getDates();
                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    date1: today,
                    date2: fifteenDaysAgo,
                    repExcepte: exp
                })
            }

            if (model == resetClientPassword) {

                const list = getAllClient.data.clients
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    password: "1234",
                    repExcepte: exp
                })
            }

            if (model == getUser) {
                const list = getAllUser.data.data
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            // if (model == resetPasswordAdmin) {
            //     const list = getAllUser.data.data
            //     const idArray = [];

            //     for (let i = 0; i < list.length; i++) {
            //         const item = list[i];
            //         idArray.push(item.id);
            //     }

            //     randomId = [idArray[index], list.length + index + 1000]
            //     const randomIndex = Math.floor(Math.random() * 2);
            //     let exp = randomIndex ? 0 : 1
            //     if (randomId[randomIndex] == null) {
            //         randomId[randomIndex] = randomId[1]
            //         exp = 0
            //     }

            //     await model.create({
            //         idR: randomId[randomIndex],
            //         repExcepte: exp
            //     })
            // }

            if (model == setStatus) {
                const list = getAllUser.data.data
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

            if (model == rateCountry) {
                const list = getAllCountry.data.countries
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    idR: randomId[randomIndex],
                    rate:randomId[randomIndex]+index +10,
                    repExcepte: exp
                })
            }

            if (model == createCountry) {
                const list = getAllCountry.data.countries
                const idArray = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    idArray.push(item.id);
                }

                randomId = [idArray[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }
                const code = await generateRandomString(3)
                const fr = await generateRandomString(7)
                const currency = await generateRandomString(2)
                await model.create({
                    m: randomId[randomIndex],
                    code: code.toUpperCase(),
                    title_fr: fr,
                    title_ar: fr,
                    currency: currency.toUpperCase(),
                    min: randomId[randomIndex],
                    max: randomId[randomIndex] + 10,
                    rate: randomId[randomIndex] + 5,
                    repExcepte: 1
                })
            }

            if (model == countryAddFee) {
                const list = getAllCountry.data.countries
                const idArray = [];
                const idfee = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    const fee = await getAllCountryByIds(response.data.token, item.id);
                    const datafee = fee.data.fees
                    idArray.push(item.id);
                    for (let j = 0; j < datafee.length; j++) {
                        const elements = datafee[j];
                        idfee.push(elements);
                    }

                }

                randomId = [idfee[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0
                }

                await model.create({
                    start: list.length + index + 10,
                    end: list.length + index + 100,
                    amount: list.length + index,
                    type: "wallet",
                    repExcepte: !exp,
                    idR:randomId[randomIndex]
                })
            }

            if (model == countryUpdateFee) {
                const list = getAllCountry.data.countries;
                const idArray = [];
                const idfee = [];

                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    const fee = await getAllCountryByIds(response.data.token, item.id);
                    const datafee = fee.data.fees
                    idArray.push(item.id);
                    for (let j = 0; j < datafee.length; j++) {
                        const elements = datafee[j];
                        idfee.push(elements.id);
                    }

                }

                randomId = [idfee[index], list.length + index + 1000]
                const randomIndex = Math.floor(Math.random() * 2);
                let exp = randomIndex ? 0 : 1
                if (randomId[randomIndex] == null) {
                    randomId[randomIndex] = randomId[1]
                    exp = 0;
                }
                console.log(randomId[randomIndex])
                await model.create({
                    start: list.length + index + 10,
                    end: list.length + index + 100,
                    amount: list.length + index,
                    type: "wallet",
                    idR: randomId[randomIndex],
                    repExcepte: exp
                })
            }

        }
        console.log("Random values inserted successfully.")

    } catch (error) {
        console.error("Error inserting random values:", error);
    }
};



//================= code of transferts  =================================================================================================
async function countryUpdateFeeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/country/update-fee",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function countryAddFeeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/country/add-fee",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function createCountryApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/create/country",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function rateCountryApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/rate/country",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function setStatusApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/set-status",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function resetPasswordAdminApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/reset-password",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function getUserApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-user",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function resetClientPasswordApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/reset-client-password",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function statementClientApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/statement-client",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function validateClientApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/validate-client",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function checkClientApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/check-client",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function getClientProgresseApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-client-progresse",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function getClientApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-client",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function createClientApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/create-client",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function annulerFactureApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/annuler-facture",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function payerFactureApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/payer-facture",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function updatebankApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/bank/update",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function addBankApi(bod, token) {
    return axios
        .post(
            "https://devmauripay.cadorim.com/api/backend/private/bank/add",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function addFeeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/add-fee",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function deleteFeeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/delete-fee",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function updateFeeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/update-fee",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllCountryByIds(token, id) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get/country/" + id, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllCountries(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get/countries", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}


function getAllClients(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get-all-clients", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllUsers(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get-all-users", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllAgencie(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get-all-agencies", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllFee(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get-all-fee", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllFactures(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get-all-facture", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function getAllBank(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/bank/getAll", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}


function getClientsCheck(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/bank/getAll", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

async function getFeeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-fee",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function changeFeeStatusApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/change-fee-status",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

function changeAgencyStatusApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/change-agency-status", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function updateAgencyApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/update-agency", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}


function deleteAgencyApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/delete-agency", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}


function addAgencyApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/add-agency", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);
}


function libererRetraitApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/liberer-retrait", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function libererTransfertApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/liberer-transfert", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function annulerTransfertApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/backend/private/annuler-transfert", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function geTtransfert(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/backend/private/get-transfert", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response);
}

function transfertapi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/transfert", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);
}

async function verification(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/verification",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

async function agence(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/agence/transfert",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

    // return {response: {data: "success"}}
}

async function getAgencyApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-agency",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);

    // return {response: {data: "success"}}
}

//============ verification code ==============================================================================


app.get("/dataverification", async (req, res) => {
    try {
        const usersData = await verifications.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.get("/verificationTest", async (req, res) => {
    try {


        const response2 = await axios.get("http://localhost:3000/dataverification");
        const data = response2.data;

        if (data.length == 0) {
            await fillColumnsWithRandomValues(verifications);
        }
        // console.log("data", data);
        for (const user of data) {
            console.log(user.email);
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });
            console.log("hun pass", pass.dataValues.password);

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });

            console.log("user", user)
            const solde = rep.data.solde;

            const tok = rep.data.token;

            const bodyverify = {
                tel_bf: user.destinataire,
                // password: pass.dataValues.password,
                montant: user.montant,
            };

            let reponse = user.reponse;
            let test = "failed"

            console.log("bodyverify", bodyverify);
            // console.log("tok", tok);

            const verified = await verification(bodyverify, tok);
            let updatedValues = {};
            // let test = user.Test;
            reponse = JSON.stringify(verified.data);

            console.log("verified", verified.data.indisponible ? 1 : 0);
            console.log("user.exceptedSolde", user.exceptedSolde);
            const verified_money = verified.data.indisponible ? 1 : 0
            if (verified_money == !user.exceptedSolde) {
                // test = "solde insuffisant";
                if (!verified_money) {
                    test = "success"
                    reponse = "solde insuffisant"
                }
                // console.log("solde insuffisant");
                if (verified.data.success == user.exceptedDestinataire) {
                    test = "success"
                    reponse = JSON.stringify(verified.data);
                }
            }
            else {

                if (verified.data.success == user.exceptedDestinataire) {
                    test = "success"
                    reponse = JSON.stringify(verified.data);
                }
            }


            updatedValues.Test = test;
            updatedValues.reponse = reponse;
            const rowsUpdated = await verifications.update(updatedValues, {
                where: { id: user.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log('Record not found for user:', user);
            }



        }
        console.log("test finished")
        const r = await axios.get("http://localhost:3000/dataverification");
        const d = r.data;
        console.log("Record", d);
        res.json(d);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// insert verification
app.post("/insertVerification", async (req, res) => {
    const { email, tel_bf, montant } = req.body;
    const selectedUser = JSON.parse(email);
    const createdtranfert = await verifications.create({
        email: selectedUser.email,
        destinataire: tel_bf,
        montant: montant,
        exceptedSolde: 1,
        exceptedDestinataire: 1,
    });


    console.log("insterted");
    // res.json(req.body);
    res.json({ "insterted": "insterted" });
});

//============== trensfert code ==================================================================================================================

app.get("/datatransfert", async (req, res) => {
    try {
        const usersData = await transferts.findAll();
        res.json(usersData);
    }

    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/inserttransfert", async (req, res) => {
    const { email, tel_bf, montant } = req.body;
    const selectedUser = JSON.parse(email);
    const createdtranfert = await transferts.create({
        email: selectedUser.email,
        destinataire: tel_bf,
        montant: montant,
        repExcepte: 1,
    });
    console.log("insterted");
    res.json({ "insterted": "insterted" });

});


app.get("/transfertTest", async (req, res) => {
    try {

        const response2 = await axios.get("http://localhost:3000/datatransfert");
        const data = response2.data;

        if (data.length == 0) {
            await fillColumnsWithRandomValues(transferts);
        }
        // console.log("data", data);
        for (const user of data) {
            // console.log(user.email);
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });

            console.log("user", user)
            // const solde = rep.data.solde;

            const tok = rep.data.token;

            const bodyverify = {
                tel_bf: user.destinataire,
                password: pass.dataValues.password,
                montant: user.montant,
            };

            let reponse = user.reponse;
            let test = "failed"

            console.log("bodyverify", bodyverify);
            console.log("tok", tok);
            const trens = await transfertapi(bodyverify, tok);
            let updatedValues = {};

            // let test = user.Test;
            reponse = JSON.stringify(trens.data);

            console.log("trens", trens.data)
            let success = trens.data.success ? 1 : 0;

            if (success == user.repExcepte) {
                test = "success"
            }

            updatedValues.Test = test;
            updatedValues.reponse = reponse;
            const rowsUpdated = await transferts.update(updatedValues, {
                where: { id: user.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log('Record not found for user:', user);
            }
        }
        console.log("test finished")

        const r = await axios.get("http://localhost:3000/datatransfert");
        const d = r.data;
        console.log("Record", d);
        res.json(d);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ============== trans egence ==================================================================================================================


app.get("/datatransfertAgence", async (req, res) => {
    try {
        const usersData = await transferagences.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.post('/agence', async (req, res) => {

    try {
        const { email, commune, agence, tel_bf, montant } = req.body;
        const selectedUser = JSON.parse(email);
        const createdtranfert = await transferagences.create({
            email: selectedUser.email,
            destinataire: tel_bf,
            montant: montant,
            repExcepte: 1,
            commune: commune,
            agence: agence,
            fournisseur: "imara"
        });


        console.log("selectedUser.email", selectedUser.email, "commune", commune, "agence", agence, "tel_bf", tel_bf, "montant", montant);
        // console.log("req.body", req.body);
        res.json(req.body);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


function agencelist(token) {
    return axios
        .get("https://devmauripay.cadorim.com/api/mobile/private/get/agence", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);
}


app.get('/agencelist', async (req, res) => {
    try {
        const userData = await logintest.findOne({
            where: {
                repExcepte: 1
            },
            attributes: ['email', 'password']
        });
        const rep = await log(userData)
        const tok = rep.data.token;
        console.log("tok", tok);
        const listagence = await agencelist(tok);

        res.json(listagence.data)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }


});

app.get('/questionslist', async (req, res) => {
    try {
        const userData = await logintest.findOne({
            where: {
                repExcepte: 1
            },
            attributes: ['email', 'password']
        });
        const rep = await log(userData.dataValues)
        console.log("rep", rep.data)
        const tok = rep.data.token;
        const bod = { lng: "fr" }
        console.log("tok", tok);
        const questionslist = await questionApi(bod, tok);
        console.log("questions", questionslist.data);
        res.json(questionslist.data)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

async function retraitAgenceAPI(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/agence/retrait",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}


async function checkPhoneApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/checkPhone",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}


async function factureApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/facture",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}


async function reponseApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/reponse",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.data);
}


async function questionApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/questions",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}

async function forgotApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/forgot",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

async function addRestraitApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/add-retrait",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

async function canceledWithdrawalApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/canceled-withdrawal",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function codeApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/code",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}


async function questionApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/questions",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}


async function addDepotApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/add-depot",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

async function getAllRetraitApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-retrait-imara",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

async function getAllRetraitImara(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-retrait-imara",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}


app.get("/dataretraitAgence", async (req, res) => {
    try {
        const usersData = await retraitAgences.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.get("/retraitAgenceTest", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/dataretraitAgence");
        const data = response2.data;

        if (data.length == 0) {
            fillColumnsWithRandomValues(retraitAgences);
        }
        // console.log("data", data);
        for (const user of data) {
            // console.log(user.email);
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });


            console.log("hun pass", pass.dataValues.password);

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });

            const tok = rep.data.token;
            const bodyverify = {
                password: pass.dataValues.password,
                montant: user.montant,
                commune: user.commune,
                agence: user.agence,
                fournisseur: "imara"
            };

            let test = "failed"
            const verified = await retraitAgenceAPI(bodyverify, tok);
            console.log("verified", verified)
            let etat = user.etat;
            const updatedValues = {};
            let exp = user.repExcepte;
            let reponse = JSON.stringify(verified.data);

            const verified_data = verified.data ? 1 : 0;
            console.log("verified_money", verified_data);
            console.log("user.repExcepte", user.repExcepte);
            if (verified_data == exp) {
                test = "success"
                if (etat) {
                    etat = "used";

                    exp = 0;

                }
                if (verified_data === 200) {

                    etat = "tested";
                    reponse = JSON.stringify(verified_data.data);
                }
            }
            else {
                if (verified_data == 401) {
                    test = "success";
                    reponse = verified_data;
                }
            }
            updatedValues.Test = test;
            updatedValues.reponse = reponse;
            const rowsUpdated = await retraitAgences.update(updatedValues, {
                where: { id: user.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated");
            } else {
                console.log('Record not found for user:');
            }

        }

        const retraitA = await axios.get("http://localhost:3000/dataretraitAgence");
        const reponse = retraitA.data;
        console.log("Record", reponse);
        res.json(reponse);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/transfertAgenceTest", async (req, res) => {
    try {


        const response2 = await axios.get("http://localhost:3000/datatransfertAgence");
        const data = response2.data;
        // console.log("data", data);


        if (data.length == 0) {
            fillColumnsWithRandomValues(transferagences);
        }


        for (const user of data) {
            // console.log(user.email);
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });


            console.log("hun pass", pass.dataValues.password);

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });

            const tok = rep.data.token;

            const bodyverify = {
                email: user.email,
                tel_bf: user.destinataire,
                montant: user.montant,
                commune: user.commune,
                agence: user.agence,
                fournisseur: "imara"
            };

            let test = "failed"


            const verified = await agence(bodyverify, tok);
            let updatedValues = {};
            // let test = user.Test;
            let reponse = JSON.stringify(verified.data);

            console.log("verified", verified.data);
            // console.log("user.exceptedSolde", user.exceptedSolde);
            const verified_money = verified.data.success == true ? 1 : 0;
            console.log("verified_money", verified_money);
            console.log("user.repExcepte", user.repExcepte);
            if (verified.data.success == user.repExcepte) {
                // if (verified.data.success == user.exceptedDestinataire) {
                test = "success"
                // reponse = JSON.stringify(verified.data);
                // }
            }


            updatedValues.Test = test;
            updatedValues.reponse = reponse;
            const rowsUpdated = await transferagences.update(updatedValues, {
                where: { id: user.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated");
            } else {
                console.log('Record not found for user:');
            }



        }
        console.log("test finished")

        const r = await axios.get("http://localhost:3000/datatransfertAgence");
        const d = r.data;
        console.log("Record", d);
        res.json(d);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/agenceRandom", async (req, res) => {
    fillColumnsWithRandomValues(transferagences);
    res.json({ success: true })
})
//==================================== verificationFactures  =================================================
async function verificationFacturesApi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/verification_facture", bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

}

app.get("/dataverificationFactures", async (req, res) => {
    try {
        const usersData = await verificationFactures.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/verificationFacturesTest", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/dataverificationFactures");
        const data = response2.data;

        if (data.length == 0) {
            fillColumnsWithRandomValues(verificationFactures);
        }

        for (const user of data) {
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });

            console.log("hun pass", pass.dataValues.password);
            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });
            const tok = rep.data.token;
            const bodyverify = {
                ref: user.ref,
                montant: user.montant,
            };
            let test = "failed"
            let updatedValues = {};


            if (rep.data.success) {
                const verified = await verificationFacturesApi(bodyverify, tok);
                let reponse = JSON.stringify(verified.data);
                updatedValues.reponse = reponse;
                if (verified.data.success == user.repExcepte) {
                    test = "success"
                }
            }
            updatedValues.Test = test;
            const rowsUpdated = await verificationFactures.update(updatedValues, {
                where: { id: user.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated");
            } else {
                console.log('Record not found for phone:');
            }
        }
        const r = await axios.get("http://localhost:3000/dataverificationFactures");
        const d = r.data;
        res.json(d);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

//==================================== end verificationFactures  =================================================

//==================================== checkPhone  =================================================

app.get("/checkPhone", async (req, res) => {
    try {
        const usersData = await checkPhones.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.get('/checkPhoneRand', async (req, res) => {
    try {
        const response = await axios.get("http://localhost:3000/userActive");
        const data = response.data;

        const randomuser = await generateRandomUser();

        const results = [];

        for (let j = 0; j < data.length; j++) {
            const telephone = data[j].email;
            let createdtranfert1 = await checkPhones.create({
                telephone: telephone,
                repExcepte: 1
            });
        }

        const existingTelephones = await checkPhones.findAll({
            attributes: ['telephone']
        });

        const generatedTelephones = [];

        while (generatedTelephones.length < 10 - data.length) {
            const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
            const telephoneExists = existingTelephones.some(
                (existingTelephone) => existingTelephone.telephone === randomNumber
            );

            if (!telephoneExists) {
                generatedTelephones.push(randomNumber);
            }
        }

        for (let i = 0; i < generatedTelephones.length; i++) {
            const telephone = generatedTelephones[i];
            let createdtranfert2 = await checkPhones.create({
                telephone: telephone,
                repExcepte: 0,
            });
        }

        console.log("randomuser", randomuser);
        res.json({ success: "is inserted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/checkPhoneTest", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/checkPhone");
        const data = response2.data;

        if (data.length == 0) {
            await axios.get("http://localhost:3000/checkPhoneRand");
        }

        for (const phone of data) {
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: phone.telephone,
                },
            });

            let test = "failed"

            let p = pass != null ? pass.dataValues.password : "n";

            const rep = await log({
                email: phone.telephone,
                password: p
            });

            const tok = rep.data.token;

            const bodyverify = {
                telephone: phone.telephone
            };


            let updatedValues = {};

            if (rep.data.success) {

                const verified = await checkPhoneApi(bodyverify, tok);

                let reponse = JSON.stringify(verified.data);
                updatedValues.reponse = reponse;

                if (verified.data.success == phone.repExcepte) {
                    test = "success"
                }

            }
            else {
                if (phone.repExcepte == 0) {
                    test = "success"
                    let reponse = JSON.stringify(rep.data);
                    updatedValues.reponse = reponse;
                }
            }
            updatedValues.Test = test;

            const rowsUpdated = await checkPhones.update(updatedValues, {
                where: { id: phone.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated");
            } else {
                console.log('Record not found for phone:');
            }
        }


        const d = await axios.get("http://localhost:3000/checkPhone");
        const d2 = d.data;

        res.json(d2);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})

//============================= facture ===================================================================================================


app.get("/datafactures", async (req, res) => {
    try {
        const usersData = await factures.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.get("/factureTest", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/datafactures");
        const data = response2.data;

        if (!(data.length > 0)) {
            // await fillColumnsWithRandomValues(factures);
            // randomfactures
            await axios.get("http://localhost:3000/randomfactures");
        }

        let i = 0
        for (const user of data) {
            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: user.email,
                },
            });
            // console.log("hun pass", pass.dataValues.password);

            const rep = await log({
                email: user.email,
                password: pass.dataValues.password,
            });

            const tok = rep.data.token;
            console.log("tok", tok)

            const bodyverify = {
                password: pass.dataValues.password,
                ref_facture: user.refFacture,
                montant: user.montant,
                societe: user.societe,
            };

            let test = "failed"


            let updatedValues = {};

            if (rep.data.success) {
                i++
                const verified = await factureApi(bodyverify, tok);

                let reponse = JSON.stringify(verified.data);
                updatedValues.reponse = reponse;
                console.log()
                const suc = verified.data.success ? 1 : 0
                console.log("suc", suc)
                console.log("user.repExcepte", user.repExcepte)
                if (suc == user.repExcepte) {
                    test = "success"
                }

            }
            else {
                if (user.repExcepte == 0) {
                    test = "success"
                    let reponse = JSON.stringify(rep.data);
                    updatedValues.reponse = reponse;
                }
            }
            updatedValues.Test = test;

            const rowsUpdated = await factures.update(updatedValues, {
                where: { id: user.id }
            });
            if (rowsUpdated > 0) {
                console.log("rowsUpdated");
            } else {
                console.log('Record not found for phone:');
            }


        }
        const r = await axios.get("http://localhost:3000/datafactures");
        const d = r.data;

        res.json(d);
        // res.json({ success: true ,count :i});
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//============================= end facture ===================================================================================================

//============================= forgot ===================================================================================================



app.get("/forgot", async (req, res) => {
    try {
        const usersData = await forgot.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/insertForgot", async (req, res) => {
    try {
        const { nni, telephone } = req.body;

        let forgots = await forgot.create({
            telephone: telephone,
            nni: nni,
            repExcepte: 1,
        });

        res.json(forgots);
        console.log("inserted forgot values ")
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const randforgot = async () => {
    try {
        const response = await axios.get("http://localhost:3000/userActive");
        const data = response.data;

        const existingNNIs = await forgot.findAll({
            attributes: ['nni']
        });


        const generatedTelephones = [];

        while (generatedTelephones.length < 10) {
            const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
            const nniExists = existingNNIs.some(
                (existingNNI) => existingNNI.nni === randomNumber.toString()
            );

            if (!nniExists) {
                generatedTelephones.push(randomNumber);
            }
        }

        for (let i = 0; i < generatedTelephones.length; i++) {
            const telephone = generatedTelephones[i];
            const nni = generatedTelephones[i].toString(); // Convert to string
            let createdtranfert2 = await forgot.create({
                telephone: telephone,
                nni: nni,
                repExcepte: 0,
            });
        }

        return "success"
    } catch (error) {
        console.error("Error:", error);
        return "Internal Server Error";
    }
};


app.get("/forgotTest", async (req, res) => {
    const response2 = await axios.get("http://localhost:3000/forgot");
    const data = response2.data;

    if (data.length == 0) {
        randforgot();
    }

    for (const phone of data) {
        const pass = await logintest.findOne({
            attributes: ["password"],
            where: {
                email: phone.telephone,
            },
        });

        let test = "failed"

        let p = pass != null ? pass.dataValues.password : "n";

        const rep = await log({
            email: phone.telephone,
            password: p
        });


        const bodyverify = {
            telephone: phone.telephone,
            nni: phone.nni
        };


        let updatedValues = {};

        if (rep.data.success) {
            const tok = rep.data.token;
            const verified = await forgotApi(bodyverify, tok);

            let reponse = JSON.stringify(verified.data);
            updatedValues.reponse = reponse;

            if (verified.data.success == phone.repExcepte) {
                test = "success"
            }

        }
        else {
            if (phone.repExcepte == 0) {
                test = "success"
                let reponse = JSON.stringify(rep.data);
                updatedValues.reponse = reponse;
            }
        }
        updatedValues.Test = test;

        const rowsUpdated = await forgot.update(updatedValues, {
            where: { id: phone.id }
        });
        if (rowsUpdated > 0) {
            console.log("rowsUpdated");
        } else {
            console.log('Record not found for phone:');
        }


    }

    const r = await axios.get("http://localhost:3000/forgot");
    const d = r.data;
    console.log("Record", d);
    res.json(d);

    // res.json({ success: true });

})


//=========================== reponse =====================================================================================================


app.get("/reponse", async (req, res) => {
    try {
        const usersData = await reponse.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})

const reponseRand = async () => {
    try {
        const response = await axios.get("http://localhost:3000/userActive");
        const data = response.data;

        // const token_reponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0MiwidHlwZSI6ImNsaWVudCIsImRldmljZSI6bnVsbCwib3JpZ2luIjoibW9iaWxlIiwiaWF0IjoxNjg2OTIyMDA1LCJleHAiOjE2ODc1MjIwMDV9.qjV2fiU_isyFuwKnu5XYAyiRXR3Hmf_n65EDB9LiPhg';

        const login_rep = await log(
            data[0]
        );

        const token_login = login_rep.data.token;
        let question_list = [];
        const questionApiResponse = await questionApi({ "lng": "fr" }, token_login);
        for (const q of questionApiResponse.data.questions) {
            console.log("Question:", q.question);
            question_list.push(q.question);
        }

        // const randomIndex = Math.floor(Math.random() * 3);
        const existingNNIs = await reponse.findAll({
            attributes: ['q1', 'q2'],
        });


        for (i = 0; i < 10; i++) {
            const r1 = `r1_${Date.now()}`;
            const r2 = `r2_${Date.now()}`;
            const insert_reponse = await reponse.create({
                q1: question_list[Math.floor(Math.random() * 4)] + String(Date.now()),
                q2: question_list[Math.floor(Math.random() * 4)] + String(Date.now()),
                r1: r1,
                r2: r2,
                nni: Math.floor(Math.random() * 1000000) + 9000000,
                repExcepte: 0,
                telephone: Math.floor(Math.random() * 90000000) + 10000000
            });
        }

        return "success";
    } catch (error) {
        console.error("Error:", error);
        return "Internal Server Error";
    }
};


app.post("/insertReponse", async (req, res) => {
    try {
        const { nni, tel, q1, q2, r1, r2 } = req.body;
        console.log("nni reponse.create", nni)
        const insert_reponse = await reponse.create({
            q1: q1,
            q2: q2,
            r1: r1,
            r2: r2,
            nni: nni,
            repExcepte: 1,
            telephone: tel
        });

        res.json(insert_reponse);
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/reponseTest', async (req, res) => {

    const response2 = await axios.get("http://localhost:3000/reponse");
    const data = response2.data;

    if (data.length == 0) {
        reponseRand();
    }


    for (const phone of data) {

        const pass = await logintest.findOne({
            attributes: ["password"],
            where: {
                email: phone.telephone,
            },
        });

        let test = "failed"

        let p = pass != null ? pass.dataValues.password : "n";

        const rep = await log({
            email: phone.telephone,
            password: p
        });

        const tok = rep.data.token ? rep.data.token : "fjn";

        const bodyverify = {
            r1: phone.r1,
            r2: phone.r2,
            q1: phone.q1,
            q2: phone.q2,
            tel: phone.telephone
        };

        const bodyf = {
            telephone: phone.telephone,
            nni: phone.nni,
        }

        const tok_user = tok ? tok : "fjn";

        const fapi = await forgotApi(bodyf, tok_user);

        let updatedValues = {};

        if (rep.data.success) {

            const verified = await reponseApi(bodyverify, fapi.data.token ? fapi.data.token : "fjn");

            let reponse = JSON.stringify(verified.data);
            updatedValues.reponse = reponse;

            if (verified.data.success == phone.repExcepte) {
                test = "success"
            }

        }
        else {
            if (phone.repExcepte == 0) {
                test = "success"
                let reponse = JSON.stringify(rep.data);
                updatedValues.reponse = reponse;
            }
        }
        updatedValues.Test = test;

        const rowsUpdated = await reponse.update(updatedValues, {
            where: { id: phone.id }
        });
        if (rowsUpdated > 0) {
            console.log("rowsUpdated");
        } else {
            console.log('Record not found for phone:');
        }


    }


    const r = await axios.get("http://localhost:3000/reponse");
    const d = r.data;
    console.log("Record", d);
    res.json(d);

    // res.json({ success: true });


})

//========================= code =======================================================================================================

app.get("/code", async (req, res) => {
    try {
        const usersData = await codes.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/insertCode", async (req, res) => {
    try {
        // let forgotApi;
        const { nni, tel, q1, q2, r1, r2 } = req.body;
        console.log("telne", tel)
        console.log("q1", q1)
        console.log("q2", q2)
        console.log("r1", r1)
        console.log("r2", r2)


        const pass = await logintest.findOne({
            attributes: ["password"],
            where: {
                email: tel,
            },
        });

        // console.log("datatvalues",pass)
        const login = await log({ email: tel, password: pass.dataValues.password });

        // console.log("lovlogin.data.tokene",login.data.token)

        const forgotAp = await forgotApi({ telephone: Number(tel), nni: Number(nni) }, login.data.token)
        console.log("forgotAp.data", forgotAp.data)
        const repons = await reponseApi({
            q1: q1,
            q2: q2,
            r1: r1.toString(),
            r2: r2.toString(),
            tel: tel
        }, forgotAp.data.token)
        console.log(repons.data)
        const insert_code = await codes.create({
            code: repons.data.code,
            nni: nni,
            telephone: tel,
            repExcepte: 1
        });

        res.json(insert_code);
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const codeRand = async () => {
    try {
        const response = await axios.get("http://localhost:3000/userActive");
        const data = response.data;
        for (i = 0; i < 10; i++) {
            const code = Number(Date.now());
            const insert_code = await codes.create({
                code: code,
                nni: Math.floor(Math.random() * 1000000) + 9000000,
                telephone: Math.floor(Math.random() * 90000000) + 10000000,
                repExcepte: 0
            });
        }
        return "success"
    }
    catch (error) {
        console.error("Error:", error);
        return "Internal Server Error";
    }
};


app.get('/codeTest', async (req, res) => {

    const response2 = await axios.get("http://localhost:3000/code");
    const data = response2.data;

    if (data.length == 0) {
        codeRand();
    }


    for (const phone of data) {

        const pass = await logintest.findOne({
            attributes: ["password"],
            where: {
                email: phone.telephone,
            },
        });

        let test = "failed"

        let p = pass != null ? pass.dataValues.password : "n";

        const rep = await log({
            email: phone.telephone,
            password: p
        });

        const tok = rep.data.token;

        const bodyverify = {
            code: phone.code,
            telephone: phone.telephone
        };

        const bodyf = {
            nni: phone.nni,
            telephone: phone.telephone
        }
        // {telephone:phone,nni:12345678910}
        const tok_user = tok ? tok : "fjn";
        // const verified = await forgotApi(bodyverify, tok);
        const fapi = await forgotApi(bodyf, tok_user);

        let updatedValues = {};

        if (rep.data.success) {

            const verified = await codeApi(bodyverify, fapi.data.token ? fapi.data.token : "fjn");

            let reponse = JSON.stringify(verified.data);
            updatedValues.reponse = reponse;

            if (verified.data.success == phone.repExcepte) {
                test = "success"
            }

        }
        else {
            if (phone.repExcepte == 0) {
                test = "success"
                let reponse = JSON.stringify(rep.data);
                updatedValues.reponse = reponse;
            }
        }
        updatedValues.Test = test;

        const rowsUpdated = await codes.update(updatedValues, {
            where: { id: phone.id }
        });
        if (rowsUpdated > 0) {
            console.log("rowsUpdated");
        } else {
            console.log('Record not found for phone:');
        }
    }
    const r = await axios.get("http://localhost:3000/code");
    const d = r.data;
    console.log("Record", d);
    res.json(d);
    // res.json({ success: true });
})

//================================ reset password ================================================================================================


app.get("/reset", async (req, res) => {
    try {
        const usersData = await resetPasswords.findAll();
        const response = await axios.get("http://localhost:3000/userActive");
        const data = response.data;


        if (!(usersData.length > 0)) {
            for (i = 0; i < 10; i++) {
                const pass = Math.round(Math.random() * 10000) + 20000
                await resetPasswords.create({
                    telephone: Math.round(Math.random() * 20000000) + 49088000,
                    nni: Math.round(Math.random() * 10000) + 20000,
                    password: pass,
                    passwordConfirmation: pass,
                    repExcepte: 0
                });
            }

        }

        const rese = await resetPasswords.findAll();
        res.json(rese);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.post('/insertRest', async (req, res) => {
    try {
        const { nni, telephone, password, passwordConfirmation } = req.body;

        const rest = await resetPasswords.create({
            telephone: telephone,
            nni: nni,
            password: password,
            passwordConfirmation: passwordConfirmation,
            repExcepte: 1
        });

        res.json(rest);
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// app.get('/restRand', async (req, res) => {
//     try {
//         const response = await axios.get("http://localhost:3000/userActive");
//         const data = response.data;
//         for(i=0;i<10;i++){
//             const code = Number(Date.now());
//             const insert_code = await codes.create({
//                 code: code,
//                 telephone: data[i].telephone,
//                 repExcepte: 0
//             });
//         }
//     }
//         catch (error) {
//             console.error("Error:", error);
//             res.status(500).send("Internal Server Error");
//         }
// })

app.get('/restTest', async (req, res) => {

    const response = await axios.get("http://localhost:3000/reset");
    const data = response.data;

    for (const phone of data) {

        const pass = await logintest.findOne({
            attributes: ["password"],
            where: {
                email: phone.telephone,
            },
        });

        let test = "failed"

        let p = pass != null ? pass.dataValues.password : "n";

        const rep = await log({
            email: phone.telephone,
            password: p
        });

        const tok = rep.data.token;

        const bodyverify = {
            code: phone.code,
            telephone: phone.telephone
        };

        const bodyf = {
            nni: phone.nni,
            telephone: phone.telephone
        }

        // {telephone:phone,nni:12345678910}
        const tok_user = tok ? tok : "fjn";
        // const verified = await forgotApi(bodyverify, tok);
        const fapi = await forgotApi(bodyf, tok_user);

        let updatedValues = {};

        if (rep.data.success) {

            const verified = await codeApi(bodyverify, fapi.data.token ? fapi.data.token : "fjn");

            let reponse = JSON.stringify(verified.data);
            updatedValues.reponse = reponse;

            if (verified.data.success == phone.repExcepte) {
                test = "success"
            }

        }
        else {
            if (phone.repExcepte == 0) {
                test = "success"
                updatedValues.Test = "success";
                let reponse = JSON.stringify(rep.data);
                updatedValues.reponse = reponse;
            }
        }
        updatedValues.Test = test;

        const rowsUpdated = await resetPasswords.update(updatedValues, {
            where: { id: phone.id }
        });
        if (rowsUpdated > 0) {
            console.log("rowsUpdated");
        } else {
            console.log('Record not found for phone:');
        }
    }

    const r = await axios.get("http://localhost:3000/reset");
    const d = r.data;
    res.json(d);
})

app.get('/questions')


//==================  admin  ==============================================================================================================

app.get("/dataAdmin", async (req, res) => {
    try {
        const usersData = await loginAdmin.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/insertuser", async (req, res) => {
    const { email, password, expected } = req.body;

    const createddepots2 = await loginAdmin.create({
        email: email,
        password: password,
        repExcepte: 1,
    })

    console.log("user insterted");
    res.json({ message: 'Form submitted successfully' });
});

app.get("/testAdmin", async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/dataAdmin");
        const data = response2.data;

        for (const user of data) {
            const response = await logAdmin({
                email: user.email,
                password: user.password,
            });

            const updatedValues = {};

            updatedValues.reponse = JSON.stringify(response.data);

            updatedValues.reponse = JSON.stringify(response.data);

            console.log("===api.data.success===", response.data)
            const Excepte = user.repExcepte == 1 ? true : false;
            const s = response.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await loginAdmin.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/dataAdmin");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

function generateTestEndpointCode(endpoint, findAllFunction, fillColumnsFunction, apiFunction, dynamicProperties) {
    const dynamicPropertiesCode = Object.entries(dynamicProperties)
        .map(([key, value]) => `${key}: ${value}`)
        .join(",\n");

    const code = `
    app.get("${endpoint}", async (req, res) => {
        try {
            const usersData = await ${findAllFunction}();
            res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insert${endpoint}", async (req, res) => {
    try {
        ${fillColumnsFunction}();
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/test${endpoint}', async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000${endpoint}");
        const data = response2.data;

        for (const user of data) {
            const pass = await loginAdmin.findOne();
            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await ${apiFunction}({
                ${dynamicPropertiesCode}
            }, response.data.token);

            updatedValues.reponse = JSON.stringify(response.data);

            const Excepte = user.repExcepte == 1 ? true : false;
                if (
                response.data.success == Excepte ||
                response.data.credentials == Excepte
            ) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await ${apiFunction}.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allData = await axios.get("http://localhost:3000${endpoint}");
        const allDataResponse = allData.data;
        res.json(allDataResponse);
        } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
`;

    return code;
}

//=================== add depot =================================================================

app.get("/addDepot", async (req, res) => {
    try {
        const usersData = await addDepot.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertaddDepot", async (req, res) => {
    try {
        fillColumnsWithRandomValues(addDepot);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testaddDepot', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/addDepot");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await addDepotApi({
                type: 'depot',
                phone: user.phone,
                amount: user.amount,
            }, response.data.token)

            updatedValues.reponse = JSON.stringify(api.data);

            console.log("===api.data.success===", api.data)
            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await addDepot.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/addDepot");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//==== add retre =================================================================================================

app.get("/addRestrait", async (req, res) => {
    try {
        const usersData = await addRestrait.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertAddRestrait", async (req, res) => {
    try {
        fillColumnsWithRandomValues(addRestrait);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testaddRestrait', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/addRestrait");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await addRestraitApi({
                type: 'retrait',
                phone: user.phone,
                amount: user.amount,
            }, response.data.token)

            updatedValues.reponse = JSON.stringify(api.data);

            console.log("===api.data.success===", api.data)
            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await addRestrait.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/addRestrait");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//============= get all retrait =================================================================================================


// app.get("/getAllRetrait", async (req, res) => {
//     try {
//         const usersData = await getAllRetrait.findAll();
//         res.json(usersData);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// app.get("/insertAddRestrait", async (req, res) => {
//     try {
//         fillColumnsWithRandomValues(getAllRetrait);
//         res.json({ message: 'Form submitted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while inserting random values' });
//     }
// });


// app.get('/testgetAllRetrait',async (req, res) => {

//     try {
//         const response2 = await axios.get("http://localhost:3000/getAllRetrait");
//         const data = response2.data;

//         for (const user of data) {

//             const pass = await loginAdmin.findOne();

//             const response = await logAdmin({
//                 email: pass.email,
//                 password: pass.password,
//             });

//             const updatedValues = {};

//             const api = await getAllRetraitApi({
//                 type: user.type,
//             },response.data.token)

//             updatedValues.reponse = JSON.stringify(response.data);

//             const Excepte = user.repExcepte == 1 ? true : false;
//             if (
//                 response.data.success == Excepte ||
//                 response.data.credentials == Excepte
//             ) {
//                 updatedValues.Test = "success";
//             } else {
//                 updatedValues.Test = "false";
//             }

//             const rowsUpdated = await addRestrait.update(updatedValues, {
//                 where: { id: user.id },
//             });

//             if (rowsUpdated > 0) {
//                 console.log("rowsUpdated", user);
//             } else {
//                 console.log("Record not found for user:", user);
//             }
//         }

//         const alldepot = await axios.get("http://localhost:3000/addRestrait");
//         const alldepotdata = alldepot.data;
//         res.json(alldepotdata);

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }

// })


// =============================================================================================================


app.get("/libererRetrait", async (req, res) => {
    try {
        const usersData = await libererRetrait.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/insertLibererRetrait", async (req, res) => {
    try {
        fillColumnsWithRandomValues(libererRetrait);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});


app.get('/testLibererRetrait', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/libererRetrait");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            // console.log(updatedValues);
            const api = await libererRetraitApi({
                id: user.idR,
                fee: user.fee
            }, response.data.token)

            updatedValues.reponse = JSON.stringify(api.data);

            console.log("===api.data.success===", api.data)
            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await libererRetrait.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/libererRetrait");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

//============= canceled-withdrawal =================================================================
console.log("============ canceled-withdrawal ====================");

app.get("/canceledWithdrawal", async (req, res) => {
    try {
        const usersData = await canceledWithdrawal.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/insertcanceledWithdrawal", async (req, res) => {
    try {
        fillColumnsWithRandomValues(canceledWithdrawal);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});


app.get('/testcanceledWithdrawal', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/canceledWithdrawal");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await canceledWithdrawalApi({
                id: user.idR,
            }, response.data.token)

            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await canceledWithdrawal.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/libererRetrait");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//================ libererTransfert ================================================================================

app.get("/libererTransfert", async (req, res) => {
    try {
        const usersData = await libererTransfert.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/insertlibererTransfert", async (req, res) => {
    try {
        fillColumnsWithRandomValues(libererTransfert);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});


app.get('/testlibererTransfert', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/libererTransfert");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await libererTransfertApi({
                id: user.idR,
                fee: user.fee
            }, response.data.token)

            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await libererTransfert.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/libererTransfert");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

console.log("");
//=============== annulerTransfert =================================================================================

app.get("/annulerTransfert", async (req, res) => {
    try {
        const usersData = await annulerTransfert.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/insertannulerTransfert", async (req, res) => {
    try {
        fillColumnsWithRandomValues(annulerTransfert);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});


app.get('/testannulerTransfert', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/annulerTransfert");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};
            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await annulerTransfertApi({
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await annulerTransfert.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/annulerTransfert");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

console.log("");
//================= addAgency ===============================================================================

app.get("/addAgency", async (req, res) => {
    try {
        const usersData = await addAgency.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertaddAgency", async (req, res) => {
    try {
        fillColumnsWithRandomValues(addAgency);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testaddAgency', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/addAgency");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await addAgencyApi({
                fournisseur: user.fournisseur,
                city: user.city,
                commune: user.commune,
                agency: user.agency,
                phone: null
            }, response.data.token)

            updatedValues.reponse = JSON.stringify(response.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            if (
                response.data.success == Excepte ||
                response.data.credentials == Excepte
            ) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await addAgency.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/addAgency");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//=========== getAgency ============================================================================

app.get("/getAgency", async (req, res) => {
    try {
        const usersData = await getAgency.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertgetAgency", async (req, res) => {
    try {
        fillColumnsWithRandomValues(getAgency);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testgetAgency', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/getAgency");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await getAgencyApi({
                id: user.idR,
            }, response.data.token)


            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await getAgency.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/getAgency");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//============== deleteAgency =================================================================================================================

app.get("/deleteAgency", async (req, res) => {
    try {
        const usersData = await deleteAgency.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertdeleteAgency", async (req, res) => {
    try {
        fillColumnsWithRandomValues(deleteAgency);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testdeleteAgency', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/deleteAgency");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};
            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }
            const api = await deleteAgencyApi({
                id: user.idR
            }, response.data.token)


            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await deleteAgency.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/deleteAgency");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//============= updateAgency================================================================================================================

app.get("/updateAgency", async (req, res) => {
    try {
        const usersData = await updateAgency.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertupdateAgency", async (req, res) => {
    try {
        fillColumnsWithRandomValues(updateAgency);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testupdateAgency', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/updateAgency");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await updateAgencyApi({

                fournisseur: user.fournisseur,
                city: user.city,
                commune: user.commune,
                agency: user.agency,
                phone: user.phone,
                id: user.idR,

            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await updateAgency.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/updateAgency");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//=============== changeAgencyStatus =============================================================

app.get("/changeAgencyStatus", async (req, res) => {
    try {
        const usersData = await changeAgencyStatus.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertchangeAgencyStatus", async (req, res) => {
    try {
        fillColumnsWithRandomValues(changeAgencyStatus);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testchangeAgencyStatus', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/changeAgencyStatus");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await changeAgencyStatusApi({
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await changeAgencyStatus.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldepot = await axios.get("http://localhost:3000/changeAgencyStatus");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//=============== getFee =================================================================================================================
app.get("/getFee", async (req, res) => {
    try {
        const usersData = await getFee.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertgetFee", async (req, res) => {
    try {
        fillColumnsWithRandomValues(getFee);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testgetFee', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/getFee");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await getFeeApi({
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await getFee.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allgetFee = await axios.get("http://localhost:3000/getFee");
        const allgetFeedata = allgetFee.data;
        res.json(allgetFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})
//======== changeFeeStatus ========================================================================================================================

app.get("/changeFeeStatus", async (req, res) => {
    try {
        const usersData = await changeFeeStatus.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertchangeFeeStatus", async (req, res) => {
    try {
        fillColumnsWithRandomValues(changeFeeStatus);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testchangeFeeStatus', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/changeFeeStatus");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await changeFeeStatusApi({
                id: user.idR
            }, response.data.token)


            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await changeFeeStatus.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allchangeFeeStatus = await axios.get("http://localhost:3000/changeFeeStatus");
        const allchangeFeeStatusdata = allchangeFeeStatus.data;
        res.json(allchangeFeeStatusdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//================================================================================================================================


app.get("/updateFee", async (req, res) => {
    try {
        const usersData = await updateFee.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertupdateFee", async (req, res) => {
    try {
        fillColumnsWithRandomValues(updateFee);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testupdateFee', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/updateFee");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await updateFeeApi({
                start: user.start,
                amount: user.amount,
                end: user.end,
                type: user.type,
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await updateFee.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/updateFee");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//============= deleteFee ===================================================================================================================

app.get("/deleteFee", async (req, res) => {
    try {
        const usersData = await deleteFee.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/insertdeleteFee", async (req, res) => {
    try {
        fillColumnsWithRandomValues(deleteFee);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testdeleteFee', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/deleteFee");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await deleteFeeApi({
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await deleteFee.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alldeleteFee = await axios.get("http://localhost:3000/deleteFee");
        const alldeleteFeedata = alldeleteFee.data;
        res.json(alldeleteFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//============== addFee ==================================================================================================================

app.get("/addFee", async (req, res) => {
    try {
        const usersData = await addFee.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertaddFee", async (req, res) => {
    try {
        fillColumnsWithRandomValues(addFee);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testaddFee', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/addFee");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });


            const updatedValues = {};

            if(user.Test=='success') {
                updatedValues.repExcepte = 0;
                user.repExcepte=0;
            }


            const api = await addFeeApi({
                start: user.start,
                amount: user.amount,
                end: user.end,
                type: user.type
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await addFee.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/addFee");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//==================  updatebank  ======================================================================================================================


app.get("/updatebank", async (req, res) => {
    try {
        const usersData = await updatebank.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertupdatebank", async (req, res) => {
    try {
        fillColumnsWithRandomValues(updatebank);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testupdatebank', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/updatebank");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await updatebankApi({
                title: user.title,
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await updatebank.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/updatebank");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//============= addBank ===================================================================================

app.get("/addBank", async (req, res) => {
    try {
        const usersData = await addBank.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertaddBank", async (req, res) => {
    try {
        fillColumnsWithRandomValues(addBank);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testaddBank', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/addBank");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await addBankApi({
                title: user.title,
            }, response.data.token)

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await addBank.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/addBank");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//================ payerFacture ================================================================================


app.get("/payerFacture", async (req, res) => {
    try {
        const usersData = await payerFacture.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertpayerFacture", async (req, res) => {
    try {
        fillColumnsWithRandomValues(payerFacture);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testpayerFacture', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/payerFacture");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};
            
            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await payerFactureApi({
                id: user.idR,
                fee: user.fee
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await payerFacture.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/payerFacture");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//=========== annulerFacture =====================================================================================


app.get("/annulerFacture", async (req, res) => {
    try {
        const usersData = await annulerFacture.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertannulerFacture", async (req, res) => {
    try {
        fillColumnsWithRandomValues(annulerFacture);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testannulerFacture', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/annulerFacture");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }
            const api = await annulerFactureApi({
                id: user.idR,
                message: user.mssg
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await annulerFacture.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/annulerFacture");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//============ get-all-virement ====================================================================================================================

console.log("++++++++ Client ++++++++")

//=========== createclient =================================================================================================================


app.get("/createClient", async (req, res) => {
    try {
        const usersData = await createClient.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertcreateClient", async (req, res) => {
    try {
        fillColumnsWithRandomValues(createClient);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testcreateClient', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/createClient");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};
            
            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await createClientApi({
                nom :user.nom,
                    prenom: user.prenom,
                    numero: user.numero,
                    email:user.email,
                    genre:user.genre,
                    adresse:user.adresse,
                    password:user.password, 
                    password_confirmation:user.passwordConfirmation,
                    
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await createClient.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/createClient");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//====================== get-client ==============================================================================


app.get("/getClient", async (req, res) => {
    try {
        const usersData = await getClient.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertgetClient", async (req, res) => {
    try {
        fillColumnsWithRandomValues(getClient);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testgetClient', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/getClient");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await getClientApi({
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await getClient.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/getClient");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//======================= getClientProgresse =========================================================================

app.get("/getClientProgresse", async (req, res) => {
    try {
        const usersData = await getClientProgresse.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertgetClientProgresse", async (req, res) => {
    try {
        fillColumnsWithRandomValues(getClientProgresse);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testgetClientProgresse', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/getClientProgresse");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await getClientProgresseApi({
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await getClientProgresse.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/getClientProgresse");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//================ check-client ================================================================================


app.get("/checkClient", async (req, res) => {
    try {
        const usersData = await checkClient.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertcheckClient", async (req, res) => {
    try {
        fillColumnsWithRandomValues(checkClient);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testcheckClient', async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/checkClient");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await checkClientApi({
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await checkClient.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/checkClient");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


//========== validateClient ======================================================================================================================


app.get("/validateClient", async (req, res) => {
    try {
        const usersData = await validateClient.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertvalidateClient", async (req, res) => {
    try {
        fillColumnsWithRandomValues(validateClient);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testvalidateClient', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/validateClient");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};
            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await validateClientApi({
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await validateClient.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/validateClient");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//============== statementClient  ==================================================================================

app.get("/statementClient", async (req, res) => {
    try {
        const usersData = await statementClient.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertstatementClient", async (req, res) => {
    try {
        fillColumnsWithRandomValues(statementClient);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/teststatementClient', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/statementClient");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await statementClientApi({
                id: user.idR,
                date1: user.date1,
                date2: user.date2,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)
            
            console.log("Excepte", Excepte)

            console.log("api.data.msg.name",api.data.name)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                if(api.data.msg.name=="TransactionNotFound"){
                    updatedValues.Test = "success";
                }else{
                    updatedValues.Test = "false";
                }
                
            }

            const rowsUpdated = await statementClient.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/statementClient");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//=============== resetClientPassword =============================================================

app.get("/resetClientPassword", async (req, res) => {
    try {
        const usersData = await resetClientPassword.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertresetClientPassword", async (req, res) => {
    try {
        fillColumnsWithRandomValues(resetClientPassword);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testresetClientPassword', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/resetClientPassword");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await resetClientPasswordApi({
                id: user.idR,
                password: user.password,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }

            const rowsUpdated = await resetClientPassword.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const alladdFee = await axios.get("http://localhost:3000/resetClientPassword");
        const alladdFeedata = alladdFee.data;
        res.json(alladdFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//================ getUser ================================================================================================================

app.get("/getUser", async (req, res) => {
    try {
        const usersData = await getUser.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertgetUser", async (req, res) => {
    try {
        fillColumnsWithRandomValues(getUser);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testgetUser', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/getUser");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await getUserApi({
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.user ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await getUser.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/getUser");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//mohamed m'breik 
//================== resetPasswordAdmin ==============================================================================================================

// app.get("/resetPasswordAdmin", async (req, res) => {
//     try {
//         const usersData = await resetPasswordAdmin.findAll();
//         res.json(usersData);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.get("/insertresetPasswordAdmin", async (req, res) => {
//     try {
//         fillColumnsWithRandomValues(resetPasswordAdmin);
//         res.json({ message: 'Form submitted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while inserting random values' });
//     }
// });

// app.get('/testresetPasswordAdmin', async (req, res) => {

//     try {
//         const response2 = await axios.get("http://localhost:3000/resetPasswordAdmin");
//         const data = response2.data;

//         for (const user of data) {

//             const pass = await loginAdmin.findOne();

//             const response = await logAdmin({
//                 email: pass.email,
//                 password: pass.password,
//             });

//             const updatedValues = {};

//             const api = await resetPasswordAdminApi({
//                 start: user.start,
//                 amount: user.amount,
//                 end: user.end,
//                 type: user.type,
//                 id: user.idR
//             }, response.data.token)

//             console.log(api.data);
//             updatedValues.reponse = JSON.stringify(api.data);

//             const Excepte = user.repExcepte == 1 ? true : false;
//             const s = api.data.success ? true : false;
//             console.log("SSSSSSSSSSS", s)

//             console.log("Excepte", Excepte)
//             if (s == Excepte) {
//                 updatedValues.Test = "success";
//             } else {
//                 updatedValues.Test = "false";
//             }


//             const rowsUpdated = await resetPasswordAdmin.update(updatedValues, {
//                 where: { id: user.id },
//             });

//             if (rowsUpdated > 0) {
//                 console.log("rowsUpdated", user);
//             } else {
//                 console.log("Record not found for user:", user);
//             }
//         }

//         const allupdateFee = await axios.get("http://localhost:3000/resetPasswordAdmin");
//         const allupdateFeedata = allupdateFee.data;
//         res.json(allupdateFeedata);

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }

// })

//====================== setStatus ==========================================================================================================

app.get("/setStatus", async (req, res) => {
    try {
        const usersData = await setStatus.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertsetStatus", async (req, res) => {
    try {
        fillColumnsWithRandomValues(setStatus);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testsetStatus', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/setStatus");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await setStatusApi({
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await setStatus.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/setStatus");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//======================== rateCountry ========================================================================================================

app.get("/rateCountry", async (req, res) => {
    try {
        const usersData = await rateCountry.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertrateCountry", async (req, res) => {
    try {
        fillColumnsWithRandomValues(rateCountry);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testrateCountry', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/rateCountry");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await rateCountryApi({
                rate: user.rate,
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await rateCountry.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/rateCountry");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})


//================ createCountry  =====================================================

app.get("/createCountry", async (req, res) => {
    try {
        const usersData = await createCountry.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertcreateCountry", async (req, res) => {
    try {
        fillColumnsWithRandomValues(createCountry);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testcreateCountry', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/createCountry");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};


            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }
            const api = await createCountryApi({
                code: user.code,
                title_fr: user.title_fr,
                title_ar: user.title_ar,
                currency: user.currency,
                min: user.min,
                max: user.max,
                rate: user.rate,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("testcreateCountry ", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await createCountry.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/createCountry");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//================== countryAddFee ==============================================

app.get("/countryAddFee", async (req, res) => {
    try {
        const usersData = await countryAddFee.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertcountryAddFee", async (req, res) => {
    try {
        fillColumnsWithRandomValues(countryAddFee);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testcountryAddFee', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/countryAddFee");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            if (user.Test == 'success') {
                updatedValues.repExcepte = 0;
                user.repExcepte = 0;
            }

            const api = await countryAddFeeApi({
                start: user.start,
                end: user.end,
                amount: user.amount,
                type: user.type,
                id: user.idR,
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await countryAddFee.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/countryAddFee");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//================== countryUpdateFee  ==========================================================

app.get("/countryUpdateFee", async (req, res) => {
    try {
        const usersData = await countryUpdateFee.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertcountryUpdateFee", async (req, res) => {
    try {
        fillColumnsWithRandomValues(countryUpdateFee);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testcountryUpdateFee', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/countryUpdateFee");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await countryUpdateFeeApi({
                start: user.start,
                amount: user.amount,
                end: user.end,
                type: user.type,
                id: user.idR
            }, response.data.token)

            console.log(api.data);
            updatedValues.reponse = JSON.stringify(api.data);

            const Excepte = user.repExcepte == 1 ? true : false;
            const s = api.data.success ? true : false;
            console.log("SSSSSSSSSSS", s)

            console.log("Excepte", Excepte)
            if (s == Excepte) {
                updatedValues.Test = "success";
            } else {
                updatedValues.Test = "false";
            }


            const rowsUpdated = await countryUpdateFee.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allupdateFee = await axios.get("http://localhost:3000/countryUpdateFee");
        const allupdateFeedata = allupdateFee.data;
        res.json(allupdateFeedata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

// =============================================================================================================


app.get('/ahmedoue', async (req, res) => {
    const pass = await loginAdmin.findOne();
    const response = await logAdmin({
        email: pass.email,
        password: pass.password,
    });
    console.log(response);
    const n = await geTtransfert(response.data.token)

    console.log("ahmedou ", n.data)
    console.log("lenth ", n.data.data.length)
    res.send("response")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// INSERT INTO `logintests`( `email`, `password`, `repExcepte` ) VALUES ('41234567','1234',1);