import React, { useState } from "react";
import { signUp } from "../utils";
import { useNavigate } from "react-router-dom";

import "../index.css";

const SignUp = ({ setSelectedCategory }) => {
  const [fname, setFname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const newsCategories = [
    "POLITICS",
    "Business/Economy",
    "Technology/Science",
    "Entertainment/Celebrities",
    "SPORTS",
    "Health/Wellness",
    "Environment/Climate",
    "Education",
    "Crime/Law Enforcement",
    "World/International News",
    "Local/Regional News",
    "Opinions/Editorials",
    "Lifestyle/Fashion",
    "ENTERTAINMEN",
    "Arts/Culture",
    "Weather/Disasters",
    "Religion/Spirituality",
    "Social Issues",
    "Human Interest Stories",
    "WELLNESS",
    "World",
    "U.S.",
    "STYLE & BEAUTY",
    "Food",
    "Beauty",
    "WORLD NEWS",
    "Parenting",
    "Law",
    "War",
    "Peace",
    "Poverty",
    "PARENTING",
    "FOOD & DRINK",
    "Innovation",
    "BUSINESS",
    "TRAVEL",
    "Finance",
    "Real estate",
    "Banking",
    "Insurance",
    "Healthcare",
    "Medicine",
    "Research",
    "Culture",
  ];

  const steps = [newsCategories.slice(0, 10), newsCategories.slice(10, 20), newsCategories.slice(20)];

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, age, email, password, selectedCategories);
    // Handle the form submission
  };

  

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: fname,
      age,
      email,
      password,
      selectedCategories: selectedCategories.join(","),
    };
    const response = await signUp(payload);
    if (response.status === "SUCCESSFUL") {
      // Handle successful signup
      setSelectedCategory(selectedCategories);
      alert(selectedCategories);
      console.log(selectedCategories);
      navigate("/homepage");
    }
    console.log(response.message);
  };

  const renderStep = () => {
    const stepCategories = steps[currentStep - 1];

    return (
      <div className="Multi-form">
        {stepCategories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            {category}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-inner" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Full name</label>
          <input
            name="name"
            type="text"
            id="fname"
            className="form-control"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlfor="languages">Age-range: </label>
          <select name="age" type="text" className="form-control" onChange={(e) => setAge(e.target.value)} value={age}>
            <option value="" disabled selected>
              Select age range
            </option>
            <option value="5-13">5-13</option>
            <option value="14-17">14-17</option>
            <option value="18 and above">18 and above</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {currentStep < steps.length && (
          <div>
            {renderStep()}
            <button onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentStep === steps.length}>
              Next
            </button>
          </div>
        )}
        {currentStep === steps.length && (
          <div>
            <h4>Selected Categories:</h4>
            <ul>
              {selectedCategories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <button type="submit" className="btn btn-primary" onClick={handleSignupSubmit}>
              Register
            </button>
          </div>
        )}
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
