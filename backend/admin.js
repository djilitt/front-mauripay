// Import necessary modules
const axios = require('axios');

// Define the EndpointGenerator class
class EndpointGenerator {
    constructor(app) {
        this.app = app;
    }

    generateTestEndpointCode(endpoint, findAllFunction, fillColumnsFunction, apiFunction, keys,value) {

        // Generate the dynamic properties code
        const dynamicPropertiesCode = {}

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = eval(value[i]);
            dynamicPropertiesCode[key] = val;
        }
        // Generate the data endpoint code
        const data = `this.app.get("${endpoint}", async (req, res) => {
        try {
        const usersData = await ${findAllFunction}();
        res.json(usersData);
        } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
    });`;

        // Generate the insert endpoint code
        const insertData = `this.app.get("/insert${endpoint}", async (req, res) => {
    try {
        ${fillColumnsFunction}(${findAllFunction});
        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting random values' });
    }
    });`;

        // Generate the test endpoint code

        const testData = `this.app.get('/test${endpoint}', async (req, res) => {
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
            ${
                Object.entries(dynamicPropertiesCode)
                .map(([key, value]) => `${key}: ${value}`)
                .join(",\n")
            }
        }, response.data.token);

        updatedValues.reponse = JSON.stringify(response.data);

        const Excepte = user.repExcepte == 1 ? true : false;
        if (response.data.success == Excepte || response.data.credentials == Excepte) {
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
    });`;

        // Return the generated code
        return {
            data,
            insertData,
            testData
        };
    }
}

// Export the EndpointGenerator class
module.exports = EndpointGenerator;
