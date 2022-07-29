import React from "react";

import './index.css';

class Banner extends React.Component {
    componentDidMount() {
        let element = document.querySelector('.banner-bg img');
        const getImageSrc = element.getAttribute('src');

        let banner = document.querySelector('.banner-bg');
        banner.style.backgroundSize = 'cover';
        banner.style.backgroundImage = "url('"+ getImageSrc+"')";
    }

    render() {
        return (
            <div className="banner-bg-wrap">
                <div className="banner-bg">
                    <img src={this.props.img} />
                </div>
            </div>
        );
    }
}

export default Banner;