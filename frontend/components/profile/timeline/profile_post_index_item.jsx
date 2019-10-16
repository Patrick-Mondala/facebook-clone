import React from 'react';

export default ({ post }) => (
    <li className="profile-timeline-post-index-item">
        {post.body}
    </li>
)