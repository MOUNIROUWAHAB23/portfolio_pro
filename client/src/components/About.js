// src/components/About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TrackVisibility from 'react-on-screen';
import 'animate.css';

export const About = () => {
  return (
    <section className="about mt-5" id="about">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <span className="eyebrow-tag">Parcours</span>
                  <h2 className="colorism">À propos de moi</h2>
                  <p className="description-banner">
                    Après un Bachelor en développement fullstack, j'ai choisi de poursuivre en
                    Master Data Engineering à Ynov Campus Paris pour me spécialiser dans la
                    construction de pipelines et d'infrastructures data.
                    <br />
                    Mes bases de développeur — code propre, rigueur, capacité à livrer des
                    applications de bout en bout — sont aujourd'hui mises au service de la donnée :
                    collecte, transformation et mise à disposition d'informations fiables à grande échelle.
                  </p>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
