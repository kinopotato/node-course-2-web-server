const express = require("express");
const hbs = require("hbs");
const fs = require("fs");


const app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs");


app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if(err) {
      console.log("unable to connect to server.log")
    }
  })
  next();
})

//comment out during normal operation
// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "maintenance page"
//   })
// })

//placed here to make sure app.use maintenance page runs first to keep files private if we want
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear()
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
})

app.get("/", (req, res) => {
    // res.send("<h1>hello express!</h1>");
  res.render("home.hbs", {
    pageTitle: "home page",
    welcomeMes: "welcome home!"
  });
})

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "about page"
  });
})

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "error occured" 
  });
})

app.listen(3000, () => {
  console.log("server is up at port 3000");
});