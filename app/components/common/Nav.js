import React, {Component} from 'react'
import PropTypes from 'prop-types'
import LoadingButton from './LoadingButton'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {logout, clearError, setEmailAddress, setLanguage} from '../../actions'

import Switch from 'antd/lib/switch';

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = { email : null };
    this._logout = this._logout.bind(this)
    this._clearError = this._clearError.bind(this)
    this._onItemChange = this._onItemChange.bind(this)
    this._onLanguageChange = this._onLanguageChange.bind(this)
  }

  render () {
    const navButtons = this.props.loggedIn ? ( 
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to='/dashboard' className='btn btn--dash btn--nav'>{this.props.data.language === undefined ? 'tableau de bord' : this.props.data.language ? 'tableau de bord' :'dashboard'}</Link>
        {this.props.currentlySending ? (
          <LoadingButton className='btn--nav' />
        ) : (
          <a href='#' className='btn btn--nav' onClick={this._logout}>{this.props.data.language === undefined ? 'déconnexion' : this.props.data.language ? 'déconnexion' :'logout'}</a>
        )}
        <form onSubmit={this.handleSubmit} style={{margin:0,padding:0,maxHeight:30,marginLeft:'1em',marginRight:'1em'}}>
            <input className="input-nav" value={this.state.email}
                type="text" color='red' placeholder={this.props.data.language === undefined ? 'adresse courriel client' : this.props.data.language ? 'adresse courriel client' :'client email address'} onChange={this._onItemChange} />
        </form>
        <Switch defaultChecked={true} checkedChildren="F" unCheckedChildren="E" onChange={this._onLanguageChange} />
      </div>
    ) : (
      <div>
        <Link to='/login' className='btn btn--login btn--nav' onClick={this._clearError}>{this.props.data.language === undefined ? 'connexion - login' : this.props.data.language ? 'connexion' :'login'}</Link>
      </div>
    )

    return (
      <div className='nav'>
        <div className='nav__wrapper'>
          <Link to='/' className='nav__logo-wrapper' onClick={this._clearError}>
            <h1 className='nav__logo'>Scribe</h1>
          </Link>
          {navButtons}
        </div>
      </div>
    )
  }

  _logout () {
    this.props.dispatch(logout())
  }

  _clearError () {
    this.props.dispatch(clearError())
  }

  _onItemChange (event) {
    console.log(event.target.value);
    this.setState({email: event.target.value});
    this.props.dispatch(setEmailAddress(event.target.value))
  }
  
  _onLanguageChange (checked) {
    console.log(checked);
    //this.setState({email: event.target.value});
    this.props.dispatch(setLanguage(checked))
  }
  
}

Nav.propTypes = {
  loggedIn:  PropTypes.bool,
  currentlySending:  PropTypes.bool,
  dispatch:  PropTypes.func
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Nav)

/*
<Link to='/register' className='btn btn--login btn--nav' onClick={this._clearError}>Register</Link>
*/
