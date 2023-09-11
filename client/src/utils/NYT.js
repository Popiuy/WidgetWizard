class NYTtoolbox {
    AS (NYTdata) {
        const articles = NYTdata.map((article) => ({
            headline: article.headline.main,
            byline: article.byline.original,
            date_published: article.pub_date,
            abstract: article.abstract,
            blurb: article.kicker,
            nyt_url: article.web_url
        }));
        return articles;
    };
    
    TS (NYTdata) {
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
    }; 
    
    RTS (NYTdata) {
        console.log(NYTdata);
        const articles = NYTdata.map((article) => ({
            headline: article.title,
            byline: article.byline,
            date_published: article.published_date,
            abstract: article.abstract,
            section: article.section,
            nyt_url: article.url
        }));
    
        return articles;
    };
    
    MP (NYTdata) {
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
    };

    
}





export default new NYTtoolbox;

