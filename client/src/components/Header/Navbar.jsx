import { Link } from 'react';
import Auth from '../../utils/auth';
import wizard from '../../images/wizard.jpg'




const NavBarComponent = () => {


  return (
      <header>
      <nav className="navbar navbar-color navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img className="wizard-img" src={wizard} alt="Wizard"></img>
          <a className="navbar-brand d-flex justify-content-center" href="/">WidgetWizard</a>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Signup/Login</a>
              {/* change the button to display modal */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}


export default NavBarComponent;