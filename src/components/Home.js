import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import '../App.css';
import logo from '../assets/logo.jpg';

const Home = () => {
  const [openNavNoToggler, setOpenNavNoToggler] = useState(false);

  return (
    <>
      <header>
        <title>PetTrace</title>
        <h1>Bienvenido a PetTrace</h1>
        <img src={logo} alt="Logo" />
        
        <MDBNavbar expand='lg' light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarTogglerDemo01'
              aria-controls='navbarTogglerDemo01'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setOpenNavNoToggler(!openNavNoToggler)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar open={openNavNoToggler}>
              <MDBNavbarBrand href='#'>Hidden brand</MDBNavbarBrand>
              <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='#' className="text-dark">
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='#' className="text-dark">Link</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true' className="text-muted">
                    Disabled
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
              <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                <MDBBtn outline>Search</MDBBtn>
              </MDBInputGroup>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        
      </header>
      <main>
        <p>This is the home page of PetTrace.</p>
        {/* Otros componentes o elementos pueden ir aquí */}
      </main>
    </>
  );
};

export default Home;
