const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const sequelize = require("./config/sequelize"); // Import the configured Sequelize instance
// const {logintest,users} = require('./models');
const logintest = require("./models/loginTest");
const depots = require("./models/depots");
const retrait = require("./models/retraits");
const transfert = require("./models/transfert");
const Logintests = require("./models/loginTest");
const cors = require('cors');
const verifications = require("./models/verifications");
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

app.get("/totrans", (req, res) => {
    res.render("trans");
});

app.get("/tologintest", (req, res) => {
    res.render("AddUsers");
});
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

app.get("/test", (req, res) => {
    if (req.session.isonline) {
        const depots = req.query.depots;
        const retraits = req.query.retraits;
        const transs = req.query.transs;
        const logins = req.query.logins;
        // transs
        // logins
        res.render("test", {
            token: req.session.token,
            password: req.session.password,
            depots: depots,
            retraits: retraits,
            transs: transs,
            logins: logins,
        });
    } else {
        res.redirect("/login");
    }
});
app.post("/trans", (req, res) => {
    // mehaxios.get('http://localhost:3000/api/some-protected-endpoint', {
    //   headers: { Authorization: `Bearer ${token}` }
    // })

    //{ success: true, msg: 'transfer is done' }

    const bod = {
        tel_bf: req.body.tel_bf,
        password: req.session.password,
        montant: req.body.montant,
    };

    // console.log(req.body)
    // console.log(config)
    // 'https://devmauripay.cadorim.com/api/mobile/private/transfert
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/transfert", bod, {
            headers: { Authorization: `Bearer ${req.session.token}` },
        })
        .then((response) => {
            // console.log(response.data);
            res.redirect(`/test?transs=${encodeURIComponent(response.data)}`);
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/test");
        });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/login", req.body)
        .then((response) => {
            // console.log(response.data);
            if (response.data.success) {
                req.session.isonline = true;
                req.session.token = response.data.token;
                req.session.password = req.body.password;
                req.session.save();
                //console.log("the token",response.data.token);
                res.redirect(`/test?logins=${encodeURIComponent(response.data)}`);
            } else {
                res.json({ message: "Login failed" });
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/add", (req, res) => {
    res.render("signup");
});

app.post("/addc", (req, res) => {
    console.log(req.body);
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/add", req.body)
        .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                res.json({ message: "Login successful", mag: response.data.mag });
            } else {
                res.json({ message: "Login failed" });
            }

            // res.redirect('/index');
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/login");
        });
});

app.get("/depotpage", (req, res) => {
    res.render("depot");
});

app.post("/depot", (req, res) => {
    //{ success: true, msg: 'deposit is done', montant: 5 }

    const bod = {
        code: req.body.code,
        password: req.session.password,
    };

    // console.log(req.body)
    // console.log(config)
    //         'https://devmauripay.cadorim.com/api/mobile/private/transfert
    axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/depot", bod, {
            headers: { Authorization: `Bearer ${req.session.token}` },
        })
        .then((response) => {
            console.log(response.data);
            res.redirect(`/test?depots=${encodeURIComponent(response.data)}`);
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/test");
        });
});

app.get("toretrait", (req, res) => {
    res.render("retrait");
});

app.post("/retrait", (req, res) => {
    const data = {
        code: req.body.code,
        password: req.session.password,
    };

    axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/retrait", data, {
            headers: { Authorization: `Bearer ${req.session.token}` },
        })
        .then((response) => {
            console.log(response.data);
            res.redirect(`/test?retraits=${encodeURIComponent(response.data)}`);
        })
        .catch((error) => {
            console.error(error);
            res.redirect("/test");
        });
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

app.get("/data", async (req, res) => {
    try {
        const usersData = await logintest.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/user", async (req, res) => {
    try {
        res.render("user");
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
    console.log("insterted");
    // res.redirect("/user");
    res.json({ message: 'Form submitted successfully' });
});

app.get("/all", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/data");
        const data = response2.data;

        // const results = [];

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

        // res.json({ message: 'everything done successfully' });
        // res.json();
        res.redirect("/affuser");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/affuser", async (req, res) => {
    try {
        const alldepot = await axios.get("http://localhost:3000/data");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//========================= code of depot=======================================================================

app.get("/e", async (req, res) => {
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
        // console.log(results)
        // const depots = req.query.depots ? JSON.parse(req.query.depots) : [];

        // res.render("depots", { results });
        console.log("result",results)
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
        console.log("selectedUser",selectedUser)
        const createddepots = await depots.create({
            email: selectedUser.email,
            code: code,
            repExcepte: 1,
        });

        console.log("pussy")
    res.json({"insert":"love u m7lak"})
    console.log("insterted");
    }catch(error){
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

        res.redirect("/affdepot");
        // res.redirect(`/e?depots=${encodeURIComponent(JSON.stringify(alldepotdata))}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/affdepot", async (req, res) => {
    try {
        const alldepot = await axios.get("http://localhost:3000/datadepot");
        const alldepotdata = alldepot.data;
        res.json(alldepotdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//============ code of retrait  ====================================================================================

app.get("/datatrans", async (req, res) => {
    try {
        const usersData = await logintest.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/er", async (req, res) => {
    try {
        const response2 = await axios.get("http://localhost:3000/datatrans");
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
        // console.log(results)
        // const depots = req.query.depots ? JSON.parse(req.query.depots) : [];

        res.render("retraits", { results });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

function retraitf(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/retrait", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);

    // return {response: {data: "success"}}
}

app.get("/dataretrait", async (req, res) => {
    try {
        const usersData = await retrait.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/insertretrait", async (req, res) => {
    const { email, code} = req.body;
    const selectedUser = JSON.parse(email);
    const createddepots = await retrait.create({
        email: selectedUser.email,
        code: code,
        repExcepte:1,
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
             
            const rowsUpdated = await retrait.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        res.redirect("/affretrait");
        // res.redirect(`/e?depots=${encodeURIComponent(JSON.stringify(alldepotdata))}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/affretrait", async (req, res) => {
    try {
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

    res.json({message:'Function executed successfully'});
});
// Function to generate random values and insert into the database
app.get("/randomusers", async (req, res) => {
    fillColumnsWithRandomValues(Logintests);



    res.json({ message: "Function randomusers executed successfully" });
});
app.get("/randomtransfert", async (req, res) => {
    fillColumnsWithRandomValues(transfert);

    res.json({ message: "Function randomusers executed successfully" });


});
app.get("/randomretrait", async (req, res) => {
    fillColumnsWithRandomValues(retrait);

    res.json({ message: "Function randomusers executed successfully" });


});
app.get("/randomverifications",async (req,res)=>{
    fillColumnsWithRandomValues(verifications);
    res.json({ message: "Function randomusers executed successfully" });

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

const fillColumnsWithRandomValues = async (model) => {
    try {


        const response2 = await axios.get("http://localhost:3000/datadepot");
        const data = response2.data;
        console.log(typeof data)
        // Generate a random index

        for (let index = 0; index < 10; index++) {
            // const randomIndex = Math.floor(Math.random() * data.length);
            // // Retrieve the random data
            // const loginuser = data[randomIndex].email;
            // Generate random values
            const Number = await generateRandomNumber();
            const Password = await generateRandomString(4);
            const expected = 0;

            const code = await generateRandomCode();

            if (model == Logintests) {
                // Insert random values into the database
                await model.create({
                    email: Number,
                    password: Password,
                    repExcepte: expected
                    // Assign random values to other columns as needed

                });
            }

            if (model == depots) {
                const randomuser = await generateRandomUser();
                const Expediteur = randomuser.email
                const code = await generateRandomCode();

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

        

        if (model == retrait) {
            const randomuser = await generateRandomUser();
            const Expediteur = randomuser.email
            const code = await generateRandomCode();

            await model.create({
                email: Expediteur,
                code: code,
                repExcepte: expected
            });
        }
        if(model==verifications){
            const randomuser = await generateRandomUser();
            const Expediteur = randomuser.email

            await model.create({
                email: Expediteur,
                destinataire: Expediteur,
                exceptedDestinataire:expected,
                exceptedSolde: expected   
            }); 
        }

    }
    console.log("Random values inserted successfully.")

}catch (error) {
        console.error("Error inserting random values:", error);
    }
};

//================= code of transfert  =================================================================================================




//     if(model==transfert){
//     const login =await log(tel_bf,Password)
//     await model.create({
//         email: Number,
//         password: Password,
//         repExcepte: expected
//         // Assign random values to other columns as needed
//     });
// }


app.post('/transfertImaraTest', (req, res) => {

});


function transfertapi(bod, token) {
    return axios
        .post("https://devmauripay.cadorim.com/api/mobile/private/transfert", bod, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .catch((error) => error.response.status);
}
function transfertagenceapi(bod, token) {
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
}
async function verification(bod, token) {
    return axios
        .post(
        //  "https://devmauripay.cadorim.com/api/mobile/private/verification"
            "https://devmauripay.cadorim.com/api/mobile/private/verification",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);

    // return {response: {data: "success"}}
}
// app.post("/insertTransfert", async (req, res) => {
//     const { email, destinataire, montant} = req.body;
//     const selectedUser = JSON.parse(email);
//     const createdtranfert = await transfert.create({
//         email: selectedUser.email,
//         destinataire: destinataire,
//         montant: montant,
//         repExcepte: 1,
//     });
//     res.redirect("totransfert");
//     console.log("insterted");
// });


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

            console.log("user",user)
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
            reponse=JSON.stringify(verified.data);

            console.log("verified", verified.data.indisponible ? 1:0);
            console.log("user.exceptedSolde", user.exceptedSolde);
            const verified_money = verified.data.indisponible ? 1:0
            if(verified_money==!user.exceptedSolde){
                // test = "solde insuffisant";
                if(!verified_money){
                    reponse="solde insuffisant"
                }
                // console.log("solde insuffisant");
                if(verified.data.success==user.exceptedDestinataire){
                    test="success"
                    reponse=JSON.stringify(verified.data);
                }
            }
            else{

                if(verified.data.success==user.exceptedDestinataire){
                    test="success"
                    reponse=JSON.stringify(verified.data);
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

// app.get("/totransfert", async (req, res) => {
//     try {
//         const response2 = await axios.get("http://localhost:3000/data");
//         const data = response2.data;
//         const results = [];

//         for (const user of data) {
//             if (user.repExcepte == 1) {
//                 results.push({
//                     email: user.email,
//                     password: user.password,
//                 });
//             }
//         }
//         // console.log(results)
//         // const depots = req.query.depots ? JSON.parse(req.query.depots) : [];

//         res.render("transfert", { results });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// checkbox result


//option data
app.get("/verification", async (req, res) => {
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
    console.log('resultatttttt',results);
    res.json(results)
    }catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
    }

})

// insert verification
app.post("/ahm", async (req, res) => {
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
    res.json({"insterted": "insterted"});

});

//============== trensfert code ==================================================================================================================

app.get("/datatransfert", async (req, res) => {
    try {
        const usersData = await transfert.findAll();

        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/inserttransfert", async (req, res) => {
    const { email, tel_bf, montant } = req.body;
    const selectedUser = JSON.parse(email);
    const createdtranfert = await transfert.create({
        email: selectedUser.email,
        destinataire: tel_bf,
        montant: montant,
        repExcepte: 1,
    });
    console.log("insterted");
    // res.json(req.body);
    res.json({"insterted": "insterted"});

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

            console.log("user",user)
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
            const trens= await transfertapi(bodyverify, tok);
            // const verified = await verification(bodyverify, tok);
            let updatedValues = {};

            // let test = user.Test;
            reponse=JSON.stringify(trens.data);

            // console.log("success", verified.data.success ? 1:0);
            // console.log("user.exceptedSolde", user.exceptedSolde);
            // const verified_money = verified.data.indisponible ? 1:0
            //            success
            // console.log("success", trens.data.success)
            let success = trens.data.success ? 1 : 0;
            if(success==user.repExcepte){
                test="success"
                // reponse=JSON.stringify(trens.data)
            }
            
                updatedValues.Test = test;
                updatedValues.reponse = reponse;
                        const rowsUpdated = await transfert.update(updatedValues, {
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










app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// INSERT INTO `logintests`( `email`, `password`, `repExcepte` ) VALUES ('41234567','1234',1);
