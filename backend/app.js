const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require("./config/sequelize"); // Import the configured Sequelize instance
// const {logintest,users} = require('./models');
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
// const checkPhones = require("./models/checkPhones")

const checkPhones = require("./models/checkPhones")
// const verifications = require("./models/verifications");
const port = 3000;
// const logintest=require('./models/loginTest');
// INSERT INTO `logintests`( `email`, `password`,`repExcepte`) VALUES ('41234567','1234',1);

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


function log(va) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/login", va)
        .then((response) => response)
        .catch((error) => { });
    // return { "status": "200", "success": true,data:{token:"vjhaeguawrvbmcskvvbaujghabvfvjvjhnanmgvj"} };
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
        const response2 = await axios.get("http://localhost:3000/datadepot");
        const data = response2.data;

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
            console.log("exp avat", exp);
            let reponse = rep2;

            if (user.repExcepte === true) {
                console.log("d5al user.repExpecte=='1'");
                if (user.etat) {
                    etat = "used";
                    v = "success";
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
            updatedValues.reponse = reponse;
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

            let etat = user.etat;
            let v = "failed";
            const updatedValues = {};
            let exp = user.repExcepte;
            console.log("exp avat", exp);
            let reponse = user.reponse;
            console.log("lejwabbb", reponse)
            if (user.repExcepte === true) {
                console.log("d5al user.repExpecte=='1'");
                if (user.etat) {
                    etat = "used";
                    v = "success";
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
            updatedValues.reponse = reponse;
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
app.get("/randomretraitAgence", async (req, res) => {
    fillColumnsWithRandomValues(retraitAgences);
    res.json({ message: "Function randomusers executed successfully" });
})

app.get("/randomtransfert", async (req, res) => {
    fillColumnsWithRandomValues(transferts);

    res.json({ message: "Function randomusers executed successfully" });
});


app.get("/randomretrait", async (req, res) => {
    fillColumnsWithRandomValues(retraits);

    res.json({ message: "Function randomusers executed successfully" });


});


app.get("/randomverifications", async (req, res) => {
    try {
        fillColumnsWithRandomValues(verifications);
        res.json({ message: "Function randomusers executed successfully" });
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

            const agences = data.agences;
            const randomIndex = Math.floor(Math.random() * agences.length);
            const randomAgence = agences[randomIndex];
            const commune = randomAgence.commune;
            const agence = randomAgence.agence;

            const Number = await generateRandomNumber();
            const Password = await generateRandomString(4);
            const expected = 0;

            const code = await generateRandomCode();

            if (model == Logintests) {

                await model.create({
                    email: Number,
                    password: Password,
                    repExcepte: expected

                });
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
            }



            if (model == retraits) {


                await model.create({
                    email: Expediteur,
                    code: code,
                    repExcepte: expected
                });
            }
            if (model == verifications) {

                let zero = Math.round(Math.random());
                console.log("fillColumnsWithRandomValues randomuser", randomuser)
                const expsold = Math.round(Math.random());
                const montant = expsold === 1 ? 1 : 1000000000;

                await model.create({
                    email: Expediteur,
                    destinataire: '22000000',
                    exceptedDestinataire: expected,
                    exceptedSolde: expsold,
                    montant: montant,
                });
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
            }

            if (model == transferts) {
                const randomuser = await generateRandomUser();
                const Expediteur = randomuser.email
                const randomPair = getRandomPair(array_user);

                const createdtranfert = await transferts.create({
                    email: randomPair[0],
                    destinataire: randomPair[1],
                    montant: 1,
                    repExcepte: 1,
                });
            }
            if (model == retraitAgences) {
                await model.create({
                    email: Expediteur,
                    montant: 1,
                    repExcepte: 1,
                    commune: commune,
                    agence: agence,
                    fournisseur: "imara"
                });

            }

        }
        console.log("Random values inserted successfully.")

    } catch (error) {
        console.error("Error inserting random values:", error);
    }
};

//================= code of transferts  =================================================================================================


function transfertapi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/transferts", bod, {
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

            "https://devmauripay.cadorim.com/api/mobile/private/agence/transferts",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

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
    } catch (error) {
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
    // res.json(req.body);
    res.json({ "insterted": "insterted" });

});


app.get("/transfertTest", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/datatransfert");
        const data = response2.data;
        // console.log("data", data);
        for (const user of data) {
            // console.log(user.email);
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
            // console.log("tok", tok);
            const trens = await transfertapi(bodyverify, tok);
            // const verified = await verification(bodyverify, tok);
            let updatedValues = {};

            // let test = user.Test;
            reponse = JSON.stringify(trens.data);

            // console.log("success", verified.data.success ? 1:0);
            // console.log("user.exceptedSolde", user.exceptedSolde);
            // const verified_money = verified.data.indisponible ? 1:0
            //            success
            // console.log("success", trens.data.success)
            let success = trens.data.success ? 1 : 0;
            if (success == user.repExcepte) {
                test = "success"
                // reponse=JSON.stringify(trens.data)
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
        // console.log("insterted");

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
        // console.log("listagence",listagence.data);
        // res.send(listagence);



        res.json(listagence.data)
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }


});

async function retraitAgenceAPI(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/mobile/private/agence/retraits",
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

app.get("/dataretraitAgence", async (req, res) => {
    try {
        const usersData = await retraitAgences.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})
app.get("/insertretraitAgences", async (req, res) => {
    // const selectedUser = JSON.parse(email);
    const createddepots = await retraitAgences.create({
        email: "34567890",
        fournisseur: "imara",
        montant: 1,
        agence: "wnfjkw",
        commune: "tvw",
        repExcepte: 1,
    });
    res.status(201).json(createddepots);
    console.log("insterted");
});

app.get("/retraitAgenceTest", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/dataretraitAgence");
        const data = response2.data;
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
                email: user.email,
                tel_bf: user.destinataire,
                montant: user.montant,
                commune: user.commune,
                agence: user.agence,
                fournisseur: "imara"
            };

            let test = "failed"


            const verified = await retraitAgenceAPI(bodyverify, tok);
            let updatedValues = {};
            let reponse = JSON.stringify(verified.data);

            console.log("verified", verified.data);
            const verified_money = verified.data.success == true ? 1 : 0;
            console.log("verified_money", verified_money);
            console.log("user.repExcepte", user.repExcepte);
            if (verified.data.success == user.repExcepte) {
                test = "success"

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

        const retraitAgences = await axios.get("http://localhost:3000/dataretraitAgence");
        const reponse = retraitAgences.data;
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
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/checkPhoneTest", async (req, res) => {
    const response2 = await axios.get("http://localhost:3000/checkPhone");
    const data = response2.data;


    for (const phone of data){
        const pass = await logintest.findOne({
            attributes: ["password"],
            where: {
                email: phone.telephone,
            },
        });

        let test = "failed"
        
        let p= pass !=null ? pass.dataValues.password: "n";

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
            let reponse=JSON.stringify(rep.data);
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

res.json({success:true});

})

//============================= forgot ===================================================================================================

// todo ane ncht9l hun la tmssih {
app.get("/forgot", async (req, res) => {
    try {
        const usersData = await forgot.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})


// app.get('/checkPhoneRand', async (req, res) => {
//     try {
//         const response = await axios.get("http://localhost:3000/userActive");
//         const data = response.data;

//         const results = [];

//         const existingTelephones = await checkPhones.findAll({
//             attributes: ['telephone']
//         });

//         const generatedTelephones = [];

//         while (generatedTelephones.length < 10 ) {
//             const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
//             const telephoneExists = existingTelephones.some(
//                 (existingTelephone) => existingTelephone.telephone === randomNumber
//             );

//             if (!telephoneExists) {
//                 generatedTelephones.push(randomNumber);
//             }
//         }

//         for (let i = 0; i < generatedTelephones.length; i++) {
//             const telephone = generatedTelephones[i];
//             let createdtranfert2 = await forgot.create({
//                 telephone: telephone,
//                 repExcepte: 0,
//             });
//         }

//         // console.log("randomuser", randomuser);
//         res.json(data);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });
// todo }



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// INSERT INTO `logintests`( `email`, `password`, `repExcepte` ) VALUES ('41234567','1234',1);
