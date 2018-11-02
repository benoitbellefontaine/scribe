import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import * as d3 from "d3v4"
import LoadingButton from './common/LoadingButton'
import data from './data/cspsdata'
import {Link} from 'react-router'

import {changeForm} from '../actions'
//import {fetchRequest} from '../actions'
//import { redBright } from 'ansi-colors';

import Autocomplete from './common/Autocomplete';
import AutocompleteCID from './common/AutocompleteCID';
import emails from "./data/emaildata";
import cis from "./data/cidata";

var short_treeData =
{
    "name": "PSPC",
    "open": "true",
    "icon": "fas fa-pause fa-1x",
    "color": "#e03131",
    "children": [
        { 
            "name": "Level 2: A",
            "icon": "fas fa-shovel fa-1x",
            "open": "false",
            "color": "#e03131",
        },
        {
            "name": "Level 2: B",
            "icon": "fas fa-shovel fa-1x",
            "open": "false",
            "color": "#e03131",
        },
        { 
            "name": "Level 2: C",
            "open": "false",
            "icon": "fas fa-shovel fa-1x",
            "color": "#e03131",
            "children": [
                
                { 
                    "name": "Daughter of C",  
                    "open": "false",
                    "icon": "fas fa-shovel fa-1x",
                    "color": "#e03131",
                }
            ]
        },
    ]
};

const green8 = "#2f9e44";
const red8 = "#e03131";
const blue8 = "#1971c2";

const info = "fas fa-info-circle fa-1x";
const leaf = "fas fa-leaf fa-1x";
const mail = "fas fa-at fa-1x";
const fire = "fas fa-fire fa-1x";
const ambulance = "fas fa-ambulance fa-1x";
const medkit = "fas fa-medkit fa-1x";
const check = "fas fa-check-circle fa-1x";
const x = "fas fa-times-circle fa-1x";

let language = 'French';
let etext = 'hello';
let ftext = 'Bonjour';
let agent = 'agent name';
let email = 'benoit.bellefontaine';
let ticket = 'IM999999'
let client = 'Joe'
let subject = ticket + '- blackberry replacement';
let body = ((language === 'French') ? ftext + "%0D%0A%0D%0A" + etext : etext + "%0D%0A%0D%0A" + ftext) + "%0D%0A%0D%0A";
let signature = agent + "%0D%0AShared Services Canada | Service partagés Canada%0D%0AGovernment of Canada | Gouvernement du Canada%0D%0Assc.sdincidents-incidentscs.spc@canada.ca";
let greeting = ((language === 'French') ? "Bonjour " : "Hello ") + client + "%0D%0A%0D%0A";
let message = greeting + body + signature;
        
var treeData = {
   "name": "start clicking",
    "type":"root", "color": green8,
    "children": [
        { "name": "any issue",
            "children": [
                { "name": "any issue 1" },
            ] 
        },
        { 
            "name": "warming up",
            "children": [
                { "name": "department", "type":"selection", "icon": info, "color": blue8, selection:['CSPS','INFC','PSPC','SSC'] },
                { "name": "client uses a tablet", "icon": info, "color": blue8 },
                { "name": "client uses a laptop computer", "icon": info, "color": blue8 },
                { "name": "client uses a desktop computer", "icon": info, "color": blue8 },
                { "name": "client uses win10", "icon": info, "color": blue8 },
                { "name": "client uses win7", "icon": info, "color": blue8 },
                { "name": "client is teleworking", "icon": info, "color": blue8 },
                { "name": "client restarted computer", "icon": info, "color": blue8 },
                { "name": "able to remote to client", "icon": info, "color": green8 },
                { "name": "not able to remote to client", "icon": info, "color": red8 },
            ]
        },
        { 
            "name": "quick picks",
            "children": [
                { "name": "invalid username/password", "icon": leaf, "color": red8 },
                { "name": "invalid email username/password", "icon": leaf, "color": red8 },
                { "name": "etc", "icon": leaf, "color": red8 },
                { "name": "invalid username/password 2", "icon": leaf, "color": green8 },
                { "name": "invalid email username/password 2", "icon": leaf, "color": green8 },
                { "name": "etc 2", "icon": leaf, "color": green8 },
                { "name": "sent mobile device replacement package", "type":"email", "icon": mail, "color": blue8,
                    email: agent,
                    subject: subject,
                    body: message
                    
                },
                
            ]
        },
        { 
            "name": "request issue",
            "type": "reason",
            "color": red8,
            "children": [
                { 
                    "name": "refer to RM of",
                    "type": "process",
                    "children": [
                        { 
                            "name": "CSPS",
                            "children": [
                                { 
                                    "name": "refer to RM of",
                                    "type": "process",
                                    "children": [
                                        { "name": "CSPS" },
                                        { "name": "INFC" },
                                        { "name": "PSPC" },
                                        { "name": "SSC" }
                                    ]
                                },
                                { "name": "L3: A2" }
                            ]
                        },
                        { "name": "INFC" },
                        { "name": "PSPC" },
                        { "name": "SSC" }
                    ]
                },
                { "name": "L3: A2" }
            ]
        },
        {
            "name": "support issue",
            "type": "reason",
            "children": [
                { "name": "login issue",
                    "children": [
                        { "name": "login issue 1" },
                        { "name": "login issue 2" },
                        { "name": "login issue 3" },
                        { "name": "login issue 4" },
                        { "name": "login issue 5" },
                    ]
                },
                { "name": "browsing issue",
                    "children": [
                        { "name": "browsing issue 1" },
                        { "name": "browsing issue 2" },
                        { "name": "browsing issue 3" },
                        { "name": "browsing issue 4" },
                        { "name": "browsing issue 5" },
                    ] 
                },
                { "name": "email issue",
                    "children": [
                        { "name": "email issue 1" },
                        { "name": "email issue 2" },
                        { "name": "email issue 3" },
                        { "name": "email issue 4" },
                        { "name": "email issue 5" },
                    ] 
                },
                { "name": "vpn issue",
                    "children": [
                        { "name": "vpn issue 1" },
                        { "name": "vpn issue 2" },
                        { "name": "vpn issue 3" },
                        { "name": "vpn issue 4" },
                        { "name": "vpn issue 5" },
                    ] 
                },
                { "name": "mykey issue",
                    "children": [               
                        { "name": "client can't login to mykey" },
                        { "name": "client can't find mykey" },
                        { "name": "client gets a certificate error" },
                        { "name": "client can't remember mykey password" },
                        { "name": "client can't see mykey selected in IE" },
                        { "name": "client can't open or send encrypted emails" },
                        { "name": "PRI status",
                            "children": [
                                { "name": "Client has PRI" },
                                { "name": "Client has no PRI" }
                            ]
                        },
                        { "name": "Client transferred from another department",
                            "children": [
                                { "name": "Client has transferred from another department" },
                                { "name": "Client has not transferred from another department" },
                            ]
                        },
                        { "name": "Client mykey recovered",
                            "children": [
                                { "name": "Client has recovered her mykey" },
                                { "name": "Client has not recovered her mykey" },
                            ]
                        },
                        { "name": "Client referral options with PRI",
                            "children": [
                                { "name": "Client can recover his mykey through ORCA" },
                                { "name": "Client can contact an LRA for assistance" }
                            ]
                        },  
                        { "name": "Client referral options without PRI",
                            "children": [
                                { "name": "Client needs to contact an LRA for assistance" }
                            ]
                        },
                        { "name": "Client mykey transfer support options",
                            "children": [
                                { "name": "Client needs to contact an LRA for assistance for mykey transfer" }
                            ]
                        },
                        { "name": "Client mykey recovery",
                            "children": [
                                { "name": "Client can recover his mykey on the ORCA site" },        
                                { "name": "Client needs to contact an LRA for assistance for mykey recovery" }
                            ]
                        },
                        { "name": "Forgot mykey password support with PRI",
                            "children": [
                                { "name": "Client needs to recover his password from ORCA " },
                                { "name": "Client needs to contact an LRA for assistance" }
                            ]
                        },
                        { "name": "Can't see mykey in IE support",
                            "children": [
                                { "name": "RC to users computer" },     
                                { "name": "Clear the Java cache" },
                                { "name": "Clear the IE cache" },
                                { "name": "Enable the Java add ons in IE" }
                            ]
                        },
                        { "name": "Can't see/send encrypted emails in outlook",
                            "children": [
                                { "name": "RC to users computer" },
                                { "name": "Make sure user in logged into mykey" },
                                { "name": "Enable the entrust add ins for Outlook" }
                            ]
                        },              
                    ]
                },
                { "name": "computer issue",
                    "children": [
                        { "name": "client is using a tablet device" },
                        { "name": "client is using a laptop device" },
                        { "name": "client is using a desktop device" },
                        { "name": "device is defective" },
                        { "name": "device will not reboot" },
                        { "name": "device will not shut down" },
                        { "name": "device will take a long time to reboot" },
                        { "name": "device will take a long time to shut down" },
                        { "name": "device is hot to the touch" },
                        { "name": "device battery is not keeping its charge" },
                    ]
                },
                { "name": "mobile device issue",
                    "children": [
                        { "name": "target device: cellular",
                            "children": [
                                { "name": "target device: cellular" },
                                { "name": "target device: android knox" },
                                { "name": "target device: blackberry" },
                            ]
                        },
                        { "name": "target device: android knox" },
                        { "name": "target device: blackberry" },
                    ] 
                },
                { "name": "any issue",
                    "children": [
                        { "name": "any issue 1" },
                    ] 
                },
            ]
        },
        { 
            "name": "choppah issue",
            "type": "reason",
            "children": [
                { "name": "Get down!" },
                { "name": "Get to the choppah!" }
            ]
        },
    ]
};

class Node extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            node:null,
            open:false
        }
        this.handleClick2 = this.handleClick2.bind(this);
    }

    /*componentDidMount() {
        // Direct reference to autocomplete DOM node
        // (e.g. <input ref="autocomplete" ... />
        const node = ReactDOM.findDOMNode(this);
        this.setState({node:node});
        // Evergreen event listener || IE8 event listener
        const addEvent = node.addEventListener || node.attachEvent;
        addEvent("click2", this.handleClick2, false);
        //console.log(node)
    }

    componentWillUnmount() {
        const {node} = this.state;
        const removeEvent = node.removeEventListener || node.detachEvent;
        // Reduce any memory leaks
        removeEvent("click2", this.handleClick2);
    }*/

    handleClick2(event) {
        console.log('type',this.props.type)
        if (this.props.type === 'email')
            location.href="mailto:"+email+"?subject="+subject+"&body="+message;
        event.preventDefault()
        event.stopPropagation();
        const {node,open} = this.state;
        this.props.onItemClick(this.props.name)
        if (!this.props.children) return;
        this.setState({open:!open});
    }

    render() {
        const {name,children,tree,depth,index,indent,onItemClick,type,icon,selection,color} = this.props;
        const {open} = this.state;
        let fontsize = 24 - depth * 3;
        let fontweight = 700 - depth * 100;
        let transform = 'translate(10,10)';
        let folderState = open 
            ? <i className="fas fa-folder-open fa-1x" style={{color:"#2f9e44",fill:"white"}}></i> 
            : <i className="fas fa-folder fa-1x" style={{color:"#2f9e44",fill:"#2f9e44"}}></i>;
        let espace = indent + '\u00A0\u00A0';
        //let deptname = name;
        return (
            <div onClick={this.handleClick2} ref="node" value={name} style={{padding:3,cursor:'pointer'}}>
                <span>{espace}</span>
                { children ? folderState : <i className={icon} style={{color:color}}></i>}
                {'\u00A0'}<span style={{fontSize:fontsize,fontWeight:fontweight}}>{name}</span>
                { (type==='selection') ? selection.map((child,i) =>(<span key={i} style={{border:'1px solid gray',margin:2,padding:2}}>{child}</span>)) : null }
                {this.state.open &&
                    children && children.map((child,i) => { return (
                        <Node
                            key={child.name+(depth)+(i)}
                            index={index+1}
                            name={child.name}
                            children={child.children}
                            depth={depth+1}
                            indent={espace}
                            onItemClick={onItemClick}
                            icon={child.icon}
                            color={child.color}
                            type={child.type}
                            selection={child.selection}
                            />
                    )})
                }
            </div>
        )
    }
}

class PSPC extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            treeData: {},
            ticketData: [],
            dept: null,
            region: null,
            cid: null,
            os: null
        };

        this.clearTicket = this.clearTicket.bind(this)
        this.handleOutlook = this.handleOutlook.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleTreeItemClick = this.handleTreeItemClick.bind(this)
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
        this.handleOSChange = this.handleOSChange.bind(this)
        this.handleCIDChange = this.handleCIDChange.bind(this)
        this.handleItemRemove = this.handleItemRemove.bind(this)

    }

    handleDepartmentChange (e) {
        this.setState({dept:e.currentTarget.innerText});
    }

    handleRegionChange (e) {
        this.setState({region:e.currentTarget.innerText});
    }

    handleOSChange (e) {
        this.setState({os:e.currentTarget.innerText});
    }

    handleCIDChange (e) {
        this.setState({cid:e.currentTarget.innerText});
    }

    handleOutlook (language,ticket,ftext,etext,fname,agent) {

        if (!agent) {
            alert('Agent field is empty!');
            return;
        }
    
        if (!fname) {
            alert('Client field is empty!');
            return;
        }
    
        //event.preventDefault();
        let bonjour = (language === 'French') ? "Bonjour "+fname+ "%0D%0A%0D%0A" : "Hello "+name+"%0D%0A%0D%0A";
        let signature = agent + "%0D%0AShared Services Canada | Service partagés Canada%0D%0AGovernment of Canada | Gouvernement du Canada%0D%0Assc.sdincidents-incidentscs.spc@canada.ca";
        (language === 'French') ? console.log('french',ftext) : console.log('english',etext);
        const {email} = this.state;
        //location.href="mailto:"+email+"?subject="+"FOLLOW UP - " + ticket + " - SUIVI"+"&body="+bonjour+ftext+"%0D%0A%0D%0A"+etext+"%0D%0A%0D%0A"+signature;
    
    }

    componentWillMount() {
        this.setState({treeData:treeData});
    }

    componentDidMount() {
        this.setState({treeData:treeData});
    }

    clearTicket() {
        this.setState({ticketData:[]});
    }

    handleItemRemove(event,item) {
        const {ticketData} = this.state;
        //e.preventDefault();
        console.log('item',item);
        console.log('index',ticketData.indexOf(item))
        var index = ticketData.indexOf(item);

        if (ticketData.length>0) {
            ticketData.splice(index,1);
            this.setState({ticketData:ticketData});
        }
    }

    handleTreeItemClick(item) {
        const {ticketData} = this.state;
        //var timestamp = new Date().getUTCMilliseconds();
        ticketData.push({name:item,timestamp:new Date().getTime()});
        this.setState({ticketData:ticketData});
    }

    handleEmailChange() {
        console.log('handleEmailChange');
    }

    render () {

        const {treeData,ticketData,dept,region} = this.state;
       
        if (treeData === {}) return null;
       
        return (
            <div style={{display:'flex',width:'100%',height:'inherit',padding:20,fontFamily:'Quattrocento Sans'}}>

                {/**************** TREE ****************/}            
                <div style={{outline:'1px solid #2f9e44',display:'flex',flexDirection:'column',width:'50%',height:'inherit',margin:2,padding:0}}>

                    <div style={{border:'0px solid lightgray',padding:3,textAlign:'center',fontSize:'120%',backgroundColor:'#2f9e44',color:'white'}}>tree</div>
                    <div style={{padding:10, height:'inherit',overflowY:'auto'}}>
                        <Node
                        key={this.state.treeData.name+0}
                        index={0}
                        tree={this.state.treeData}
                        name={this.state.treeData.name}
                        children={this.state.treeData.children}
                        depth={0}
                        indent={''}
                        onItemClick={(item)=>this.handleTreeItemClick(item)}
                        icon={this.state.treeData.icon}
                        color={this.state.treeData.color}
                        color={this.state.treeData.type}
                        selection={this.state.treeData.selection}
                        >
                        </Node>
                    </div>
                </div>

                {/**************** CONTROL PANEL + TICKET ****************/}
                <div style={{outline:'0px solid #2f9e44',display:'flex',flexDirection:'column',width:'50%',height:'inherit',margin:2,padding:0,boxSizing:'border-box'}}>

                    {/**************** CONTROL PANEL ****************/}
                    <div style={{outline:'1px solid #2f9e44',display:'flex',flexDirection:'column',width:'stretch',height:'40%',margin:0,padding:0}}>
                        
                        <div style={{paddingTop:3,paddingBottom:3,textAlign:'center',fontSize:'120%',backgroundColor:'#2f9e44',color:'white'}}>
                            control panel
                        </div>
                        <div style={{padding:10,margin:0,width:'stretch'}}>

                            {/**************** EMAIL + TICKET ****************/}
                            <div style={{margin:0,marginBottom:10,padding:0,display:'flex'}}>
                                <Autocomplete suggestions={emails} />
                                <form style={{margin:0,marginBottom:10,padding:0,display:'flex',flexGrow:1,maxHeight:30}}>
                                    <input style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',margin:0,padding:3}} type="text" placeholder='ticket' onChange={this.handleEmailChange} />
                                </form>
                            </div>
        
                            {/**************** Select DEPARTMENT ****************/}
                            <div style={{margin:0,marginBottom:10,padding:0,display:'flex'}}>

                                <div style={{border:'0px solid gray',margin:2,padding:2}}><strong>Department</strong></div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='CSPS')?'white':'black',
                                    backgroundColor:(dept==='CSPS')?green8:'white',
                                    textAlign:'center'}}
                                    onClick={this.handleDepartmentChange}>
                                    CSPS
                                </div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='INFC')?'white':'black',
                                    backgroundColor:(dept==='INFC')?green8:'white',textAlign:'center'}}
                                    onClick={this.handleDepartmentChange}>
                                    INFC
                                </div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='PSPC')?'white':'black',
                                    backgroundColor:(dept==='PSPC')?green8:'white',textAlign:'center'}}
                                    onClick={this.handleDepartmentChange}>
                                    PSPC
                                </div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='SSC')?'white':'black',
                                    backgroundColor:(dept==='SSC')?green8:'white',textAlign:'center'}}
                                    onClick={this.handleDepartmentChange}>SSC
                                </div>
                            </div>
            
                            {/**************** Select REGION ****************/}
                            <div style={{margin:0,marginBottom:10,padding:0,display:'flex'}}>
                                <div style={{border:'0px solid gray',margin:2,padding:2}}><strong>Region</strong></div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(region==='ATL')?'white':'black',
                                    backgroundColor:(region==='ATL')?green8:'white',
                                    textAlign:'center'}}
                                    onClick={this.handleRegionChange}>ATL
                                </div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                color:(region==='NCR')?'white':'black',
                                backgroundColor:(region==='NCR')?green8:'white',
                                textAlign:'center'}}
                                onClick={this.handleRegionChange}>NCR</div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                color:(region==='ONT')?'white':'black',
                                backgroundColor:(region==='ONT')?green8:'white',textAlign:'center'}}
                                onClick={this.handleRegionChange}>ONT</div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                color:(region==='PAC')?'white':'black',
                                backgroundColor:(region==='PAC')?green8:'white',textAlign:'center'}}
                                onClick={this.handleRegionChange}>PAC</div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                color:(region==='QUE')?'white':'black',
                                backgroundColor:(region==='QUE')?green8:'white',textAlign:'center'}}
                                onClick={this.handleRegionChange}>QUE</div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                color:(region==='WST')?'white':'black',
                                backgroundColor:(region==='WST')?green8:'white',textAlign:'center'}}
                                onClick={this.handleRegionChange}>WST</div>
                            </div>
        
                            {/**************** Select CIs ****************/}
                            <AutocompleteCID suggestions={cis} />
        
                            <div style={{margin:0,marginBottom:10,padding:0,display:'flex'}}>
                                <div style={{border:'0px solid gray',margin:2,padding:2}}><strong>Workstation</strong></div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='WIN7')?'white':'black',
                                    backgroundColor:(dept==='WIN7')?green8:'white',
                                    textAlign:'center'}}
                                    onClick={this.handleOSChange}>WIN7
                                </div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='WIN10')?'white':'black',
                                    backgroundColor:(dept==='WIN10')?green8:'white',
                                    textAlign:'center'}}
                                    onClick={this.handleOSChange}>WIN10
                                </div>
                                <div style={{border:'1px solid gray',margin:2,padding:2,flexGrow:1,
                                    color:(dept==='WIN_SECURE_7')?'white':'black',
                                    backgroundColor:(dept==='WIN_SECURE_7')?green8:'white',textAlign:'center'}}
                                    onClick={this.handleOSChange}>WIN_SECURE_7
                                </div>
                            </div>
        
                        </div>

                    </div>
            
                    {/**************** TICKET ****************/}
                    <div style={{outline:'1px solid #2f9e44',display:'flex',flexDirection:'column',width:'stretch',height:'70%',marginTop:4,padding:0,boxSizing:'border-box'}}>
                        <div style={{position:'relative',paddingTop:3,paddingBottom:3,textAlign:'center',fontSize:'120%',backgroundColor:'#2f9e44',color:'white'}}>
                            ticket
                            <span style={{position:'absolute',right:5}}>
                                <button style={{backgroundColor:'white',color:'#2f9e44',border:'none',fontSize:'90%',height:20}} className='' onMouseDown={this.clearTicket}>clear all</button>
                            </span>
                        </div>

                        <div style={{padding:10,margin:0}}>
                            <div style={{margin:0,fontFamily:'Quattrocento Sans',display:'flex',flexDirection:'column'}}>
                                {
                                    ticketData.map((item)=> {
                                        return (
                                            <div key={item.timestamp} style={{display:'flex',justifyContent:'space-between',margin:2,padding:2,border:'1px solid gray',fontFamily:'Quattrocento Sans',lineHeight:'1em'}}>
                                            <div>{item.name}</div>
                                            <i className='fas fa-times-circle fa-1x' style={{color:green8}} onClick={(event)=>this.handleItemRemove(event,item)}></i>
                                            </div>
                                        )}
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        )
       
    }
}
       
function select (state) {
    return { data: state }
}
       
export default connect(select)(PSPC)