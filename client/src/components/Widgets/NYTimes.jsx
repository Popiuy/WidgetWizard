const URL = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`
const apiKey = 'mSmLxowneVbMEuIyM8wkLqmMe06Gubv7'

const response = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`)

export default function NYTimesWidget () {

    const tabs = [realTimeFeed, topStories, mostPopular, articleSearch];

    return (
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <ul className="nytimes-navbar-tabs">
                    <li className="nytimes-navbar-tab" id="nytimes-realtimefeed"></li>
                    <li className="nytimes-navbar-tab" id="nytimes-topstories"></li>
                    <li className="nytimes-navbar-tab" id="nytimes-mostpopular"></li>
                    <li className="nytimes-navbar-tab" id="nytimes-articlesearch"></li>
                </ul>

            </div>
        </div>
    )
}