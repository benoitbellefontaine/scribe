import React, {Component} from 'react'
import {connect} from 'react-redux'
//import styled from 'styled-components'

/*
const OuterWrapper = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  min-width: 50%;
  font-size: 1.5vw;
  padding: 3em;
  background-color: white;
  box-shadow: 2px 2px 5px rgb(220,220,220);
`;
*/

class Home extends Component {
  render () {
    return (
      <div style={{
        height: '80vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '75%',
          minWidth: '50%',
          fontSize: '1.5vw',
          padding: '3em',
          backgroundColor: 'white',
          boxShadow: '2px 2px 5px rgb(220,220,220)',
          }}>
          <h1>Scribe</h1>
          <div style={{fontSize:'110%'}}>A simple approach to ticket creation</div>
          <br/>
          <div style={{fontFamily:'Quattrocento Sans',fontSize:'90%'}}><em>The Age of Typing is over. The Time of Clicking has come.</em></div>
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Home)
