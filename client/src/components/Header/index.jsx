import { Link } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import wizard from '../../images/wizard.jpg'

const loggedIn = Auth.loggedIn();
const Header = () => {

const displayLoginForm = () => {

    const routeChange = (path) => {
        useNavigate(path);
    }


}

    return (

        // <header>
        //     <div className="date-feature"></div>
        //     <div className="time-feature"></div>
        //     <div className='login-feature'>
        //          <button onClick={() => routeChange('/dashboard/:')}>Log in</button> 
        //          {/* Upon click...
        //              the login button will display the login form in place of Home */}
        //     </div>
        //     <div className='logout-feature'>
        //         <button onClick={() => routeChange('/')}>Log out</button>
        //         {/* Display upon login */}
        //         {/* Upon click, the button will disappear */}
        //         {/* Upon click, the user will be redirect to the homepage */}
        //     </div>
        // </header>
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

export default Header;