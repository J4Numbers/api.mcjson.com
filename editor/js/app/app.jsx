import React from 'react';
import {Link} from 'react-router';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
export default class App extends React.Component{
    
    render(){
        return <div>
            <Navbar inverse>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">MCJson API editor</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#/items">Items</NavItem>
                    <NavItem eventKey={2} href="#/blocks">Blocks</NavItem>
                    <NavItem eventKey={3} href="#/entities">Entities</NavItem>
                    <NavItem eventKey={4} href="#/enchantments">Enchantments</NavItem>
                    <NavItem eventKey={5} href="#/crafting">Crafting</NavItem>
                    <NavItem eventKey={6} href="#/about">About</NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
            <div className="main">
            {this.props.children}
            </div>
            </div>
        </div>
    }
}