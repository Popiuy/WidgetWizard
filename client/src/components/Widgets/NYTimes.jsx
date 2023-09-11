import { useState, useEffect } from 'react';
import NYTapiLogo from '../../images/nytimes_api_logo.png';
import BookmarkTag from '../../images/bookmark.png'
// useMutation to ADD_BOOKMARK
// useQuery to GET_BOOKMARKS
import { useQuery, useMutation } from '@apollo/client';
import { BOOKMARK_ARTICLE } from '../../utils/mutations';
import { GET_NYT_BOOKMARKS } from '../../utils/queries';

export default function NYTimesWidget () {

    const [tab, setTab] = useState('real-time-feed');
    const [section, setSection] = useState('home');
    const [days, setDays] = useState(7);
    const [most, setMost] = useState(`viewed/${days}`);
    const [searchBarInfo, setSearchBarInfo] = useState('');
    const [url, setUrl] = useState('');
    const [articles, setArticles] = useState([]);
    const sections = ['all','arts', 'automobiles', 'books/review', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']
    const {loading, bmdata } = useQuery(GET_NYT_BOOKMARKS);
    const [bookmarkArticle, {error}] = useMutation(BOOKMARK_ARTICLE)



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

    const searchClick = async () => {
        const ASdata = await fetchData(url);
        console.log(ASdata.response.docs);
        const ASarticles = ASconverter(ASdata.response.docs)
        setArticles(ASarticles);
    };

    const ASconverter = (NYTdata) => {
        const articles = NYTdata.map((article) => ({
            headline: article.headline.main,
            byline: article.byline.original,
            date_published: article.pub_date,
            abstract: article.abstract,
            blurb: article.kicker,
            nyt_url: article.web_url
        }));
        return articles;
    } 
    //headline, byline, date published, abstract, blurb, url
    const TSconverter = (NYTdata) => {
        const articles = NYTdata.map((article) => ({
            headline: article.title,
            byline: article.byline,
            date_published: article.published_date,
            kicker: article.kicker,
            abstract: article.abstract,
            section: article.section,
            subsection: article.subsection,
            nyt_url: article.url
        }));
        return articles;
    } 

    const RTSconverter = (NYTdata) => {
        const articles = NYTdata.map((article) => ({
            headline: article.title,
            byline: article.byline,
            date_published: article.published_date,
            abstract: article.abstract,
            section: article.section,
            nyt_url: article.url
        }));

        return articles;
    } 
    const MPconverter = (NYTdata) => {
        const articles = NYTdata.map((article) => ({
            headline: article.title,
            byline: article.byline,
            date_published: article.published_date,
            abstract: article.abstract,
            section: article.section,
            source: article.source,
            subsection: article.subsection,
            nyt_url: article.url
        }));

        return articles;
    } 
    const saveBM = async (article)=>{
        //bookmarkArticle will return nyt_bookmarks array, and also refetch bmdata
        const bms = await bookmarkArticle({
            variables: {
                NYTarticleData: {...article}
            },
            refetchQueries: [GET_NYT_BOOKMARKS]
        });
    }

    useEffect(()=>{
        const makeRequest = async () => {
            switch (tab) {
                case "real-time-feed": //done
                    setUrl(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const RTSdata = await fetchData(url)
                    const RTSarticles = await RTSconverter(RTSdata.results);
                    console.log('RTSdata.results: ', tab, RTSdata.results);
                    console.log(url)
                    console.log('RTSarticles: ', tab, RTSarticles);
                    setArticles(RTSarticles);
                    break;
                case "top-stories": //
                    setUrl(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const TSdata = await fetchData(url);
                    const TSarticles = await TSconverter(TSdata.results);
                    console.log('TSdata.results: ',section, TSdata.results)
                    console.log(url)
                    console.log('TSarticles: ',section, TSarticles)
                    setArticles(TSarticles)
                    break;
                case "most-popular": //done
                    setUrl(`https://api.nytimes.com/svc/mostpopular/v2/${most}.json?api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    const MPdata = await fetchData(url);
                    const MParticles = await MPconverter(MPdata.results);
                    console.log('MPdata.results: ', MPdata.results);
                    console.log(url)
                    console.log('MParticles: ',most, days, MParticles);
                    setArticles(MParticles);
                    break;
                case "article-search": 
                    setUrl(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchBarInfo}&fq=source:("The New York Times")&api-key=mSmLxowneVbMEuIyM8wkLqmMe06Gubv7`);
                    console.log('after: ', url);

                    //this one will be fetched on click of submit button
                    break;
                case "bookmarks": 
                    console.log(bmdata)
                    setArticles(bmdata); 
                    break;
            }
        }
        makeRequest();
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
            </div>
            <div className="nytimes-content">
                <div className="additional-queries">
                    <div hidden={ tab !== "top-stories" }>
                        {/* dropdown menu of sections */}
                        <select onChange={(e)=>setSection(e.target.value)}>
                            { sections.map((section, i) => <option value={section} key={i}>{section}</option>)}
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
             <div>{tab}</div>
                    { articles.map((article) => (
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
