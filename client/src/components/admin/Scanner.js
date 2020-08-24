import React, { Component, useContext, useEffect } from "react";
import GlobalProvider from '../../context/GlobalState';
import QrReader from 'react-qr-reader'
import Axios from "axios";

export default class Scanner extends Component {
  state = {
    result: 'No result',
    userData: useContext(GlobalProvider)
  }
  
  scan = async (data)  =>{
    const getUser = await Axios.get("/admins/scan/"+data, {
      headers: { "x-auth-token": this.state.userData.token },
    });
    console.log("hhfidi");
    console.log(getUser);
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      this.scan(data);
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '30%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}