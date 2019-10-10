import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

class ProfileNav extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {dropDown: false};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    handleClick(e) {
        if (!this.node.contains(e.target)) {
            this.setState({dropDown: false});
        }
    }

    toggleDropDown() {
        this.setState({dropDown: !this.state.dropDown});
    }

    render() {
        return (
        <div className="profile-navbar-container">
            <ul className="profile-navbar">
                <li ref={node => this.node = node} id="profile-navbar-settings-container">
                    <button id="profile-navbar-settings" onClick={this.toggleDropDown}>▾</button>
                    {this.state.dropDown ? 
                    <div id="profile-navbar-dropdown-container">
                        <ul id="profile-navbar-dropdown">
                            <li><button onClick={this.props.logout}>Log Out</button></li>
                        </ul>
                    </div> : null}
                </li>
            </ul>
        </div>
        )
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileNav);