const sql = require('mssql');
const fs = require('fs');
const express = require('express');
const app = express();
require('dotenv').config();

const config = {
    user: process.env.USER_ID,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.INITIAL_CATALOG,
    trustServerCertificate: true
}

app.use(express.static("pages"));
app.use(express.json());

app.post('/api', (req, res) => {

    sql.connect(config).then(pool => {
    
        // Stored procedure
        
        const request = pool.request();

        let Start = req.body.CoreObj["CoreStart"];
        let Increment = req.body.CoreObj["CoreIncrement"];

        Increment = Increment == 0 ? 50 : Increment;

		// Add Server_Client_None as needed
		switch (req.body.CoreObj["TransferType"]) {
				case "Delete": break;
				case "Save": request.input("UserID", 998); request.input("PostDate", new Date()); break;
				default:
					if (req.body.CoreObj["Server_Client_None"] != "None") {
						request.input("UserID", 998);
					}
					break;
		}

        if (req.body.CoreObj.TransferType == "Paging") {
            request.input("Start", Increment * Start - Increment + 1);
            request.input("Finish", Increment * Start);
		}

        Object.keys(req.body.CoreParameters).forEach(key => {
            request.input(key, req.body.CoreParameters[key]);
        })

        if(process.env.USE_DB == "TRUE")
            return request.execute(req.body.CoreObj.Database + ".dbo." + req.body.CoreObj.StoredProcedure);
        else
            return request.execute(req.body.CoreObj.StoredProcedure);

    }).then(result => {
        let data = [];
        let CoreTotal = 0;

        if(result.recordsets) {
            result.recordsets.forEach(recordset => {
                if(recordset && recordset[0] && Object.keys(recordset[0])[0] == "CoreTotal") {
                    CoreTotal = recordset[0].CoreTotal;
                    return;
                }

                data.push(recordset);
            })
        }

        let out = {
            Access: 1,
            BgImg: "Default.jpg",
            DATA: data,
            Error: "NoError",
            Identity: false,
            IdentityName: "Chase Kruse",
            Increment: 50,
            LevelID: "60",
            SecurityObjects: [],
            Speed: false,
            SpeedSQLStart: "2/7/2022 12:18:46 PM",
            SpeedSQLFinish: "2/7/2022 12:18:46 PM",
            StartPage: "../index.html",
            UserKey: "B368A498D89C314BC90CA1702FBF7B62739C6362"
        }
        
        if (req.body.CoreObj.TransferType == "Paging") {
            out.CoreTotal = CoreTotal;
        }

        res.send(out);
    }).catch(err => {
        console.log(err)
        res.send({ "Error": err.originalError.info.message });
    });
})
  
app.listen(3000);

