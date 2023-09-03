

export default Widgets = (user_id) => {
    //reference users widgets
    
    const widgetsArray = [];

    return (
        <div>
            {widgetsArray.map( widget => <div>Widget</div>)}
        </div>
        
        //display appropraite widget here
    )
};