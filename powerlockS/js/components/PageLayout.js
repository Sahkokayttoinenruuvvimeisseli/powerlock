import React from 'react';

import MainNavigation from './MainNavigation';
import Header from './Header';
import Footer from './Footer';

//var MainNavigation = require('./MainNavigation.js');
var Button = require('react-bootstrap').Button;

export default class PageLayout extends React.Component {

    render() {

        return (
            <div style={{ width: "100%" }}>
                <Header />
                <h5>{this.props.header}</h5>
                <MainNavigation />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

module.exports = PageLayout;