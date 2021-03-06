import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import axios from 'axios';
import clock from '../Image/circular-clock.png';
import DateComponent from './DateComponent';
const FormHeader = props => {
    return (

        <React.Fragment>
            <div className="border-header">
                <div className="show-header">
                    WITHDRAW REQUEST FORM
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
class TangkwaWithdrawReq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            bankNo: "",
            bankName: "",
            comment: ""
        }
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeBankNo = this.handleChangeBankNo.bind(this);
        this.handleChangeBankName = this.handleChangeBankName.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
    }
    handleChangeAmount(event) {
        this.setState({ amount: event.target.value });
        console.log("amount", this.state.amount)
    }
    handleChangeBankNo(event) {
        this.setState({ bankNo: event.target.value });
        console.log("bankNo", this.state.bankNo)
    }
    handleChangeBankName(event) {
        this.setState({ bankName: event.target.value });
        console.log("bankName", this.state.bankName)
    }
    handleChangeComment(event) {
        this.setState({ comment: event.target.value });
        console.log("Comment", this.state.comment)
    }
    handleSubmit = async event => {
        if (window.confirm("Are you sure to sent report?")) {
            axios.post('http://managemate.azurewebsites.net/WithdrawInfo', {
                "withdrawID": 0,
                "staffID": "1",
                "bankNo": this.state.bankNo,
                "bankName": this.state.bankName,
                "firstnameEN": "string",
                "lastnameEN": "string",
                "role": "1",
                "amount": this.state.amount,
                "withdrawComment": this.state.comment,
                "status" : "Pending",
                "idapproved" : "-"
            }, {
                    onUploadProgress: ProgressEvent => {
                        if ((ProgressEvent.loaded / ProgressEvent.total * 100) === 100) {
                            alert("Data has been sent!.");
                            browserHistory.push('/MywithdrawHistory')
                        }
                    }
                })
                .then(function (response) {
                })
                .catch((error) => {
                    console.log('this is error', error)
                    // handle error here
                })
        }
    }
    handleCancel = () => {
        if (window.confirm("Are you Cancel")) {
            browserHistory.push('/Statistics')
        }
    }

    handleCheck = () => {
        if (this.state.amount == '' || this.state.comment == '') {
            alert('Incorrect or incomplete information!.')
        }
        else {
            this.handleSubmit()
        }
    }
    render() {
        return (
            <div className="App">
                <FormHeader />
                <div className="flex-container">
                    <div className="tk1flex-0"></div>
                    <div className="tk1flex-1">
                        <div className="tangkwaTitle"><p>BANK NAME :</p></div>
                       <div className="tangkwaTitle"><p>BANK NO. :</p></div>
                        
                    </div>
                    <div className="tk1flex-8">
                        <div className="tangkwaTitle"><p>เดี๋ยวอันนี้จะดึงค่าจาก redux มาใส่ รอทำตอน authen</p></div>
                        <div className="tangkwaTitle"><p>เดี๋ยวอันนี้จะดึงค่าจาก redux มาใส่ รอทำตอน authen</p></div>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="tk1flex-0"></div>
                    <div className="tk1flex-1">
                        <div className="tangkwaTitle"><p>AMOUNT :</p></div>
                       <div className="tangkwaTitle"><p><span>COMMENT :</span></p></div>
                        <div className="tangkwaFile"><p>FILE :</p></div>
                    </div>
                    <div className="tk1flex-8">

                        <div className="tangkwaTitle"><input type="number" value={this.state.amount} onChange={this.handleChangeAmount} className="amount" /></div>

                        <div className="tangkwaTitle"><textarea value={this.state.comment} onChange={this.handleChangeComment} className="textarea" maxLength="255" type="text" /></div>
                    </div>
                </div>
                <div>
                    <button type="submit" value="Submit" onClick={this.handleCheck} className="Submit">Submit</button>
                    <button type="submit" value="Cancel" onClick={this.handleCancel} className="Cancel">Cancel</button>
                </div>
            </div>
        );
    }
}
export default TangkwaWithdrawReq;