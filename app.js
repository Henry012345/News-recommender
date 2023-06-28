// const express = require("express");
// const connectToDB = require("./mongodb");
// const cors = require("cors");
// const userModel = require("./models/users.model");
// const app = express();
// const port = process.env.PORT || 4000;
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app.get("/signup", (req, res) => {
//   res.json({ status: "SUCCESSFUL", data: "henry" });
// });
// app.get("/", (req, res) => {
//   res.json("login");
// });

// app.post("/signup", async (req, res) => {
//   const data = {
//     name: req.body.name,
//     age: req.body.age,
//     password: req.body.password,
//     email: req.body.email,
//     selectedCategories: req.body.selectedCategories,
//   };

//   try {
//     const existingUser = await userModel.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ status: "UNSUCCESSFUL", message: "User already exists", data: null });
//     }

//     const user = await userModel.create(data);
//     return res.status(201).json({ status: "SUCCESSFUL", message: "User created", data: user });
//   } catch (e) {
//     return res.status(500).json({ status: "UNSUCCESSFUL", message: `Something went wrong: ${e.message}`, data: null });
//   }
// });


// app.post("/login", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) return res.status(400).json({ status: "UNSUCCESSFUL", message: "Invalid Credentials", data: null });
//     if (user.password === req.body.password) {
//       return res.status(201).json({ status: "SUCCESSFUL", message: "User found", data: user });
//     } else {
//       return res.status(400).json({ status: "UNSUCCESSFUL", message: "Invalid Credentials", data: null });
//     }
//   } catch (e) {
//     return res.status(500).json({ status: "UNSUCCESSFUL", message: `something went wrong: ${e.message}`, data: null });
//   }
// });

// app.listen(port, () => {
//   connectToDB();
//   console.log("port connected");
// });

const express = require("express");
const connectToDB = require("./mongodb");
const cors = require("cors");
const userModel = require("./models/users.model");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get("/signup", (req, res) => {
  res.json({ status: "SUCCESSFUL", data: "henry" });
});

app.get("/", (req, res) => {
  res.json("login");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    age: req.body.age,
    password: req.body.password,
    email: req.body.email,
    selectedCategories: req.body.selectedCategories,
  };

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ status: "UNSUCCESSFUL", message: "User already exists", data: null });
    }

    const user = await userModel.create(data);
    return res.status(201).json({ status: "SUCCESSFUL", message: "User created", data: user });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "UNSUCCESSFUL", message: `Something went wrong: ${e.message}`, data: null });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ status: "UNSUCCESSFUL", message: "Invalid Credentials", data: null });
    if (user.password === req.body.password) {
      return res.status(201).json({ status: "SUCCESSFUL", message: "User found", data: user });
    } else {
      return res.status(400).json({ status: "UNSUCCESSFUL", message: "Invalid Credentials", data: null });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ status: "UNSUCCESSFUL", message: `something went wrong: ${e.message}`, data: null });
  }
});

app.post("/articles", async (req, res) => {
  try {
    const interest = req.body.interest;

    // Make a request to the API with the user's interest
    const response = await axios.post(" http://127.0.0.1:5000", { interest });

    // Handle the response from the API
    const articles = response.data;
    return res.status(200).json({ status: "SUCCESSFUL", message: "Articles retrieved", data: articles });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "UNSUCCESSFUL", message: `Something went wrong: ${e.message}`, data: null });
  }
});

app.listen(port, () => {
  connectToDB();
  console.log("port connected");
});
