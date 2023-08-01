// ========>>>>>> electronicsAdd done NOT  YET
//  ! NOTE YET

if (model == getFee) {
    await model.create({
        value: user.value,
        wording: user.wording,
        amount: user.amount,
        code: user.code,
        id_type: user.id_type,
        file:null
    });
    return model
}

async function electronicCategoryAddApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/electronic/category_add",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

app.get("/electronicCategoryAdd", async (req, res) => {
    try {
        const usersData = await electronicCategoryAdd.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertRelectronicCategoryAdd", async (req, res) => {
    try {
        fillColumnsWithRandomValues(electronicCategoryAdd);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testelectronicCategoryAdd', async (req, res) => {

    try {
        const dataEndpoint = uri+"/electronicCategoryAdd";
        const response = await axios.get(dataEndpoint);
        const data = response.data;

        const adminPass = await loginAdmin.findOne();
        const adminResponse = await logAdmin({
            email: adminPass.email,
            password: adminPass.password,
        });

        for (const user of data) {

            const updatedValues = {};

            // {
            //     value: 10,
            //     wording: "Uo",
            //     id_type: 1,
            //     amount: 100,
            //     code: "dfvgf"
            // }

            const api = await electronicCategoryAddApi({
                value: user.value,
                wording: user.wording,
                amount: user.amount,
                code: user.code,
                id_type: user.id_type
                
            }, adminResponse?.data?.token)

            updatedValues.reponse = JSON.stringify(api?.data);

            const expectedSuccess = user.repExcepte === true;
            const actualSuccess = api?.data?.success ? true : false;
            console.log("Actual Success:", actualSuccess);
            console.log("Expected Success:", expectedSuccess);

            updatedValues.Test = actualSuccess === expectedSuccess ? "success" : "failed";

            const rowsUpdated = await electronicAdd.update(updatedValues, {
                where: { id: user.id },
            });


            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allelecAdd = await axios.get(dataEndpoint);
        const allelecAdddata = allelecAdd?.data;
        res.json(allelecAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

// ========>>>>>> update-account done STILL WORKING ON IT

async function updateAccountApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/update-account",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

app.get("/updateAccount", async (req, res) => {
    try {
        const usersData = await updateAccounts.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertupdateAccount", async (req, res) => {
    try {
        fillColumnsWithRandomValues(updateAccount);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testupdateAccount', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/updateAccount");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await updateAccountApi({
                id:user.id,
                account_title:user.account_title,
                account_number:user.account_number,
                account_type:user.account_type,
                solde: user.solde
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

            const rowsUpdated = await updateAccounts.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const updateAccountAdd = await axios.get("http://localhost:3000/updateAccount");
        const updateAccountdata = updateAccountAdd.data;
        res.json(updateAccountdata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})
// ========>>>>>> addAccount done STILL WORKING ON IT

async function addAccountApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/add-account",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

app.get("/addAccount", async (req, res) => {
    try {
        const usersData = await addAccounts.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertaddAccount", async (req, res) => {
    try {
        fillColumnsWithRandomValues(addAccount);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testaddAccount', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/addAccount");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: "koko@gmail.com",
                password: "12344321",
            });

            const updatedValues = {};

            const api = await addAccountApi({
                account_title:user.account_title,
                account_number:user.account_number,
                account_type:user.account_type,
                solde: user.solde
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

            const rowsUpdated = await addAccounts.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const addAccountAdd = await axios.get("http://localhost:3000/addAccount");
        const addAccountAdddata = addAccountAdd.data;
        res.json(addAccountAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

async function getAllAccount(token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/getAllAccount",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function getAccountApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/getAccount",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

app.get("/getAccount", async (req, res) => {
    try {
        const usersData = await getAccounts.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertgetAccount", async (req, res) => {
    try {
        fillColumnsWithRandomValues(getAccount);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testgetAccount', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/getAccount");
        const data = response2.data;
        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await getAccountApi({
                account_title:user.account_title,
                account_number:user.account_number,
                account_type:user.account_type,
                solde: user.solde
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

            const rowsUpdated = await getAccounts.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const getAccountAdd = await axios.get("http://localhost:3000/getAccount");
        const getAccountAdddata = getAccountAdd.data;
        res.json(getAccountAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})
// ========>>>>>> virement done  
//  ! NOTE YET
async function getAllVirements(token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/get-all-virement",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function virementApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/getAccount",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

app.get("/virement", async (req, res) => {
    try {
        const usersData = await virements.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertRvirement", async (req, res) => {
    try {
        fillColumnsWithRandomValues(virement);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testRvirement', async (req, res) => {

    try {
        const dataEndpoint = uri+"/virement";
        const response = await axios.get(dataEndpoint);
        const data = response.data;

        const adminPass = await loginAdmin.findOne();
        const adminResponse = await logAdmin({
            email: adminPass.email,
            password: adminPass.password,
        });
        
        for (const user of data) {

            const updatedValues = {};

            const api = await virementApi({
                id:user.idR,
                fee:user.fee
            }, adminResponse?.data?.token)

            updatedValues.reponse = JSON.stringify(api?.data);

            const expectedSuccess = user.repExcepte === true;
            const actualSuccess = api?.data?.success ? true : false;

            console.log("Actual Success:", actualSuccess);
            console.log("Expected Success:", expectedSuccess);

            updatedValues.Test = actualSuccess === expectedSuccess ? "success" : "failed";

            const rowsUpdated = await electronicAdd.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const VirementAdd = await axios.get(dataEndpoint);
        const VirementAdddata = VirementAdd.data;
        res.json(VirementAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//  ! NOTE YET

async function annulerVirementApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/annulerVirement",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

app.get("/annulerVirement", async (req, res) => {
    try {
        const usersData = await annulerVirement.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertRannulerVirement", async (req, res) => {
    try {
        fillColumnsWithRandomValues(annulerVirement);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testannulerVirement', async (req, res) => {

    try {
        const dataEndpoint = uri+"/annulerVirement";
        const response = await axios.get(dataEndpoint);
        const data = response.data;

        const adminPass = await loginAdmin.findOne();

        const adminResponse = await logAdmin({
            email: adminPass.email,
            password: adminPass.password,
        });

        for (const user of data) {
            const updatedValues = {};

            const api = await annulerVirementApi({
                id:user.idR,
            }, adminResponse?.data?.token)

            updatedValues.reponse = JSON.stringify(api?.data);

            const expectedSuccess = user.repExcepte === true;
            const actualSuccess = api?.data?.success ? true : false;

            console.log("Actual Success:", actualSuccess);
            console.log("Expected Success:", expectedSuccess);

            updatedValues.Test = actualSuccess === expectedSuccess ? "success" : "failed";

            const rowsUpdated = await annulerVirement.update(updatedValues, {
                where: { id: user.id },
            });


            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const annulerVirementAdd = await axios.get(dataEndpoint);
        const annulerVirementAdddata =annulerVirementAdd.data;
        res.json(annulerVirementAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})

//electronics cards endpoints
// 'POST /electronic/category_add':'ElectronicController.add_type',
// 'GET /electronic/get/type/cards/:id':'ElectronicController.get_cards',
// 'POST /electronic/add':'ElectronicController.add',
// 'GET /electronic/get/all':'ElectronicController.getAll',
// 'GET /electronic/get/status/:id':'ElectronicController.changeStatus',
// 'POST /electronic/search':'ElectronicController.getDetails',


app.get('/testcodes', async (req, res) => {
    try {
        const response2 = await axios.get(uri+"/codes");
        const data = response2.data;

        if (data.length == 0) {
            codeRand();
        }

        for (const phone of data) {

            let updatedValues = {};

            const pass = await logintest.findOne({
                attributes: ["password"],
                where: {
                    email: phone.telephone,
                },
            });

            let test = "failed";

            let password = pass?.dataValues?.password;

            const rep = await log({
                email: phone.telephone,
                password: password,
            });

            const tok_user = rep?.data?.token;

            const bodyverify = {
                code: phone.code,
                telephone: phone.telephone,
            };

            const bodyforgot = {
                nni: phone.nni,
                telephone: phone.telephone,
            };
            
            const fapi = await forgotApi(bodyforgot, tok_user);

            const verified = await codeApi(bodyverify, fapi?.data?.token);

            updatedValues.reponse = JSON.stringify(verified?.data);

            // updatedValues.Test = test;

            const actualSuccess = verified?.data?.success ? true : false;

            const expectedSuccess = phone?.repExcepte === true;

            updatedValues.Test = actualSuccess === expectedSuccess ? "success" : "failed";

            if(!updatedValues.reponse){
                updatedValues.reponse="nomber n'existe pas";
            }

            const rowsUpdated = await codes.update(updatedValues, {
                where: {
                    id: phone.id,
                },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated");
            } else {
                console.log("Record not found for phone:");
            }
        }

        const responseAfterUpdate = await axios.get(uri+"/codes");
        const dataAfterUpdate = responseAfterUpdate.data;
        res.json(dataAfterUpdate);

    } catch (error) {
        // Handle the error appropriately
        console.error("Error during 'codeTest':", error);
        res.status(500).json({
            error: "An error occurred during 'codeTest'.",
        });
    }
});