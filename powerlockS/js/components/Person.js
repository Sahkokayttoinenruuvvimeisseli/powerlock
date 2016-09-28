
import React from 'react';
var Button = require('react-bootstrap').Button;
var TagChooser = require('./TagChooser.js');
var NavLayout = require("./NavLayout");
import { UploadManager } from 'react-file-uploader';
import { Receiver } from 'react-file-uploader';
import { UploadHandler } from 'react-file-uploader';
import PageLayout from './PageLayout';
import Select from 'react-select';

class Person extends React.Component {
    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            Personid: this.props.params.personid,
            Firstname: "",
            Lastname: "",
            Tag: "",
            Tooloptions: [],
            Persontools: [],
            tagChooserExpanded: false
        }
        this.loadTools();
        if (this.state.Personid) {
            this.loadPerson(this.props.params.personid);

        } else {
            this.createNewPerson();
        }
    }
    handleSave() {
        this.props.history.push('/persons');
    }

    loadPerson(personId) {
        var that = this;
        $.post("./api",
            {
                query: '{ \
                    Person:Persons (Personid: ' + personId + ') { Firstname Lastname Tag Tools { Id Name } } \
                }'
            }, function (data) {
                if (data.data.Person) {
                    that.setState({
                        Firstname: data.data.Person[0].Firstname,
                        Lastname: data.data.Person[0].Lastname,
                        Tag: data.data.Person[0].Tag
                    });
                }
            });
    }

    editPerson(data) {
        var that = this;
        var queryParameterns = "";
        var sendQuery = false;

        if (data.Personid) {
            queryParameterns += 'Personid:' + data.Personid;
            sendQuery = true;
        }
        if (data.Firstname) {
            queryParameterns += 'Firstname:"' + data.Firstname + '"';
            sendQuery = true;
        }
        if (data.Lastname) {
            queryParameterns += ' Lastname:"' + data.Lastname + '"';
            sendQuery = true;
        }
        if (data.Tag) {
            queryParameterns += ' Tag:"' + data.Tag + '"';
        }

        if (sendQuery && data.Personid) {
            $.post("./api",
                {
                    query: '{ \
                    Person: EditPerson (' + queryParameterns + ') { Firstname Lastname } \
                }'
                }, function (data) {
                    if (data.data.Person) {
                        that.setState({
                            Firstname: data.data.Person.Firstname,
                            Lastname: data.data.Person.Lastname
                        });
                    }
                });
        }
    }

    addTool() {

    }

    loadTools() {
        var that = this;

        $.post("./api", {
            query: '{ \
                Tools { Id Name } \
            }',
        }, function (data) {
            if (data.data.Tools) {
                data.data.Tools.forEach(function (tool) {
                    that.state.Tooloptions.push({
                        value: tool.Id,
                        label: tool.Name
                    });
                });
            }
        });
    }

    //loadPersonTools() {
    //    var that = this;

    //    $.post("./api", {
    //        query: '{ \
    //             \
    //        }'
    //    }, function (data) {

    //    });
    //}

    createNewPerson() {
        var that = this;
        console.log(this);
        $.post("./api", {
            query: '{ \
                Person: CreatePerson { Id Firstname Lastname Tag } \
            }'
        },
            function (data) {
                if (data.data.Person) {
                    that.setState({
                        Personid: data.data.Person.Id
                    });
                    that.props.history.push('/person/' + data.data.Person.Id);
                }
            });
    }

    changeFirstName(event) {
        this.setState({
            Firstname: event.target.value
        });

        this.editPerson({
            Personid: this.state.Personid,
            Firstname: event.target.value
        });
    }

    changeLastName(event) {
        this.setState({
            Lastname: event.target.value
        });
        this.forceUpdate();
        this.editPerson({
            Personid: this.state.Personid,
            Lastname: event.target.value
        });
    }

    changeTag(event) {
        this.setState({
            Tag: event.target.value
        });
        this.editPerson({
            Personid: this.state.Personid,
            Tag: event.target.value
        });
    }

    removePerson() {
        var that = this;

        if (this.state.Personid) {
            $.post("./api", {
                query: '{ \
            RemovePerson(Id: ' + this.state.Personid + ') }'
            }, function (data) {
                
                });
            this.props.history.push('/persons');
        }
    }

    handleExpandClick() {
        if (this.state.tagChooserExpanded) {
            this.setState({
                tagChooserExpanded: false
            });
        } else {
            this.setState({
                tagChooserExpanded: true
            });
        }
    }

    handleOnUploadEnd() {

    }

    handleIsOpen() {

    }

    handleOnDragEnter() {

    }

    handleOnDragLeave() {

    }

    handleOnFileDrop(e) {
        console.log(e);
    }

    handleOnUploadEne() {

    }

    handleOnDragOver() {

    }

    toolsChange(e) {
        //console.log(e);
        for (var i = 0; i < this.state.Persontools.length; i++) {
            var found = false;
            for (var x = 0; x < e.length; x++) {
                if (this.state.Persontools[i].value === e[x].value) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log(this.state.Persontools[i]);
                this.removePersonTool(this.state.Persontools[i].value);
                this.state.Persontools.splice(i, 1);                
            }
        }
        for (var i = 0; i < e.length; i++) {
            var found = false;
            for (var x = 0; x < this.state.Persontools.length; x++) {
                if (this.state.Persontools[x].value === e[i].value) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log(e[i]);
                this.insertPersonTool(e[i].value);
                this.state.Persontools.push(e[i]);                
            }
        }

        this.forceUpdate();

        e.forEach(function (option) {

        });

        this.setState({
            Persontools: e
        });

    }

    insertPersonTool(toolId) {
        $.post("./api", {
            query: '{ \
            InsertPersonTool(Personid: ' + this.state.Personid + ' Toolid: ' + toolId + ') }'
        }, function (data) {

        });
    }

    removePersonTool(toolId) {
        $.post("./api", {
            query: '{ \
            RemovePersonTool(Personid: ' + this.state.Personid + ' Toolid: ' + toolId + ') }'
        }, function (data) {

        });
    }

    render() {

        var options = [
            {
                value: 1,
                label: "Vasara"
            },
            {
                value: 2,
                label: "Saha"
            }
        ];

        return (
            <PageLayout header="Person" style={{ width: "50%" }} >
                <input className="form-control" type="text" placeholder="Etunimi" value={this.state.Firstname} onChange={this.changeFirstName.bind(this) } />
                <input className="form-control" type="text" placeholder="Sukunimi" value={this.state.Lastname} onChange={this.changeLastName.bind(this) } />
                <input className="form-control" type="text" placeholder="Tag" value={this.state.Tag} onChange={this.changeTag.bind(this) } />
                <h5>Työkalut joita henkilö saa käyttää.</h5>
                <div>
                    <Select
                        name="form-field-name"
                        value={this.state.Persontools}
                        options={this.state.Tooloptions}
                        onChange={this.toolsChange.bind(this)} multi={true}
                        />
                </div>
                <Button style={{ width: "50%" }} onClick={this.handleSave.bind(this) }>Tallenna</Button>
                <Button style={{ width: "50%" }} onClick={this.removePerson.bind(this) }>Poista</Button>
            </PageLayout>
        )
    }
}

module.exports = Person;


//<form action="upload" method="POST" encType="multipart/form-data">
//    <input name="userPhoto" type="file" />
//    <input type="text" name="personId" value={this.state.Personid} hidden />
//    <input type="submit"/>
//</form>
//    <UploadManager uploadUrl="/upload"  uploadHeader={<h1>asd</h1>} onUploadEnd={this.handleOnUploadEnd}  />
//    <Receiver isOpen={true} onDragOver={this.handleOnDragOver} onDragEnter={this.handleOnDragEnter} onDragLeave={this.handleOnDragLeave} onFileDrop={this.handleOnFileDrop}>
//        <div>asd</div>
//    </Receiver>