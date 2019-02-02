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
    width: '1em',
    height: '1em',
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
  }

  add() {
    console.log("add");
    //() => this.state.onClick &&
    this.props.onMouseDown(this.props.content)
    //this.props.onClick(this.props.content)
  }

  toggle() {
    this.props.children && 
      this.setState( state => ({ open: !state.open, immediate: false }) )
  }

  toggleVisibility() {
    this.setState(
      state => ({ visible: !state.visible, immediate: true }),
      //() => this.state.onClick && this.state.onClick(this.state.visible)
    )
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
    const { children, content, type, style, canHide, springConfig } = this.props
    const Icon =
      Icons[`${children ? (open ? 'Minus' : 'Plus') : 'Close'}SquareO`]

    return (
      <div style={{ ...styles.tree, ...style }} className="treeview" >
        <Icon
          className="toggle"
          onMouseDown={this.toggle}
          style={{ ...styles.toggle, opacity: children ? 1 : 0.3 }}
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
        <span style={{ verticalAlign: 'middle' }} onClick={this.add}>
          {content}
          <button onClick={() => this.add}>insert</button>
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
  content: PropTypes.node,
  springConfig: PropTypes.func,
  onMouseDown: PropTypes.func,
}