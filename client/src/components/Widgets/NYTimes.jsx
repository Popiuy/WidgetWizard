import { useState, useEffect } from 'react';
import NYTapiLogo from '../../images/nytimes_api_logo.png';
// useMutation to ADD_BOOKMARK
// useQuery to GET_BOOKMARKS

export default function NYTimesWidget () {

    const [tab, setTab] = useState('real-time-feed');
    const [section, setSection] = useState('home');
    const [days, setDays] = useState(7);
    const [most, setMost] = useState(`viewed/${days}`)
    const [articleSearch, setArticleSearch] = useState('Berkeley');
    const [url, setUrl] = useState('');
    const [articles, setArticles] = useState([]);
    const sections = ['all','arts', 'automobiles', 'books/review', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']

    useEffect(()=>{
        switch(tab){
            case "real-time-feed": 
                setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
            case "top-stories": 
                setUrl(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
            case "most-popular": 
                setUrl(`https://api.nytimes.com/svc/mostpopular/v2/${most}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
            case "article-search": 
                setUrl(`/articlesearch.json?q=${articleSearch}&fq=source:("The New York Times")&api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
            case "bookmarks": 
                setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
        }
    }, [tab, section, days, most, articleSearch] )

    const getArticles = async () => {
        const response = await fetch(url);
        return response.json()
    }

    const displayArticles = async () => {
        const articles = getArticles();
    }

    const RTSclick = async (e) => {
        setTab(e.target.id);
        const {data} = getArticles();
        const articles = data.results
    }

    return (
        
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <div className="nytimes-logo">
                    <img src={NYTapiLogo}/>
                </div>
                <div className="nytimes-header">The New York Times</div>
                <ul className="nytimes-navbar-tabs">
                    <li className="nytimes-navbar-tab" id="real-time-feed" onClick={RTSclick}>Real Time Feed</li>
                    <li className="nytimes-navbar-tab" id="top-stories" onClick={(e)=>setTab(e.target.id)}>Top Stories</li>
                    <li className="nytimes-navbar-tab" id="most-popular" onClick={(e)=>setTab(e.target.id)}>Most Popular</li>
                    <li className="nytimes-navbar-tab" id="article-search" onClick={(e)=>setTab(e.target.id)}>Article Search</li>
                    <li className="nytimes-navbar-tab" id="bookmarks" onClick={(e)=>setTab(e.target.id)}>Bookmarks</li>
                </ul>
                <button className="favorite-btn">Bookmark</button>
            </div>
            <div className="nytimes-content">
                <div hidden={ tab !== "real-time-feed" }>
                    THE REAL TIME FEED!
                    { articles.map((article) => <div>{article.title}</div>)}
                </div>
                <div hidden={ tab !== "top-stories" }>
                    <select className="dropdown-menu">
                        { sections.forEach((section, i) => { 
                            return <option onClick={()=>setSection(e.target.value)} value={section} key={i}>{section}</option>
                        })}
                    </select>
                </div>
                <div hidden={ tab !== "most-popular" }>
                    MOST POPULAR
                    <select>
                        <option onClick={()=>setMost(`viewed/${days}`)}>Most viewed</option>
                        <option onClick={()=>setMost(`emailed/${days}`)}>Most emailed</option>
                        <option onClick={()=>setMost(`shared/${days}/facebook`)}>Most shared on facebook</option>
                    </select>
                    <select>
                        <option onClick={()=>setDays(1)}>Day</option>
                        <option onClick={()=>setDays(7)}>Week</option>
                        <option onClick={()=>setDays(30)}>Month</option>
                    </select>
                    {/* introduce option to select between viewed, emailed and shared, within the past day, week and month */}
                    {/* display articles */}
                </div>
                <div hidden={ tab !== "article-search" }>
                    ARTICLE SEARCH
                    <input value={articleSearch} onChange={(e)=>{setArticleSearch(e.target.value)}}></input>
                    <button onClick={()=>{}}></button>
                    {/* display articles */}
                </div>
                <div hidden={ tab !== "bookmarks" }>
                    BOOKMARKS
                    {/* display bookmarked articles */}
                </div>
            </div>
        </div>
    )
}
//