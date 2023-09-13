import APODHomePage from '../components/Widgets/NASAHOMEPAGE'

const Home = () => {
    return (
        <div>
            <div className="alert alert-primary" role="alert">
                Sign up to create your own dashboard with more widgets!
            </div>
            <APODHomePage />
        </div>
    )
};

export default Home;