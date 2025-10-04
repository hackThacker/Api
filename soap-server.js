// soap-server.js (Read-Only)
const express = require('express');
const bodyParser = require('body-parser');
const xmljs = require('xml-js');
const cors = require('cors');
const app = express();
const port = 1000;

const tasks = [
    { id: 1, title: 'Learn about the SOAP Envelope', completed: true },
    { id: 2, title: 'See how verbose XML is', completed: false },
];

app.use(cors());
app.use(bodyParser.text({ type: 'text/xml' }));

app.post('/tasks', (req, res) => {
    console.log('SOAP server: Read Request received!');
    
    // This server only knows how to respond to a read request.
    // In a real-world scenario, you would parse the req.body XML
    // to determine which action the client wants to perform.
    
    const soapResponseObject = {
        'soap:Envelope': {
            _attributes: { 'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/' },
            'soap:Body': {
                GetAllTasksResponse: {
                    GetAllTasksResult: {
                        Task: tasks.map(t => ({
                            ID: { _text: t.id },
                            Title: { _text: t.title },
                            Completed: { _text: t.completed }
                        }))
                    }
                }
            }
        }
    };
    
    const xmlResponse = xmljs.js2xml(soapResponseObject, { compact: true, spaces: 4 });
    
    res.header('Content-Type', 'text/xml');
    res.send(xmlResponse);
});

app.listen(port, () => console.log(`✅ SOAP Read-Only server ON at http://localhost:${port}`));