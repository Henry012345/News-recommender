const mongoose = require("mongoose");
//    "mongodb+srv://Somto:somtohenry2001@cluster0.gp6k6j2.mongodb.net/";

const connectToDB = () => {
  const mongourl = "mongodb://127.0.0.1:27017/NewsRecommender";
  mongoose
    .connect(mongourl, { useNewUrlParser: true })
    .then(() => {
      console.log("connected to database");
    })
    .catch((e) => console.log(e));
};

module.exports = connectToDB;
