import React from "react";
import PropTypes from "prop-types";

class ModalDialog extends React.Component {
    render() {
        return (
            <div style={{ // modal
                opacity: this.props.opacity,
                visibility: this.props.visibility,
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                textAlign: 'left',
                background: 'rgba(0,0,0, .9)',
                transition: 'opacity .25s ease',
                zIndex:9999,
            }}>
                <div style={{ // inner
                    transition: 'top .25s ease',
                    position:'absolute',
                    top: '-20%',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: '50%',
                    margin: 'auto',
                    overflow: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    padding: '1em 2em',
                    height: '50%',
                    }}>
                    <div 
                        onMouseDown={this.props.onClose}
                        style={{
                            position: 'absolute',
                            right: '1em',
                            top: '1em',
                            width: '1.1em',
                            height: '1.1em',
                            cursor: 'pointer',
                        }}><i className="fas fa-times fa-1x"></i>
                    </div>
                    <h3 style={{textAlign:'center'}}>{this.props.title}</h3>
                    <div style={{textAlign:'justify'}}>{this.props.text}</div>
                </div>
            </div>
        )
    }
}

ModalDialog.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    visibility: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalDialog;