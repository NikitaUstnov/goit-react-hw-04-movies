import { Component } from 'react';
import axios from 'axios';
import styles from '../Reviews/Reviews.module.css';

const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '86d7387105b05ad2392fce9606e8270a';

export default class Reviews extends Component {
    state = {
        reviews: [],
    }

    async componentDidMount() {

        const response = await axios.get(`${BASE_URL}movie/${this.props.match.url.split('/', 3)[2]}/reviews?api_key=${KEY}&language=en-US&page=1`)
        //console.log(response.data);
            this.setState({reviews: response.data.results})
    
    }

    render() {
        console.log(this.state.reviews)
        return (
            <div>
                {this.state.reviews.length > 0 && (
                    <ul className={styles.titleInfo}>
                        {this.state.reviews.map(item => {
                            const { id, author, content } = item;
                            return (<li className={styles.listCast} key={id}>
                                <p className={styles.nameCast}>Author: {author}</p>
                                <p className={styles.characterCast}>{content}</p>
                            </li>)
                    
                        })}
                    </ul>)}
                {this.state.reviews.length === 0 && <span className={styles.titleInfo}>We don't have any rewievs for this movie.</span>}
            </div>
        )
    }
}
