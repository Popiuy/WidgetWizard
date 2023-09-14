import { useState, useEffect } from 'react';
import NYTapiLogo from '../../images/nytimes_api_logo.png';
import nytimesheader from '../../images/nytimes-wordmark.svg'
import BookmarkTag from '../../images/bookmark.png'
import { useMutation } from '@apollo/client';
import { BOOKMARK_ARTICLE } from '../../utils/mutations';
import { GET_NYT_BOOKMARKS } from '../../utils/queries';
import NYTtoolbox from '../../utils/NYT';
import '../../css/NYT.css';

export default function NYTimesWidget () {

    const [days, setDays] = useState(7);
    const [tab, setTab] = useState('real-time-feed');
    const [section, setSection] = useState('home');
    // const [articles, setArticles] = useState([]);
    const [searchBarInfo, setSearchBarInfo] = useState('');
    const [url, setUrl] = useState('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7');
    const sections = ['all','arts', 'automobiles', 'books/review', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']
    // const { bmdata } = useQuery(GET_NYT_BOOKMARKS);
    const [bookmarkArticle] = useMutation(BOOKMARK_ARTICLE);
    const [RTFarticles, setRTFarticles] = useState([])
    const [TSarticles, setTSarticles] = useState([])
    const [MParticles, setMParticles] = useState([])
    const [ASarticles, setASarticles] = useState([])
    // const [BMarticles, setBMarticles] = useState([])
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

    useEffect(()=>{
        const wrapper = async () => {
            const NYTresponse = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`)
            const NYTdata = await NYTresponse.json();
            const rtsarticles = await NYTtoolbox.RTF(NYTdata.results);
            setRTFarticles(rtsarticles);
        };
        wrapper();      
    },[])

//Makes request (async)
////////

    const requestData = async () => {
        const NYTresponse = await fetch(url)
        const NYTdata = await NYTresponse.json();

        switch (tab) {
            
            case "real-time-feed":
                // eslint-disable-next-line no-case-declarations
                const rtfarticles = NYTtoolbox.RTF(NYTdata.results);
                setRTFarticles(rtfarticles);
                break;
            case "top-stories":
                // eslint-disable-next-line no-case-declarations
                const tsarticles = NYTtoolbox.TS(NYTdata.results);
                setTSarticles(tsarticles);
                break;
            case "most-popular":
                // eslint-disable-next-line no-case-declarations
                const mparticles = NYTtoolbox.MP(NYTdata.results);
                setMParticles(mparticles);
                break;
            case "article-search":
                // eslint-disable-next-line no-case-declarations
                const asarticles = NYTtoolbox.AS(NYTdata.response.docs)
                setASarticles(asarticles);
                break;
            // case "bookmarks": 
            //     setBMarticles(bmdata)
            //     break;
        }
    };

    const saveBM = async (article)=>{
        //bookmarkArticle will return nyt_bookmarks array, and also refetch bmdata
        const bms = await bookmarkArticle({
            variables: {
                NYTarticleData: {...article}
            },
            refetchQueries: [GET_NYT_BOOKMARKS]
        });
        console.log(bms);
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

    return (
        
        <div className="nytimes-widget">
            <div className="nytimes-navbar">
                <div className="nytimes-header">
                    <div className="nytimes-logo">
                        <img  src={NYTapiLogo}/>
                    </div>
                    <img className="nytimes-banner" src={nytimesheader}></img>
                </div>
                <div className="nytimes-navbar-tabs">
                    <button className={tab==='real-time-feed'?'nytimes-navbar-tab active':"nytimes-navbar-tab"} id="real-time-feed" onClick={(e)=>setTab(e.target.id)} >Real Time Feed</button>
                    <button className={tab==='top-stories'?'nytimes-navbar-tab active':"nytimes-navbar-tab"} id="top-stories" onClick={(e)=>setTab(e.target.id)}>Top Stories</button>
                    <button className={tab==='most-popular'?'nytimes-navbar-tab active':"nytimes-navbar-tab"} id="most-popular" onClick={(e)=>setTab(e.target.id)}>Most Popular</button>
                    <button className={tab==='article-search'?'nytimes-navbar-tab active':"nytimes-navbar-tab"} id="article-search" onClick={(e)=>setTab(e.target.id)}>Article Search</button>
                    <button className={tab==='bookmarks'?'nytimes-navbar-tab active':"nytimes-navbar-tab"} id="bookmarks" onClick={(e)=>setTab(e.target.id)}>Bookmarks</button>
                </div>
            </div>
            
            <div className="additional-queries">
                <div hidden={ tab !== "top-stories" }>
                    {/* dropdown menu of sections */}
                    <select className="font" onChange={(e)=>setSection(e.target.value)}>
                        { sections.map((section, i) => <option value={section} key={i}>{section}</option>)}
                    </select>
                    <button className="font request-button" onClick={requestData}>search</button>
                </div>
                <div hidden={ tab !== "most-popular" }>
                    {/* introduce option to select between viewed, emailed and shared, within the past day, week and month */}
                    <select className="font" onChange={(e)=>setMost(e.target.value)}>
                        <option value={`viewed/${days}`}>Most viewed</option>
                        <option value={`emailed/${days}`}>Most emailed</option>
                        <option value={`shared/${days}/facebook`}>Most shared on facebook</option>
                    </select>
                    <select className="font" onChange={(e)=>updateMost(e, most)}> 
                        <option value="1">Day</option>
                        <option value="7">Week</option>
                        <option value="30">Month</option>
                    </select>
                    <button className="font request-button" onClick={requestData}>search</button>
                </div>
                <div hidden={ tab !== "article-search" }>
                    {/* article search bar & submit button */}
                    <input className="font" value={searchBarInfo} placeholder="Type keywords here" 
                        onChange={(e)=>{setSearchBarInfo(e.target.value)}}></input>
                    <button className="font request-button" onClick={requestData}>search</button>
                </div>
            </div>
            {/* main frame where articles will be displayed */}
            <div className = "nytimes-main-frame">
                {/* real-time-feed/default */}
                    <div className="nytimes-display-frame" id="display-real-time-feed" hidden={ tab !== "real-time-feed" }>
                        { RTFarticles.map((article, i) => (
                            <div key={i} className="article-row">
                                <div className="article-headline">{article.headline}</div>
                                <div className="article-byline">{article.byline}</div>
                                <div className="article-date">{article.date_published}</div>
                                <div className="article-hidden">
                                    <div className="article-abstract hide">{article.abstract}</div>
                                    <div className="article-section hide">section: {article.section}</div>
                                    <div className="article-url hide"><a className="font" href={article.nyt_url}>go to article!</a></div>
                                </div>
                                <img className="bookmark-btn" src={BookmarkTag}/>
                                {/* <img className="bookmark-btn" src={BookmarkTag} onClick={saveBM}/> */}
                            </div>
                        ))}
                    </div>
                {/* top-stories display, hidden until tab gets clicked */}
                    <div className="nytimes-display-frame" id="display-top-stories" hidden={ tab !== "top-stories" }>
                        { TSarticles.map((article, i) => (
                            <div className="article-row" key={i}>
                                <div className="article-headline">{article.headline}</div>
                                <div className="article-byline">{article.byline}</div>
                                <div className="article-date">{article.date_published}</div>
                                <div className="article-hidden">
                                    <div className="article-kicker hide">{article.kicker}</div>
                                    <div className="article-abstract hide">{article.abstract}</div>
                                    <div className="article-section hide">section: {article.section}</div>
                                    <div className="article-subsection hide">subsection: {article.subsection}</div>
                                    <div className="article-url hide"><a href={article.nyt_url}>go to article</a></div>
                                </div>
                                <img className="bookmark-btn" src={BookmarkTag}/>
                                {/* <img className="bookmark-btn" src={BookmarkTag} onClick={saveBM}/> */}
                            </div>
                        ))}
                    </div>
                {/* most-popular display, hidden until gets clicked */}
                    <div className="nytimes-display-frame" id="display-most-popular" hidden={ tab !== "most-popular" }>
                        { MParticles.map((article, i) => (
                            <div key={i} className="article-row">
                                <div className="article-headline">{article.headline}</div>
                                <div className="article-byline">{article.byline}</div>
                                <div className="article-date">{article.date_published}</div>
                                <div className="article-hidden">
                                    <div className="article-abstract hide">{article.abstract}</div>
                                    <div className="article-section hide">section: {article.section}</div>
                                    <div className="article-subsection hide">subsection: {article.subsection}</div>
                                    <div className="article-source hide">{article.source}</div>
                                    <div className="article-url hide"><a href={article.nyt_url}>go to article</a></div>
                                </div>
                                <img className="bookmark-btn" src={BookmarkTag}/>
                                {/* <img className="bookmark-btn" src={BookmarkTag} onClick={saveBM}/> */}
                            </div>
                        ))}
                    </div>
                {/* article-search display, hidden until gets clicked */}
                    <div className="nytimes-display-frame" id="display-article-search" hidden={ tab !== "article-search" }>
                        { ASarticles.map((article, i) => (
                            <div key={i} className="article-row">
                                <div className="article-headline">{article.headline}</div>
                                <div className="article-byline">{article.byline}</div>
                                <div className="article-date">{article.date_published}</div>
                                <div className="article-hidden">
                                    <div className="article-blurb hide">{article.blurb}</div>
                                    <div className="article-abstract hide">{article.abstract}</div>
                                    <div className="article-url hide"><a href={article.nyt_url}>go to article</a></div>
                                </div>
                                <img className="bookmark-btn" src={BookmarkTag}/>
                                {/* <img className="bookmark-btn" src={BookmarkTag} onClick={saveBM}/> */}
                            </div>
                        ))}
                    </div>
                {/* bookmarks display, hidden until tab gets clicked */}
                    {/* <div className="nytimes-display-frame" id="display-bookmarks" hidden={ tab !== "bookmarks" }>
                        { BMarticles.map((article, i) => (
                            <div key={i} className="article-row">
                                <div className="article-headline">{article.headline}</div>
                                <div className="article-byline">{article.byline}</div>
                                <div className="article-date">{article.date_published}</div>
                                <div className="article-hidden">
                                    <div className="article-blurb hide">{article.blurb}</div>
                                    <div className="article-kicker hide">{article.kicker}</div>
                                    <div className="article-abstract hide">{article.abstract}</div>
                                    <div className="article-section hide">{article.section}</div>
                                    <div className="article-subsection hide">{article.subsection}</div>
                                    <div className="article-source hide">{article.source}</div>
                                    <div className="article-url hide"><a href={article.nyt_url}>go to article</a></div>
                                </div>
                                <img className="bookmark-btn" src={BookmarkTag} onClick={saveBM}/>
                            </div>
                        ))}
                    </div> */}
            </div>
        </div>
        
    )
}

//TODOS
// - fetch and render timing
// - typeDefs
// - resolvers
// - gql strings
// - 
// 
// 
