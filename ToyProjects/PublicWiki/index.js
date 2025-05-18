import express from "express";
import bodyParser from "body-parser";


// Initializing the server
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
const port = 3000;
const webContent = {
    section1: {
        section: "section1",
        isHomepage: false,
        contentExists: false,
        content: ""
    },
    section2: {
        section: "section2",
        isHomepage: false,
        contentExists: false,
        content: ""
    },
    section3: {
        section: "section3",
        isHomepage: false,
        contentExists: false,
        content: ""
    },
    section4: {
        section: "section4",
        isHomepage: false,
        contentExists: false,
        content: ""
    },
    section5: {
        section: "section5",
        isHomepage: false,
        contentExists: false,
        content: ""
    }
};

app.get("/", (req, res) => {
    res.render("index.ejs", {isHomepage: true});
});

app.get("/section1", (req, res) => {
    res.render("index.ejs", webContent.section1);
});

app.get("/section2", (req, res) => {
    res.render("index.ejs", webContent.section2);
});

app.get("/section3", (req, res) => {
    res.render("index.ejs", webContent.section3);
});

app.get("/section4", (req, res) => {
    res.render("index.ejs", webContent.section4);
});

app.get("/section5", (req, res) => {
    res.render("index.ejs", webContent.section5);
});

app.post("/editSubmitted", (req, res) => {
    webContent[req.body.section].content = req.body.newText;
    webContent[req.body.section].contentExists = true;
    console.log("Edit Successful!");
    res.sendStatus(200);
})

app.post("/resetExecuted", (req, res) => {
    webContent[req.body.section].content = "";
    webContent[req.body.section].contentExists = false;
    console.log("Content removed.");
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log("Running on port 3000.");
});