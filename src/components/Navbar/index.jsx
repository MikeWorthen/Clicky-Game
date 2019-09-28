import React from "react";

const navStyle = {
    background:"black"
}
function Navbar() {
    return (
        <nav style={navStyle} className = "navbar navbar-dark">
            <a className = "navbar-brand" style = {{color:"white"}}>
                Clicky Clicky
            </a>
        </nav>
    )

};

export default Navbar;

