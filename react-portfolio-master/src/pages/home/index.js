//import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export const Home = () => {

  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the date input
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const year = date.getFullYear();

    if (day < 1 || day > 31 || month < 1 || month > 12) {
        alert('Please enter a valid date.');
        return;
    }

    // Calculate the day of the week the user was born
    const akanDay = calculateAkanDay(year, month, day);

    // Determine the Akan name based on the user's gender and the calculated day
    const akanName = getAkanName(gender, akanDay);

    // Display the result
    setResult(`Your Akan name is ${akanName}`);
}; 

 // Function to calculate the Akan day of the week
 function calculateAkanDay(year, month, day) {
  const century = Math.floor(year / 100);
  const yearPart = year % 100;

  const akanDay = (Math.floor(century / 4) - 2 * century - 1 + Math.floor((5 * yearPart) / 4) + Math.floor((26 * (month + 1)) / 10) + day) % 7;

  // Convert negative days to positive
  return akanDay < 0 ? akanDay + 7 : akanDay;
}

// Function to determine the Akan name based on gender and day of the week
function getAkanName(gender, akanDay) {
  const maleAkanNames = ['Kwasi', 'Kwadwo', 'Kwabena', 'Kwaku', 'Yaw', 'Kofi', 'Kwame'];
  const femaleAkanNames = ['Akosua', 'Adwoa', 'Abenaa', 'Akua', 'Yaa', 'Afua', 'Ama'];

  if (gender === 'male') {
      return maleAkanNames[akanDay];
  } else {
      return femaleAkanNames[akanDay];
  }
}

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
              <br></br><p></p>

                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>

              
        <div className="mb-5 mt-3 pt-md-3">
            <h1>Akan Name Calculator</h1>
            <p>Enter your birthday and gender to calculate your Akan name.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
<br></br><p></p>
                <label  htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <br></br>
                <p></p>
                <button className="ac_btn btn" type="submit">Submit</button>
            </form>

            {result && (
                <div id="result" className="result">
                    {result}
                </div>
            )}
        </div>
    <br></br>






                <div className="intro_btn-action pb-5">
                <a href="https://tonyoloo.co.ke" className="text_2" target="_blank" rel="noopener noreferrer">

                    <div id="button_p" className="ac_btn btn ">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </a>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
