export default Header = () => {
    
    return (

        <header>
            <div className="date-feature"></div>
            <div className="time-feature"></div>
            <div className='login-feature'>
                 {/* Can we set it up so that upon click, 
                    our login form appears as a pop-up? */}
                {/* Button will disappear upon login */}
            </div>
            <div className='logout-feature'>
                {/* Display upon login */}
            </div>
        </header>
    )
}