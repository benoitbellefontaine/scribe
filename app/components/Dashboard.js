import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

//import {getUser} from '../actions'

class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    //this._getUser = this._getUser.bind(this)
  }

  render () {
    return (
      <article>
        <section className='text-section'>
          <h1>Dashboard</h1> 
          <p>
            Welcome to your Dashboard, <strong>{this.props.data.user}</strong>. Choose any application below and improve your productivity.
          </p>
          <div style={{display:'flex',flexWrap:'wrap'}}>
            <div  style={{maxWidth:'20vw',margin:'10px'}}>
              <Link to='/followup' className='btn btn--login btn--nav' >Follow up</Link>
            </div>
            <div  style={{maxWidth:'20vw',margin:'10px'}}>
              <Link to='/csps' className='btn btn--login btn--nav'>csps</Link>
            </div>
            <div  style={{maxWidth:'20vw',margin:'10px'}}>
              <Link to='/infc' className='btn btn--login btn--nav'>infc</Link>
            </div>
            <div  style={{maxWidth:'20vw',margin:'10px'}}>
              <Link to='/pspc' className='btn btn--login btn--nav'>pspc</Link>
            </div>
            <div  style={{maxWidth:'20vw',margin:'10px'}}>
              <Link to='/ssc' className='btn btn--login btn--nav'>ssc</Link>
            </div>
          </div>
        </section>
      </article>
    )
  }

  //_getUser () { this.props.dispatch(getUser()) }

}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Dashboard)
