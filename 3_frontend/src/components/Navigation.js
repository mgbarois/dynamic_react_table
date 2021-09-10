import React from "react";

import { Dropdown } from 'react-bootstrap';

const Navigation = ({onLogout}) => {
    return (
        <div className="navigation">
            <div className="nav-item search">
                <i className="fas fa-search"></i>
            </div>
            <div className="nav-item">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <i className="fas fa-user-circle"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navigation;