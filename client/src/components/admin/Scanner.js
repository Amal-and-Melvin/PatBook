import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

export default class Scanner extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
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
        <h1 className="scannerResult">{this.state.result}</h1>
      </div>
    )
  }
}