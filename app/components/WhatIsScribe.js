import React, {Component} from 'react'
import {Motion, spring} from 'react-motion';
//import {connect} from 'react-redux'
//import {Link} from 'react-router'
//import Tree2 from './Tree2'
import Tree from './Tree2/Tree'
import UserManagement from './common/UserManagement'
import * as Icons from './Tree2/icons'

    const box = {    
        padding: 5,
        paddingLeft: 10,
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
        overflow: 'hidden'
    }

    const typeStyles = {
        position: 'relative',
        fontSize: '2em',
        verticalAlign: 'middle',
        fontFamily: 'Monospaced Number',
        textAlign: 'center',
        minWidth: '30px',
        fontFamily: 'Quattrocento Sans'
    }

class WhatIsScribe extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            ticketlines : []
        };
        this.handleTreeItemClick = this.handleTreeItemClick.bind(this);
        //this.onButtonClick = this.onButtonClick.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    componentDidMount() {
        this.setState({ticketlines:[]});
    }

    handleTreeItemClick (item) {
        const {ticketlines} = this.state;
        ticketlines.push({item:item,timestamp:new Date().getTime()});
        this.setState({ticketlines:ticketlines});
        console.log('calling whatisscribe:onButtonClick',this.state.ticketlines);
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

    render () {
        const {ticketlines} = this.state;
        if (ticketlines === null) return null;
        const Icon = Icons['PlusSquareO'];
        return (
        <div style={{
            //height: '100vh',
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
                //flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '80vw',
                fontSize: '1.5vw',
                margin: 30,
                padding: '3em',
                backgroundColor: 'white',
                boxShadow: '5px 5px 10px rgb(220,220,220)',
                borderRadius:'0px',
                }}>
                <h2 style={{textAlign:'center',margin:0}}>Scribe</h2> 
                <p style={{textAlign:'center',fontFamily:'Quattrocento Sans',margin:'5px auto',maxWidth: '55vw'}}>
                    <em>
                        is nothing more than basic core principles embodied in a set of applications and templates.
                        Combining good solid principles with intelligent applications will certainly increase usability, productivity 
                        and consistency.
                    </em>
                </p>
                <h3 style={{textAlign:'left'}}>Principles</h3> 
                <p style={{fontFamily:'Quattrocento Sans',maxWidth: '80vw',textAlign:'justify'}}>
                    <strong>Strength through Unity</strong> : It is important to maintain
                    the highest level of unity and consistency among each other and towards other support groups. Scribe is a roadmap that
                    prescribes a set of rules and guidelines to follow while allowing everyone to express their own strength. 
                    United we stand, divided we fall !
                </p>
                <p style={{fontFamily:'Quattrocento Sans',maxWidth: '80vw',textAlign:'justify'}}>
                    <strong>Use your Intuition & Experience</strong> : Use them for the benefit of the team and
                    use the system to stay focused on the issues. Don't allow Scribe to become a rigid roadmap. Use it
                    instead to set the boundaries of a sandbox where you can play safe and be consistent.
                </p>
                <p style={{fontFamily:'Quattrocento Sans',maxWidth: '80vw',textAlign:'justify'}}>
                    <strong>Consistency</strong> : Allow us to maintain integrity and close ranks in front
                    of support groups. Consistency and integrity will remove any doubt in support group agents when tackling
                    the issues submitted by us. 
                </p>
                <p style={{fontFamily:'Quattrocento Sans',maxWidth: '80vw',textAlign:'justify'}}>
                    <strong>Flexibility</strong> : Becomes handy when tackling unique cases. It allows each team member to 
                    think outside the box and use their experience and intuition. 
                </p>

                <h3 style={{textAlign:'left'}}>Principles - Redux</h3>

                <p style={{fontFamily:'Quattrocento Sans',maxWidth: '80vw',textAlign:'justify'}}>
                    Two tickets created by two different agents describing the same situation should contain the same basic 
                    elements and actions. Fully documented errorless issues can thus prevent agents
                    from a higher level service to circumvent our rules (or their own rules). 
                    Accurate documentation will give more weight to our queries and will increase the confidence level of 
                    our support groups. Apply consistency to comply with others 
                    but apply imagination and creative thinking to change the world.
                </p>

                <h3 style={{textAlign:'left'}}>Tools</h3>

                <p style={{fontFamily:'Quattrocento Sans',maxWidth: '80vw',textAlign:'justify'}}>
                    So far we have implemented two objects in line with our core principles: the <strong>Tree</strong> and 
                    the <strong>Local Storage</strong> facility. We reserve the right to maintain data integrity
                    at the trunk level and maximum flexibility at the leaf level.
                </p>


                    <h4 style={{marginBottom:5,color:'#1F75FE'}}>
                        <strong>Tree Example</strong>
                    </h4>
                    <div style={{display:'flex',border:'1px solid #1F75FE',padding:5,maxHeight:'100vh',boxSizing: 'border-box',}}>
                        <div style={box}>
                            {/*<Tree2 style={{maxWidth:'50%',margin:0}} onClick={(item)=>console.log(item)}/>*/}
                            <Tree content="start" style={{
                                position: 'relative',
                                top: 0,
                                left: 0,
                                color: 'black',
                                fill: 'black',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                overflowY:'auto'}} 
                                onClick={(item)=>this.handleTreeItemClick(item)}>
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                    content="support issue" type={<span style={typeStyles}>🙀</span>} style={treeStyles}>
                                    <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                        content="mobile device issue" 
                                        type={<span style={typeStyles}>📱</span>} 
                                        style={treeStyles}
                                        >
                                    </Tree>
                                    <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                        content="mykey issue" type={<span style={typeStyles}>🗝️</span>} canHide style={treeStyles}>
                                    </Tree>
                                    <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                        content="computer issue" type={<span style={typeStyles}>💻</span>} canHide style={treeStyles}>
                                    </Tree>
                                </Tree>
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                    content="misc email template" type={<span style={typeStyles}>💡</span>} canHide />
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                    content="subtree full of goodies" type={<span style={typeStyles}>💡</span>} canHide style={treeStyles}>
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                    content="goodies" />
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)}
                                    className='' content="sub-subtree with children" style={treeStyles}>
                                    <Tree onClick={(item)=>this.handleTreeItemClick(item)} content="child 1" style={{ color: '#63b1de' }} />
                                    <Tree onClick={(item)=>this.handleTreeItemClick(item)} content="child 2" style={{ color: '#63b1de' }} />
                                    <Tree onClick={(item)=>this.handleTreeItemClick(item)} content="child 3" style={{ color: '#63b1de' }} />        
                                </Tree>
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)} content="goodies" />
                                </Tree>
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)} content="outages" canHide />
                                <Tree onClick={(item)=>this.handleTreeItemClick(item)} content="success stories" canHide />
                            </Tree>
                        </div>

                        <div style={{flex:'column',marginLeft:5,padding:10,maxWidth:'50%',height:'stretch',maxHeight:'100vh',border:'1px solid lightgray',textAlign:'left'}}>
                            
                            <span style={{height:'50%'}}>
                                A tree is the ideal object to organize and classify information. 
                                It can contain all issue types, resolution steps,
                                links to Confluence pages, URI mailto email templates,
                                educational material, and much more. 
                                Go ahead, press the <Icon style={{ width: '1em', height: '1em', verticalAlign: 'middle'}}/> button (start) !
                            </span>

                            {/**************** TICKET ****************/}
                            <Motion style={{ 
                                    opacity: spring(( (this.state.ticketlines.length > 0 ) ) ? 1 : 0, {stiffness: 400, damping: 60}),
                                    maxheight: spring(( (this.state.ticketlines.length > 0 ) ) ? 200 : 0, {stiffness: 400, damping: 60}),
                                    }}>
                                {({opacity,maxheight}) => 
                                    <div  style={{
                                        margin:'1px',
                                        opacity: opacity,
                                        maxHeight: maxheight,
                                        border:'3px solid #1F75FE',
                                        display:'flex',
                                        flexDirection:'column',
                                        width:'stretch',
                                        marginTop:10,
                                        padding:0,
                                        overflowY:'auto'
                                        }}>

                                        <div style={{position:'relative',paddingTop:3,paddingBottom:3,textAlign:'center',fontSize:'120%',backgroundColor:'#1F75FE',color:'white'}}>
                                            end user ticket
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
                                                            <div>{item.item}-{item.timestamp}</div>
                                                            <i className='fas fa-times-circle fa-1x' style={{color:'#1F75FE'}} onClick={(event)=>this.handleItemRemove(event,item)}></i>
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
                    </div>

                    <h4 style={{marginBottom:5,color:'#1F75FE'}}>
                        <strong>User Management Local Storage Widget Example</strong>
                    </h4>
                    <div style={{width:'100%',display:'flex',border:'1px solid #1F75FE',padding:5}}>
                        <div style={{width:'50%',margin:0}}>
                            <UserManagement style={{width:'50%',margin:0}}/>
                        </div>
                        <div style={{marginLeft:5,padding:10,maxWidth:'50%',border:'1px solid lightgray',textAlign:'justify',letterSpacing:'0.00em'}}>
                            The Local Storage is your local database. The main features are super fast access and fully customizable. 
                            The User Management Local Storage DB showing on the left is just one example.
                            What you save in your Local Storage is yours to keep. Live long and prosper !
                        </div>
                    </div>
                
                    <div style={{display:'flex'}}>
                        <div style={{fontSize:'70%',margin:'10px',padding:7}}>
                            <em>More to come ...</em>
                        </div>  
                    </div>
    
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

//export default connect(select)(WhatIsScribe)
export default WhatIsScribe