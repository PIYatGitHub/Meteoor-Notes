import React from "react";
import {Accounts} from "meteor/accounts-base";
import {Session} from "meteor/session";
import PropTypes from 'prop-types';
// UNCOMMENT IF YOU WANT TO USE THE CREATECONTAINER FUNC...
//import {createContainer} from "meteor/react-meteor-data"
import {withTracker} from "meteor/react-meteor-data";


export const PrivateHeader = (props) => {
    const navImgSource = props.isNavOpen ? '/images/close.svg' : '/images/menu.svg';

    return (
            <div className="header">
                <div className="header__content">
                    <img onClick={props.handleToggle} src={navImgSource}/>
                    <h1 className="header__title"> {props.title}</h1>
                    <button className="header__content--button" onClick={() => props.handleLogout()}>Logout</button>
                </div>
            </div>

        );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
};

PrivateHeader.defaultProps = {
    title: "Default Page Title"
};
// WORKS BUT GIVES A WARNING
// export default createContainer( () => {
//     return {
//        handleLogout:() =>  Accounts.logout()
//     };
// }, PrivateHeader);



//WORKS BUT DOES NOT GIVE A WARNING - THE SUGGESTED SOLUTION FROM THE WARNING
export default withTracker( () => {
    return {
        handleLogout:() =>  Accounts.logout(),
        handleToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
        isNavOpen: Session.get('isNavOpen')

    };
}) (PrivateHeader);