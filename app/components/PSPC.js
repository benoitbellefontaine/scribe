

import React from 'react'
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import * as d3 from "d3v4"
import LoadingButton from './common/LoadingButton'
import data from './data/cspsdata'
import {Link} from 'react-router'

import ModalDialog from './common/ModalDialog'

import {changeForm} from '../actions'
//import {fetchRequest} from '../actions'
//import { redBright } from 'ansi-colors';

import Autocomplete from './common/Autocomplete';
import AutocompleteCID from './common/AutocompleteCID';
import emails from "./data/emaildata";
import cis from "./data/cidata";
import treedata from './data/treedata';

const green8 = "#18c44b";
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


class Node extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            node: null,
            open: false,
            autoinfo: false,
            visibility: "visible",
            opacity: 1,
        }
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleModalDialog = this.handleModalDialog.bind(this);
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
        event.preventDefault()
        event.stopPropagation();
        // handle autoinfo
        if (this.props.autoinfo) {
            this.setState({autoinfo:true});
            return;
        }
        // handle link
        else if (this.props.linkto) {
            window.open( this.props.linkto, '_blank' );
            return;
        }
        else {
            //this.props.onItemClick(this.props.name)
            let email = this.props.user.email;
            let firstname = (email.split('.')[0]).toUpperCase();
            console.log(firstname);
            console.log('type',this.props.type)
            if (this.props.type === 'email') {
                console.log('this.props.type',this.props.type);
                location.href="mailto:"+this.props.user.email+"?subject="+this.props.user.ticket+this.props.subject+"&body="+"Bonjour "+this.props.user.email+',%0D%0A%0D%0A'+this.props.etext+this.props.agent+"%0D%0ASD SSC";
            }
            if (this.props.type!="start") {
                this.props.onItemClick(this.props.name)
            }
            const {node,open} = this.state;
            //this.props.onItemClick(this.props.name)
            // handle children
            if (!this.props.children) return;
            this.setState({open:!open});
        }
    }

    handleModalDialog() {
        console.log('handleModalDialog');
        this.setState({autoinfo:false,visibility:"visible",opacity:1});
        //console.log(this.props.autoinfo)
    }

    render() {
        const {name,children,tree,depth,index,indent,onItemClick,type,icon,selection,color,user,agent} = this.props;
        const {open} = this.state;
        let fontsize = 24 - depth * 2;
        let fontweight = 700 - depth * 50;
        let transform = 'translate(10,10)';
        let folderState = open 
            ? <i className="fas fa-folder-open fa-1x" style={{color:"#18c44b",fill:"white"}}></i> 
            : <i className="fas fa-folder fa-1x" style={{color:"#18c44b",fill:"#18c44b"}}></i>;
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
                            user={user}
                            agent={agent}
                            subject={child.subject}
                            etext={child.etext}
                            ftext={child.ftext}
                            autoinfo={child.autoinfo}
                            title={child.title}
                            linkto={child.linkto}
                            />
                    )})
                }
                {
                    this.state.autoinfo && (
                        <ModalDialog 
                            title={this.props.title} 
                            text={this.props.autoinfo} 
                            onClose={this.handleModalDialog}
                            opacity={this.state.opacity}
                            visibility={this.state.visibility}
                            />
                    )
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
            dept: "SSC",
            region: "NCR",
            ci: "ADOBE",
            os: "WIN7",
            user: {
                email: "first.last@canada.ca",
                userid: "userid",
                ticket: "IMXXXXXX",
                dept: "SSC",
                region: "ONT",
                ci: "ADOBE",
                os: "WIN7"
            },
            toggleControlPanel: false,
            agent: 'me'
        };

        this.clearTicket = this.clearTicket.bind(this)
        //this.handleOutlook = this.handleOutlook.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleAgentChange = this.handleAgentChange.bind(this)
        this.handleTicketChange = this.handleTicketChange.bind(this)
        this.handleTreeItemClick = this.handleTreeItemClick.bind(this)
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)
        this.handleOSChange = this.handleOSChange.bind(this)
        this.handleCIChange = this.handleCIChange.bind(this)
        this.handleItemRemove = this.handleItemRemove.bind(this)
        this.handleToggleControlPanel = this.handleToggleControlPanel.bind(this)

    }

    handleDepartmentChange (e) {
        let dept = e.currentTarget.innerText;
        console.log('handleDepartmentChange',dept);
        const {user} = this.state;
        user.dept = dept;
        this.setState({user:user,dept:e.currentTarget.innerText});
    }

    handleRegionChange (e) {
        let region = e.currentTarget.innerText;
        console.log('handleRegionChange',region);
        const {user} = this.state;
        user.region = region;
        this.setState({user:user,region:e.currentTarget.innerText});
    }

    handleOSChange (e) {
        let os = e.currentTarget.innerText;
        console.log('handleOSChange',os);
        const {user} = this.state;
        user.os = os;
        this.setState({user:user,os:e.currentTarget.innerText});
    }

    handleCIChange (ci) {
        //let ci = e.target.value;
        console.log('handleCIChange',ci);
        const {user} = this.state;
        user.ci = ci;
        this.setState({user:user,ci:ci});
    }

    /*handleOutlook (language,ticket,ftext,etext,fname,agent) {

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
    
    }*/

    componentWillMount() {
        this.setState({treeData:treedata});
    }

    componentDidMount() {
        this.setState({treeData:treedata});
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

    handleEmailChange(email) {
        const {user} = this.state;
        user.email = email;
        this.setState({user:user});
    }

    handleTicketChange(event) {
        let ticket = event.target.value;
        const {user} = this.state;
        user.ticket = ticket;
        this.setState({user:user});
    }

    handleAgentChange(event) {
        let agent = event.target.value;
        this.setState({agent:agent});
    }

    handleUsernameChange(event) {
        let username = event.target.value;
        const {user} = this.state;
        user.username = username;
        this.setState({user:user});
    }

    handleToggleControlPanel() {
        this.setState({toggleControlPanel:!this.state.toggleControlPanel});
    }

    render () {

        const {treeData,ticketData,dept,region,ci,os,user,agent} = this.state;
        
        if (treeData === {}) return null;
       
        const styleOuterPanelheight = this.state.toggleControlPanel 
        ? { 
            display:'flex',
            flexDirection:'column',
            height:'0vh',
            transition: 'height 2s'
        }
        : { 
            display:'flex',
            flexDirection:'column',
            height:'40vh',
            outline:'1px solid #18c44b',
            transition: 'height 2s'
        }
        
        const styleInnerPanelHeight = this.state.toggleControlPanel
        ? { 
            border:'1px solid #18c44b',
            padding:0,
            visibility:'hidden',
            height:'0vh' 
        }
        : { 
            border:'1px solid #18c44b',
            padding:10,
            visibility:'visible',
            height:'inherit' 
        }
       
        return (
        <div style={{display:'flex',width:'100%',height:'inherit',padding:20,fontFamily:'Quattrocento Sans'}}>
       
        {/**************** TREE ****************/}
        <div style={{border:'1px solid #18c44b',display:'flex',flexDirection:'column',width:'50%',height:'inherit',margin:2,padding:0}}>
       
        <div style={{border:'0px solid lightgray',padding:3,textAlign:'center',fontSize:'120%',backgroundColor:'#18c44b',color:'white'}}>tree</div>
            <div style={{padding:10, height:'inherit',overflowY:'auto'}}>
                <Node
                    key={treeData.name+0}
                    index={0}
                    tree={treeData}
                    name={treeData.name}
                    children={treeData.children}
                    depth={0}
                    indent={''}
                    onItemClick={(item)=>this.handleTreeItemClick(item)}
                    icon={this.state.treeData.icon}
                    color={this.state.treeData.color}
                    type={this.state.treeData.type}
                    selection={this.state.treeData.selection}
                    user={user}
                    subject={treeData.subject}
                    etext={treeData.etext}
                    ftext={treeData.ftext}
                    agent={agent}
                    autoinfo={treeData.autoinfo}
                    linkto={treeData.linkto}
                    title={treeData.title}
                >
                </Node>
            </div>
        </div>
       
        {/**************** CONTROL PANEL + TICKET ****************/}
        <div style={{border:'0px solid #18c44b',display:'flex',flexDirection:'column',width:'50%',height:'inherit',margin:2,padding:0,boxSizing:'border-box'}}>
       
        {/**************** CONTROL PANEL ****************/}
        <div style={{width:'100%'}}>
        
            <div style={{position:'relative',paddingTop:3,paddingBottom:3,textAlign:'center',fontSize:'120%',backgroundColor:'#18c44b',color:'white'}}
                onMouseDown={this.handleToggleControlPanel}>
                control panel
                <span style={{position:'absolute',right:5}}>
                <Motion style={{
                    deg: spring(this.state.toggleControlPanel ? 180 : 0, {stiffness: 400, damping: 60}),
                    }}>
                    {({deg}) => 
                        <i className="fas fa-chevron-circle-up" style={{
                            margin:'1px',
                            transform: `rotatez(${deg}deg)`,
                            }} 
                            onMouseDown={this.handleToggleControlPanel}></i> 
                        
                    
                }
                </Motion>
                </span>
            </div>
        
            <Motion style={{
                x: spring(this.state.toggleControlPanel ? 90 : 0, {stiffness: 400, damping: 60}),
                opacity: spring(this.state.toggleControlPanel ? 1 : 0, {stiffness: 400, damping: 60}),
                }}>
                {({x,opacity,padding,display,zindex}) => 
                <div style={{
                    border:'1px solid #18c44b',
                    padding: 0,
                    opacity: `${opacity}`,
                    maxHeight: `${x}vh`,
                    }}>
        
                    <div style={{padding:10}}>
            
                        {/**************** EMAIL + USERNAME + TICKET + AGENT ****************/}
                        <div style={{margin:0,marginBottom:10,padding:0,display:'flex',flexWrap:'wrap'}}>
                            <Autocomplete suggestions={emails} onEmailSelection={this.handleEmailChange} />
                            <form style={{margin:0,marginBottom:10,padding:0,display:'flex',flexGrow:1,maxHeight:30,marginLeft:2,marginRight:2}}>
                            <input style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',padding:3}} 
                            type="text" placeholder='username' onChange={this.handleUsernameChange} />
                            </form>
                            <form style={{margin:0,marginBottom:10,padding:0,display:'flex',flexGrow:1,maxHeight:30,marginLeft:2,marginRight:2}}>
                            <input style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',padding:3}} 
                            type="text" placeholder='ticket' onChange={this.handleTicketChange} />
                            </form>
                            <form style={{margin:0,marginBottom:10,padding:0,display:'flex',flexGrow:1,maxHeight:30,marginLeft:2,marginRight:2}}>
                            <input style={{borderRadius:'0px',flexGrow:1,border:'1px solid gray',padding:3}} 
                            type="text" placeholder='agent' onChange={this.handleAgentChange} />
                            </form>
                        </div>
                    
                        {/**************** Select DEPARTMENT ****************/}
                        <div style={{margin:0,marginBottom:10,padding:0,display:'flex',flexWrap:'wrap'}}>
                            <div style={{border:'0px solid gray',margin:2,padding:2,color:'#c42318'}}><strong>Department</strong></div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(dept==='CSPS')?'white':'#c42318',
                            backgroundColor:(dept==='CSPS')?'#c42318':'white',
                            textAlign:'center'}}
                            onClick={this.handleDepartmentChange}>
                            CSPS
                            </div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(dept==='INFC')?'white':'#c42318',
                            backgroundColor:(dept==='INFC')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleDepartmentChange}>
                            INFC
                            </div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(dept==='PSPC')?'white':'#c42318',
                            backgroundColor:(dept==='PSPC')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleDepartmentChange}>
                            PSPC
                            </div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(dept==='SSC')?'white':'#c42318',
                            backgroundColor:(dept==='SSC')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleDepartmentChange}>SSC
                            </div>
                        </div>
                    
                        {/**************** Select REGION ****************/}
                        <div style={{margin:0,marginBottom:10,padding:0,display:'flex',flexWrap:'wrap'}}>
                            <div style={{border:'0px solid gray',margin:2,padding:2,color:'#c42318'}}><strong>Region</strong></div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(region==='ATL')?'white':'#c42318',
                            backgroundColor:(region==='ATL')?'#c42318':'white',
                            textAlign:'center'}}
                            onClick={this.handleRegionChange}>ATL
                            </div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(region==='NCR')?'white':'#c42318',
                            backgroundColor:(region==='NCR')?'#c42318':'white',
                            textAlign:'center'}}
                            onClick={this.handleRegionChange}>NCR</div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(region==='ONT')?'white':'#c42318',
                            backgroundColor:(region==='ONT')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleRegionChange}>ONT</div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(region==='PAC')?'white':'#c42318',
                            backgroundColor:(region==='PAC')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleRegionChange}>PAC</div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(region==='QUE')?'white':'#c42318',
                            backgroundColor:(region==='QUE')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleRegionChange}>QUE</div>
                            <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                            color:(region==='WST')?'white':'#c42318',
                            backgroundColor:(region==='WST')?'#c42318':'white',textAlign:'center'}}
                            onClick={this.handleRegionChange}>WST</div>
                        </div>
                        
                        <div style={{display:'flex'}}>
                            {/**************** Select CIs ****************/}
                            <AutocompleteCID suggestions={cis} onCIChange={this.handleCIChange}/>
                            
                            {/**************** Select OS ****************/}
                            <div style={{margin:0,marginBottom:0,padding:0,flexGrow:1,display:'flex',flexWrap:'wrap'}}>
                                <div style={{border:'0px solid gray',margin:2,padding:2,maxHeight:25,color:'#c42318'}}><strong>Workstation</strong></div>
                                <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                                color:(os==='WIN7')?'white':'#c42318',
                                backgroundColor:(os==='WIN7')?'#c42318':'white',
                                textAlign:'center',maxHeight:25}}
                                onClick={this.handleOSChange}>WIN7
                                </div>
                                <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                                color:(os==='WIN10')?'white':'#c42318',
                                backgroundColor:(os==='WIN10')?'#c42318':'white',
                                textAlign:'center',maxHeight:25}}
                                onClick={this.handleOSChange}>WIN10
                                </div>
                                <div style={{border:'1px solid #c42318',margin:2,padding:2,flexGrow:1,
                                color:(os==='WIN_SECURE_7')?'white':'#c42318',
                                backgroundColor:(os==='WIN_SECURE_7')?'#c42318':'white',textAlign:'center',maxHeight:25}}
                                onClick={this.handleOSChange}>WIN_SECURE_7
                                </div>
                            </div>
                        </div>
                
                    </div>
                </div>
            }
            </Motion>
        </div>
        
        {/**************** TICKET ****************/}
        <div style={{border:'1px solid #18c44b',display:'flex',flexDirection:'column',width:'stretch',height:'inherit',marginTop:4,padding:0,boxSizing:'border-box',zIndex:100}}>
        
        <div style={{position:'relative',paddingTop:3,paddingBottom:3,textAlign:'center',fontSize:'120%',backgroundColor:'#18c44b',color:'white'}}>
        ticket
        <span style={{position:'absolute',right:5}}>
        { this.state.toggleControlPanel 
        ? <i className="fas fa-trash-alt" style={{margin:'1px'}} onMouseDown={this.clearTicket}></i> 
        : <i className="fas fa-trash-alt" style={{margin:'1px'}} onMouseDown={this.clearTicket}></i> 
        }
        </span>
        </div>
       
        <div style={{padding:10,margin:0,overflowY:'auto'}}>
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