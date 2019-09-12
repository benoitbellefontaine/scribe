import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Spring, animated, config, Transition } from 'react-spring'
import styled from 'styled-components'

// http://www.moillusions.com/wp-content/uploads/2011/02/ESCHERLATOR2.gif


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

class Home extends Component {
  render () {
    return (
      <div style={{
        height: '80vh',
        height: '640px',
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
          width: '400px',
          //width: '800px',
          //maxWidth: '50vw',
          height: '366px',
          //height: '560px',
          //maxHeight: '50vh',
          fontSize: '1.5vw',
          padding: '3em',
          backgroundColor: 'white',
          background: 'url(https://media.giphy.com/media/l41lVsYDBC0UVQJCE/giphy.gif)',
          background: 'url(http://www.moillusions.com/wp-content/uploads/2011/02/ESCHERLATOR2.gif)',
          //background: 'url(app/images/davidontrump.PNG)', 
          backgroundSize: '380px 346px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          boxShadow: '5px 5px 10px rgb(220,220,240), -2px -2px 1px rgb(240,240,240)',
          boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.14)',
          //boxShadow: '-5px -5px 10px rgb(220,220,220)',
          borderRadius:'0',
          }}>
          <h1 style={{padding:5, borderRadius:10, backgroundColor:'rgba(0,0,0,0.75)',color:'white'}}>Scribe</h1>
          <div style={{textAlign:'center',maxWidth:'90%',fontSize:'120%',fontWeight:'500',padding:5, borderRadius:'5', backgroundColor:'rgba(240,240,255,0.9)'}}><em>{ ( Math.round(Math.random()*2 ) === 1 )  ? "Mind the steps !" : "Enjoy the ride !" }</em></div>
          <br/>
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

connect(select)(Home)
  
export default Home
