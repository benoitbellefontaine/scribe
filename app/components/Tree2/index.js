import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import { Keyframes, animated, config } from 'react-spring';
import 'antd/dist/antd.css'
//import { Form, Input, Button, Icon} from 'antd';
import Tree from './Tree';
import * as Icons from './icons';

import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

const listbox = {    
    padding: 5,
    margin: 2,
    borderRadius: 5,
    maxHeight: 30,
    backgroundColor: 'rgba(0,180,0,1)',
    flexGrow: 1,
    textAlign: 'center'
}

var SubjectsEnum = Object.freeze({
    // list
    //  - access
    //    - LAN access
    //    - WAN access (none or slow)
    //    - WLAN access (wifi)
    //    - server access (http servers, remote servers, ftp servers, etc...)    
    //  - device
    //  - email


    welcome : {
        key: 1,
        title: "welcome to ticket builder",
        items:[
            <h2>welcome to ticket builder</h2>,
            <div style={{padding:10}}><em>a system to train and guide agents through resolution and escalation processes, troubleshoot issues, access all relevant confluence links, create and send emails to users and partners using preset templates with just a few mouse clicks</em></div>,
                <div><strong>using the icons inside the tree:</strong>
                    <ul style={{fontFamily: 'Quattrocento Sans'}}>
                        <li>click on the EMOJI next to the expand <Icons.PlusSquareO style={{width:'1em',height:'1em',lineHeight:'2em'}}/> or collapse <Icons.MinusSquareO style={{width:'1em',height:'1em'}}/> icon to open the sidebar. 
                            Note that only green-colored nodes have a descriptive sidebar. 
                        </li>
                        <li>click on the 
                            <span style={{fontFamily: 'monospace',fontSize: '0.75em',lineHeight:'1em',border:'2px solid darkgray',borderRadius:'3px',margin:'2px',padding:1,cursor:'pointer',color:'red',backgroundColor:'white'}}><strong>rec</strong></span>
                            button at the end of each line and start building your ticket.
                        </li>
                        <li>click on the
                            <span style={{fontFamily: 'monospace',fontSize: '0.75em',height:'15px',lineHeight:'1em',border:'0px solid darkgray',borderRadius:'3px',margin:'2px',padding:3,cursor:'pointer',backgroundColor:'darkgray',color:'white',backgroundImage:'linear-gradient(#5770ff,#70abff)'}}><strong>link</strong></span>
                            button to access the confluence article related to the subject matter.
                        </li>
                        <li>click on the <span style={{fontFamily: 'monospace',fontSize: '0.75em',height:'15px',lineHeight:'1em',border:'0px solid darkgray',borderRadius:'3px',margin:'2px',padding:3,cursor:'pointer',backgroundColor:'darkgray',color:'white',backgroundImage:'linear-gradient(#5770ff,#70abff)'}}><strong>email</strong></span>
                            button to send a generic email template in regards to the subject matter.
                        </li>
                        <li>in the <strong>end user resolution</strong> widget, click on the <i className="fas fa-trash-alt" style={{margin:'1px'}}></i> trash can icon to flush the entire content or click on the <i className='fas fa-times-circle fa-1x' style={{color:'#1F75FE'}} /> times-circle icon to remove the line</li>
                        <li>click on the <Icon type={`menu-fold`} className="sidebar-toggle" style={{ position: 'relative', fontSize:'1.1em' }}/> icon to close this sidebar.</li>
                    </ul>
                </div>,
            <div>supported high-level abstract issues (each abstract is located under the <strong>technical support issue</strong> node)
                <div style={{fontFamily: 'Quattrocento Sans',display:'flex',flexWrap:'wrap'}}>
                    <div style={listbox}>connectivity</div>
                    <div style={listbox}>device</div>
                    <div style={listbox}>email</div>
                    <div style={listbox}>mykey</div>
                    <div style={listbox}>special support groups</div>
                    <div style={listbox}>voice</div>
                    <div style={listbox}>vpn</div>
                </div>
            </div>,
            <div style={{textAlign:'center'}}><em>Enjoy the ride!</em></div>,
        ]
    }, 
    vpn:{
        key: 2,
        title: "vpn",
        items:[
            <h2>vpn</h2>,
            <div style={{padding:10}}><em>a secure remote access connection between the client (Cisco AnyConnect Secure Mobility Client) and a SRA server</em></div>,
            <div><strong>user requirements:</strong><ul style={{fontFamily: 'Quattrocento Sans'}}><li>an internet connection;</li><li>a valid myKey;</li><li>a valid account to their departemental SRA gateway.</li></ul></div>,
        ]
    }, 
    mykey:{
        key: 3,
        title: "mykey",
        items:[
            <h2>myKEY</h2>,
            <div style={{padding:10}}><em>a x.509 certificate containing 2 key pairs (encryption and digital signature)</em></div>,
            <div><strong>definitions:</strong>
                <ul style={{fontFamily: 'Quattrocento Sans'}}>
                    <li>LRA: departmental officer responsible for initiating creation and delivery of key certificates</li>
                    <li>ORCA: web-based platform to retrieve certificates</li>
                    <li>uses: email encryption and signing, vpn authentication & payload encryption, web-based authentication to various sites (compensation web applications, pspm)</li>
                </ul>
            </div>,
            <div><Button type="primary" htmlType="submit" className="login-form-button" children="Email Client" onClick={(vpn_fields)=>this.sendEmail(vpn_fields)}/></div>
        ]
    }, 
    voice: {
        key: 4,
        title: "voice (line, service, device, etc.)",
        items:[
            <h2>voice (line, service, device, etc.)</h2>,
            <div style={{padding:10}}><em>we provide support for all voice equipment including landline devices, VoIP devices and mobile devices, and all related services</em></div>,
            <div><strong>3 main equipment types:</strong><ul style={{fontFamily: 'Quattrocento Sans'}}><li>landline phones;</li><li>voip phones;</li><li>mobile devices.</li></ul></div>,
            <div><strong>provided services:</strong><ul style={{fontFamily: 'Quattrocento Sans'}}><li>troubleshooting technical issues;</li><li>break/replace defective equipment;</li><li>voicemail box and password reset.</li></ul></div>,
        ]
    }, 
    "wifi":4, 
    "lan":5, 
    "email":6
})

const box = {    
    padding: 5,
    paddingLeft: 5,
    height: 'stretch',
    maxHeight: '100vh',
    width: '100%',
    overflow: 'auto',
    border: '1px solid lightgray',
    boxSizing: 'border-box',
}

const treeStyles = {
    position: 'relative',
    top: 0,
    left: 0,
    color: 'white',
    color: 'black',
    fill: 'white',
    fill: 'black',
    width: '100%',
    overflow: 'hidden',
    fontWeight: 500
}

const coloredTreeStyles = {
    position: 'relative',
    top: 0,
    left: 0,
    color: 'white',
    color: 'green',
    fill: 'white',
    fill: 'black',
    width: '100%',
    overflow: 'hidden',
    fontWeight: 600
}

const typeStyles = {
    position: 'relative',
    fontSize: '2.5em',
    verticalAlign: 'middle',
    fontFamily: 'Monospaced Number',
    textAlign: 'center',
    minWidth: '30px',
    fontFamily: 'Quattrocento Sans'
}

const coloredTypeStyles = {
    position: 'relative',
    fontSize: '2.5em',
    margin: 10,
    verticalAlign: 'middle',
    fontFamily: 'Monospaced Number',
    textAlign: 'center',
    minWidth: '30px',
    color: 'green',
    fontFamily: 'Quattrocento Sans'
}

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
    // Slots can take arrays/chains,
    peek: [
      { x: 0, deg: 0, opacity:1, from: { x: -100, deg: -9, opacity:0, }, delay: 500 },
      //{ x: -100, delay: 800 },
    ],
    // single items,
    open: { delay: 0, x: 0, opacity:1 },
    close: { delay: 0, x: -100, opacity:0 },
    // or async functions with side-effects
    /*close: async call => {
      await delay(400)
      await call({ delay: 0, x: -100 })
    },*/
})
  
  // Creates a keyframed trail
const Content = Keyframes.Trail({
    peek: [
      { delay: 600, 
        from: { x: -100, opacity: 0 }, 
        to: { x: 0, opacity: 1, delay: 100 } 
      }, 
      //{ to: { x: -100, opacity: 0 }}
    ],
    open: { x: 0, opacity: 1, delay: 100 },
    close: { x: -100, opacity: 0, delay: 0 },
})

class EmojiTree extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            open: undefined,
            ticketlines: [],
            title:null,text:'',
            showInfo: false,
            showSteps: true,
            selector: SubjectsEnum.welcome
        };
        this.sendEmail = this.sendEmail.bind(this)
        this.toggleSidebar = this.toggleSidebar.bind(this)
        this.clearTicket = this.clearTicket.bind(this)
        this.handleTreeItemClick = this.handleTreeItemClick.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    componentDidMount() {
        this.setState({ticketlines:[]});
    }

    handleTreeItemClick (item,title,text) {
        if (item === 'info') {
            alert(title);
            this.setState({showInfo:true,showSteps:false,title:title,text:text});
        }
        else {
            const {ticketlines} = this.state;
            ticketlines.push({item:item,timestamp:new Date().getTime()});
            this.setState({showInfo:false,showSteps:true,ticketlines:ticketlines,title:null});
        }
    }

    clearTicket() {
        this.setState({ticketlines:[]});
    }

    handleItemRemove(event,item) {
        const {ticketlines} = this.state;
        //e.preventDefault();
        console.log('item',item);
        console.log('index',ticketlines.indexOf(item))
        var index = ticketlines.indexOf(item);
        if (ticketlines.length>0) {
            ticketlines.splice(index,1);
            this.setState({ticketlines:ticketlines});
        }
    }

    toggleSidebar(sel) {
        let selector = SubjectsEnum.welcome;
        if (sel === 1) selector = SubjectsEnum.welcome;
        if (sel === 2) selector = SubjectsEnum.vpn;
        if (sel === 3) selector = SubjectsEnum.mykey;
        if (sel === 4) selector = SubjectsEnum.voice;
        if (this.state.open === undefined) this.setState(state => ({ open: false, selector: selector })) 
        else this.setState(state => ({ open: !state.open, selector: selector })) 
        console.log( this.state.selector );
    }

    sendEmail(vpn) {
        console.log('sendEmail()')
        location.href="mailto:"+vpn.to+"?subject="+vpn.subject+"&body="+"Hello,%0D%0A%0D%0A"+vpn.text+'%0D%0A%0D%0A'+vpn.agent+"%0D%0ASD SSC";
    }

    render () {
        const {ticketlines} = this.state;
        if (ticketlines === null) return null;
        const state =
        this.state.open === undefined
          ? 'peek'
          : this.state.open
            ? 'open'
            : 'close'

        const items = [
            //<Avatar src="https://semantic-ui.com/images/avatar2/large/matthew.png" />,
            //<div className="ant-truck"><Icons.Email /></div>,
            <h3 style={{margin:0,padding:0,textAlign:'center'}}>Communiquer avec nous</h3>,
            <Input style={{ marginTop:10 }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nom" />,
            <Input style={{ marginTop:10 }} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Adresse courriel" />,
            <Input.TextArea style={{ marginTop:10 }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Message" />,
            <Button type="primary" htmlType="submit" className="login-form-button" children="Envoyer votre message" onClick={this.toggleSidebar}/>,
            <Button prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              type="disabled" htmlType="submit" className="login-form-button" children="appeler nous au (819) 643-4448" />,
        ]

        return (
        <div style={{
            height: '88vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',

        }}>
        
            <div style={{
                fontFamily:'Quattrocento Sans',
                display:'-ms-flexbox',
                alignItems: 'center',
                justifyContent: 'center',
                width: '95vw',
                height: '88vh',
                fontSize: '1vw',
                margin: 10,
                padding: '1em',
                backgroundColor: 'white',
                boxShadow: '5px 5px 10px rgb(220,220,220)',
                borderRadius:'0px',
                zIndex: 10,
                }}>

                <div style={{display:'flex',border:'1px solid #1F75FE',height:'100%',width:'100%',padding:5,boxSizing:'border-box'}}>
                    <div style={box}>
                        <Tree content="welcome to ticket builder" style={{
                            position: 'relative',
                            top: 0,
                            left: 0,
                            color: 'green',
                            fill: 'green',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            fontWeight: 600,
                            overflowY:'auto'}}
                            type={<span style={typeStyles} onClick={()=>this.toggleSidebar(1)}>🎼</span>}
                            onMouseDown={(item)=>this.handleTreeItemClick(item)}>
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="technical support issue" type={<span style={typeStyles}>⚡</span>} style={treeStyles}>
                                
                                {/* CONNECTIVITY DEVICE ISSUE */}

                                {/* COMPUTING DEVICE ISSUE */}
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="device issue" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="main device problem" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client has desktop computer" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client has laptop computer" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client has tablet" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="peripheral problem" type={<span style={typeStyles}>⌨</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="monitor problem" type={<span style={typeStyles}>📺</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="keyboard problem" type={<span style={typeStyles}>⌨</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="mouse problem" type={<span style={typeStyles}>🐭</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                </Tree>
                                
                                {/* EMAIL ISSUE */}
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="email issue" type={<span style={typeStyles}>📧</span>} style={coloredTreeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="email account access problem" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="webmail access test" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="message: wrong username/password (wrong password)" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                    content="password reset" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                        content="client able to reset own password in ETI" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                    </Tree>
                                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                        content="--> reset password in ETI" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                    </Tree>
                                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                        content="access OK" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                    </Tree>
                                                </Tree>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="message: account not accessible (the email account is locked)" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                    content="--> unlocked account" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                                </Tree>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="passed the webmail access test" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            </Tree>
                                        </Tree>

                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="account is disabled in ETI (choose 1 of 2)" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="refered user to local manager" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="sent email to ncr flow control"
                                                canEmail user="user" to="ncrflowcontrol@pwgsc.gc.ca" agent="me" re="" subject="email address disabled" text="Please verify that user has a valid VPN account"/>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="escalated ticket to ncrflowcontrol (email button)" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            </Tree>
                                        </Tree>

                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="ETI issue" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="escalated issue to ETI" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                            </Tree>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="generic email account issue" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="monitor problem" type={<span style={typeStyles}>📺</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="keyboard problem" type={<span style={typeStyles}>⌨</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="mouse problem" type={<span style={typeStyles}>🐭</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="outlook 2013 issue" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client has desktop computer" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client has laptop computer" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client has tablet" type={<span style={typeStyles}>💻</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="mobile device email issue" type={<span style={typeStyles}>📧</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="monitor problem" type={<span style={typeStyles}>📺</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="keyboard problem" type={<span style={typeStyles}>⌨</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="mouse problem" type={<span style={typeStyles}>🐭</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                </Tree>

                                {/* GCSI */}
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="gcsi support" type={<span style={typeStyles} >🔒</span>} style={treeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="general information + call handling" canLink url="https://confluence.ssc-spc.gc.ca/display/SEISC/PSPC+GCSI+Support"
                                        type={<span style={typeStyles}>🔒</span>} 
                                        style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="Troubleshooting GCSI Secure printers" canLink url="https://confluence.ssc-spc.gc.ca/display/SEISC/A+-+PSPC+GCSI+-+Troubleshooting+-+GCSI+Printers"
                                        type={<span style={typeStyles}>🔒</span>} 
                                        style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="troubleshooting gcsi secure terminals" canLink url="https://confluence.ssc-spc.gc.ca/display/SEISC/B+-+PSPC+GCSI+-+Troubleshooting+-+GCSI+Terminal"
                                        type={<span style={typeStyles}>🔒</span>} 
                                        style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="performed best effort + im ticket escalated to NCRDC" canLink url="https://confluence.ssc-spc.gc.ca/display/SEISC/A+-+PSPC+GCSI+-+Troubleshooting+-+GCSI+Printers"
                                        type={<span style={typeStyles}>🔒</span>} 
                                        style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="client calling wrong queue - transfered to appropriate queue" canLink url="https://confluence.ssc-spc.gc.ca/display/SEISC/A+-+PSPC+GCSI+-+Troubleshooting+-+GCSI+Printers"
                                        type={<span style={typeStyles}>🔒</span>} 
                                        style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="link to confluence - hccs call handling for agents" canLink url="https://confluence.ssc-spc.gc.ca/display/SEWS/HCCS+-+Call+Handling+for+Agents"
                                            type={<span style={typeStyles}>🔒</span>} 
                                            style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                </Tree>

                                {/* VOICE TELECOMMUNICATION ISSUE */}
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="voice telecommunication issue" type={<span style={typeStyles} onClick={()=>this.toggleSidebar(4)}>📞</span>} style={coloredTreeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="voice mailbox issue" type={<span style={typeStyles}>☎️</span>} 
                                        style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="trying to reach client and getting message : i'm sorry but the person you called has a voice mailbox that has not been set up yet" type={<span style={typeStyles}>☎️</span>} 
                                            style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="client wants voice mailbox and password reset" type={<span style={typeStyles}>☎️</span>} 
                                            style={treeStyles}>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="landline voice mailbox and password reset" type={<span style={typeStyles}>☎️</span>} 
                                                canLink url="https://confluence.ssc-spc.gc.ca/pages/viewpage.action?pageId=86325064"
                                                style={treeStyles}>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="voip voice mailbox and password reset" type={<span style={typeStyles}>☎️</span>} 
                                                canLink url="https://confluence.ssc-spc.gc.ca/display/SEWS/Voicemail+Passwords+Reset+-+VoIP"
                                                style={treeStyles}>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="mobile device voice mailbox and password reset" type={<span style={typeStyles}>☎️</span>} 
                                                canLink url="https://confluence.ssc-spc.gc.ca/display/SEWS/Voicemail+Passwords+Reset+-+Mobile+Devices"
                                                style={treeStyles}>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="escalated issue via proper channel" type={<span style={typeStyles}>☎️</span>} 
                                                style={treeStyles}>
                                            </Tree>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="landline issue" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="line problem" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="telephone problem"
                                            type={<span style={typeStyles}>📞</span>} 
                                            style={treeStyles}>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="client was able to swap device"
                                                type={<span style={typeStyles}>📞</span>}
                                                style={treeStyles}>
                                            </Tree>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="client was NOT able to swap device"
                                                type={<span style={typeStyles}>📞</span>}
                                                style={treeStyles}>
                                            </Tree>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="voip issue" type={<span style={typeStyles}>☎️</span>} 
                                        style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="mobile device issue" type={<span style={typeStyles}>📱</span>} 
                                        style={treeStyles}>
                                    </Tree>
                                </Tree>
                                
                                {/* myKEY CERTIFICATE ISSUE */}
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="mykey issue" type={<span style={typeStyles} onClick={()=>this.toggleSidebar(3)}>🗝️</span>} style={coloredTreeStyles}>
                                </Tree>
                                {/* VPN ISSUE */}
                                <Tree onMouseDown={(item,title,text)=>this.handleTreeItemClick(item,title,text)} 
                                    content="vpn issue" type={<span style={typeStyles} onClick={()=>this.toggleSidebar(2)}>🔐</span>} style={coloredTreeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="link to confluence" type={<span style={typeStyles}>🔗</span>} style={treeStyles}
                                        canLink url="https://confluence.ssc-spc.gc.ca/display/SEWS/Cisco+AnyConnect"
                                        >
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="vpn connection prerequisites" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client confirm connection to LAN/WLAN" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="ensure client is connected to mykey" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client able to logoff/login to mykey" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="client confirm vpn account validity" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="interrogate sra about client vpn account validity" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="sent email to gcsra and waiting for response" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="sent email to gcsra"
                                                canEmail user="user" to="NCRGCSRA.RCNGCSRA@ssc-spc.gc.ca" agent="me" subject="vpn account validation" text="Please verify that user has a valid VPN account"/>
                                        </Tree>
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                            content="created & escalated ticket to npssras" type={<span style={typeStyles}>🔐</span>} style={treeStyles}>
                                        </Tree>
                                    </Tree>
                                    
                                </Tree>
                                {/* VPN ISSUE 
                                    { "name": "vpn issue",
                                        "children": [
                                            { "name":"educating rita...", "icon": info, "color": blue8, "title":"VPN",
                                                "autoinfo":"VPN users require 3 components to connect from outside to the GC network: (1) an internet connection \
                                                (2) a valid myKey,  and (3) a valid account to their departemental SRA gateway."
                                            },
                                            { "name":"link to confluence (cisco anyconnect)", "icon": link, "color": orange8,
                                                "linkto":"https://confluence.ssc-spc.gc.ca/display/SEWS/Cisco+AnyConnect"
                                            },
                                            { "name": "vpn connection prerequisites",
                                                "children": [
                                                    {   "name": "client confirmed connection to internet", "type":"leaf", "icon": leaf, "color": green8 },
                                                    {   "name": "ensured client is connected to mykey", "type":"leaf", "icon": leaf, "color": green8 },
                                                    {   "name": "asked client to logoff/login to mykey", "type":"leaf", "icon": leaf, "color": green8 },
                                                    {   "name": "client confirmed vpn account validity", "type":"leaf", "icon": leaf, "color": green8 },
                                                ]
                                            },
                                            { "name": "interrogate sra about client vpn account validity",
                                                "children": [
                                                    {   "name": "sent email to gcsra and waiting for response", "type":"email", "icon": mail, "color": blue8,
                                                        "to":"NCRGCSRA.RCNGCSRA@ssc-spc.gc.ca",
                                                        "subject": "vpn account",
                                                        "etext": "Hello, %0D%0A%0D%0APlease verify that%0D%0A%0D%0A",
                                                        "etext1": "%0D%0A%0D%0Ahave a valid vpn account%0D%0A%0D%0AThank you,"
                                                    },
                                                    {   "name": "created & escalated ticket to npssras", "type":"ticket", "icon": paper, "color": indigo8,
                                                    },
                                                ]
                                            },
                                            { "name": "client is connected to a wireless network",
                                                "children": [
                                                    { "name":"but cannot connect through the vpn", "icon":leaf, "color": green8 },
                                                    { "name":"asked client to reboot device", "icon":leaf, "color": green8 },
                                                    { "name":"still cannot connect", "icon":leaf, "color": green8 },
                                                    { "name":"asked client to logoff and login to mykey", "icon":leaf, "color": green8 },
                                                    { "name":"told client to go back to office and reinstall cisco anytime client", "icon":leaf, "color": green8 },
                                                    { "name":"created ticket and escalated to NATDSUPP", "icon":leaf, "color": green8 },
                                                ]
                                            },
                                            { "name": "connecting to a network with a gateway firewall (e.g hotel)",
                                                "children": [
                                                    { "name":"asked client to login to mykey", "icon":leaf, "color": green8 },
                                                    { "name":"ensured client has a valid vpn account", "icon":leaf, "color": green8 },
                                                    { "name":"ensured client is connected to a wireless network", "icon":leaf, "color": green8 },
                                                    { "name":"asked client to open the dos prompt (cmd) and", "icon":leaf, "color": green8 },
                                                    { "name":"execute: netsh wlan show profiles >c:\intel\wifi_issue.txt", "icon":leaf, "color": green8 },
                                                    { "name":"had the client look at the c:\intel\wifi_issue.txt and", "icon":leaf, "color": green8 },
                                                    { "name":"take note of the wifi profile name from the hotel and", "icon":leaf, "color": green8 },
                                                    { "name":"execute : netsh wlan delete profile <profile name>", "icon":leaf, "color": green8 },
                                                    { "name":"had client cancel cisco anyconnect if it attempts to load", "icon":leaf, "color": green8 },
                                                    { "name":"asked client to access hotel website and accepts Terms of Use", "icon":leaf, "color": green8 },
                                                    { "name":"asked client to reload cisco anyconnect and connect", "icon":leaf, "color": green8 },
                                                ]
                                            },
                                            { "name": "client getting a specific error message", "icon":error, "color":"#f08c00",
                                                "children": [
                                                    { "name":"error 'certificate validation failure'", "icon":leaf, "color":"#f08c00",
                                                        "children": [
                                                            { "name":"client mykey may not exist or is invalid", "icon":leaf, "color": "#f08c00" },
                                                            { "name":"client to return to office and download new certificate", "icon":leaf, "color":"#f08c00" },
                                                        ]
                                                    },
                                                    { "name":"error: 'always-on failure'", "icon":leaf, "color":"#f08c00",
                                                        "children": [
                                                            { "name":"this feature allows connectivity only if client is vpn-connected", "icon":leaf, "color": "#f08c00" },
                                                            { "name":"client may not have an account -> interrogate sra", "icon":leaf, "color": "#f08c00" }
                                                        ]
                                                    },
                                                    { "name":"error: 'always-on failure'", "icon":leaf, "color":"#f08c00",
                                                        "children": [
                                                            { "name":"client may not have an account -> interrogate sra", "icon":leaf, "color": "#f08c00" }
                                                        ]
                                                    },
                                                ]
                                            },
                                        ] 
                                    },

                                */}
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="mobile device issue" type={<span style={typeStyles}>🔗</span>} 
                                    style={treeStyles}
                                    >
                                </Tree>
                            </Tree>

                            {/* UTILS */}
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="utils" type={<span style={typeStyles}>🎁</span>} style={treeStyles}>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="outages">
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="link to outages" canLink url="https://confluence.ssc-spc.gc.ca/display/SEWS/Current+Outages"></Tree> 
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="outage process">
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="client confirmed colleagues experiencing the same issue" />
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="created ticket as per the normal troubleshooting and escalation process" />
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="advised team lead to review if more than 1 user is affected" />
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="team lead to review/document situation and initiate contact with esd" />
                                        <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                                content="sent email to team lead"
                                                canEmail user="user" to="yvelson@canada.ca;thomas.lavier@canada.ca" agent="me" subject="outage" text="Outage at ..."/>
                                    </Tree>                               
                                </Tree>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="most valuable phone numbers" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="esd : 1-855-830-7782" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="csps : 613-943-6236" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="infc : 613-941-2427" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="<span>pspc : 1-866-995-6030</span>" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="ssc : 1-855-591-0550" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="cwa sd: 1-855-634-2358 email: AWRAIDE.CWAHELP@tpsgc-pwgsc.gc.ca" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                        content="bell activation hotline: 1-866-238-0988" type={<span style={typeStyles}>📞</span>} style={treeStyles}>
                                    </Tree>
                                </Tree>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} 
                                    content="most valuable links" type={<span style={typeStyles}>🔗</span>} style={treeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} canLink url='https://eajl-orca.securise-secure.gc.ca/O/vw/bienvenue-welcome-eng.pub'
                                        content="orca" type={<span style={typeStyles}>🔗</span>}>
                                    </Tree>
                                </Tree>
                            </Tree>

                            {/* SOLVED - UNSOLVED */}
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="problem not solved"
                                type={<span style={typeStyles}>❌</span>} 
                                style={treeStyles}>
                            </Tree>
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="problem solved"
                                type={<span style={typeStyles}>✔</span>} 
                                style={treeStyles}>
                            </Tree>
                            

                        </Tree>
                    </div>

                    {this.state.showInfo && (
                        <div style={{
                            flex:'column',
                            marginLeft:5,
                            padding:10,
                            //height:'100%',
                            width:'50%',
                            height:'stretch',maxHeight:'100vh',border:'1px solid lightgray',textAlign:'left'}}>

                            {/**************** TICKET ****************/}
                            <Motion style={{ 
                                    opacity: spring(( (this.state.title !== null ) ) ? 1 : 0, {stiffness: 400, damping: 60}),
                                    maxheight: spring(( (this.state.title !== null ) ) ? 100 : 0, {stiffness: 400, damping: 60}),
                                    maxwidth: spring(( (this.state.title !== null ) ) ? 100 : 0, {stiffness: 400, damping: 60}),
                                    }}>
                                {({opacity,maxheight,maxwidth}) => 
                                    <div  style={{
                                        margin:'1px',
                                        opacity: opacity,
                                        maxHeight: `${maxheight}%`,
                                        //maxHeight: `100%`,
                                        //maxWidth: `${maxwidth}%`,
                                        width:'100%',
                                        height:'100%',
                                        border:'1px solid #1FFE75',
                                        display:'flex',
                                        flexDirection:'column',
                                        padding:0,
                                        overflowY:'auto',
                                        padding: 10,
                                        backgroundImage: 'linear-gradient(#1FFE7588,#1F75FE88)'
                                        }}>
                                        <h3 style={{textAlign:'center'}}>{this.state.title}</h3>
                                        {this.state.text}
                                    </div>
                                }
                            </Motion>                        
                            {/**************** TICKET ****************/}

                        </div>
                    )}

                    {this.state.showSteps && (
                        <div style={{
                            flex:'column',
                            marginLeft:5,
                            zIndex: 10,
                            padding:10,
                            width:'50%',
                            height:'stretch',maxHeight:'100vh',border:'1px solid lightgray',textAlign:'left'}}
                            >

                            {/**************** TICKET ****************/}
                            <Motion style={{ 
                                    opacity: spring(( (this.state.ticketlines.length > 0 ) ) ? 1 : 0, {stiffness: 400, damping: 60}),
                                    maxheight: spring(( (this.state.ticketlines.length > 0 ) ) ? 100 : 0, {stiffness: 400, damping: 60}),
                                    }}>
                                {({opacity,maxheight}) => 
                                    <div  style={{
                                        margin:'1px',
                                        opacity: opacity,
                                        maxHeight: `${maxheight}%`,
                                        border:'3px solid #1F75FE',
                                        display:'flex',
                                        flexDirection:'column',
                                        width:'stretch',
                                        height:'100%',
                                        padding:0,
                                        overflowY:'auto'
                                        }}>

                                        <div style={{position:'relative',paddingTop:3,paddingBottom:3,textAlign:'center',fontSize:'120%',backgroundColor:'#1F75FE',color:'white'}}>
                                            end user resolution
                                            <span style={{position:'absolute',right:5}}>
                                            { this.state.toggleControlPanel 
                                            ? <i className="fas fa-trash-alt" style={{margin:'1px'}} onMouseDown={this.clearTicket}></i> 
                                            : <i className="fas fa-trash-alt" style={{margin:'1px'}} onMouseDown={this.clearTicket}></i> 
                                            }
                                            </span>
                                        </div>
                            
                                        <div style={{padding:5,margin:0}}>
                                            <div style={{margin:0,fontFamily:'Quattrocento Sans',display:'flex',flexDirection:'column'}}>
                                                {
                                                    this.state.ticketlines.map((item)=> {
                                                        return (
                                                            <div key={item.timestamp} style={{display:'flex',justifyContent:'space-between',margin:2,padding:2,border:'1px solid lightgray',fontFamily:'Quattrocento Sans',lineHeight:'1em'}}>
                                                            <div>{item.item}</div>
                                                            <i className='fas fa-times-circle fa-1x' style={{color:'#1F75FE'}} onMouseDown={(event)=>this.handleItemRemove(event,item)}></i>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                }
                            </Motion>                        
                            {/**************** TICKET ****************/}

                        </div>
                    )}
                </div>
    
            </div>

            {/* SIDEBAR */}
            <div style={{position:'absolute',top:0,left:0,height:'100vh',overflow:'hidden'}}>
                <Sidebar native state={state} style={{overflow:'hidden',overflowY:'auto',zIndex:11}}>
                    {({ x, opacity }) => (
                    <animated.div className="sidebar" style={{ transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}>
                        <Icon type={`menu-fold`} className="sidebar-toggle" style={{ right:20 }} onClick={this.toggleSidebar} />
                        <Content native items={this.state.selector.items} keys={this.state.selector.items.map((_, i) => i)} config={config.normal} state={state}>
                            {(item, i) => ({ x, opacity, ...props }) => (
                                <animated.div
                                    style={{
                                        transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                                        opacity: opacity,
                                        ...props,
                                    }}>
                                    <div className={i === 0 ? 'middle' : ''}>{item}</div>
                                </animated.div>
                            )}
                        </Content>
                    </animated.div>
                    )}
                </Sidebar>
            </div>
        
        </div>
        )
    }

}

/*function select (state) {
  return {
    data: state
  }
}*/

export default EmojiTree