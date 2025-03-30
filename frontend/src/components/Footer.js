import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';  // Importing Instagram icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row className="d-flex justify-content-between py-3 align-items-center">
          
          <Col className="text-left" style={{ paddingLeft: '0' }}>
            <p style={{ marginBottom: 0 }}>TeaNest &copy; {currentYear}</p>
          </Col>

          <Col className="text-right" style={{ paddingRight: '0' }}>
            <div className="d-flex align-items-center justify-content-end">
              <p style={{ marginBottom: 0, marginRight: '10px' }}>All rights reserved by Hriday</p>
              <a 
                href="https://www.instagram.com/hriday_borkakati/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
              >
                <FaInstagram style={{ marginRight: '8px', fontSize: '1.2em' }} />
                Instagram
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
