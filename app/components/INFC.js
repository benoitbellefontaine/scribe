import React from 'react'
import {connect} from 'react-redux'
import * as d3 from "d3v4"
import LoadingButton from './common/LoadingButton'
//import { loadAllData } from "./data/DataHandling";

import {changeForm} from '../actions'
import {fetchRequest} from '../actions'
//import { redBright } from 'ansi-colors';

var treeData = {
    "name": "Tiburon",
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

class INFC extends React.Component {

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
          //treeData: {}
          data: null,
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

    /*componentWillMount() {
        console.log('HELLLLLLLLLLLLLLOOOOOOOOOOOOOO');
        d3.json("flare.json", function(data) {
            this.setState({treeData:treeData});
        })
        d3.json("/flare.json", function(data) {
            console.log(data);
        });
    }*/

    componentWillMount() {
        this.load();
            
        const q = d3.queue()
    
        q.defer(d3.json, 'flare.json')
     
        q.await((error, data)=>{
            //callback(data);
            this.setState({data:data});
            console.log(data)
        })   

    }

    componentDidMount() {

        var svg = d3.select(this.refs.anchor),
            width = 1000, //+svg.attr("width"),
            height = 500, //+svg.attr("height"),
            g = svg.append("g").attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");

        var stratify = d3.stratify()
            .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

        var tree = d3.cluster()
            .size([360, 195])
            .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

        d3.csv("../../flare.csv", function(error, data) {
        //d3.json("flare.json", function(error, data) {
        if (error) throw error;

        //console.log('data',data);

        var root = tree(stratify(data)
            .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); }));

        var link = g.selectAll(".infclink")
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "infclink")
            .attr("d", function(d) {
                return "M" + project(d.x, d.y)
                    + "C" + project(d.x, (d.y + d.parent.y) / 2)
                    + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                    + " " + project(d.parent.x, d.parent.y);
            });

        var node = g.selectAll(".infcnode")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " infcnode--internal" : " infcnode--leaf"); })
            .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

        node.append("circle")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", ".31em")
            .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
            .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
            .style("font-size", '8px')
            .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
            .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
        });

        function project(x, y) {
        var angle = (x - 90) / 180 * Math.PI, radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
        }
    }

    load() {
        /*
        //loadAllData(this.loaded.bind(this));
        setTimeout(() => {
        this.load();
        }, 1000);*/
    }

    /*loaded(data) {
        this.setState({ data: data });
    }*/

    render () {

        //if (this.state.treeData === {}) return null;

        return (
            <div style={{position:'absolute',left:0,width:'100%',padding:20}}>
                <article >
                    <section style={{backgroundColor:'#93bfe0'}} className='text-section'>
                        <h3 style={{padding:'5px',color:'white',margin:'0px',textAlign:'center'}}>INFC</h3>
                        <div style={{padding:5,border:'2px solid #93bfe0',backgroundColor:'white',display:'flex'}}>
                            <div style={{display:'flex',width:'100%',height:'75vh',justifyContent:'center',alignItems:'center',border:'1px solid #93bfe0'}}>
                                <svg width="100%" height="75vh" > 
                                    <g ref="anchor" width={600} height={600} />
                                </svg>
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

export default connect(select)(INFC)