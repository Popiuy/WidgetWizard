

export default function SoundCloudWidget (){
    return (
        <div>
            <iframe width="100%" height="600" scrolling="no" frameborder="no" allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1175646880&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
            </iframe>
            <div style={style1}>
                <a href="https://soundcloud.com/boxofcatsmusic" title="Box Of Cats" target="_blank" style={style2}>Box Of Cats</a>
                 · 
                <a href="https://soundcloud.com/boxofcatsmusic/bluri-daaayyy-boc130" title="Bluri - Daaayyy (BOC130)" target="_blank" style={style2}>
                    Bluri - Daaayyy (BOC130)
                </a>
            </div>
        </div>
)}


const style1 = {

    fontSize: 10, 
    color: "#cccccc",
    lineBreak: "anywhere",
    wordBreak: "normal",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: 100

};

const style2 = {
    
    color: "#cccccc",
    textDecoration: "none"
}