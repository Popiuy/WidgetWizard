//fetch APOD
//src APOD


const APOD = {
    title: '',
    src: '',
    caption: '',
    photographer: '',
    description: '',
};


export default APOD = () => {
    return (
        <div>
            <div className="title">{APOD.title}</div> 
            <img className="astronomy-photo-of-the-day" src={APOD.src}></img>
            <div className="caption">{APOD.caption}</div> 
            <div className="photo-credit">{APOD.photographer}</div> 
            <div className="description">{APOD.description}</div> 
        </div>
    )
};