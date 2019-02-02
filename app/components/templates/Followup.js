import React from 'react'
import {connect} from 'react-redux'
import LoadingButton from '../common/LoadingButton'
//import styled from 'styled-components';
//import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons'

import {changeForm} from '../../actions'
import {fetchRequest} from '../../actions'
//import { redBright } from 'ansi-colors';

/*
const InputBox = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
    margin-right: 10px;
`;
const ChipGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
`;
const ChipButton = styled.div`
    flex-grow: 1;
    align-items: center;
    padding: 10px;
    margin: 2px;
    border: 1px solid lightgray;
    border-radius: 15px;
`;
*/

class Followup extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
          deptValue:0,
          selectedDepartment: 'PSPC/SPAC',
          selectedLanguage: 'French',
          ticket: 'IM000000',
          telephone: '000-000-0000',
          name: '',
          email: '',
          agent: null,
          domain: '@canada.ca',
          deptTel : [
            {department:"PSPC/SPAC",telephone:"1-866-995-6030"},
            {department:"SSC/SPC",telephone:"1-855-591-0550"},
            {department:"SSC/SPC (@ssc-spc.gc.ca)",telephone:"1-855-591-0550"},
            {department:"CSPS/EFPC",telephone:"613-943-6236"},
            {department:"INFC",telephone:"613-941-2427"},
          ],
          disabledEmail: false,
          disabledName: true,
      };
      this._onSubmit = this._onSubmit.bind(this)
      this._changeUsername = this._changeUsername.bind(this)
      //this._changePassword = this._changePassword.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
      //this.copyToClipboard = this.copyToClipboard.bind(this)
      this.handleEmailChange = this.handleNameChange.bind(this)
      this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
      this.handleLanguageChange = this.handleLanguageChange.bind(this)
      this.handleTicketChange = this.handleTicketChange.bind(this)
      this.handleAgentChange = this.handleAgentChange.bind(this)
      this.handleOutlook = this.handleOutlook.bind(this)
    }
    
    _changeUsername (event) {
        this._emitChange({...this.props.data, username: event.target.value})
    }

    _emitChange (newFormState) {
        this.props.dispatch(changeForm(newFormState))
    }

    _onSubmit (event) {
        event.preventDefault()
        this.props.onSubmit(this.props.data.username, this.props.data.password)
    }

    handleDepartmentChange (changeEvent) {
        const {deptTel,domain} = this.state;
        var department = deptTel.find(i => i.department === changeEvent.target.value);
        let dom;
        if (department.department === "PSPC/SPAC") { dom = "@pwgsc-tpsgc.gc.ca"; }
        else { dom = "@canada.ca"; }
        if (department.department === "SSC/SPC (@ssc-spc.gc.ca)") dom = "@ssc-spc.gc.ca";
        //let dom = (department.department === "PSPC/SPAC") ? "@pwgsc-tpsgc.gc.ca" : "@canada.ca";
        this.setState({
            selectedDepartment: changeEvent.target.value,
            telephone: department.telephone,
            domain: dom,
            email: "first.last" + dom,
            //disabledEmail: true,
            disabledName: false
        });
    }

    handleNameChange (changeEvent) {
        const {domain} = this.state;
        var name = changeEvent.target.value;
        var split = name.split(" ");
        if (split[1] === undefined) split[1] = "lastname"
        this.setState({
            name : changeEvent.target.value,
            email: split[0].toLowerCase() + "." + split[1].toLowerCase() + domain,
        });
    }

    handleEmailChange (changeEvent) {
        this.setState({
            email: changeEvent.target.value,
        });
    }

    handleLanguageChange (changeEvent) {
        this.setState({
            selectedLanguage: changeEvent.target.value
        });
    }

    handleTicketChange (changeEvent) {
        this.setState({
            ticket: changeEvent.target.value
        });
    }

    handleAgentChange (changeEvent) {
        changeEvent.preventDefault();
        this.setState({
            agent: changeEvent.target.value
        });
    }

    handleOutlook (language,ticket,ftext,etext,fname,agent) {
    
        if (!fname) {
            alert('Client field is empty!');
            return;
        }
    
        let bonjour = (language === 'French') ? "Bonjour "+fname+ ",%0D%0A%0D%0A" : "Hello "+fname+",%0D%0A%0D%0A";
        let signature = (language === 'French')
            ? "Merci,%0D%0A" + this.props.data.agent + "%0D%0AShared Services Canada | Service Partagés Canada%0D%0AGovernment of Canada | Gouvernement du Canada%0D%0Assc.sdincidents-incidentscs.spc@canada.ca"
            : "Thank you,%0D%0A" + this.props.data.agent + "%0D%0AShared Services Canada | Service partagés Canada%0D%0AGovernment of Canada | Gouvernement du Canada%0D%0Assc.sdincidents-incidentscs.spc@canada.ca";
        (language === 'French') ? console.log('french',ftext) : console.log('english',etext);
        const {email} = this.state;
        location.href= (language === 'French') 
            ? "mailto:"+email+"?subject="+"SUIVI - " + ticket + " - FOLLOW UP"+"&body="+bonjour+ftext+"%0D%0A%0D%0A"+"****%0D%0A%0D%0A"+etext+"%0D%0A%0D%0A"+signature
            : "mailto:"+email+"?subject="+"FOLLOW UP - " + ticket + " - SUIVI"+"&body="+bonjour+etext+"%0D%0A%0D%0A"+"****%0D%0A%0D%0A"+ftext+"%0D%0A%0D%0A"+signature;
    
    }

    /*copyToClipboard (ftext,etext) {
        console.log("copyToClipboard");
        var textField = document.createElement('textarea')
        textField.innerHTML = "sent email to client"+'\n'+ftext+'\n'+etext
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }*/

    render () {

        const {selectedLanguage, ticket, name, agent} = this.state;
        const fname = name.split(" ")[0];
        const french_text = "NB: Ne pas répondre à cette boîte courriel. %0D%0A%0D%0ANous vous écrivons aujourd'hui au sujet du billet " + this.state.ticket + ". Nous vous demandons de nous rappeler dans les 5 prochains jours ouvrables au " + this.state.telephone + " pour obtenir de l'aide.%0D%0A%0D%0ASi nous ne recevons aucune réponse de votre part dans les 5 jours ouvrables, nous considérerons que le problème est résolu.%0D%0A%0D%0APour plus d'assistance, nous vous demandons de nous appeler." 
        const english_text = "Note – Do not reply by email as this mailbox is not monitored. %0D%0A%0D%0AWe are writing to you today with regards to ticket " + this.state.ticket + ". We request that you call us back within 5 business days at  " + this.state.telephone + " for further support.%0D%0A%0D%0AIf we don’t hear back from you within the 5 business days, we will consider the issue to be resolved.%0D%0A%0D%0AFor further assistance, we request you call us."

        return (
            <article style={{height:'inherit',width:'75vw',margin:'0px auto',display:'flex',justifyContent:'center',alignItems:'center',fontFamily: 'Quattrocento Sans'}}>

                <section style={{backgroundColor:'white',boxShadow: '2px 2px 5px rgb(220,220,220)',padding:10}} className='text-section'>

                    <div style={{color:'black',marginBottom:'0px',paddingBottom:5,textAlign:'center',fontSize:'150%',borderBottom:'1px solid lightgray'}}>Ticket Follow Up Template</div>

                    {/* INJECT */}
                    <div style={{padding:5,marginBottom:'5px',border:'0px solid #93bfe0',backgroundColor:'white',display:'flex',borderBottom:'1px solid lightgray',paddingBottom:5}}>

                        <div style={{padding:'5px',marginBottom:'5px',flexBasis:'20em',flexGrow:1}}>
                            <div style={{padding:'5px',backgroundColor:'white',color:'black',marginBottom:'0px',textAlign:'center',border:'1px solid lightgray'}}>
                                Department
                            </div>
                            <form style={{margin:5}}>
                                <div className="radio">
                                <label>
                                    <input type="radio" value="CSPS/EFPC" 
                                        checked={this.state.selectedDepartment === 'CSPS/EFPC'}
                                        onChange={this.handleDepartmentChange} />
                                    {" "}CSPS/EFPC
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" value="INFC" 
                                        checked={this.state.selectedDepartment === 'INFC'} 
                                        onChange={this.handleDepartmentChange} />
                                    {" "}INFC
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" value="PSPC/SPAC" 
                                        checked={this.state.selectedDepartment === 'PSPC/SPAC'} 
                                            onChange={this.handleDepartmentChange} />
                                    {" "}PSPC/SPAC
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" value="SSC/SPC" 
                                        checked={this.state.selectedDepartment === 'SSC/SPC'} 
                                            onChange={this.handleDepartmentChange} />
                                    {" "}SSC/SPC
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" value="SSC/SPC (@ssc-spc.gc.ca)" 
                                        checked={this.state.selectedDepartment === 'SSC/SPC (@ssc-spc.gc.ca)'} 
                                            onChange={this.handleDepartmentChange} />
                                    {" "}SSC/SPC (@ssc-spc.gc.ca)
                                </label>
                                </div>
                            </form>
                        </div>

                        <div style={{display:'flex',flexDirection:'column',padding:'5px',marginBottom:'5px',flexGrow:1}}>
                            <div>
                                <div style={{padding:'5px',backgroundColor:'white',color:'black',marginBottom:'0px',textAlign:'center',border:'1px solid lightgray'}}>Language</div>
                                <form style={{margin:5}}>
                                    <div className="radio">
                                    <label>
                                        <input type="radio" value="French" 
                                            checked={this.state.selectedLanguage === 'French'}
                                            onChange={this.handleLanguageChange} />
                                        {" "}French
                                    </label>
                                    </div>
                                    <div className="radio">
                                    <label>
                                        <input type="radio" value="English"
                                            checked={this.state.selectedLanguage === 'English'}
                                            onChange={this.handleLanguageChange} />
                                        {" "}English
                                    </label>
                                    </div>
                                </form>
                            </div>

                            <div style={{display:'flex',marginTop:'10px',alignItems:'center'}}>
                                <div style={{padding:'1px',backgroundColor:'#dd6544',color:'#eee',marginBottom:'0px',textAlign:'center',border:'1px solid lightgray'}}>Ticket</div>
                                <form style={{marginLeft:3}}>
                                    <div>
                                    <label>
                                        <input style={{borderRadius:'5px',border:'1px solid lightgray'}} type="text" value={this.state.ticket} 
                                            onChange={this.handleTicketChange} />
                                    </label>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div style={{padding:'5px',flexGrow:1}}>
                            <div style={{padding:'5px',backgroundColor:'white',color:'black',marginBottom:'5px',textAlign:'center',border:'1px solid lightgray'}}>ID</div>
                                <form style={{margin:0}}>
                                    <div className="radio">
                                        <label style={{display:'flex',justifyContent:'space-between',margin:2}}>
                                            <div>Client Name</div>
                                            <input style={{borderRadius:'5px',padding:'2px',border:'1px solid lightgray'}} type="text" value={this.state.name} 
                                                onChange={this.handleNameChange} disabled={this.state.disabledName}/>
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label style={{display:'flex',justifyContent:'space-between',margin:2}}>
                                            Client Email{" "}
                                            <input style={{borderRadius:'5px',padding:'2px',border:'1px solid lightgray'}} type="text" value={this.state.email} 
                                                onChange={this.handleEmailChange} disabled={this.state.disabledEmail} />
                                        </label>
                                    </div>
                                    <div className="radio">
                                    <label style={{display:'flex',justifyContent:'space-between',margin:2}}>
                                        Super Agent{" "}
                                        <input style={{borderRadius:'5px',padding:'2px',border:'1px solid lightgray'}} type="text" value={this.props.data.agent} 
                                            onChange={this.handleAgentChange} />
                                    </label>
                                </div>
                                </form>
                            </div>
                        </div>

                    {/* EJECT */}
                    <div style={{position:'relative',padding:20,backgroundColor:'white'}}>

                        <div style={{position:'absolute',bottom:5,right:5,display:'flex',flexDirection:'row'}}>
                            <button className='btn btn--login btn--nav' style={{flexGrow:1}}
                                onClick={()=>this.handleOutlook(selectedLanguage,ticket,french_text,english_text,fname,agent)}>
                            Open Outlook Client</button>
                            {/*
                                document.queryCommandSupported('copy') &&
                                <button className='btn btn--login btn--nav' style={{flexGrow:1}}
                                    onClick={this.copyToClipboard(french_text,english_text)}>
                                Copy to Clipboard</button>
                            */}
                        </div>

                        {
                            this.state.selectedLanguage === 'French' 
                                ? <div>Bonjour {fname}</div>
                                : <div>Hello {fname}</div>
                        }
                        {
                            this.state.selectedLanguage === 'French' 
                                ? <div style={{marginTop:10}}>{french_text}</div>
                                : <div style={{marginTop:10}}>{english_text}</div>
                        }
                        {
                            this.state.selectedLanguage === 'French' 
                                ? <div style={{marginTop:10}}>{english_text}</div>
                                : <div style={{marginTop:10}}>{french_text}</div>
                        }
                        <div style={{marginTop:10}}>
                            {this.props.data.agent}<br/>
                            Shared Services Canada | Service partagés Canada<br/>
                            Government of Canada | Gouvernement du Canada<br/>
                            ssc.sdincidents-incidentscs.spc@canada.ca
                        </div>
                    </div>

                </section>
            
                {/*<textarea ref={(textarea) => this.textArea = textarea} value='Some text to copy'/>*/}
            
            </article>
        )
    }
}

function select (state) {
    return { data: state }
}

export default connect(select)(Followup)