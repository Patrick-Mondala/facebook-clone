import React from 'react';
import ProfileCover from './cover/profile_cover';
import ProfileSidebar from './sidebar/profile_sidebar';

export default class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchSingleUser(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.fetchSingleUser(this.props.match.params.userId);//.fail(this.props.history.push(`/users/${this.props.currentUser.id}`)) catch no user found
        }
    }

    render() {
        return (
            <div className="profile-container">
                <ProfileCover user={this.props.user} currentUser={this.props.currentUser} />
                <ProfileSidebar user={this.props.user} currentUser={this.props.currentUser} />
            </div>
        )
    }
}