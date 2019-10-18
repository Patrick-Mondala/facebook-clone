import React from 'react';
import { connect } from 'react-redux';
import { fetchTimelinePosts } from '../../../actions/post_actions';
import ProfilePostIndexItem from './profile_post_index_item';

class ProfilePostIndex extends React.Component {
    componentDidMount() {
        if (this.props.user.id) { 
            this.props.fetchTimelinePosts(this.props.user.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id && prevProps.user.id !== this.props.user.id) {
            this.props.fetchTimelinePosts(this.props.user.id);
        }
    }

    //come back and add styling to postindex and postindexitems
    //dont forget to order by date created for most recent first
    render() {
        return (
            <div className="profile-timeline-post-index-container">
                {this.props.user.id === this.props.currentUser.id ? <span className="profile-timeline-post-index-header">Posts</span> : null}
                <div className="profile-timeline-post-index-items-container">
                    <ul className="profile-timeline-post-index-items-list">
                        {this.props.posts.sort().reverse().map(post => <ProfilePostIndexItem key={`post${post.id}`} timeline_owner_id={post.timeline_owner_id} author_id={post.author_id} post={post}/>)}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: Object.values(state.entities.posts)
})

const mapDispatchToProps = dispatch => ({
    fetchTimelinePosts: userId => dispatch(fetchTimelinePosts(userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePostIndex);