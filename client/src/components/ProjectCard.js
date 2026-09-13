import React from 'react';
import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, onClick }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div 
        className="proj-imgbx clickable-card"
        onClick={onClick}
        tabIndex={0}
        role="button"
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        <img 
          src={imgUrl} 
          alt={title}
          style={{ 
            width: '100%', 
            height: '220px', 
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}
