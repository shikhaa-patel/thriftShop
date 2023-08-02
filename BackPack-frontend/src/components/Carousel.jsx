import React from 'react'

export default function Carousel(props) {
    const images=props.images
    const [,...image]=images
    return (
        <>
            <div className="carouselDiv">
                <div id="carouselExampleCaptions" className="carousel slide carousel-dark " data-bs-ride="false" style={{ width: `${props.width}`, height: `${props.height}`, margin: '0 auto' }}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true"></button>
                        {image.map((element, index) => {
                        return <button type="button" key={index} data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index+1} ></button>
                        })}
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={props.images[0]} className="d-block w-100" alt="..." style={{ width: `${props.width}`, height: `${props.height}`, margin: '0 auto' }} />
                        </div>

                        {image.map((element, index) => {
                            return <div className="carousel-item" key={index}>
                                <img src={element} className="d-block w-100" alt="..." style={{ width: `${props.width}`, height: `${props.height}`, margin: '0 auto' }} />
                            </div>
                        })}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}
