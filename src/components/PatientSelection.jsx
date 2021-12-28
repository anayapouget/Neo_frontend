import React from 'react';
import UserService from '../services/UserService';
import styled from "styled-components";
import neologo from "./NeoLogo.png";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectedPatient from './SelectedPatient';

const Button = styled.button`
  background-color: #E9E9E9;
  color: #515050;
  font-size: 20px;
  font-family: ruluko;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  width:20%;
  margin-left:40%;
  margin-right:40%;
`;

// let selectedUser = "";

class PatientSelection extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            selectedUser: "",
            timeStamp: "",
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.selectedpatientElement = React.createRef();
    }

    componentDidMount(){
        UserService.getUsers()
            .then((response) => {
                this.setState({ users: response.data })
            })
            .catch(() => {                          // checks data was retrieved
                alert("Error retrieving baby data");
            });
    }

    handleSelect(eventKey, event) {
        this.setState({selectedUser: eventKey});
        // selectedUser = eventKey;
        // console.log("baby selected! " + selectedUser);               // for programmer to check handleSelect worked as expected
        console.log("baby selected!"  + eventKey);               // for programmer to check handleSelect worked as expected
        this.selectedpatientElement.current.changeId(eventKey);
    }

    render (){
        return (
            <div>
                <center>
                    <img src={neologo} height={55} width={112} style={{ margin: '30px' }}/>
                </center>
                <h1 className = "text-center" style={{ color: '#565656', fontFamily: 'ruluko', fontWeight: "bold", fontSize: "40px"}}>Patient Selection</h1>
                <table className = "table table-striped">
                    <thead>
                    <tr>
                        <td>Patient ID</td>
                    </tr>
                    </thead>
                    <tbody>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Select Baby"
                            onSelect={this.handleSelect}
                        >
                            {
                                this.state.users.map(
                                    user =>
                                        <Dropdown.Item
                                            eventKey={user.id}
                                            value={user.id}
                                            key={user.id}
                                        >{user.id}</Dropdown.Item>
                                )
                            }
                        </DropdownButton>
                        <SelectedPatient 
                            id={this.state.selectedUser}
                            ref={this.selectedpatientElement}
                        />
                    </tbody>
                </table>
                <a href="./menu">
                    <Button> Next </Button>
                </a>
            </div>

        )
    }
}

export default PatientSelection