import React from 'react';
import PageLayout from './PageLayout';

var Link = require('react-router').Link;

class ToolUses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Tooluses: []
        };
        this.findToolUsees();
    }

    findToolUsees() {
        var that = this;
        $.post("./api", {
            query: '{ \
                ToolUses { \
                    Person { Id Firstname Lastname } \
                    Tool { Id Name } \
                 } \
            }' 
        }, function (res) {
            if (res.data.ToolUses) {
                console.log(res.data.ToolUses);
                that.setState({
                    Tooluses: res.data.ToolUses
                });
            }
        });

    }

    render() {
        return (
            <PageLayout header="Leimaukset">
                <ToolUseList Tooluses={this.state.Tooluses} />
            </PageLayout>
        )
    }
}

class ToolUseList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];

        this.props.Tooluses.forEach(function (toolUse) {
            rows.push(<ToolUseListItem Tooluse={toolUse} />);
        });

        return (
            <div>
                {rows}
                <div style={{ clear: "both" }} />
            </div>
        )
    }
}

class ToolUseListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var link = "/Tooluse/" + this.props.Tooluse.Id;
        return (
            <Link to={link} style={{ textDecoration: "none", float: "left", margin: "20px" }}>
                <div>Etunimi: {this.props.Tooluse.Person.Firstname}</div>
                <div>Sukunimi: {this.props.Tooluse.Person.Lastname}</div>
                <div>Tyokalunnimi: {this.props.Tooluse.Tool.Name}</div>
            </Link>
        )
    }
}

module.exports = ToolUses;