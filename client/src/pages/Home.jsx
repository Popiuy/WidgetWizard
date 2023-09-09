import APODWidget from '../components/widgets/NASA_apod';
import jokeWidget from '../components/widgets/JokeAPI';

const Home = () => {
    return (
        <div>
            <APODWidget />;      
            <jokeWidget />
        </div>
    )
};

export default Home;