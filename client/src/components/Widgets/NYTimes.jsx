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

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json()
    }

    const searchClick = async() => {
        const ASresponse = await fetchData(url);
        const { ASdata } = ASresponse.json();
        setArticles(ASdata.results);
    }

    useEffect(()=>{

        const wrapper = async () => {
            switch(tab){
                case "real-time-feed": 
                    setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const RTSresponse = await fetchData(url)
                    const { RTSdata } = RTSresponse.json;
                    setArticles(RTSdata.results);
                case "top-stories": 
                    setUrl(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const TSresponse = await fetchData(url);
                    const { TSdata } = await TSresponse.json()
                    setArticles(TSdata.results)
                case "most-popular": 
                    setUrl(`https://api.nytimes.com/svc/mostpopular/v2/${most}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const MPresponse = fetchData(url);
                    const { MPdata } = MPresponse.json();
                    setArticles(MPdata.results);
                case "article-search": 
                    setUrl(`/articlesearch.json?q=${articleSearch}&fq=source:("The New York Times")&api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    //this one will be fetched on click of submit button
                case "bookmarks": 
                    setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    //query
                    //setArticles(query response)
                    // const BMarticles = query
            }
        }
        wrapper();
    }, [tab, section, days, most, articleSearch] )

    return (
        
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <div className="nytimes-logo">
                    <img src={NYTapiLogo}/>
                </div>
                <div className="nytimes-header">The New York Times</div>
                <ul className="nytimes-navbar-tabs">
                    <li className="nytimes-navbar-tab" id="real-time-feed" onClick={setTab(e.target.id)}>Real Time Feed</li>
                    <li className="nytimes-navbar-tab" id="top-stories" onClick={(e)=>setTab(e.target.id)}>Top Stories</li>
                    <li className="nytimes-navbar-tab" id="most-popular" onClick={(e)=>setTab(e.target.id)}>Most Popular</li>
                    <li className="nytimes-navbar-tab" id="article-search" onClick={(e)=>setTab(e.target.id)}>Article Search</li>
                    <li className="nytimes-navbar-tab" id="bookmarks" onClick={(e)=>setTab(e.target.id)}>Bookmarks</li>
                </ul>
                <button className="favorite-btn">Bookmark</button>
            </div>
            <div className="nytimes-content">
                <div className="additional-queries">
                    <div hidden={ tab !== "top-stories" }>
                        {/* dropdown menu of sections */}
                        <select className="dropdown-menu">
                            { sections.forEach((section, i) => { 
                                return <option onClick={()=>setSection(e.target.value)} value={section} key={i}>{section}</option>
                            })}
                        </select>
                    </div>
                    <div hidden={ tab !== "most-popular" }>
                        {/* introduce option to select between viewed, emailed and shared, within the past day, week and month */}
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
                    </div>
                    <div hidden={ tab !== "article-search" }>
                        {/* article search bar & submit button */}
                        <input value={articleSearch} placeholder="Type keywords here"onChange={(e)=>{setArticleSearch(e.target.value)}}></input>
                        <button onClick={searchClick}></button>
                    </div>
                </div>
                <div className="article-display">
                    { articles.map((article) => <div>{article.title}</div>)}
                </div>
            </div>
        </div>
    )
}
//