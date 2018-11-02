import React from 'react'
import {connect} from 'react-redux'
import * as d3 from "d3v4"
import LoadingButton from './common/LoadingButton'
import data from './data/cspsdata'

import {changeForm} from '../actions'
import {fetchRequest} from '../actions'
//import { redBright } from 'ansi-colors';

var treeData =
{
    "name": "CSPS",
    "children": [
        { 
            "name": "Level 2: A",
            "children": [
                { "name": "Son of A" },
                { "name": "Daughter of A" }
            ]
        },
        {
            "name": "Level 2: B",
            "children": [
                { "name": "Son of B" },
                { "name": "Daughter of B" }
            ]
        },
        { 
            "name": "Level 2: C",
            "children": [
                { "name": "Son of C" },
                { "name": "Daughter of C" }
            ]
        },
    ]
};

class CSPS extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
          deptValue:0,
          selectedDepartment: 'PSPC/SPAC',
          selectedLanguage: 'French',
          ticket: 'IM000000',
          telephone: '000-000-0000',
          name: '',
          email: '',
          agent: null,
          domain: '@canada.ca',
          deptTel : [
            {department:"PSPC/SPAC",telephone:"1-866-995-6030"},
            {department:"SSC/SPC",telephone:"1-855-591-0550"},
            {department:"CSPS/EFPC",telephone:"613-943-6236"},
            {department:"INFC",telephone:"613-941-2427"},
          ],
          treeData: {}
      };
      this._onSubmit = this._onSubmit.bind(this)
      this._changeUsername = this._changeUsername.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
      this.handleLanguageChange = this.handleLanguageChange.bind(this)
      this.handleTicketChange = this.handleTicketChange.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handleAgentChange = this.handleAgentChange.bind(this)
      this.handleOutlook = this.handleOutlook.bind(this)
    }
    
    _changeUsername (event) {
        this._emitChange({...this.props.data, username: event.target.value})
    }

    _emitChange (newFormState) {
        this.props.dispatch(changeForm(newFormState))
    }

    _onSubmit (event) {
        event.preventDefault()
        this.props.onSubmit(this.props.data.username, this.props.data.password)
    }

    handleDepartmentChange (changeEvent) {
        const {deptTel,domain} = this.state;
        var department = deptTel.find(i => i.department === changeEvent.target.value);
        let dom = (department.department === "PSPC/SPAC") ? "@pwgsc-tpsgc.gc.ca" : "@canada.ca";
        this.setState({
            selectedDepartment: changeEvent.target.value,
            telephone: department.telephone,
            domain: dom,
            email: "first.last" + dom
        });
    }

    handleNameChange (changeEvent) {
        const {domain} = this.state;
        var name = changeEvent.target.value;
        var split = name.split(" ");
        if (split[1] === undefined) split[1] = "lastname"
        this.setState({
            name : changeEvent.target.value,
            email: split[0].toLowerCase() + "." + split[1].toLowerCase() + domain,
        });
    }

    handleLanguageChange (changeEvent) {
        this.setState({
            selectedLanguage: changeEvent.target.value
        });
    }

    handleTicketChange (changeEvent) {
        this.setState({
            ticket: changeEvent.target.value
        });
    }

    handleAgentChange (changeEvent) {
        changeEvent.preventDefault();
        this.setState({
            agent: changeEvent.target.value
        });
    }

    handleEmailChange (changeEvent) {
        changeEvent.preventDefault();
        this.setState({
            email: changeEvent.target.value
        });
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
        location.href="mailto:"+email+"?subject="+"FOLLOW UP - " + ticket + " - SUIVI"+"&body="+bonjour+ftext+"%0D%0A%0D%0A"+etext+"%0D%0A%0D%0A"+signature;
    
    }

    componentWillMount() {
        this.setState({treeData:treeData});
    }

    componentDidMount() {

        var margin = {top: 10, right: 90, bottom: 30, left: 90},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

        var svg = d3.select(this.refs.anchor)
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("
                  + margin.left + "," + margin.top + ")");
        
        var i = 0,
            duration = 750,
            root,
            path;
        
        // declares a tree layout and assigns the size
        var treemap = d3.tree().size([height, width]);
        
        // Assigns parent, children, height, depth
        root = d3.hierarchy(data, function(d) { return d.children; });
        root.x0 = height / 2;
        root.y0 = 0;
        root.depth = 1;

        // Collapse after the second level
        collapse(root);
        //root.children.forEach(collapse);
        
        update(root);

        // Collapse the node and all it's children
        function collapse(d) {
          if(d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
          }
        }
        
        function update(source) {

            let treeData = (source===root) ? treemap(root) : treemap(source.parent);
            
            // if parent is not null
            //   draw parent on the left with a dashed circle
            //   draw selected node in the center
            //   draw its children on the right 
        
            // Assigns the x and y position for the nodes
            // var treeData = treemap(root);
            
            // Compute the new tree layout.
            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);

            nodes.forEach(function(d){
                let space
                if (d.depth===0) space="**";
                if (d.depth===1) space="****";
                if (d.depth===2) space="******";
                if (d.depth===3) space="********";
                
                console.log(space,d.data.name);
                //console.log(d.children)
                //console.log(d._children)
                d.y = (d.depth) * 90;
            });
            
            // Normalize for fixed-depth.
            nodes.forEach(function(d){
                if (source===root){
                    console.log('source===root')
                    d.y = 90;
                } else {
                    d.y = 180;
                    source.parent.y = 0;
                }
                //if current node's parent is the source
                if (d.parent===source){
                    d.y = 180;
                } else d.y = 90;
                //d.y = (d.depth) * 90;
            });

            // ****************** Nodes section ***************************
        
            // Update the nodes...
            var node = svg.selectAll('g.cspsnode')
                .data(nodes, function(d) {return d.id || (d.id = ++i); });
            
            // Enter any new modes at the parent's previous position.
            var nodeEnter = node.enter().append('g')
                .attr('class', 'cspsnode')
                .attr("transform", function(d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on('click', click);
        
            // Add Circle for the nodes
            nodeEnter.append('circle')
                .attr('class', 'cspsnode')
                .attr('r', 1e-6)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });
            
            // Add labels for the nodes
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", function(d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("y", function(d) { 
                    return -13;
                    return d.children || d._children ? -13 : 13;
                })
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) {
                    return d.data.name; 
                });
        
            // UPDATE
            var nodeUpdate = nodeEnter.merge(node);
            
            // Transition to the proper position for the node
            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", function(d) { 
                    return "translate(" + d.y + "," + d.x + ")";
                });
            
            // Update the node attributes and style
            nodeUpdate.select('circle.cspsnode')
                .attr('r', 10)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                })
                .attr('cursor', 'pointer');
        
        
            // Remove any exiting nodes
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();
        
            // On exit reduce the node circles size to 0
            nodeExit.select('circle')
                .attr('r', 1e-6);
            
            // On exit reduce the opacity of text labels
            nodeExit.select('text')
                .style('fill-opacity', 1e-6);
            
            // ****************** links section ***************************
        
            // Update the links...
            var link = svg.selectAll('path.cspslink')
                .data(links, function(d) { return d.id; });
        
            // Enter any new links at the parent's previous position.
            var linkEnter = link.enter().insert('path', "g")
                .attr("class", "cspslink")
                .attr('d', function(d){
                    var o = {x: source.x0, y: source.y0}
                    return diagonal(o, o)
                });
        
            // UPDATE
            var linkUpdate = linkEnter.merge(link);
        
            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', function(d){ return diagonal(d, d.parent) });
        
            // Remove any exiting links
            var linkExit = link.exit().transition()
                .duration(duration)
                .attr('d', function(d) {
                    var o = {x: source.x, y: source.y}
                    return diagonal(o, o)
                })
                .remove();
        
            // Store the old positions for transition.
            nodes.forEach(function(d){
                d.x0 = d.x;
                d.y0 = d.y;
            });

            // ***************** parent node+link section *****************
            
        
            // Creates a curved (diagonal) path from parent to the child nodes
            function diagonal(s, d) {
                path = `M ${s.y} ${s.x}
                        C ${(s.y + d.y) / 2} ${s.x},
                        ${(s.y + d.y) / 2} ${d.x},
                        ${d.y} ${d.x}`
            
                return path
            }
        
            // Toggle children on click.
            function click(d) {
                //console.log('d',d)
                if (d.children) {
                    d.children.forEach(collapse)
                    console.log(d.data.name," children is not null")
                    //d._children.forEach(function(i){if (!i) i._children = null;})
                    d._children = d.children;
                    d.children = null;
                } else {
                    console.log(d.data.name," children is null")
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }



        }
    }

    render () {

        if (this.state.treeData === {}) return null;

        const {selectedLanguage, ticket, name, agent} = this.state;

        const fname = name.split(" ")[0];

        const french_text = "Nous vous écrivons aujourd'hui au sujet du billet " + this.state.ticket + ". Si le problème N'A PAS été résolu, nous vous demandons de nous rappeler dès que possible, au " + this.state.telephone + " pour obtenir de l'aide supplémentaire. Si le problème a été résolu, répondez à ce courriel afin que nous puissions fermer le billet. Si nous ne recevons aucune réponse de votre part dans un délai de 5 jours ouvrables, nous considérerons que le problème a été résolu." 

        const english_text = "We are writing to you today in regards to ticket " + this.state.ticket + ". If the issue has NOT been resolved, we ask you to call us back at your earliest convenience at " + this.state.telephone + " for additional support. If the issue has been resolved, please reply to this email so we can close the ticket. If we don’t hear back from you within 5 business days, we will consider the issue to be resolved." 

        return (
            <div style={{position:'absolute',left:0,width:'100%',padding:20}}>
                <article >
                    <section style={{backgroundColor:'#93bfe0'}} className='text-section'>
                        <h3 style={{padding:'5px',color:'white',margin:'0px',textAlign:'center'}}>CSPS</h3>

                        <div style={{padding:5,border:'2px solid #93bfe0',backgroundColor:'white',display:'flex'}}>
                            <div style={{display:'flex',width:'50vw',height:'75vh',justifyContent:'center',alignItems:'center',border:'1px solid #93bfe0',marginRight:2}}>
                                <svg width="50vw" height="75vh" > 
                                    <g ref="anchor" width={"50vw"} height={"75vw"} />
                                </svg>
                            </div>
                            <div style={{display:'flex',width:'50%',height:'75vh',justifyContent:'center',alignItems:'center',border:'1px solid #93bfe0',marginLeft:2}}>
                                COL2
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(CSPS)