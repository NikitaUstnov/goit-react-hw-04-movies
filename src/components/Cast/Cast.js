import { Component } from 'react';
import axios from 'axios';
import styles from '../Cast/Cast.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '86d7387105b05ad2392fce9606e8270a';

export default class Cast extends Component {
    state = {
        cast: [],
    }

    async componentDidMount() {

        const response = await axios.get(`${BASE_URL}movie/${this.props.match.url.split('/', 3)[2]}/credits?api_key=${KEY}&language=en-US`)
        console.log(response.data);
        this.setState({ ...response.data })
        
        window.scrollTo({
                top: 500,
                behavior: 'smooth',
            });
    }

    render() {
        const casts = [...this.state.cast.slice(0, 9)] 
        return (
            <div>
                <ul>{casts.map(cast => {
                    const { id, profile_path, name, character} = cast;
                    return (<li className={styles.listCast} key={id}>
                        <img src={`https://image.tmdb.org/t/p/original/${profile_path}`} alt="profile" />
                        <p className={styles.nameCast}>{name}</p>
                        <p className={styles.characterCast}>Character: {character}</p>
                    </li>)
                    
                })}
                </ul>
            </div>
        )
    }
}
