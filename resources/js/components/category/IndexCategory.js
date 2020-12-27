import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

export default class IndexCategory extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Footer />
            </div>
        );
    }
}