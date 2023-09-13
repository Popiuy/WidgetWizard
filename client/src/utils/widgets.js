import BoredAPIWidget from '../components/Widgets/Bored';
import APODWidget from '../components/Widgets/NASA_apod';
import NBAWidget from '../components/Widgets/NBA';
import JokeAPIWidget from '../components/Widgets/JokeAPI';
import BreweryWidget from '../components/Widgets/OpenBrewery';
import CatFactWidget from '../components/Widgets/CatFact';
import webcamWidget from '../components/widgets/Webcam';
import NYTimesWidget from '../components/Widgets/NYTimes';
import SoundCloudWidget from '../components/Widgets/Soundcloud';
import CurrencyConverter from '../components/Widgets/Currency-Converter'

const getWidget = (widgetName) => {
    switch(widgetName) {
        case 'BoredAPIWidget': 
            return BoredAPIWidget
        case 'APODWidget':
            return APODWidget
        case 'NBAWidget':
            return NBAWidget
        case 'JokeAPIWidget':
            return JokeAPIWidget
        case 'BreweryWidget':
            return BreweryWidget
        case 'CatFactWidget':
            return CatFactWidget
        case 'webcamWidget':
            return webcamWidget
        case 'NYTimesWidget':
            return NYTimesWidget
        case 'SoundCloudWidget':
            return SoundCloudWidget
        case 'CurrencyConverter':
            return CurrencyConverter
    }
}

export default getWidget;