import React from 'react';
import { withRouter } from 'react-router-dom';

const FriendRequestItem = ({ friendRequest, history, acceptFriendship, declineFriendship }) => (
    <li className="profile-nav-friend-requests-item">
        <div className="profile-nav-friend-requester-details">
            <div className="profile-nav-friend-requests-item-requester-picture-container">
                <img 
                    src={friendRequest.requester_picture} 
                    onClick={() => history.push(`/users/${friendRequest.requester_id}`)}
                    className="profile-nav-friend-requests-item-requester-picture"
                />
            </div>
            <div className="profile-nav-friend-request-item-name-container">
                <span 
                    onClick={() => history.push(`/users/${friendRequest.requester_id}`)}
                    className="profile-nav-friend-request-item-name"
                >{friendRequest.requester_name}
                </span>
            </div>
        </div>
        <div className="profile-nav-friend-request-buttons-container">
            <div className="profile-nav-friend-request-accept-button-container">
                <button
                    onClick={acceptFriendship}
                    className="profile-nav-friend-request-accept-button"
                >Confirm
                </button>
            </div>
            <div className="profile-nav-friend-request-delete-button-container">
                <button
                    onClick={declineFriendship}
                    className="profile-nav-friend-request-delete-button"
                >Delete
                </button>
            </div>
        </div>
    </li>
)

export default withRouter(FriendRequestItem);