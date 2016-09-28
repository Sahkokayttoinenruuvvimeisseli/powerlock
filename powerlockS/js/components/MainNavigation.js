import React from 'react';

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

export default class MainNavigation extends React.Component {
    render() {
        return (
            <Nav bsStyle="tabs">
                <NavItem href="#/Persons">Henkilöt</NavItem>
                <NavItem href="#/Tools">Työkalut</NavItem>
                <NavItem href="#/ToolUses">Leimaukset</NavItem>
            </Nav>
        )
    }
}