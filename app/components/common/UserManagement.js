import React from 'react';
//import emaildata from '../data/emaildata';
//import styled from 'styled-components';
//import {Motion, spring} from 'react-motion';

const re = /\S+\.\S+@\S+\.\S+/;

class UserManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data:null, hits: null, email: null, username:'username', dept: null, region:null, modif:false, error:null };
        //this.onSearch = this.onSearch.bind(this);
        //this.onSetResult = this.onSetResult.bind(this);    
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onDeptChange = this.onDeptChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.modifYes = this.modifYes.bind(this);
        this.modifNo = this.modifNo.bind(this);
        this.onClear = this.onClear.bind(this);
        //this.onSave = this.onSave.bind(this);
        //this.onListClick = this.onListClick.bind(this);
    }

    /*validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }*/

    componentDidMount() {
        //localStorage.clear();
        // set items in localstorage
        /*const emails = [
            {"email":"benoit.bellefontaine@canada.ca","username":"bellefob"},
            {"email":"jimmy.grenier@canada.ca","username":"grenierj"},
            {"email":"james.anderson@canada.ca","username":"andersoj"},
            {"email":"james.anderson2@canada.ca","username":"andersj2"},
            {"email":"appo.musende@canada.ca","username":"musendea"},
            {"email":"jacques.mutaganda@canada.ca","username":"mutaganj"},
            {"email":"nadege.mercure@canada.ca","username":"mercuren"},
        ];*/
        //const emails = emaildata;
        //localStorage.setItem('items', JSON.stringify(emails));
        const data = JSON.parse(localStorage.getItem('ids'));
        this.setState({data:data});
        //data.map((item,index)=>{console.log(index,":",item)})
    }

    handleSubmit(event) {
        alert('handleSubmit was called');
        event.preventDefault();
    }

    onClear(e) {
      e.preventDefault();
      localStorage.clear();
    }

    onEmailChange(e) {
        this.setState({hits:[]});
        // get the input on each change
        //const { value } = this.input;
        var emailFragment = e.target.value;
        console.log('onEmailChange email',emailFragment);
        if (emailFragment === '') {
            //console.log("emailFragment === ''")
            this.setState({email:null,hits:null});
            return; 
        }
        // get the data from localStorage
        //const data = JSON.parse(localStorage.getItem('items'));
        // get any hits from local storage
        if (this.state.data===null) {
            //console.log('onEmailChange:this.state.data===null');
            this.setState({ email:emailFragment, modif:true, hits:null, error:null });
        } 
        else {
            //console.log('onEmailChange:this.state.data!==null');
            const hits = this.state.data.filter(function(item) {
                const sub = item.email.substring(0,emailFragment.length);
                return sub === emailFragment;
            });
            if (hits.length>0) { 
                // found some data in local storage - go with it
                this.setState({ email:emailFragment, modif:false, hits:hits, error:null });
            }
            else {
                // typed text not found in local storage
                this.setState({ email:emailFragment, modif:true, hits:null, error:null });
            }
        }
    } 

    onUsernameChange(e) {
        var username = e.target.value;
        this.setState({username:username,modif:true});
    }
 
    onDeptChange(e) {
        var dept = e.target.value;
        this.setState({dept:dept,modif:true});
    }
 
    onRegionChange(e) {
        var region = e.target.value;
        this.setState({region:region,modif:true});
    }
 
    modifYes() {
        const {data,email} = this.state;
        if (!re.test(email)) {
            this.setState({modif:false,error:"email format is incorrect: must be firstname.lastname@domain.com"})
            return;
        }
        // handle empty local storage
        if (data===null) {
            var array = [];
            array.push({
                email:this.state.email,
                username:this.state.username,
                dept:this.state.dept,
                region:this.state.region,
            })
            localStorage.setItem('ids', JSON.stringify(array))
            this.setState({data:array,modif:false,error:null});
        }
        else {
            //var index = data.email.indexOf(this.state.email);
            //console.log(data);
            console.log("searching for ", email);
            if (data.find( d => d.email === email)) {
                // found a record
                // get index, splice and push
                console.log("found ", email);
                var index = data.indexOf(data.find( d => d.email === email));
                console.log(index);
                data.splice(index,1);
                data.push({
                    email:this.state.email,
                    username:this.state.username,
                    dept:this.state.dept,
                    region:this.state.region,
                })
                localStorage.setItem('ids', JSON.stringify(data))
                this.setState({modif:false,error:null});
            }
            else {
                console.log("could not find ", email);
                console.log("saving it");
                data.push({
                    email:this.state.email,
                    username:this.state.username,
                    dept:this.state.dept,
                    region:this.state.region,
                })
                localStorage.setItem('ids', JSON.stringify(data))
                this.setState({modif:false,error:null});
            }
        }
    }

    modifNo() {
        this.setState({modif:false});
    }

    onListClick(item) {
      //event.preventDefault();
      console.log(item.email + "/" + item.username+ "/" + item.dept + "/" + item.region);
      const email = item.email;
      const username = item.username;
      const dept = item.dept;
      const region = item.region;
      this.setState({email:email,username:username,dept:dept,region:region,hits:null,modif:false});
      //this.input = item.email;
    }

    render() {
        return (
            <div  style={{border:'1px solid lightgray',textAlign:'center',position:'relative',padding:5}}>
                 <p style={{textAlign:'center',fontFamily:'Quattrocento Sans',paddingBottom:5,margin:0,letterSpacing:'0.05em'}}>
                    <strong>Locally manage user credentials using Local Storage</strong>
                </p>
                <div style={{margin:0,marginBottom:5,padding:0,display:'flex',flexWrap:'wrap'}}>
                    <form onSubmit={this.handleSubmit} 
                        style={{position:'relative',margin:0,marginBottom:5,padding:0,display:'flex',flexDirection:'column',flexGrow:10,maxHeight:30,marginLeft:2,marginRight:2}}>
                        <input style={{borderRadius:'0px',flexGrow:3,border:'1px solid gray',padding:3}} value={this.state.email}
                            type="text" placeholder='email address' onChange={this.onEmailChange} />
                        {
                            this.state.hits && 
                                <ul style={{ textAlign:'left',
                                    position: 'absolute',
                                    top:28,
                                    border: '1px solid #2f2f2f',
                                    listStyle: 'none',
                                    marginTop: '0',
                                    maxHeight: '143px',
                                    overflowY: 'auto',
                                    padding: '0px',
                                    //width: 'calc(300px + 1rem)',
                                    //width: '30vw',
                                    cursor: 'pointer',
                                    zIndex: 1,
                                    backgroundColor:'white'}}>
                                    {
                                        this.state.hits.map(item => 
                                            <li 
                                                key={item.email}
                                                style={{padding: '0.25rem',fontFamily:'Quattrocento Sans',zIndex: 1}}
                                                onClick={()=>this.onListClick(item)}>
                                                {item.email}
                                            </li>
                                        )
                                    }
                                </ul>
                        }
                    </form>
                    <form onSubmit={this.handleSubmit} 
                        style={{margin:0,marginBottom:5,padding:0,display:'flex',flexGrow:1,maxHeight:30,marginLeft:2,marginRight:2}}>
                        <input style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',padding:3}} value={this.state.username}
                            type="text" placeholder='username' onChange={this.onUsernameChange} />
                    </form>
                    <form onSubmit={this.handleSubmit} 
                        style={{margin:0,marginBottom:5,padding:0,display:'flex',flexGrow:1,maxHeight:30,marginLeft:2,marginRight:2}}>
                        <select style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',padding:3}} value={this.state.dept}
                            value={this.state.dept} onChange={this.onDeptChange}>
                            <option value="CSPS">CSPS</option>
                            <option value="INFC">INFC</option>
                            <option value="PSPC">PSPC</option>
                            <option value="SSC">SSC</option>
                        </select>
                    </form>
                    <form onSubmit={this.handleSubmit} 
                        style={{margin:0,marginBottom:5,padding:0,display:'flex',flexGrow:1,maxHeight:30,marginLeft:2,marginRight:2}}>
                        <select style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',padding:3}} value={this.state.region}
                            value={this.state.region} onChange={this.onRegionChange}>
                            <option value="ATL">ATL</option>
                            <option value="NCR">NCR</option>
                            <option value="ONT">ONT</option>
                            <option value="PAC">PAC</option>
                            <option value="QUE">QUE</option>
                            <option value="WST">WST</option>
                        </select>                            
                    </form>
                </div>
          
                {
                    this.state.modif &&
                        <div style={{border:'1px solid lightgray',textAlign:'center',position:'relative',bottom:5,padding:5}}>
                            Save modifications ? 
                                <button style={{marginLeft:'0.5em'}} type="button" onClick={this.modifYes}>Yes</button>
                                <button style={{marginLeft:'0.5em'}} type="button" onClick={this.modifNo}>No</button>
                        </div>
                }
            
                {
                    this.state.error && 
                        <div style={{backgroundColor:'rgba(255,0,0,0.1)',border:'1px solid rgba(255,0,0,0.4)',textAlign:'center',position:'relative',bottom:5,padding:0}}>
                            {this.state.error}
                        </div>
                }
              
                </div>
            
        );
    }
}

export default UserManagement;