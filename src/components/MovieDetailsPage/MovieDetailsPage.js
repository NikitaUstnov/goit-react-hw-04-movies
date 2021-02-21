import { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from '../MovieDetailsPage/MovieDetailsPage.module.css'
import { Route, NavLink } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import routes from '../../routes';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '86d7387105b05ad2392fce9606e8270a';

export default class MovieDetailsPage extends Component {
    state = {
        movie: [],
        title: null,
        overview: null,
        poster_path: null,
        genres: []
    }

    async componentDidMount() {
        const { movieId } = this.props.match.params;

        const response = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${KEY}&language=en-US`)
       // console.log(response.data);
       this.setState({...response.data})
    }

    handleGoBack = () => {
        const { location, history } = this.props;
        if (location.state && location.state.from) {
            return history.push(location.state.from)
        }

     history.push(routes.movies);
    
        /* const { state } = this.props.location;
    if (state && state.from) {
        this.props.history.push(state.from);
        return;
    }

        this.props.history.push({ pathname: `/movies/${this.props.match.params.movieId}` }); */
  };


    render() {
        const { title, overview, genres, poster_path, vote_average} = this.state;
        return (
            <div>
                <button type="buutton" onClick={this.handleGoBack}>Go back</button>
                <ul className={styles.containerInfo}>
                    <li className={styles.containerInfoItem}>
                        <img className={styles.imageInfo} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="poster" />
                        <div className={styles.containerAboutMovie}>
                            <h1 className={styles.title}>{title}</h1>
                            <p> User score:
                            <span> {vote_average} </span>
                            </p>
                            <ul>
                                <li>
                                    <h2 className={styles.subtitle}>Overview:</h2>
                                    <p className={styles.description}>{overview}</p>
                                </li>
                            </ul>
                            <h2 className={styles.subtitle}>Genres:</h2>
                            <ul className={styles.genres}>
                                {genres !== undefined && genres.map(element => {                        
                                    const { name } = element;
                                    return (
                                        
                                        <li className={styles.genresItem} key={uuidv4()}>
                                            <div className={styles.descriptionGenre}>{name}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        
                    </li>
                </ul>
                <div className={styles.containerLink}>
                    <h2 className={styles.titleInfo}>Additional information</h2>
                    <ul>
                        <li><NavLink className={styles.link} to={`${this.props.match.url}/credits`}>Cast</NavLink></li>
                        <li><NavLink className={styles.link} to={`${this.props.match.url}/reviews`}>Reviews</NavLink></li>
                    </ul>
                    
                </div>
                <Route path={`${this.props.match.url}/credits`} component={Cast} />
                <Route path={`${this.props.match.url}/reviews`} component={Reviews} />
            </div>
        )
    }
}
