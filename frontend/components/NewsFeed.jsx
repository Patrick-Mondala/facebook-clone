import React from 'react';
import { connect } from 'react-redux';
import { fetchNewsfeed } from '../actions/post_actions';
import { fetchFriendships } from '../actions/friendship_actions';
import ProfilePostIndexItem from '../components/profile/timeline/profile_post_index_item';
import ProfilePostForm from '../components/profile/timeline/profile_post_form';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchNewsfeed();
        this.props.fetchFriendships(this.props.currentUser.id)
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.posts, this.props.posts)) {
            this.props.fetchNewsfeed();
        }
        if (!_.isEqual(prevProps.friendships, this.props.friendships)) {
            this.props.fetchFriendships(this.props.currentUser.id);
        }
    }

    render() {
        return (
            <div className="newsfeed-container">
                <ProfilePostForm user={this.props.currentUser} currentUser={this.props.currentUser} />
                <div className="newsfeed-list-container">
                    <ul className="newsfeed-list">
                    {this.props.posts.reverse().map(post => <ProfilePostIndexItem key={`newsfeed-post${post.id}`} timeline_owner_id={post.timeline_owner_id} author_id={post.author_id} post={post} />)}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id] || {},
    friendships: Object.values(state.entities.friendships) || {},
    posts: Object.values(state.entities.posts) || {}
})

const mapDispatchToProps = dispatch => ({
    fetchNewsfeed: () => dispatch(fetchNewsfeed()),
    fetchFriendships: userId => dispatch(fetchFriendships(userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsFeed);