export default {
    SET_MOVIES(state, movies) {
        state.movies = movies
    },
    SET_MOVIE(state, movie) {
        console.log("🚀 ~ file: mutations.js ~ line 6 ~ SET_MOVIE ~ movie", movie)
        state.movie = movie
    }
    
}