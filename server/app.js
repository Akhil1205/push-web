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

const subDatabase = [];

const options = {
    proxy:'Uniaccess',
    // topic :'Uniacccess',
    // agent :'Uniaccess'
}


app.post("/save-subscription", (req, res) => {
    try {
        const subscription = req.body;
        // Basic validation (expand as needed)
        subDatabase.push(subscription);
        console.log("New subscription added:", subscription); 
        res.json({ status: "Success", message: "Subscription saved!" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "An error occurred" });
    }
});

app.get("/send-notification", (req, res) => {
    if (subDatabase.length === 0) {
        return res.status(400).json({ status: "Error", message: "No subscriptions found" });
    }
    const notificationPayload = JSON.stringify({ title: "Hello World", body: "The Kelsa request has been approved" });

    webpush.sendNotification(subDatabase[0], notificationPayload)
        .then(() => {
            res.json({ status: "Success", message: "Message sent to push service" });
        })
        .catch(error => {
            res.status(500).json({ status: "Error", message: error});
        });
});

app.listen(port, () => {
    console.log("Server running on port 3000!");
})

// Public Key:
// BPCdfZ4Kv7DXV7lEA-_CnYYTfIJg8xbWBW7myyheTq7W1_Uwj-o3qokIqrXI8ElDgxvuhmwLn9fFzd2T0Aoj630

// Private Key:
// 7OUFcn5mY6_vTuZzeC1uZHGoEGqFc0O4LDu8W17kXA8