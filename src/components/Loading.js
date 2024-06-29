import React, { Component } from 'react'
import load from './load.gif'
export default class LoadingFile extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img src={load} alt="Loading" />
      </div>
    )
  }
}
