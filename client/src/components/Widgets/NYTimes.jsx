import { useState, useEffect } from 'react';
import NYTapiLogo from '../../images/nytimes_api_logo.png';
// useMutation to ADD_BOOKMARK
// useQuery to GET_BOOKMARKS
import { useQuery, useMutation } from '@apollo/client';
import { BOOKMARK_ARTICLE } from '../../utils/mutations';

export default function NYTimesWidget () {

    const [tab, setTab] = useState('real-time-feed');
    const [section, setSection] = useState('home');
    const [days, setDays] = useState(7);
    const [most, setMost] = useState(`viewed/${days}`);
    const [searchBarInfo, setSearchBarInfo] = useState('');
    const [url, setUrl] = useState('');
    const [articles, setArticles] = useState([]);
    const sections = ['all','arts', 'automobiles', 'books/review', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']
    const [bookmarkArticle, {error}] = useMutation(BOOKMARK_ARTICLE, {
        variables: {}
    })


    const updateMost = (e, most) => {
       
        const x = most.split('/').shift()

        switch(x) {
            case 'viewed': setMost(`viewed/${e.target.value}`);
                setDays(e.target.value);
                break;
            case 'shared': setMost(`shared/${e.target.value}/facebook`);
                setDays(e.target.value);
                break;
            case 'emailed': setMost(`emailed/${e.target.value}`);
                setDays(e.target.value);
                break;
        }

    };

    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json()
    };

    const searchClick = async() => {
        const ASdata = await fetchData(url);
        console.log(ASdata.response.docs);
        // const { ASdata } = ASresponse.json();
        const articlesArray = ASdata.response.docs.map((article) => ({
            headline: article.headline.main,
            byline: article.byline.original,
            date_published: article.pub_date,
            abstract: article.abstract,
            snippet: article.snippet,
            source: article.source,
            blurb: article.lead_paragraph,
            nyt_url: article.web_url
        }))
        setArticles(articlesArray);
    };

    useEffect(()=>{
        console.log('before: ', url)
        const makeRequest = async () => {
            switch (tab) {
                case "real-time-feed": 
                    setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const RTSdata = await fetchData(url)
                    setArticles(RTSdata.results);
                    break;
                case "top-stories": 
                    setUrl(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const TSdata = await fetchData(url);
                    setArticles(TSdata.results)
                    break;
                case "most-popular": 
                    setUrl(`https://api.nytimes.com/svc/mostpopular/v2/${most}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const MPdata = await fetchData(url);
                    setArticles(MPdata.results);
                    break;
                case "article-search": 
                    setUrl(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchBarInfo}&fq=source:("The New York Times")&api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    //this one will be fetched on click of submit button
                    console.log("in development...")
                    break;
                    case "bookmarks": 
                    setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    //query
                    //setArticles(query response)
                    // const BMarticles = query
                    console.log("in development...")
                    break;
            }
        }
        makeRequest();
        console.log('after: ', url);
    }, [tab, section, days, most, searchBarInfo] );
    
    // makeInitialRequest();
    // console.log(makeInitialRequest());

    return (
        
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <div className="nytimes-logo">
                    <img src={NYTapiLogo}/>
                </div>
                <div className="nytimes-header">The New York Times</div>
                <ul className="nytimes-navbar-tabs">
                    <li className="nytimes-navbar-tab" id="real-time-feed" onClick={(e)=>setTab(e.target.id)}>Real Time Feed</li>
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
                        <select>
                            { sections.map((section, i) => <option onClick={()=>setSection(e.target.value)} value={section} key={i}>{section}</option>)}
                        </select>
                    </div>
                    <div hidden={ tab !== "most-popular" }>
                        {/* introduce option to select between viewed, emailed and shared, within the past day, week and month */}
                        <select onChange={(e)=>setMost(e.target.value)}>
{/*  */}
                            <option value={`viewed/${days}`}>Most viewed</option>
                            <option value={`emailed/${days}`}>Most emailed</option>
                            <option value={`shared/${days}/facebook`}>Most shared on facebook</option>
                        </select>
                        <select onChange={(e)=>updateMost(e, most)}> 
{/*  */}
                            <option value="1">Day</option>
                            <option value="7">Week</option>
                            <option value="30">Month</option>
                        </select>
                    </div>
                    <div hidden={ tab !== "article-search" }>
                        {/* article search bar & submit button */}
                        <input value={searchBarInfo} placeholder="Type keywords here"onChange={(e)=>{setSearchBarInfo(e.target.value)}}></input>
                        <button onClick={searchClick}></button>
                    </div>
                </div>
                <div className="article-display">
                    {console.log(articles)}
                    { articles.map((article) => (
                        <div className="article-row">
                            <div>{article.title}</div>
                            <img className="bookmark-btn" onClick={(article)=>{bookmarkArticle({NYTarticleData: {article}})}}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
//


//define bookmarkArticle as query