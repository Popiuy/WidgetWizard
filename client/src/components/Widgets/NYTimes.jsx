import { useState } from 'react';




const URL = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`
const apiKey = 'mSmLxowneVbMEuIyM8wkLqmMe06Gubv7'

const response = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`)

export default function NYTimesWidget () {

    const [selectedTab, setSelectedTab] = useState('realtimefeed');
    const tabs = [realtimefeed, topStories, mostPopular, articleSearch];

    const clickTab = (e) => {
        const tab = e.target.id
    }
    return (
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <ul className="nytimes-navbar-tabs">
                    <li className="nytimes-navbar-tab" id="realtimefeed" >Real Time Feed</li>
                    <li className="nytimes-navbar-tab" id="topstories">Top Stories</li>
                    <li className="nytimes-navbar-tab" id="mostpopular">Most Popular</li>
                    <li className="nytimes-navbar-tab" id="articlesearch">Article Search</li>
                    <li className="nytimes-navbar-tab" id="bookmarks">Bookmarks</li>
                </ul>

            </div>
        </div>
    )
}
//onClick={()=>setSelectedTab(this.id)}