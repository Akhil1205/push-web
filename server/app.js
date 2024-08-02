const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BPCdfZ4Kv7DXV7lEA-_CnYYTfIJg8xbWBW7myyheTq7W1_Uwj-o3qokIqrXI8ElDgxvuhmwLn9fFzd2T0Aoj630",
    privateKey: "7OUFcn5mY6_vTuZzeC1uZHGoEGqFc0O4LDu8W17kXA8"
}

webpush.setVapidDetails(
    'mailto:akhileswarchappidi@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
}) 

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world from node app");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})

// Public Key:
// BPCdfZ4Kv7DXV7lEA-_CnYYTfIJg8xbWBW7myyheTq7W1_Uwj-o3qokIqrXI8ElDgxvuhmwLn9fFzd2T0Aoj630

// Private Key:
// 7OUFcn5mY6_vTuZzeC1uZHGoEGqFc0O4LDu8W17kXA8