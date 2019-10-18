import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';

class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        console.log(this.props.hexCode);
    }

    render() {
        let style = {backgroundColor: this.props.hexCode};
        return (
            <div className="recommendation-output">
                <p className="recommendation-text">Your recommendation (Hex: {this.props.hexCode})</p>
                <div className="recommended-swatch" style={style}></div>
            </div>
        )
    }
}

export default Recommendation