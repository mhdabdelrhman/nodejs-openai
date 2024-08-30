const express = require("express");
const { OpenAI } = require("openai");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = {
  api_Key: process.env.OPENAI_API_KEY || "",
};

const openai = new OpenAI(configuration);

app.listen(8000, () => {
  console.log(`servcer running on port: 8000`);
});

// completions api
app.post("/completions", async (req, res) => {
  try {    
    const completions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Create a SQL request to " + req.body.message,
        },
      ],
    });    
    res.send(completions.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// root api
app.get("/", async (req, res) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Server</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <div class="row">
          <div class="col-md-6 offset-md-3 text-center">
            <h1 >API Server</h1> 
            <h5 >Use the react application under client directory</h5>           
          </div>
        </div>
      </body>
      </html>
      `;
    res.set("Content-Type", "text/html");
    res.send(Buffer.from(html));
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
