import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
class TangkwaStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffId : '000001',
            firstName : 'Putthachart',
            lastName : 'Srisuwankun',
            position : 'Normal User'
        }
    }
    render() {
        return (
            <div className="App">
                <div className="tangkwaTitle"><h4><b>STATISTICS</b></h4></div>
                <div className="row flex-container tangkwaSetTable">
                    <div className="tkflex-1"><p>STAFF ID</p></div>
                    <div className="tkflex-2"><p>NAME</p></div>
                    <div className="tkflex-1"><p>POSITION</p></div>
                </div>

                <div className="row flex-container tangkwaSetData">
                    <Link to='StatisticsDetail' className="tkflex-1" ><div><p>{this.state.staffId}</p></div></Link>
                    <div className="tkflex-2"><p>{this.state.firstName} {this.state.lastName}</p></div>
                    <div className="tkflex-1"><p>{this.state.position}</p></div>
                </div>

            </div>
        );
    }
}

export default TangkwaStatistics;