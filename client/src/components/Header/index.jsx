export default Header = () => {
    
    return (

        <header>
            <div className="date-feature"></div>
            <div className="time-feature"></div>
            <div className='login-feature'>
                { loggedIn ? (
                        <button className="logout-button">Logout</button>
                    ) : (
                        <>
                        <button className="login-button">Login</button>
                        <button className="signup-button">Sign Up</button>
                        </>
                    )}
                    
            </div>
        </header>
    )
}