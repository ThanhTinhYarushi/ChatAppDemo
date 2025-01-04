const mongoose = require("mongoose");

const url = `mongodb+srv://chatAppAdmin:BaConDomDom@chatapp.omdbq.mongodb.net/?retryWrites=true&w=majority&appName=ChatApp`;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connect to DB"))
    .catch((e) => console.log("Error", e));
