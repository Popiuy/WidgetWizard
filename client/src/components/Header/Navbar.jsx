import { Link } from 'react';
import Auth from '../../utils/auth';
import wizard from '../../images/wizard.jpg';
import { useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

export default function NavBarComponent () {

  const [showModal, setShowModal] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-color navbar-expand-lg bg-body-tertiary">
          <div className="nav">
            <a className="navbar-brand website-title" href="/">WidgetWizard</a>
            <img className="wizard-img" src={wizard} alt="Wizard"></img>
          </div>
          <ul className="nav">
            <li className="nav-item">
              {Auth.loggedIn() ? (
                <Nav.Link to='/' onClick={Auth.logout}>Logout</Nav.Link>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                  )}
            </li>
          </ul>
      </nav>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* Modal starts here */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='login-signup-modal'>
              <Nav variant='tabs'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </header>
  )
}


