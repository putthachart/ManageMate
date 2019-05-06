import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import axios from 'axios';
import { addWithdraw } from '../action'
import { connect } from 'react-redux'
class TangkwaApproveWithdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }
    componentDidMount() {
        axios.get('http://managemate.azurewebsites.net/GetWithdrawInfo')
            .then(res => {
                const person = res.data
                this.setState({ people: person })
                console.log("ttt", this.state.people)
                this.props.addWithdraw(person)
            })

            .catch((error) => {
                console.log('this is error', error)
                // handle error here
            })
    }
    render() {
        return (
            <div className="App">
                <div className="tangkwaTitle"><h4>APPROVE</h4></div>
                <div className="row flex-container tangkwaSetTable">
                    <div className="tkflex-1"><p><b>STATUS</b></p></div>
                    <div className="tkflex-1"><p><b>WITHDRAW ID</b></p></div>
                    <div className="tkflex-2"><p><b>NAME</b></p></div>
                    <div className="tkflex-1"><p><b>AMOUNT</b></p></div>
                    <div className="tkflex-1"><p><b>MANAGE BY</b></p></div>
                </div>
                {this.state.people.map(people => (<div className="row flex-container tangkwaSetData">
                    <div className="tkflex-1"><div className={`${people.status == 'Approved' ? 'tangkwaSetApprove' : people.status == 'Pending' ? 'tangkwaSetPending' : 'tangkwaSetReject'}`}><p><b>{people.status}</b></p></div></div>
                    <Link to={`/ApproveWithdrawDetail/${people.withdrawID}`} className="tkflex-1" ><div><p><b>{people.withdrawID}</b></p></div></Link>
                    <div className="tkflex-2"><p><b>{people.firstnameEN} {people.lastnameEN}</b></p></div>
                    <div className="tkflex-1"><p><b>{people.amount}</b></p></div>
                    <div className="tkflex-1"><p><b>{people.idapproved}</b></p></div>
                </div>))}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    addWithdraw: (withdraw) => dispatch(addWithdraw(withdraw))
})
const mapStateToProps = state => {
    console.log('statekkk', state.withdraw)
    return {
        people: state.withdraw
    }
}
export default connect(mapStateToProps,
    mapDispatchToProps)(TangkwaApproveWithdraw)