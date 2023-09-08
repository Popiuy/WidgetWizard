//import widgets from widget library
//reference User.widgets
//display appropriate widgets
import Widgets from '../components/cards/Widgets';

const Dashboard = () => {
    return (
        <div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add Widget
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Widget 1</a></li>
                    <li><a className="dropdown-item" href="#">Widget 2</a></li>
                    <li><a className="dropdown-item" href="#">Widget 3</a></li>
                </ul>
            </div>
            <div className="dashboard">
                Dashboard
            </div>
        </div>
    )
};

export default Dashboard;