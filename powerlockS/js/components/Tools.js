import React from 'react';
import PageLayout from './PageLayout';

var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var NavLayout = require("./NavLayout");

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Tools: []
        }
        this.findTools();
    }

    findTools() {
        var that = this;
        $.post("./api", {
            query: '{ \
                Tools { Id Name } \
            }'
        }, function (data) {
            if (data.data.Tools) {
                that.setState({
                    Tools: data.data.Tools
                });
            }
        });
    }

    render() {

        return (
            <PageLayout header="Työkalut">
                <ToolList Tools={this.state.Tools} />
                <Link to={"/Tool"}>
                    <Button>Luo uusi työkalu</Button>
                </Link>
            </PageLayout>
        )
    }
}

class ToolList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];

        this.props.Tools.forEach(function (tool) {
            rows.push(<ToolListItem Tool={tool} />);
        });
        return (
            <div>
                {rows}
                <div style={{ clear: "both" }} />
            </div>
        )
    }
}

class ToolListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var link = "/Tool/" + this.props.Tool.Id;
        return (
            <Link to={link} style={{ textDecoration: "none", float: "left", margin: "20px" }} >
                <div>
                    Nimi: {this.props.Tool.Name}
                </div>
            </Link>
        )
    }
}

module.exports = Tools;