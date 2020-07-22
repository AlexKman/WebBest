import React from "react";
import Navbar from "react-bootstrap/Navbar";
import * as ReactBootStrap from "react-bootstrap";
import { Router, Link } from "@reach/router";
import "./App.css";
import Footer from "./Footer.js";

// Here, you will need to enter your own path. The first is if you are working with built code, aka on your
// web host. The second is if you are working locally, on your own PC.
const serverURL =
  process.env.NODE_ENV === "production"
    ? "ajax.php"
    : "http://localhost:80/ajax.php";

function App() {
  // Using React.useState isn't working here like I expect it to; entering any text will cause it to
  // loose focus on the input box that was selected. Not good! I suspect it has something to do with the
  // page content being in separate functions... not sure how to directly alter that. But we can simply
  // drop our content into variables, and then reference those when we need it.
  let otherContact = { name: "", email: "", message: "" };

  function SubmitContactForm() {
    console.log(otherContact);
    fetch(serverURL, {
      method: "post",
      mode: "cors",
      // CORS is primarily responsible for ensuring that the responding server grants this script access to its data
      // This isn't necessary when the code is running on the same server. However, Create-React-App essentially sets
      // up its own server, so this is needed during testing. The client code doesn't mind seeing CORS mode responses,
      // so long as the server authorizes data
      headers: new Headers({
        "Content-Type": "text/plain;charset=UTF-8"
      }),
      body: JSON.stringify(otherContact)
    })
      .then(response => {
        return response.text().then(text => {
          try {
            return JSON.parse(text);
          } catch (error) {
            throw new Error("Parsing failed. Server said: " + text);
          }
        });
      })
      .then(data => {
        // Show the response here
        console.log(data);
      });
  }

  const Home = () => (
    <section id="home">
      <div id="div">
        {" "}
        He is Britain's most powerful and influential black journalist, but
        Vogue editor Edward Enninful has revealed that he was a victim of
        'racial profiling' at his own office. Enninful was refused entry to
        Vogue House in Mayfair by a security guard who apparently failed to
        recognise him. To add insult to injury, the guard told Enninful to use
        the tradesmen's entrance at the rear of the building.
      </div>
      <div id="div">
        He is Britain's most powerful and influential black journalist, but
        Vogue editor Edward Enninful has revealed that he was a victim of
        'racial profiling' at his own office. Enninful was refused entry to
        Vogue House in Mayfair by a security guard who apparently failed to
        recognise him. To add insult to injury, the guard told Enninful to use
        the tradesmen's entrance at the rear of the building.
      </div>
    </section>
  );
  const Dash = () => (
    <section className="container">
      <div className="App">
        <form id="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={event => {
                otherContact = { ...otherContact, name: event.target.value };
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={event => {
                otherContact = { ...otherContact, email: event.target.value };
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={event => {
                otherContact = { ...otherContact, message: event.target.value };
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => SubmitContactForm()}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
  //let state = { name: "", email: "", message: "" };
  return (
    <div>
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="mr-auto">
              <Link id="link" to="/">
                Home
              </Link>
              <Link id="link" to="dashboard">
                Contact form
              </Link>
            </ReactBootStrap.Nav>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <Home path="/" />
          <Dash path="dashboard" />
        </Router>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
