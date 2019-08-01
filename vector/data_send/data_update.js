const Influx = require('influx');
const express = require('express');
const app = express();

const influx = new Influx.InfluxDB({
    host: 'aworldbridgelabs.com',
    database: 'RayESP',
    schema: [
        {
            measurement: 'RayTest',
            fields: {
            },

            tags: [
            ]
        }
    ]
});

app.get('/espdata', function (req, res) {
    // DATA EXISTS BUT IT SAYS IT DOESN'T \\
    influx.query('SELECT "X", "Y", "Z" FROM RayTest').then
    (result => {
        res.json(result);
        console.log(result);
        //Saves the JSON as a csv file called yeet.csv
        const csvWriter = require('csv-writer').createObjectCsvWriter({
            path: 'data.csv',
            header: [
                {id: 'X', title: 'x'},
                {id: 'Y', title: 'y'},
                {id: 'Z', title: 'z'},
            ]
        });
        csvWriter
            .writeRecords(result)
            .then(()=> console.log('The CSV file was written successfully'));
    }).catch(err => {
        res.status(500).send(err.stack)
    });
}).listen('6969');
