import React from 'react';
import { NavLink } from "react-router-dom";
import styles from '../Navigation/Navigation.module.css';
import routes from '../../routes';

const Navigation = () => {
    return (
        <div>
            <ul className={styles.containerLink}>
                <li><NavLink exact className={styles.link} activeClassName={styles.activelink} to={routes.home}>Home</NavLink></li>
                <li><NavLink className={styles.link} activeClassName={styles.activelink} to={routes.movies}>Movies</NavLink></li>
            </ul>
        </div>
    )
}

export default Navigation;
