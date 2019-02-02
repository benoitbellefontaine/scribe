import React from 'react';
//import emaildata from '../data/emaildata';
//import styled from 'styled-components';
//import {Motion, spring} from 'react-motion';

//const re = /\S+\.\S+@\S+\.\S+/;

class ItemManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data:null, hits: null, item: null, modif:false, error:null };
        this.onItemChange = this.onItemChange.bind(this);
        this.modifYes = this.modifYes.bind(this);
        this.modifNo = this.modifNo.bind(this);
        this.onItemClear = this.onItemClear.bind(this);
        this.onItemSave = this.onItemSave.bind(this);
    }

    /*validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }*/

    componentDidMount() {
        //localStorage.clear();
        // set items in localstorage
        /*const emails = [
            {"email":"benoit.bellefontaine@canada.ca","username":"bellefob"},
            {"email":"jimmy.grenier@canada.ca","username":"grenierj"},
            {"email":"james.anderson@canada.ca","username":"andersoj"},
            {"email":"james.anderson2@canada.ca","username":"andersj2"},
            {"email":"appo.musende@canada.ca","username":"musendea"},
            {"email":"jacques.mutaganda@canada.ca","username":"mutaganj"},
            {"email":"nadege.mercure@canada.ca","username":"mercuren"},
        ];*/
        //const emails = emaildata;
        //localStorage.setItem('items', JSON.stringify(emails));
        const data = JSON.parse(localStorage.getItem('items'));
        this.setState({data:data});
        console.log('componentDidMount',data)
        //data.map((item,index)=>{console.log(index,":",item)})
    }

    handleSubmit(event) {
        alert('handleSubmit was called');
        event.preventDefault();
    }

    onItemSave(e) {
        e.preventDefault();
        localStorage.clear();
    }
  
    onItemClear(e) {
        e.preventDefault();
        localStorage.clear();
    }
  
    onItemChange(e) {
        const {data,item} = this.state;
        this.setState({hits:[]});
        // get the input on each change
        //const { value } = this.input;
        var itemFragment = e.target.value;
        console.log('onItemChange ',itemFragment);
        if (itemFragment === '') {
            //console.log("emailFragment === ''")
            this.setState({item:null,hits:null});
            return; 
        }
        // get the data from localStorage
        //const data = JSON.parse(localStorage.getItem('items'));
        // get any hits from local storage
        if (this.state.data===null) {
            console.log('data===null');
            this.setState({ item:itemFragment, modif:true, hits:null });
        } 
        else {
            console.log('data!==null');
            console.log(data);
            const hits = this.state.data.filter(function(item) {
                if (item===itemFragment) {
                    this.setState({ modif:false, hits:null });
                    return;
                }
                const sub = item.substring(0,itemFragment.length);
                return sub === itemFragment;
            });
            if (hits.length>0) {
                // found some data in local storage - go with it
                this.setState({ item:itemFragment, modif:true, hits:hits });
            }
            else {
                // typed text not found in local storage
                this.setState({ item:itemFragment, modif:true, hits:null });
            }
        }
    } 

    onUsernameChange(e) {
        var username = e.target.value;
        this.setState({username:username,modif:true});
    }
 
    onDeptChange(e) {
        var dept = e.target.value;
        this.setState({dept:dept,modif:true});
    }
 
    onRegionChange(e) {
        var region = e.target.value;
        this.setState({region:region,modif:true});
    }
 
    modifYes() {
        const {data,item} = this.state;
        // handle empty local storage
        if (data===null) {
            var array = [];
            array.push( item )
            localStorage.setItem('ids', JSON.stringify(array))
            this.setState({ data:array, modif:false, error:null });
        }
        else {
            console.log("modifYes data!=null");
            //var index = data.email.indexOf(this.state.email);
            //console.log(data);
            console.log("searching for ", item);
            if (data.find(d => d === item)) {
                // found a record
                // get index, splice and push
                console.log("found ", item);
                var index = data.indexOf(data.find(d => d === item));
                console.log(index);
                data.splice(index,1);
                data.push(item)
                localStorage.setItem('items', JSON.stringify(data))
                this.setState({ data:data, modif:false });
            }
            else {
                console.log("could not find ", item);
                console.log("saving it");
                data.push(item)
                localStorage.setItem('items', JSON.stringify(data))
                this.setState({ data:data, modif:false });
            }
        }
    }

    modifNo() {
        this.setState({modif:false});
    }

    onListClick(item) {
      console.log(item.item);
      this.setState({ item:item.item });
    }

    render() {
        return (
            <div  style={{ height:'stretch',margin:5,border:'1px solid lightgray',textAlign:'center',position:'relative',padding:5}}>
                 <p style={{textAlign:'center',fontFamily:'Quattrocento Sans',paddingBottom:5,margin:0,letterSpacing:'0.5em'}}>
                    <strong>Manage items using Local Storage</strong>
                </p>
                <div style={{margin:0,marginBottom:5,padding:0}}>
                    <form onSubmit={this.handleSubmit} 
                        style={{position:'relative',margin:0,marginBottom:5,padding:0,display:'flex',flexDirection:'column',maxHeight:30,marginLeft:2,marginRight:2}}>
                        <input style={{borderRadius:'0px',flexGrow:3,border:'1px solid gray',padding:3}} value={this.state.email}
                            type="text" placeholder='email address' onChange={this.onItemChange} />
                        {
                            this.state.hits && 
                                <ul style={{ textAlign:'left',
                                    position: 'absolute',
                                    top:28,
                                    border: '1px solid #2f2f2f',
                                    listStyle: 'none',
                                    marginTop: '0',
                                    maxHeight: '143px',
                                    overflowY: 'auto',
                                    padding: '0px',
                                    //width: 'calc(300px + 1rem)',
                                    //width: '30vw',
                                    cursor: 'pointer',
                                    zIndex: 1,
                                    backgroundColor:'white'}}>
                                    {
                                        this.state.hits.map(item => 
                                            <li 
                                                key={item}
                                                style={{padding: '0.25rem',fontFamily:'Quattrocento Sans',zIndex: 1}}
                                                onClick={()=>this.onListClick(item)}>
                                                {item}
                                            </li>
                                        )
                                    }
                                </ul>
                        }
                    </form>
                </div>
          
                {
                    this.state.modif &&
                        <div style={{border:'1px solid lightgray',textAlign:'center',position:'relative',bottom:5,padding:5}}>
                            Save modifications ? 
                                <button style={{marginLeft:'0.5em'}} type="button" onClick={this.modifYes}>Yes</button>
                                <button style={{marginLeft:'0.5em'}} type="button" onClick={this.modifNo}>No</button>
                        </div>
                }
              
            </div>
            
        );
    }
}

export default ItemManagement;