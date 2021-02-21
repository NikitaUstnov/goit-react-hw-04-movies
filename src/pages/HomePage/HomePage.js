import { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from '../HomePage/HomePage.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '86d7387105b05ad2392fce9606e8270a';

export default class HomePage extends Component {
    state = {
        movies: [],
    }

    async componentDidMount() {
        const response = await axios.get(`${BASE_URL}trending/movie/day?api_key=${KEY}`)
       // console.log(response.data);
        this.setState({movies: response.data.results})
    }
  

    render() {
        const { movies } = this.state;
        return (
            <div>
                <h1>Tranding today</h1>
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
                    ))}</ul>
                )}
            </div>
        )
    }
}
