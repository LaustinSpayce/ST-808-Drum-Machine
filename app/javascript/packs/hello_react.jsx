// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { useState, useRef, useEffect, Component }  from 'react'
import ReactDOM from 'react-dom'
import Tone from "tone";

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.osc = new Tone.Synth().toMaster()
  }
  
  handleClick ()   {
    this.osc.triggerAttackRelease('C5', '8n')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          start
        </button>
      </div>
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  )
})