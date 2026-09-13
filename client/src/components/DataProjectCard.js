import React from 'react';
import { Col } from 'react-bootstrap';

export const DataProjectCard = ({ icon, title, role, context, period, description, result, stack }) => (
  <Col xs={12} md={6} lg={4} className="mb-4 d-flex">
    <div className="data-project-card">
      <div className="data-project-icon">{icon}</div>
      <h4>{title}</h4>
      <p className="data-project-role">{role}</p>
      <p className="data-project-meta">{context} · {period}</p>
      <p className="data-project-desc">{description}</p>
      <p className="data-project-result">{result}</p>
      <div className="skill-chips">
        {stack.map((tech) => (
          <span className="skill-chip" key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  </Col>
);

export default DataProjectCard;
