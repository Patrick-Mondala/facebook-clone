import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../actions/post_actions';

class ProfilePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            body: ""
        }
        this.enableFocus = this.enableFocus.bind(this);
        this.disableFocus = this.disableFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.postFormRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    handleChange(e) {
        this.setState({body: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[body]', this.state.body);
        formData.append('post[author_id]', this.props.currentUser.id);
        formData.append('post[timeline_owner_id]', this.props.user.id);
        this.props.createPost(this.props.currentUser.id, formData);
        this.setState({body: ""}, this.disableFocus);
    }

    enableFocus() {
        this.setState({focused: true});
    }

    disableFocus() {
        this.setState({focused: false});
    }

    handleClick(e) {
        if (!this.postFormRef.current.contains(e.target)) {
            this.disableFocus();
        }
    }

    render() {
        return (
            <div
                ref={this.postFormRef}
                id={this.state.focused ? "profile-post-form-container-focused" : ""}
                className="profile-post-form-container">
                <span className="profile-post-form-header">
                    <i className="fas fa-pencil-alt"></i>
                    <p>Create Post</p>
                </span>
                <div className="profile-post-form-input-container">
                    <div className="profile-post-form-input-profile-picture-container">
                        <img
                            src={this.props.currentUser.profile_picture || "https://hoursofidleness.files.wordpress.com/2012/06/gray-card.jpg"}
                            className="profile-post-form-input-profile-picture"
                        />
                    </div>
                    <textarea
                        onFocus={this.enableFocus}
                        onChange={this.handleChange}
                        value={this.state.body}
                        className="profile-post-form-input"
                        cols="32"
                        rows="10"
                        placeholder={this.props.user.id === this.props.currentUser.id ? 
                            `What's on your mind, ${this.props.currentUser.first_name}?`
                        : `Write something to ${this.props.user.first_name}...`}>
                    </textarea>
                </div>
                    {this.state.focused ?
                        <div className="profile-post-form-post-button-container">
                            <button
                            id={this.state.body ? "" : "profile-post-form-post-button-disabled"}
                            className="profile-post-form-post-button"
                            disabled={!this.state.body}
                            onClick={this.handleSubmit}
                            >Post</button>
                        </div> : null}
            </div>
        )
    }
}


//change updateUser to createPost
const mapDispatchToProps = dispatch => ({
    createPost: (userId, post) => dispatch(createPost(userId, post))
});

export default connect(
    null,
    mapDispatchToProps
)(ProfilePostForm);