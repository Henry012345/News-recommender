//import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import HomePage from "./Pages/Homepage";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { NewsContextProvider } from "./NewsContext";
import News from "./components/News";

function App() {
  // const [selectedCat, setSelectedCat] = useState({ interest: ["sports", "entertainment"] });
  const [selectedCat, setSelectedCat] = useState(null);
  return (
    <>
      <NewsContextProvider>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>
                  News Recommender
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Sign up
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to={"/homepage"}>
                        HomePage
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div>
              {!selectedCat ? (
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/sign-in" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp setSelectedCategory={setSelectedCat} />} />
                  {/* <Route path="/homepage" element={<HomePage selectedCategory={selectedCat} />} /> */}
                  {/* <Route path="/news" element={<News selectedCategory={selectedCat} />} /> */}
                </Routes>
              ) : (
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/sign-in" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp setSelectedCategory={setSelectedCat} />} />
                  <Route path="/homepage" element={<HomePage selectedCategory={selectedCat} />} />
                  <Route path="/news" element={<News selectedCategory={selectedCat} />} />
                </Routes>
              )}
            </div>
          </div>
        </Router>
      </NewsContextProvider>
    </>
  );
}
export default App;
