import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { Database, GraphUp, Robot } from "react-bootstrap-icons";
import { ProjectCard } from "./ProjectCard";
import { DataProjectCard } from "./DataProjectCard";
import projImg1 from "../assets/img/Disk-cleaner.png";
import projImg2 from "../assets/img/E-maillot.png";
import projImg3 from "../assets/img/AR-stage.png";
import projImg4 from "../assets/img/Arimayi-stage.png";
import projImg5 from "../assets/img/Tv-shows.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import eventman from "../assets/img/evenTMan.png";
import webshows from "../assets/img/web_shows.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

const dataProjects = [
  {
    icon: <Database size={26} />,
    title: "Plateforme Open Data d'hébergements touristiques",
    role: "Data Engineer",
    context: "Projet de soutenance en équipe de 5 — Paris Ynov Campus",
    period: "Avril – Mai 2026",
    description:
      "Pipelines ETL agrégeant plus de 10 sources publiques hétérogènes pour constituer un référentiel unique exploitable. Contrôles qualité automatisés et orchestration Airflow quotidienne, alimentant un entrepôt PostgreSQL et des tableaux de bord Metabase.",
    result: "45 000+ enregistrements consolidés · rafraîchis chaque nuit sans intervention",
    stack: ["Python", "SQL", "PostgreSQL", "Airflow", "Metabase", "Docker Compose"],
  },
  {
    icon: <GraphUp size={26} />,
    title: "Prédiction du diabète de type 2",
    role: "Machine Learning",
    context: "Projet académique — Paris Ynov Campus",
    period: "Octobre 2025 – Janvier 2026",
    description:
      "Analyse exploratoire complète du jeu de données, comparaison de modèles supervisés sur le recall et le F1-score, puis application Streamlit pour rendre le modèle interprétable sans lire le code.",
    result: "Plusieurs modèles comparés sur des métriques explicites · application interactive livrée",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
  },
  {
    icon: <Robot size={26} />,
    title: "Copilote de Candidature",
    role: "Agent IA multi-outils (RAG + LLM local)",
    context: "Projet personnel",
    period: "2026",
    description:
      "Workflow d'agents sous LangGraph (prompts structurés, routage, outils) pour enchaîner recherche et rédaction sans supervision. RAG sur ChromaDB avec modèle exécuté en local via Ollama, pour qu'aucune donnée personnelle ne quitte la machine.",
    result: "15 à 30 minutes gagnées par candidature · code public",
    stack: ["Python", "LangGraph", "Ollama", "ChromaDB", "APIs REST", "Docker"],
  },
];

const codeProjects = [
  {
    title: "Reeway-Backend python(django) developper",
    description: "Swagger documentation avec Django, API development, tests unitaires.",
    imgUrl: projImg4,
    category: "web",
    onClick: () => handleProjectClick("reeway-backend"),
  },
  {
    title: "AugustinRuinard.com",
    description: "Site vitrine pour un établissement supérieur.",
    imgUrl: projImg3,
    category: "web",
    onClick: () => handleProjectClick("augustinruinard"),
  },
  {
    title: "E-Maillot",
    description: "Plateforme e-commerce sportive. (Php,mysql,bootstrap,docker)",
    imgUrl: projImg2,
    category: "web",
    onClick: () => handleProjectClick("e-maillot"),
  },
  {
    title: "Web Shows",
    description: "Application web de gestion de programmes télévisées , de séries et de films.(React, Node.js, MongoDB)",
    imgUrl: webshows,
    category: "web",
    onClick: () => handleProjectClick("web-show"),
  },
  {
    title: "Disk Cleaner",
    description: "Optimisation de stockage.(c# (POO) et WPF)",
    imgUrl: projImg1,
    category: "web",
    onClick: () => handleProjectClick("disk-cleaner"),
  },
  {
    title: "Dev-mobile (Kotlin)",
    description: "Développement d'une application mobile de séries télévisées.",
    imgUrl: projImg5,
    category: "mobile",
    onClick: () => handleProjectClick("dev-mobile"),
  },
  {
    title: "Dev-mobile (REACT NATIVE)",
    description: "Développement d'une application mobile de gestion d'évènements.",
    imgUrl: eventman,
    category: "mobile",
    onClick: () => handleProjectClick("dev-mobile-eventmanager"),
  },
];

const handleProjectClick = (projectId) => {
  console.log(`Projet cliqué : ${projectId}`);
};

export const Projects = () => {
  const webProjects = codeProjects.filter((p) => p.category === "web");
  const mobileProjects = codeProjects.filter((p) => p.category === "mobile");

  return (
    <section className="project mt-5" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="eyebrow-tag">Réalisations</span>
                  <h2 className="colorism">Projets</h2>
                  <p>Des projets Data Engineering / ML / IA menés en Master, et des projets web &amp; mobiles issus de mon Bachelor fullstack.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="data">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
                      <Nav.Item>
                        <Nav.Link eventKey="data">Projets data</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="web">Projets web</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="mobile">Projets mobiles</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="data">
                        <Row>
                          {dataProjects.map((project, index) => (
                            <DataProjectCard key={index} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="web">
                        <Row>
                          {webProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="mobile">
                        <Row>
                          {mobileProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="Background decoration"
        style={{ position: "absolute", right: 0, bottom: 0, zIndex: -1, opacity: 0.18, pointerEvents: "none" }}
      />
    </section>
  );
};

export default Projects;
