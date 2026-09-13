import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { SunFill, MoonStarsFill } from "react-bootstrap-icons";
import logoDark from "../assets/img/logo-gml-dark.png";
import logoLight from "../assets/img/logo-gml-light.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import github from "../assets/img/github-mark-white.svg";
import CV from "../assets/font/cvvvv.pdf";
import { HashLink } from "react-router-hash-link";
import { useTheme } from "../hooks/useTheme";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => setActiveLink(value);

  return (
    <Navbar
      expand="md"
      variant={theme === "dark" ? "dark" : "light"}
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="Logo GML Data Engineering"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              href="#home"
              className={activeLink === "home" ? "active nav-link" : "nav-link"}
              onClick={() => onUpdateActiveLink("home")}
            >
              Accueil
            </Nav.Link>
            <Nav.Link
              href="#about"
              className={activeLink === "about" ? "active nav-link" : "nav-link"}
              onClick={() => onUpdateActiveLink("about")}
            >
              À propos
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={activeLink === "skills" ? "active nav-link" : "nav-link"}
              onClick={() => onUpdateActiveLink("skills")}
            >
              Compétences
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={activeLink === "projects" ? "active nav-link" : "nav-link"}
              onClick={() => onUpdateActiveLink("projects")}
            >
              Projets
            </Nav.Link>
            <Nav.Link
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Mon CV
            </Nav.Link>
            <div className="navbar-social d-flex align-items-center ms-3">
              <a
                href="https://www.linkedin.com/in/wahab-mounirou-161786253/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/MOUNIROUWAHAB23"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <img src={github} alt="GitHub" />
              </a>
            </div>
            <button
              type="button"
              className="theme-toggle ms-3"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
              title={theme === "dark" ? "Mode clair" : "Mode sombre"}
            >
              {theme === "dark" ? <SunFill size={16} /> : <MoonStarsFill size={16} />}
            </button>
            <HashLink to="#contact" className="ms-3">
              <button
                className="btn btn-primary navbar-contact-btn"
                onClick={() => onUpdateActiveLink("contact")}
              >
                Contactez-moi
              </button>
            </HashLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;