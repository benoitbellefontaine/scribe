import React /*, { Component, Fragment }*/ from "react";
import PropTypes from "prop-types";

class AutocompleteCID extends React.Component {

    constructor (props) {
        super(props)

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

    // Event fired when the input value is changed
    onChange(e) {
        console.log("onChange");
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    // Event fired when the user clicks on a suggestion
    onClick(e) {
        // Update the user input and reset the rest of the state
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        this.props.onCIChange(e.currentTarget.innerText);
    };

    // Event fired when the user presses a key down
    onKeyDown(e) {
        console.log("onKeyDown")
        
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
            }
            // User pressed the down arrow, increment the index
            else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    
    };

  render() {
    const {
      //onChange,
      //onClick,
      //onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    /*const {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
    } = this.state;*/

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
            <ul className="suggestions" 
                style={{
                    //position: 'relative',
                    border: '1px solid #2f9e44',
                    listStyle: 'none',
                    marginTop: '0',
                    maxHeight: '143px',
                    overflowY: 'auto',
                    padding: '0px',
                    //width: 'calc(300px + 1rem)',
                    width: 'inherit',
                    cursor: 'pointer',
                    zIndex: 1,
                    backgroundColor:'white',
                    }}>
                {
                    filteredSuggestions.map((suggestion, index) => {
                    let className;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestion) { className = "suggestion-active";}
                    return (
                        <li
                        className={className}
                        style={{padding: '0.25rem',fontFamily:'Quattrocento Sans'}}
                        key={suggestion}
                        onClick={this.onClick}>
                        {suggestion}
                        </li>
                    );
                    }).sort(function (a, b) { return b.toString().localeCompare(a.toString()); })
                }
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <strong>No suggestions, you're on your own!</strong>
          </div>
        );
      }
    }

    return (
        <div style={{margin:0,padding:5,display:'flex',flexDirection:'column',color:'#9e6c2f'}}>
            <div>
                <strong>CI </strong>
                <input style={{borderRadius:'0px',border:'1px solid gray',margin:0,padding:3,fontSize:'1.1vw',width:'10vw'}} type="text" placeholder='type & select'
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={userInput}
                />
            </div>
            {suggestionsListComponent}
            {/*showSuggestions && userInput && filteredSuggestions.map((suggestion, index) => (
                <div
                    //className={className}
                    style={{padding: '0rem',fontFamily:'Quattrocento Sans',borderRadius:5,border:'1px solid gray',
                        margin:2,padding:3}}
                    key={suggestion}
                    onClick={this.onClick}>
                    {suggestion}
                </div>
            ))*/}
        </div>
    );
  }
}

AutocompleteCID.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.string.isRequired,
        /*
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
        })*/
    ).isRequired,
};

export default AutocompleteCID;