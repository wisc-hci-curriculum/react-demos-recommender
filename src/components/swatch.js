import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';

class Swatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likeStatus : ""
        };
    }

    updateLikeStatus(likeDislike) {
        this.props.likePressed(likeDislike,this.props.hexCode);
        (likeDislike) ? this.setState({likeStatus: "👍"}) :
        this.setState({likeStatus: "👎"});
    }

    render() {
        let style = {backgroundColor: this.props.hexCode};
        return (
            <div className="swatch" style={style}>
            <p className="swatch-like">{this.state.likeStatus}</p>
            <button className="btn btn-outline-secondary button-like-dislike" 
            onClick={() => {this.updateLikeStatus(true)}}><span>👍</span></button>
            <button className="btn btn-outline-secondary button-like-dislike" 
            onClick={() => {this.updateLikeStatus(false)}}><span>👎</span>
            </button>
          </div>
        )
    }
}

export default Swatch