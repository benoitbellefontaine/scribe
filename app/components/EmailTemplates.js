import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class EmailTemplates extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        <div style={{
          fontFamily:'Quattrocento Sans',
          display: 'flex',
          display:'-ms-flexbox',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '80vw',
          fontSize: '1.5vw',
          margin: 30,
          padding: '2em',
          backgroundColor: 'white',
          boxShadow: '5px 5px 10px rgb(220,220,220)',
          borderRadius:'0px',
          }}>
            <h2 style={{textAlign:'center',margin:0}}>Email Templates</h2> 
            <p style={{textAlign:'center',fontFamily:'Quattrocento Sans',maxWidth: '80vw'}}>
              <em>Select the <strong>template</strong> that works for you.</em>
            </p>
            <div style={{display:'flex',flexWrap:'wrap',maxWidth: '80vw'}}>

                <div style={{display:'flex'}}>
                    <Link style={{minWidth:'15vw',height:'8vh',margin:'10px',flexGrow:1,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}} to='/followup' className='btn btn--login btn--nav' >Follow up</Link>
                    <div style={{fontSize:'70%',padding:7,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div>
                            This is the template to follow up with client about <strong>Pending Customer</strong> tickets. 
                            Once on the form, select user department and language, enter ticket number and first & last 
                            name in the ID section. Click on OPEN OUTLOOK CLIENT. <strong>Reminder:</strong> Select the 
                            SD Incidents generic mailbox in the From: field before sending the message.
                        </div>
                    </div>
                </div>
             
                <div style={{display:'flex'}}>
                    <Link style={{minWidth:'15vw',height:'8vh',margin:'10px',flexGrow:1,textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}} to='/swapdevice' className='btn btn--login btn--nav' >Device Swap</Link>
                    <div style={{fontSize:'70%',padding:7,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div>
                            This is the template to notify the client once NATDSUPP has given the green light to swap 
                            the computing device (notebook, tablet, laptop, etc.). Once on the form, select 
                            user department and language, enter ticket number and first & last name in the ID 
                            section. <strong>Reminder:</strong> Select the SD Incidents generic 
                            mailbox in the From: field before sending the message.
                        </div>
                    </div>
                </div>

                <div style={{display:'flex'}}>
                  <div style={{fontSize:'70%',margin:'10px',padding:7}}>
                    <em>More templates to come ...</em>
                  </div>  
                </div>

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

export default connect(select)(EmailTemplates)