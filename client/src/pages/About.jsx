// import React from 'react';
import minhee from '../images/minhee.jpeg'
import justin from '../images/justin.jpg'
import ryan from '../images/ryan.png'
import virginia from '../images/virginia.jpg'

const About = () => {
    const cardStyle = {
        width: '18rem'
    };

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-2">
                <div className="col d-flex justify-content-center">
                    <div className="card" style={cardStyle}>
                        <img src={minhee} className="card-img-top" alt="Minhee's pfp"></img>
                        <div className="card-body">
                            <h5 className="card-title">Minhee Chung</h5>
                            <a href="https://www.linkedin.com/in/minhee-chung/" target="_blank" className="btn btn-space btn-primary">LinkedIn</a>
                            <a href="https://github.com/mchung03" target="_blank" className="btn btn-space btn-primary">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card" style={cardStyle}>
                        <img src={ryan} className="card-img-top" alt="Ryan's pfp"></img>
                        <div className="card-body">
                            <h5 className="card-title">Ryan Payne</h5>
                            <a href="https://www.linkedin.com/in/ryan-payne-218378280/" target="_blank" className="btn btn-space btn-primary">LinkedIn</a>
                            <a href="https://github.com/Popiuy" target="_blank" className="btn btn-space btn-primary">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card" style={cardStyle}>
                        <img src={justin} className="card-img-top" alt="Justin's pfp"></img>
                        <div className="card-body">
                            <h5 className="card-title">Justin Choi</h5>
                            <a href="https://www.linkedin.com/in/justinschoi93/" target="_blank" className="btn btn-space btn-primary">LinkedIn</a>
                            <a href="https://github.com/justinschoi93" target="_blank" className="btn btn-space btn-primary">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card" style={cardStyle}>
                        <img src={virginia} className="card-img-top" alt="Minhee's pfp"></img>
                        <div className="card-body">
                            <h5 className="card-title">Virginia Freitas</h5>
                            <a href="https://www.linkedin.com/in/virginia-freitas/" target="_blank" className="btn btn-space btn-primary">LinkedIn</a>
                            <a href="https://github.com/virginiafreitas" target="_blank" className="btn btn-space btn-primary">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;