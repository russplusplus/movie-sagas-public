import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import { connect } from 'react-redux';
import './Home.css';

class Home extends Component {
  // Renders the entire app on the DOM

    getMovies = () => {
        this.props.dispatch({type: 'FETCH_MOVIES'})
    }

    navToDetails = () => {
        this.props.history.push('/Details')
    }

    componentDidMount() {
        this.getMovies();
        console.log(this.props)
    }

    render() {
        return (
        <div className="Home">
            <ul className="movie-list">
            {/* {JSON.stringify(this.props.reduxState.movies)} */}
            {this.props.reduxState.movies.map((movie, index) => {
                return (
                    <li className="movie-item" key={index}>
                        <MovieItem movie={movie} navToDetails={this.navToDetails} key={index}/>
                    </li>
                )
            })}
            </ul>
        </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
})
  
export default connect(mapStateToProps)(Home);
  