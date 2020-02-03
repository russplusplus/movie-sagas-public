import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {

    getMovieGenres = () => {
        this.props.dispatch({
            type: 'FETCH_MOVIE_GENRES',
            payload: this.props.reduxState.selectedMovie
        })
    }

    navHome = () => {
        this.props.history.push('/');
    }

    navToEdit = () => {
        this.props.history.push('/Edit');
    }

    componentDidMount() {
        this.getMovieGenres();
    }
  // Renders the entire app on the DOM
    render() {
        
        let movie = this.props.reduxState.selectedMovie;
        let genres = this.props.reduxState.selectedGenres;
        console.log('id:', movie.id)
        
        console.log('genres: ', genres)
        return (
        <div>
            <button onClick={this.navHome}>Home</button>
            <button onClick={this.navToEdit}>Edit</button>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <ul>
                {genres.map((genre, index) => {
                    return( <li key={index}>{genre.name}</li> )
                })}
            </ul>
            
        </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
})

export default connect(mapStateToProps)(Details);