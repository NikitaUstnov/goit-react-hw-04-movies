import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../services/SearchBar/SearchBar.module.css';

export default class SearchBar extends Component {
    state = {
        movies: ''
    }

     handleSubmit = event => {
        event.preventDefault();

        if (this.state.movies.trim() === '') {
            toast.error("Enter correct value!");
            return;
         }
         
        this.props.onSubmit(this.state.movies);
        this.setState({ movies: '' });
    }

    handleNameChange = event => {
        this.setState({ movies: event.currentTarget.value.toLowerCase() });
    }

    render() {
        return (
            <div>
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    <input
                        className={styles.searchFormInput}
                        type="text"
                        autoComplete="off"
                        value={this.state.movies}
                        autoFocus
                        placeholder="Search movie"
                        onChange={this.handleNameChange}
                    />
                    <button type="submit" className={styles.searchFormButton}>
                        <span className={styles.searchFormButtonLabel}>Search</span>
                    </button>
                </form>
            </div>
        )
    }
}