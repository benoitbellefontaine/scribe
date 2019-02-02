import React from 'react'
import PropTypes from 'prop-types'
import { Spring, config, animated } from 'react-spring'
import * as Icons from './icons'

const styles = {
  tree: {
    position: 'relative',
    padding: '4px 0px 0px 0px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    verticalAlign: 'middle',
  },
  toggle: {
    width: '1.3em',
    height: '1.3em',
    marginRight: 10,
    cursor: 'pointer',
    verticalAlign: 'middle',
  },
  type: {
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    fontSize: '0.6em',
    verticalAlign: 'middle',
  },
  contents: {
    willChange: 'transform, opacity, height',
    marginLeft: 6,
    padding: '4px 0px 0px 14px',
    borderLeft: '1px dashed rgba(255,255,255,0.4)',
  },
  email: {
    margin: '5px',
    padding: '2px 2px 2px 2px',
    padding: '0px',
  },
}

export default class Tree extends React.Component {
  /*static defaultProps = { open: false, visible: true, canHide: false }
  static propTypes = {
    open: PropTypes.bool,
    visible: PropTypes.bool,
    canHide: PropTypes.bool,
    content: PropTypes.node,
    springConfig: PropTypes.func,
  }*/

  constructor(props) {
    super(props)
    this.state = { open: props.open, visible: props.visible, immediate: false, content: props.content, mouseDown: props.onMouseDown }
    this.add = this.add.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.accessLink = this.accessLink.bind(this);
    this.canInfo = this.canInfo.bind(this);
    this.canInfo2 = this.canInfo2.bind(this);
  }

  add() {
    console.log("add");
    this.props.onMouseDown(this.props.content)
  }

  toggle() {
    this.props.children && 
      this.setState( state => ({ open: !state.open, immediate: false }) )
  }

  toggleVisibility() {
    this.setState(
      state => ({ visible: !state.visible, immediate: true })
    )
  }

  sendEmail() {
    console.log('sendEmail()')
    location.href="mailto:"+this.props.to+"?subject="+this.props.subject+"&body="+"Hello,%0D%0A%0D%0A"+this.props.text+'%0D%0A%0D%0A'+this.props.agent+"%0D%0ASD SSC";
    /*this.setState(
      state => ({ visible: !state.visible, immediate: true }),
      //() => this.state.onClick && this.state.onClick(this.state.visible)
    )*/
  }

  accessLink() {
    console.log('accessLink()')
    window.open( this.props.url, '_blank' );
    /*this.setState(
      state => ({ visible: !state.visible, immediate: true }),
      //() => this.state.onClick && this.state.onClick(this.state.visible)
    )*/
  }

  canInfo() {
    console.log('canInfo()')
    this.props.onMouseDown('info',this.props.title,this.props.text)
    /*this.setState(
      state => ({ visible: !state.visible, immediate: true }),
      //() => this.state.onClick && this.state.onClick(this.state.visible)
    )*/
  }

  canInfo2() {
    console.log('canInfo2()')
    this.props.onMouseDown()
    /*this.setState(
      state => ({ visible: !state.visible, immediate: true }),
      //() => this.state.onClick && this.state.onClick(this.state.visible)
    )*/
  }

  componentWillReceiveProps(props) {
    this.setState(state => {
      return ['open', 'visible'].reduce(
        (acc, val) =>
          this.props[val] !== props[val] ? { ...acc, [val]: props[val] } : acc,
        {}
      )
    })
  }

  render() {
    const { open, visible, immediate } = this.state
    const { children, content, type, style, canHide, canEmail, canLink, canInfo, canInfo2, springConfig, title } = this.props
    const Icon = Icons[`${children ? (open ? 'Minus' : 'Plus') : 'Leaf'}SquareO`]
    return (
      <div style={{ ...styles.tree, ...style }} className="treeview" >
        <Icon
          className="toggle"
          onMouseDown={this.toggle}
          style={{ ...styles.toggle, opacity: children ? 1 : 1 }}
        />
        <span style={{ ...styles.type, marginRight: type ? 10 : 0 }}>
          {type}
        </span>
        {canHide && (
          <Icons.EyeO
            className="toggle"
            style={{ ...styles.toggle, opacity: visible ? 1 : 0.4 }}
            onClick={this.toggleVisibility}
          />
        )}

        <span style={{verticalAlign:'middle',fontSize:'1em'}} >
          {content}
          <span style={{height:'15px',fontSize:'1em',lineHeight:'0.75em',border:'2px solid darkgray',borderRadius:'3px',margin:'2px',marginLeft:'5px',padding:1,cursor:'pointer',color:'red',backgroundColor:'white'}} onClick={this.add}><strong>rec</strong></span>
        </span>
        
        <span style={{verticalAlign:'middle',fontSize:'1em'}} >
        {canEmail && (
          <span style={{height:'15px',fontSize:'1em',lineHeight:'0.75em',border:'0px solid darkgray',borderRadius:'3px',margin:'2px',marginLeft:'5px',padding:3,cursor:'pointer',backgroundColor:'darkgray',color:'white',backgroundImage:'linear-gradient(#5770ff,#70abff)'}} onClick={this.sendEmail}><strong>email</strong></span>
        )}
        </span>

        <span style={{verticalAlign:'middle',fontSize:'1em'}} >
        {canLink && (
          <span style={{height:'15px',lineHeight:'0.75em',border:'0px solid darkgray',borderRadius:'3px',margin:'2px',marginLeft:'5px',padding:3,cursor:'pointer',color:'white',backgroundImage:'linear-gradient(#70abff,#5770ff)'}} onClick={this.accessLink}><strong>link</strong></span>
        )}
        </span>

        <span style={{verticalAlign:'middle',fontSize:'1em'}} >
        {canInfo && (
          <span style={{height:'15px',lineHeight:'0.75em',border:'0px solid darkgray',borderRadius:'3px',margin:'2px',marginLeft:'5px',padding:3,cursor:'pointer',color:'white',backgroundImage:'linear-gradient(#70abff,#5770ff)'}} onClick={this.canInfo}>
          <strong>info</strong>-{title}</span>
        )}
        </span>

        <span style={{verticalAlign:'middle',fontSize:'1em'}} >
        {canInfo2 && (
          <span style={{height:'15px',lineHeight:'0.75em',border:'0px solid darkgray',borderRadius:'3px',margin:'2px',marginLeft:'5px',padding:3,cursor:'pointer',color:'white',backgroundImage:'linear-gradient(#70abff,#5770ff)'}} onClick={this.canInfo2}>
          <strong>info</strong></span>
        )}
        </span>

        <Spring
          native
          immediate={immediate}
          config={{ ...config.default, precision: 0.1 }}
          from={{ height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' }}
          to={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
            transform: open ? 'translate3d(0px,0,0)' : 'translate3d(20px,0,0)',
          }}
          {...springConfig && springConfig(open)}>
          {style => (
            <animated.div style={{ ...style, ...styles.contents }}>
              {children}
            </animated.div>
          )}
        </Spring>
      </div>
    )
  }
}

Tree.propTypes = {
  open: PropTypes.bool,
  visible: PropTypes.bool,
  canHide: PropTypes.bool,
  canEmail: PropTypes.bool,
  content: PropTypes.node,
  springConfig: PropTypes.func,
  onMouseDown: PropTypes.func,
}