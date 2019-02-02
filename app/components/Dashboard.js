import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Dashboard extends React.Component {

  constructor (props) {
    super(props)
  }

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
          fontFamily:'Quattrocento Sans',
          display: 'flex',
          display:'-ms-flexbox',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '50vw',
          //maxHeight: '50vh',
          fontSize: '1.5vw',
          padding: '3em',
          backgroundColor: 'white',
          boxShadow: '5px 5px 10px rgb(220,220,220)',
          borderRadius:'10',
          }}>
            <h1 style={{textAlign:'center'}}>Dashboard</h1> 
            <p style={{textAlign:'center',fontFamily:'Quattrocento Sans',maxWidth: '45vw'}}>
              Welcome to your Dashboard, <strong>{this.props.data.agent}</strong>. Choose any application below and improve your productivity.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',maxWidth: '45vw'}}>
              
                <Link style={{margin:'10px',flexGrow:1,textAlign:'center'}} to='/whatisscribe' className='btn btn--login btn--nav'>what is scribe?</Link>
                
                <Link style={{margin:'10px',flexGrow:1,textAlign:'center'}} to='/emailtemplates' className='btn btn--login btn--nav'>email templates</Link>
              
                <Link style={{margin:'10px',flexGrow:1,textAlign:'center'}} to='/click' className='btn btn--login btn--nav'>svg tree</Link>
              
                <Link style={{margin:'10px',flexGrow:1,textAlign:'center'}} to='/tree2' className='btn btn--login btn--nav'>emoji tree</Link>
              
                <Link style={{margin:'10px',flexGrow:1,textAlign:'center'}} to='/storage' className='btn btn--login btn--nav'>user management</Link>

                <Link style={{margin:'10px',flexGrow:1,textAlign:'center'}} to='/itemstorage' className='btn btn--login btn--nav'>item management</Link>

            </div>
           
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

export default connect(select)(Dashboard)
