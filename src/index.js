import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios'
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies);
    yield takeEvery('FETCH_MOVIE_GENRES', fetchMovieGenres);
    yield takeEvery('UPDATE_MOVIE', updateMovie);
}

function* updateMovie(action) {
    yield axios.put(`/movies`, {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description
    })
    yield put({
        type: 'FETCH_MOVIES'
    })

}

function* fetchMovieGenres(action) {
    let response = yield axios.get(`/movies/${action.payload.title}`)
    yield put({
        type: 'SELECT_GENRES',
        payload: response.data
    })
}

function* fetchMovies() {
    let response = yield axios.get('/movies')
    yield put({
        type: 'SET_MOVIES',
        payload: response.data
    })
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store current selected movie for Details and Edits pages
const selectedMovie = (state = '', action) => {
    switch (action.type) {
        case 'SELECT_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

const selectedGenres = (state = [], action) => {
    switch(action.type) {
        case 'SELECT_GENRES':
            return action.payload;
        default: 
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        selectedGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
