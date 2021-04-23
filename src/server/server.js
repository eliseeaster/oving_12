const express = require("express")

const path = require("path");

const app = express();

const users = [
    {
        "id": "1",
        "name": "Elise",
        "email": "elise@gmail.com",
        "alder": 23
    },
    {
        "id": "2",
        "name": "Tina",
        "email": "tina@gmail.com",
        "alder": 23
    },
    {
        "id": "1",
        "name": "Fanny",
        "email": "Fanny@gmail.com",
        "alder": 22
    }
]

app.get("/api/users", (req, res) =>{
    res.json(users)

})

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")))

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"))

});

app.listen(3000, () => {
    console.log("started on http://localhost:3000");
})