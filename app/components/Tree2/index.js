import React, {Component} from 'react'
import {Motion, spring} from 'react-motion';
//import {connect} from 'react-redux'
//import {Link} from 'react-router'
//import Tree2 from './Tree2'
import Tree from './Tree'
//import UserManagement from '../common/UserManagement'
import * as Icons from './icons'

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

class EmojiTree extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            ticketlines : []
        };
        this.clearTicket = this.clearTicket.bind(this)
        this.handleTreeItemClick = this.handleTreeItemClick.bind(this);
        //this.onButtonMouseDown = this.onButtonMouseDown.bind(this);
        this.handleItemRemove = this.handleItemRemove.bind(this);
    }

    componentDidMount() {
        this.setState({ticketlines:[]});
    }

    handleTreeItemClick (item) {
        const {ticketlines} = this.state;
        ticketlines.push({item:item,timestamp:new Date().getTime()});
        this.setState({ticketlines:ticketlines});
        console.log('calling whatisscribe:onButtonMouseDown',this.state.ticketlines);
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
                alignItems: 'center',
                justifyContent: 'center',
                width: '90vw',
                height: '90vh',
                fontSize: '1vw',
                margin: 10,
                padding: '1em',
                backgroundColor: 'white',
                boxShadow: '5px 5px 10px rgb(220,220,220)',
                borderRadius:'0px',
                }}>
                
                <h4 style={{margin:5,marginBottom:5,color:'#1F75FE'}}>
                    <strong>Tree Example</strong>
                </h4>
                <div style={{display:'flex',border:'1px solid #1F75FE',height:'90%',padding:5,boxSizing:'border-box',}}>
                    <div style={box}>
                        Select Tree Item
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
                            onMouseDown={(item)=>this.handleTreeItemClick(item)}>
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="support issue" type={<span style={typeStyles}>🙀</span>} style={treeStyles}>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="mobile device issue" 
                                    type={<span style={typeStyles}>📱</span>} 
                                    style={treeStyles}
                                    >
                                </Tree>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="mykey issue" type={<span style={typeStyles}>🗝️</span>} canHide style={treeStyles}>
                                </Tree>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="computer issue" type={<span style={typeStyles}>💻</span>} canHide style={treeStyles}>
                                </Tree>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="sub-subtree with children 2" style={treeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="child 11" style={{ color: '#630000' }} />
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="child 21" style={{ color: '#63b1de' }} />
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="child 31" style={{ color: '#63b1de' }} />        
                                </Tree>
                            </Tree>
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="misc email template" type={<span style={typeStyles}>💡</span>} canHide />
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                content="subtree full of goodies" type={<span style={typeStyles}>💡</span>} canHide style={treeStyles}>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="goodies" />
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)}
                                    content="sub-subtree with children" style={treeStyles}>
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="child 1" style={{ color: '#630000' }} />
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="child 2" style={{ color: '#63b1de' }} />
                                    <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="child 3" style={{ color: '#63b1de' }} />        
                                </Tree>
                                <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="goodies" />
                            </Tree>
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="outages" canHide />
                            <Tree onMouseDown={(item)=>this.handleTreeItemClick(item)} content="success stories" canHide />
                        </Tree>
                    </div>

                    <div style={{
                        flex:'column',
                        marginLeft:5,
                        padding:10,
                        width:'50%',
                        height:'stretch',maxHeight:'100vh',border:'1px solid lightgray',textAlign:'left'}}>

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

export default EmojiTree