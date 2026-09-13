import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import "./Banner.css";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(250 - Math.random() * 100);
  const toRotate = ["Data Engineer en formation", "Développeur Fullstack", "Python · SQL · ETL"];
  const period = 1800;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
    // eslint-disable-next-line
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const nodes = [
    [65, 95], [160, 138], [145, 182], [258, 112],
    [355, 88], [378, 190], [450, 138], [560, 70],
    [545, 165], [645, 210], [745, 138], [850, 95],
    [935, 178], [1030, 105], [1120, 160],
  ];
  const edges = [
    [0, 1], [1, 2], [1, 3], [3, 2], [3, 4], [3, 5],
    [4, 6], [5, 6], [6, 7], [6, 8], [8, 9], [8, 10],
    [7, 10], [10, 11], [10, 12], [11, 13], [12, 13], [13, 14],
  ];

  return (
    <section className="banner" id="home">
      <svg
        className="banner-network"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {edges.map(([a, b], i) => (
          <line
            key={`edge-${i}`}
            className="network-line"
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={`node-${i}`}>
            <circle className="network-node" cx={x} cy={y} r={i % 3 === 0 ? 7 : 4.5} />
            <circle className="network-dot" cx={x} cy={y} r={1.6} />
          </g>
        ))}
      </svg>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline mt-5">Data Engineering</span>
                  <h1 className="title-banner">
                    Bonjour ! Moi c’est <span className="highlight">Godlight</span>
                    <br />
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p className="description-banner">
                    Étudiant en Master Data Engineering à Ynov Campus Paris, après un Bachelor en développement fullstack.<br />
                    Je m'appuie sur mes bases de développeur pour construire des pipelines de données fiables et des infrastructures data robustes.
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{
                      marginTop: "24px",
                      borderRadius: "12px",
                      padding: "12px 28px",
                      fontWeight: 700,
                      fontSize: "18px",
                      boxShadow: "0 2px 12px rgba(79, 140, 255, 0.10)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => window.location.href = "#contact"}
                  >
                    Contactez-moi <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};