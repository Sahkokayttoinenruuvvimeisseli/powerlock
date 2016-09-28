﻿
import React from 'react';
//import Button from "react-bootstrap";
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;
var Link = require('react-router').Link;
var FormControl = require('react-bootstrap').FormControl;

import PageLayout from './PageLayout';

class Persons extends React.Component {
    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            Persons: []
        }
        $.post("./api", {
            query: '{ \
            Persons { Id Firstname Lastname Tag } \
            }'
        },
            function (data) {
                if (data.data.Persons) {
                    console.log(data.data.Persons);
                    that.setState({
                        Persons: data.data.Persons
                    });
                }
            });
    }

    findPersons() {
        $.post("./api", {
            query: '{ \
            Persons { Firstname Lastname Tag } \
            }'
        },
        function (data) {
            if (data.data.Persons) {
                this.state = {
                    Persons: data.data.Persons
                }
            }
        });
    }

    personSelected(id) {
        console.log(id);
        this.setState({
            selectedPersonId: id
        });
    }

    render() {
        
        var rows = [];
        rows.push(<h1 key={5}>moi</h1>);
        
        return (
            <PageLayout header="Henkilöt">
                <PersonList selectedPersonId={this.state.selectedPersonId} Persons={this.state.Persons} onPersonSelected={this.personSelected.bind(this)}/>
                <Link style={{ clear: "both" }} to={"/person"}><Button>Luo uusi henkilö</Button></Link>
            </PageLayout>
        )
    }
}

class PersonList extends React.Component {
    handlePersonChange() {
        console.log(this);
        this.action(this.person.Id);
    }

    render() {
        var that = this;
        var rows = [];

        var tableStyle = {
            width: "50%",
            maxHeight: "500px",
            owerflow: "auto"
        };

        this.props.Persons.forEach(function (person) {
            var rowStyles = {};
            if (person.Id === that.props.selectedPersonId) {
                rowStyles.backgroundColor = "#dfdfdf";
            } else {
                rowStyles.backgroundColor = "#FFFFFF";
            }

            rows.push(<PersonListItem key={person.Id} Person={person} />);
        });
        console.log(rows);
        return (
            <div>
                {rows}
                <div style={{clear: "both"}} />
            </div>
        )
    }
}

class PersonListItem extends React.Component {

    render() {
        var link = "/Person/" + this.props.Person.Id;
        return (
            <Link to={link} style={{ textDecoration: "none", float: "left", margin: "20px" }}>
                <div >
                    <div>Etunimi: {this.props.Person.Firstname}</div>
                    <div>Sukunimi: {this.props.Person.Lastname}</div>
                    <div>Tag: {this.props.Person.Tag}</div>
                </div>
            </Link>
        )
    }
}


module.exports = Persons;