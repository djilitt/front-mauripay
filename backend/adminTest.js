// ========>>>>>> electronicsAdd done NOT  YET
//  ! NOTE YET

if (model == getFee) {
    await model.create({
        title_fr:user.title_fr,
                title_ar:user.title_ar
    });
    return model
}
async function getAllElectronics(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/electronic/get/all",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response);
}

async function electronicsAddApi(bod, token) {
    return axios
        .post(

            "https://devmauripay.cadorim.com/api/backend/private/electronic/add",
            bod,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => response)
        .catch((error) => error.response.status);
}

app.get("/electronicsAdd", async (req, res) => {
    try {
        const usersData = await electronicsAdd.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertelectronicsAdd", async (req, res) => {
    try {
        fillColumnsWithRandomValues(electronicsAdd);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testelectronicsAdd', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/electronicsAdd");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await electronicsAddApi({
                title_fr:user.title_fr,
                title_ar:user.title_ar
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

            const rowsUpdated = await electronicsAdd.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allelectronicsAdd = await axios.get("http://localhost:3000/electronicsAdd");
        const allelectronicsAdddata = allelectronicsAdd.data;
        res.json(allelectronicsAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})
// ========>>>>>> elecAdd done NOT YET
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

async function elecAddApi(bod, token) {
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

app.get("/elecAdd", async (req, res) => {
    try {
        const usersData = await elecAdd.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/insertelecAdd", async (req, res) => {
    try {
        fillColumnsWithRandomValues(elecAdd);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testelecAdd', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/elecAdd");
        const data = response2.data;

        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await elecAddApi({
                value: user.value,
                wording: user.wording,
                amount: user.amount,
                code: user.code,
                id_type: user.id_type,
                file:null
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

            const rowsUpdated = await elecAdd.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const allelecAdd = await axios.get("http://localhost:3000/elecAdd");
        const allelecAdddata = allelecAdd.data;
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
// ========>>>>>> getAccount done STILL WORKING ON IT


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
async function getAllVirement(token) {
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
async function VirementApi(bod, token) {
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
app.get("/Virement", async (req, res) => {
    try {
        const usersData = await Virements.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

    
app.get("/insertVirement", async (req, res) => {
    try {
        fillColumnsWithRandomValues(Virement);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testVirement', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/Virement");
        const data = response2.data;
        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await VirementApi({
               idR:user.idR,
               fee:user.fee
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

            const rowsUpdated = await Virements.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const VirementAdd = await axios.get("http://localhost:3000/Virement");
        const VirementAdddata = VirementAdd.data;
        res.json(VirementAdddata);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})
// ========>>>>>> annulerVirement done
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
        const usersData = await Virements.findAll();
        res.json(usersData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/insertannulerVirement", async (req, res) => {
    try {
        fillColumnsWithRandomValues(annulerVirement);
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
});

app.get('/testannulerVirement', async (req, res) => {

    try {
        const response2 = await axios.get("http://localhost:3000/annulerVirement");
        const data = response2.data;
        for (const user of data) {

            const pass = await loginAdmin.findOne();

            const response = await logAdmin({
                email: pass.email,
                password: pass.password,
            });

            const updatedValues = {};

            const api = await annulerVirementApi({
               idR:user.idR,
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

            const rowsUpdated = await annulerVirements.update(updatedValues, {
                where: { id: user.id },
            });

            if (rowsUpdated > 0) {
                console.log("rowsUpdated", user);
            } else {
                console.log("Record not found for user:", user);
            }
        }

        const annulerVirementAdd = await axios.get("http://localhost:3000/annulerVirement");
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