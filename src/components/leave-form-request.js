import React, { Component } from 'react';
import '../App.css';
import DateComponent from './DateComponent';
import clock from '../Image/circular-clock.png';
// Or import the input component
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import StartdateCalendar from './StartdateCalendar';
import EnddateCalendar from './EnddateCalendar';
import { Redirect, browserHistory } from "react-router";
import { Link } from 'react-router';
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Calendar from './Calendar';
import axios from 'axios';

const FormHeader = props => {
    return (

        <React.Fragment>
            <div className="border-header">
                <div className="show-header">
                    LEAVE REQUEST FORM
            </div>
                <div className='header1'>
                    <div className='date-header'>
                        <img src={clock} width="30px" height="30px" className="icon-clock" />Today Date :
                    <DateComponent />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const Comment = props => {
    const { onChange, textlimit } = props
    return (
        <div className="row-of-comment">
            <div className="flex-container">

                <div className="text-note flex2">
                    Note/comments
                </div>
                <div className="text-area flex6">

                    <textarea className="textarea" maxLength="255" type="text" onChange={(event) => onChange('note', event.target.value, event.target.value.length)} />
                    
                    
                </div>
                <div className="flex2">
                    <p className="text-limit">{textlimit}/255</p>
                </div>
            </div>
        </div>
    )
}

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function (error) {
                reject(error)
            };
        } catch (error) {
            reject(error)
        }
    })
}


class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leavetype: "",
            isOneday: true,
            dayStart: '',
            dayEnd: '',
            len: 0,
            note: '',
            error : false,
            selectedFile : [] ,
            CheckTypeFile : false

        }
    };
    typehandler = (value) => {
        this.setState({
            leavetype: value
        })
        console.log('this is leave type', this.state.leavetype)
    }
    DayQuestionSetup = (value) => {
        this.setState({
            isOneday: value
        })
    }

    handleChangeOneDay = (id1, value, id2) => {
        this.setState({ [id1]: value })
        this.setState({ [id2]: value })
        console.log("this is date", this.state.dayEnd, this.state.dayStart)
    }

    handleChangeMoreDayStart = (id, value) => {
        this.setState({ [id]: value })
        console.log("this is date", this.state.dayEnd, this.state.dayStart)
    }
    handleChangeMoreDayEnd = (id, value) => {
        this.setState({ [id]: value })
        console.log("this is date", this.state.dayEnd, this.state.dayStart) 
    }

    handleChangeComment = (id, value, count) => {

        this.setState({ [id]: value })
        this.setState({ len: count })

        console.log(this.state.note)
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: Array.from(event.target.files) }, this.checkTypeofFile)

    }
    checkTypeofFile = () => {
        let i = 0
        for (i = 0; i < (this.state.selectedFile.length); i++) {
            var ext = this.state.selectedFile[i].type
            if (ext != "image/jpeg") {
                this.setState({ CheckTypeFile: false })
                alert('You can only use .jpg file!')
                break;
            }
            else {
                this.setState({ CheckTypeFile: true })
            }
        }
        console.log('number of i', i)
        if (i > 3) {
            alert("You can only upload up to 3 images! \n please try again")
        }
    }

    handleCheckSubmit = () => {
        var isAfter = moment(this.state.dayStart).isAfter(moment().format());
        console.log(isAfter)
        if (this.state.isOneday == true ) {
            var isAfter = moment(this.state.dayStart).isAfter(moment().format());
            console.log(isAfter)
            if (isAfter == false || this.state.dayStart == 'Invalid dat' || this.state.dayEnd == 'Invalid dat' || this.checkTypeofFile == false) {
                alert('Incorrect or incomplete information!.')
                
            }
            else {
                this.handleSendData()
            }
        }

    }
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            try {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result)
                };
                reader.onerror = function (error) {
                    reject(error)
                };
            } catch (error) {
                reject(error)
            }
        })
    }

    handleSendData = async event => {
        // let Base64File = this.getBase64(this.state.selectedFile[0])
        axios.post('https://managemate.azurewebsites.net/api/Leave/LeaveInfo', {
            "leaveID" : 0,
            "staffID" : 0,
            "firstnameEN" : "tangkwa",
            "lastnameEN" : "tangkwa",
            "role" :0,
            "leaveType" : this.state.leavetype,
            "leaveStartDateTime" : this.state.dayStart,
            "leaveEndDateTime" : this.state.dayEnd,
            "leaveStatus" : "pending",
            "leaveComment" : this.state.note,
            "approvedBy" : 0,
            "approvedTime" : "2019-02-25T11:55:50.106Z",
            "leaveFile1" : "File",
            "leaveFile2" : "string",    
            "leaveFile3" : "string",

        }, {
                onUploadProgress: ProgressEvent => {
                    if ((ProgressEvent.loaded / ProgressEvent.total * 100) === 100) {
                        alert("Data has been sent!.");
                        browserHistory.push('/')

                    }

                }
            })
            .then(function (response) {
            })
    }


    render() {
        return (

            <div>
                <FormHeader />
                <div className='flex-container'>

                    <div className='select-livetype-text flex2'>
                        Select your live type
                </div>
                    <div className="TypeSelect">
                        <div className="dropdown-oneday">
                            <select className="option-time" onChange={(event) => this.typehandler(event.target.value)} >
                                <option value={'SICK LEAVE'}>SICK LEAVE</option>
                                <option value={'ANNUAL LEAVE'}>ANNUAL LEAVE</option>
                                <option value={'LEAVE WITH OUT PAY'}>LEAVE WITH OUT PAY</option>
                                <option value={'ETC'}>ETC</option>
                                <option value={'ETC'}>ETC</option>
                            </select>
                    </div>
                    </div>
                    
                </div>
                <div className="row-DayQuestion">
                    <div className="flex-container">

                        <div className=" dayrequest-text flex2">
                            Day Requested
                        </div>
                        <div className="DayTypeSelect">
                            <input className='form-check-input1' type="radio" onChange={() => this.DayQuestionSetup(true)} checked={this.state.isOneday === true} />
                            <label className="form-check-label-Oneday">
                                One day
                         </label>
                            <input className="form-check-input2" type="radio" onChange={() => this.DayQuestionSetup(false)} checked={this.state.isOneday === false} />
                            <label className="form-check-label-Moreday">
                                More than one day
                         </label>
                        </div>
                    </div>
                </div>


                <div className="flex-container">
                    {this.state.isOneday && <div className="text-date">
                        Date
                            <Calendar onChange={this.handleChangeOneDay} id1={'dayStart'} id2={'dayEnd'} />
                    </div>}

                    {!this.state.isOneday && <div className="text-date">
                        Date
                            <StartdateCalendar  onChange={this.handleChangeMoreDayStart} id1={'dayStart'} />
                    </div>}
                    {!this.state.isOneday && <div className='text-date2'>
                        Date end
                            <EnddateCalendar onChange={this.handleChangeMoreDayEnd} id1={'dayEnd'}/>
                    </div>}

                </div>

                <div className='flex-container'>
                    <Comment value={this.state.note} onChange={this.handleChangeComment} textlimit={this.state.len} />
                </div>

                <div className='flex-container'>
                    <div className="input-file flex2">

                    <input type="file" onChange={this.fileChangedHandler} size="2MB" accept="image/jpeg" required multiple />
                    </div>
                </div>

                <div>
                        <button className="submit-button" onClick={this.handleCheckSubmit}>Send</button>
                </div>


            </div>



        );
    }
}

export default RequestForm;