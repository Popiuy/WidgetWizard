<<<<<<< HEAD
import APODWidget from '../components/widgets/NASA_apod';
import jokeWidget from '../components/widgets/JokeAPI';

const Home = () => {
    return (
        <div>
            <APODWidget />;      
            <jokeWidget />
=======
import APODWidget from '../components/widgets/NASA_apod'
import Bored from '../components/widgets/Bored'
const Home = () => {
    return (
        <div>
        <APODWidget />
        <Bored />
>>>>>>> 724dda1278fb90a62491b001bbc37526dc6014ae
        </div>
    )
};

export default Home;