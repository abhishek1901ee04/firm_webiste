const config = require('config');

// Access your configuration values
const accountSid = config.get('accountSid');
const authToken = config.get('authToken');
const twilioPhoneNumber = config.get('twilioPhoneNumber');
const port = config.get('port');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();

const client = twilio(accountSid,authToken);

app.use(cors());
// using the body-parsser middleware to parse the json data
app.use(bodyParser.json());

// Handle incoming sms request 
app.post("/send-sms",async(req,res)=>{
    const {to,body} = req.body;
    try {
        const message = await client.messages.create({
          body: body,
          from: twilioPhoneNumber,
          to: to,
        });
    
        console.log('SMS sent successfully:', message.sid);
        res.status(200).json({ success: true, message: 'SMS sent successfully' });
      } catch (error) {
        console.error('Error sending SMS:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send SMS' });
      }
});
app.get("/",(req,res)=>{
    res.send("hello, Node.js");
});
// start the server

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
});