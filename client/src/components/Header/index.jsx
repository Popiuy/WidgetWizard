import { Link } from 'react';
import { useNavigate } from 'react-router-dom';

export default Header = () => {

const displayLoginForm = () => {

    const routeChange = (path) => {
        useNavigate(path);
    }


}

    return (

        <header>
            <div className="date-feature"></div>
            <div className="time-feature"></div>
            <div className='login-feature'>
                 <button onClick={() => routeChange('/dashboard/:')}>Log in</button> 
                 {/* Upon click...
                     the login button will display the login form in place of Home */}
            </div>
            <div className='logout-feature'>
                <button onClick={() => routeChange('/')}>Log out</button>
                {/* Display upon login */}
                {/* Upon click, the button will disappear */}
                {/* Upon click, the user will be redirect to the homepage */}
            </div>
        </header>
    )
}