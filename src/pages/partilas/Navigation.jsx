import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

const Navigation = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='md'>
      <Container>
        <Link to='/'>
          <span className='router-link'>Photo Gallary 🖼️</span>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;
