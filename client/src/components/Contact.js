import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Envoyer");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Envoi...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });
      const result = await response.json();
      if (response.ok && result.code === 200) {
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: "Message envoyé avec succès !" });
      } else {
        setStatus({ success: false, message: result.message || "Une erreur est survenue, veuillez réessayer." });
      }
    } catch (error) {
      setStatus({ success: false, message: "Une erreur est survenue, veuillez réessayer." });
    } finally {
      setButtonText("Envoyer");
    }
  };

  return (
    <section className="contact mt-5" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeInLeft" : ""}>
                  <img src={contactImg} alt="Contact" className="contact-image" />
                </div>
              }
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={`contact-form-wrapper shadow-lg p-4 ${isVisible ? "animate__animated animate__fadeInRight" : ""}`}>
                  <h2 className="mb-4 ">Contactez-moi</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <Row>
                      <Col sm={6} className="px-1 mb-3">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="Prénom"
                          onChange={(e) => onFormUpdate("firstName", e.target.value)}
                          required
                        />
                      </Col>
                      <Col sm={6} className="px-1 mb-3">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Nom"
                          onChange={(e) => onFormUpdate("lastName", e.target.value)}
                          required
                        />
                      </Col>
                      <Col sm={6} className="px-1 mb-3">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email"
                          onChange={(e) => onFormUpdate("email", e.target.value)}
                          required
                        />
                      </Col>
                      <Col sm={6} className="px-1 mb-3">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Téléphone"
                          onChange={(e) => onFormUpdate("phone", e.target.value)}
                        />
                      </Col>
                      <Col sm={12} className="px-1 mb-3">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Votre message"
                          onChange={(e) => onFormUpdate("message", e.target.value)}
                          required
                        ></textarea>
                      </Col>
                      <Col sm={12} className="px-1 text-center">
                        <button type="submit" className="btn btn-primary navbar-contact-btn" style={{ minWidth: 160 }}>
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                      {status.message && (
                        <Col sm={12} className="mt-3">
                          <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;