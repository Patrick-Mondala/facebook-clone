import React from 'react';
import ProfileCover from './cover/profile_cover';
import ProfileSidebar from './sidebar/profile_sidebar';
import ProfileTimeline from './timeline/profile_timeline';
import Modal from '../modal/modal';

export default class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchSingleUser(this.props.match.params.userId).fail(() => this.props.history.push("/"));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.fetchSingleUser(this.props.match.params.userId).fail(() => this.props.history.push("/"));
        }
    }

    render() {
        return (
            <div className="profile-container">
                <Modal user={this.props.user} currentUser={this.props.currentUser} />
                <ProfileCover user={this.props.user} currentUser={this.props.currentUser} />
                <div className="profile-content-under-cover">
                    <ProfileSidebar user={this.props.user} currentUser={this.props.currentUser} />
                    <ProfileTimeline user={this.props.user} currentUser={this.props.currentUser} />
                </div>
            </div>
        )
    }
}