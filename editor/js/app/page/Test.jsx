"use strict";
import update from 'react-addons-update';
import React from 'react';
import {Modal, OverlayTrigger, Button} from 'react-bootstrap';

export default class Test extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {show:true}
        
    }
    componentWillReceiveProps(newProps){

    }
    close(){
        return ()=>{
            this.setState({show:false});
        }
        
    }
    render(){
        return <div>
        <Modal show={this.state.show} onHide={this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
        
    }
}