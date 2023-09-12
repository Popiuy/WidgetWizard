import { useState, useEffect } from 'react';
import NYTapiLogo from '../../images/nytimes_api_logo.png';
import nytimesheader from '../../images/nytimes-wordmark.svg'
import BookmarkTag from '../../images/bookmark.png'
import { useQuery, useMutation } from '@apollo/client';
import { BOOKMARK_ARTICLE } from '../../utils/mutations';
import { GET_NYT_BOOKMARKS } from '../../utils/queries';
import NYTtoolbox from '../../utils/NYT';
import '../../css/NYT.css';

export default function NYTimesWidget () {

    const [days, setDays] = useState(7);
    const [tab, setTab] = useState('real-time-feed');
    const [section, setSection] = useState('home');
    const [articles, setArticles] = useState([]);
    const [searchBarInfo, setSearchBarInfo] = useState('');
    const [url, setUrl] = useState('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7');
    const sections = ['all','arts', 'automobiles', 'books/review', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']
    const {loading, bmdata } = useQuery(GET_NYT_BOOKMARKS);
    const [bookmarkArticle, {error}] = useMutation(BOOKMARK_ARTICLE);
    const [RTFarticles, setRTFarticles] = useState([])
    const [TSarticles, setTSarticles] = useState([])
    const [MParticles, setMParticles] = useState([])
    const [ASarticles, setASarticles] = useState([])
    const [BMarticles, setBMarticles] = useState([])
    const [most, setMost] = useState(`viewed/${days}`);

//Sets URL in response to user input
/////////
    useEffect(()=>{
        
        switch (tab) {
            case "real-time-feed": //done
                setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                break;
            case "top-stories": //
                setUrl(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                break;
            case "most-popular": //done
                setUrl(`https://api.nytimes.com/svc/mostpopular/v2/${most}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                break;
            case "article-search": 
                setUrl(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchBarInfo}&fq=source:("The New York Times")&api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                break;
        }
        
    }, [tab, section, days, most, searchBarInfo] );

//Makes request (async)
////////
    const requestData = async () => {
        const NYTresponse = await fetch(url)
        const NYTdata = await NYTresponse.json();

        //We want the switch case to run AFTER NYTdata is ready...

        switch (tab) {
            case "real-time-feed": 
                const rtsarticles = await NYTtoolbox.RTS(NYTdata.results);
                setRTFarticles(rtsarticles);
                break;
            case "top-stories":
                const tsarticles = await NYTtoolbox.TS(NYTdata.results);
                setTSarticles(tsarticles);
                break;
            case "most-popular":
                const mparticles = await NYTtoolbox.MP(NYTdata.results);
                setMParticles(mparticles);
                break;
            case "article-search":
                const asarticles = NYTtoolbox.AS(NYTdata.response.docs)
                setASarticles(asarticles);
                break;
            case "bookmarks": 
                setBMarticles(bmdata)
                break;
        }

        console.log('RTF: ', RTFarticles);
        console.log('TSL ', TSarticles);
        console.log('MP: ', MParticles);
        console.log('AS: ', ASarticles);
        console.log('BM: ', BMarticles);
    }

    const saveBM = async (article)=>{
        //bookmarkArticle will return nyt_bookmarks array, and also refetch bmdata
        const bms = await bookmarkArticle({
            variables: {
                NYTarticleData: {...article}
            },
            refetchQueries: [GET_NYT_BOOKMARKS]
        });
    };

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

    const chooseTab = (value) => {
        setTab(value);
        

        const frameId = 'display-' + value;
        const frame = getElementsByClass("nytimes-display-frame");
        const tab = getElementsByClass("nytimes-navbar-tab");
    
        
        frame.forEach((frame) => frame.style.display = "none");
        tab.forEach((tab) => {tab.className = tab.className.replace(" active", "")});
    
        getElementById(value).className += "active";
        getElementById(frameId).style.display = "block";
    };

    // const pageLoad = async () => {
    //     const iResponse = await fetch(url);
    //     const iData = await iResponse.json();
    //     const iArticles = NYTtoolbox.RTS(iData.results);
    //     console.log(iArticles)
    //     setArticles(iArticles)

    // }

    // pageLoad();
//sets url in response to user input
    // requestData();

    return (
        
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <div className="nytimes-logo">
                    <img src={NYTapiLogo}/>
                </div>
                <img src={nytimesheader}></img>
                <div className="nytimes-navbar-tabs">
                    <button className="nytimes-navbar-tab" id="real-time-feed" onClick={(e)=>setTab(e.target.id)}>Real Time Feed</button>
                    <button className="nytimes-navbar-tab" id="top-stories" onClick={(e)=>setTab(e.target.id)}>Top Stories</button>
                    <button className="nytimes-navbar-tab" id="most-popular" onClick={(e)=>setTab(e.target.id)}>Most Popular</button>
                    <button className="nytimes-navbar-tab" id="article-search" onClick={(e)=>setTab(e.target.id)}>Article Search</button>
                    <button className="nytimes-navbar-tab" id="bookmarks" onClick={(e)=>setTab(e.target.id)}>Bookmarks</button>
                </div>
            </div>
            
            <div className="additional-queries">
                <div hidden={ tab !== "top-stories" }>
                    {/* dropdown menu of sections */}
                    <select onChange={(e)=>setSection(e.target.value)}>
                        { sections.map((section, i) => <option value={section} key={i}>{section}</option>)}
                    </select>
                    <button className="request-button" onClick={requestData}></button>
                </div>
                <div hidden={ tab !== "most-popular" }>
                    {/* introduce option to select between viewed, emailed and shared, within the past day, week and month */}
                    <select onChange={(e)=>setMost(e.target.value)}>
                        <option value={`viewed/${days}`}>Most viewed</option>
                        <option value={`emailed/${days}`}>Most emailed</option>
                        <option value={`shared/${days}/facebook`}>Most shared on facebook</option>
                    </select>
                    <select onChange={(e)=>updateMost(e, most)}> 
                        <option value="1">Day</option>
                        <option value="7">Week</option>
                        <option value="30">Month</option>
                    </select>
                    <button className="request-button" onClick={requestData}></button>
                </div>
                <div hidden={ tab !== "article-search" }>
                    {/* article search bar & submit button */}
                    <input value={searchBarInfo} placeholder="Type keywords here" onChange={(e)=>{setSearchBarInfo(e.target.value)}}></input>
                    <button className="request-button" onClick={requestData}></button>
                </div>
            </div>
            <div className = "nytimes-main-frame">
                { tab === "real-time-feed" ? 
                    <div className="nytimes-display-frame" id="display-real-time-feed">
                        <div>{tab}</div>
                            { RTFarticles.map((article) => (
                                <div className="article-row">
                                    <div>{article.headline}</div>
                                    <div>{article.byline}</div>
                                    <div>{article.date_published}</div>
                                    {/* Display content below on hover */}
                                    {/* <div>{article.blurb}</div>
                                    <div>{article.abstract}</div>
                                    <div>{article.source}</div>
                                    <div>{article.nyt_url}</div> */}
                                    <img className="bookmark-btn" 
                                        src={BookmarkTag}
                                        onClick={saveBM}/>
                                </div>
                            ))}
                    </div>
                : tab === "top-stories" ?
                    <div className="nytimes-display-frame" id="display-top-stories">
                        <div>{tab}</div>
                            { TSarticles.map((article, i) => (
                                <div className="article-row" key={i}>
                                    <div>{article.headline}</div>
                                    <div>{article.byline}</div>
                                    <div>{article.date_published}</div>
                                    {/* Display content below on hover */}
                                    {/* <div>{article.blurb}</div>
                                    <div>{article.abstract}</div>
                                    <div>{article.source}</div>
                                <div>{article.nyt_url}</div> */}
                                    <img className="bookmark-btn" 
                                        src={BookmarkTag}
                                        onClick={saveBM}/>
                                </div>
                            ))}
                    </div>
                : tab === "most-popular" ?
                    <div className="nytimes-display-frame" id="display-most-popular">
                        <div>{tab}</div>
                            { MParticles.map((article) => (
                                <div className="article-row">
                                    <div>{article.headline}</div>
                                    <div>{article.byline}</div>
                                    <div>{article.date_published}</div>
                                    {/* Display content below on hover */}
                                    {/* <div>{article.blurb}</div>
                                    <div>{article.abstract}</div>
                                    <div>{article.source}</div>
                                <div>{article.nyt_url}</div> */}
                                    <img className="bookmark-btn" 
                                        src={BookmarkTag}
                                        onClick={saveBM}/>
                                </div>
                            ))}
                    </div>
                : tab === "article-search" ?
                    <div className="nytimes-display-frame" id="display-article-search">
                        <div>{tab}</div>
                            { ASarticles.map((article) => (
                                <div className="article-row">
                                    <div>{article.headline}</div>
                                    <div>{article.byline}</div>
                                    <div>{article.date_published}</div>
                                    {/* Display content below on hover */}
                                    {/* <div>{article.blurb}</div>
                                    <div>{article.abstract}</div>
                                    <div>{article.source}</div>
                                <div>{article.nyt_url}</div> */}
                                    <img className="bookmark-btn" 
                                        src={BookmarkTag}
                                        onClick={saveBM}/>
                                </div>
                            ))}
                    </div>
                : tab === "bookmarks" ?
                    <div className="nytimes-display-frame" id="display-bookmarks">
                        <div>{tab}</div>
                            { BMarticles.map((article) => (
                                <div className="article-row">
                                    <div>{article.headline}</div>
                                    <div>{article.byline}</div>
                                    <div>{article.date_published}</div>
                                    {/* Display content below on hover */}
                                    {/* <div>{article.blurb}</div>
                                    <div>{article.abstract}</div>
                                    <div>{article.source}</div>
                                <div>{article.nyt_url}</div> */}
                                    <img className="bookmark-btn" 
                                        src={BookmarkTag}
                                        onClick={saveBM}/>
                                </div>
                            ))}
                    </div>
                : <div>This won't happen.</div>
                }    
            </div>
        </div>
        
    )
}
//


//TODOS
// - fetch and render timing
// - typeDefs
// - resolvers
// - gql strings
// - 
// 
// 
