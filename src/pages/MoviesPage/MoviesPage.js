import { Component } from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../../services/SearchBar';
import getQueryParams from '../../../src/utils/getQueryParams';
import axios from 'axios';
import styles from '../MoviesPage/MoviesPage.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '86d7387105b05ad2392fce9606e8270a';

export default class MoviesPage extends Component {
    state = {
        movies: '',
        name: ''
    }

    async componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    if (query) {
      this.fetchMovies(query);
    }
  }

    async componentDidUpdate(prevProps, prevState) {

        const { query: prevQuery } = getQueryParams(prevProps.location.search);
        const { query: nextQuery } = getQueryParams(this.props.location.search);

        if (prevQuery !== nextQuery) {
            this.fetchMovies(nextQuery);
        }
    }

    async fetchMovies(query) {
      const response = await axios.get(`${BASE_URL}search/movie?api_key=${KEY}&query=${query}&page=1&include_adult=false`)
      //console.log(response.data);
      this.setState({ movies: response.data.results})  
    }

    handleChangeQuery = query => {
        console.log(query);
        this.props.history.push({
            //   pathname: this.props.location.pathname,
            ...this.props.pathname,
            search: `query=${query}`,
        });
    };

    render() {
        const {movies} = this.state
        return (
            <div>
                <SearchBar onSubmit={this.handleChangeQuery} />
                {movies.length > 0 && (
                    <ul>{movies.map(movie => (
                        <li className={styles.listMovie} key={movie.id}>
                            <Link to={{
                                pathname: `/movies/${movie.id}`,
                                state: { from: this.props.location },
                            }}>
                                {movie.title}
                            </Link>
                        </li>
                    ))}
                    </ul>)}
            </div>
        )
    }
}
