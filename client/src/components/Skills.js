import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Skills.css';
import './Banner.css';

const dataSkillGroups = [
  {
    title: "Langages & Data",
    items: ["Python", "SQL", "Pandas"],
  },
  {
    title: "Pipelines & orchestration",
    items: ["ETL / ELT", "Apache Airflow", "Apache Spark", "Kafka"],
  },
  {
    title: "Cloud & Data Warehouse",
    items: ["AWS", "GCP", "Azure", "Snowflake", "BigQuery", "Redshift"],
  },
  {
    title: "Outils modernes",
    items: ["dbt", "Docker", "Kubernetes", "CI/CD"],
  },
];

export const Skills = () => {
  const [progressValues, setProgressValues] = useState([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("skills");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setProgressValues([80, 90, 95]);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const fullstackSkills = [
    { value: progressValues[0], text: "Développement Web" },
    { value: progressValues[1], text: "Tests & Qualité" },
    { value: progressValues[2], text: "UI/UX Design" },
  ];

  return (
    <section className="skill mt-5 md-5" id="skills">
      <div className="container">
        <div className="text-center">
          <div className="skill-bx wow zoomIn">
            <span className="eyebrow-tag">Stack</span>
            <h2 className="colorism">Data Engineering</h2>
            <p className="description-banner">
              En Master Data Engineering à Ynov Campus Paris, je construis mes compétences autour
              de la collecte, du traitement et de l'exploitation de la donnée à grande échelle —
              en m'appuyant sur mes bases de développeur fullstack.
            </p>

            <div className="skill-groups">
              {dataSkillGroups.map((group) => (
                <div className="skill-group-card" key={group.title}>
                  <h4>{group.title}</h4>
                  <div className="skill-chips">
                    {group.items.map((item) => (
                      <span className="skill-chip" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-bx fullstack-section">
            <h3 className="fullstack-heading">Bases en développement fullstack</h3>
            <p className="description-banner">
              Acquises pendant mon Bachelor, ces compétences restent le socle technique sur
              lequel je m'appuie aujourd'hui.
            </p>

            <Carousel
              responsive={responsive}
              infinite={true}
              className="mt-4 owl-carousel owl-theme skill-slider"
            >
              {fullstackSkills.map((skill, index) => (
                <div className="item" key={index}>
                  <div style={{ width: 120, height: 120, margin: "0 auto" }}>
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <CircularProgressbar
                      value={skill.value}
                      text={`${skill.value}%`}
                      styles={buildStyles({
                        textColor: "var(--accent)",
                        pathColor: `url(#gradient-${index})`,
                        trailColor: "var(--border-subtle)",
                        strokeLinecap: "round",
                      })}
                    />
                  </div>
                  <h5>{skill.text}</h5>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
