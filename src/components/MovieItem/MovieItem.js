import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from 'react-redux';

class MovieItem extends Component {
  // Renders the entire app on the DOM

    onClick = () => {
        console.log('clicked')
        this.props.navToDetails()
        this.props.dispatch({
            type: 'SELECT_MOVIE',
            payload: this.props.movie
        })
    }

    render() {
        return (
        <div className='item-container'>
            <div>
                <img src={this.props.movie.poster} alt='ope!' onClick={this.onClick}></img>
            </div>
            <div className='details-container'>
                <div>
                    <h3>{this.props.movie.title}</h3>
                </div>
                <div>
                    <p>{this.props.movie.description}</p>
                </div>
            </div>
        </div>
        );
    }
}

export default connect()(MovieItem);