import { Component } from 'react';
import Loader from "react-loader-spinner";
import styles from './Loader.module.css';

export default class Loaders extends Component {
  //other logic
  render() {
    return (<div className={styles.containerLoader}><Loader
        type="Bars"
        color="#00BFFF"
        height={40}
        width={40}
        timeout={1000} //3 secs
      /></div>
      
    );
  }
}