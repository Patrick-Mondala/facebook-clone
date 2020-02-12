# Bacefook

[Live site](http://thebacefook.herokuapp.com/)

# Description

Bacefook is a social media platform that allows people to connect with anyone and post images and .

# Technologies

  * Ruby on Rails
  * JavaScript
  * PostgreSQL
  * React
  * Redux
  * Amazon Web Services S3
  * Webpack
  * jQuery
  * HTML / CSS
    
# Features

## Profile

Users can setup their profiles with a cover picture, profile picture, and make posts on their timeline.

![Bacefook Demo Profile Page](./screenshots/profile.png)

## Newsfeed

The newsfeed holds all the latest posts of friends

![Bacefook Demo Newsfeed](./screenshots/newsfeed.png)

Using the friendship model we can find all of the friends of the logged in user and search for all the posts that have been authored by the logged in user and their friends.

```ruby
def newsfeed
    friend_ids = Friendship.where("accepted = true AND (requested_id = ? OR requester_id = ?)", current_user.id, current_user.id)
    .map { |friendship| 
      if friendship.requested_id == current_user.id
        friendship.requester.id
      else
        friendship.requested.id
      end
    }
    @posts = Post.where("author_id = #{current_user.id} OR timeline_owner_id = #{current_user.id} #{ friend_ids.length > 0 ? " OR author_id IN ?" : ''}", friend_ids).includes(:likes, :likers)
    render :index
  end
```

## Signup Assistance

The sign up form provides tool-tip assistance to bring attention to fields that need to be corrected in order to sign up.

![Bacefook Signup](./screenshots/signup_form.png)

In order to keep track of each individual error as soon as the error is noticeable even before the form is submitted it is important to keep track of the current focused field and the errors of fields in order to display them to the user.

```javascript
this.state = this.props.formType === 'Log In' ? {
            email: '',
            password: ''
        } : {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birth_date: '1994-10-08',
            gender: '',
            custom: false,
            errors: {},
            focused: {},
            email_message_flip: false
        };
```

Because of this system where we don't rely on the submission response, but instead real-time errors after a user exits an input field, it was necessary to trigger all of the fields for evaluation of potential errors on submission.

```javascript
handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        if (this.props.formType === 'Sign Up') {
            delete user['custom'];
            delete user['errors'];
            delete user['focused'];
            delete user['email_message_flip'];
        }
        if (this.props.formType === 'Sign Up') {
            this.handleSignupError('first_name', 
                () => this.handleSignupError('last_name',
                    () => this.handleSignupError('email',
                        () => this.handleSignupError('password')({ target: { value: this.state.password } })
                    )({ target: { value: this.state.email } })
                )({ target: { value: this.state.last_name } })
            )({ target: { value: this.state.first_name }});
        }
        this.props.processForm(user)
    }
```

In this code snippet I took advantage of the React.setState function's callback capability so I can synchronously check each field individually and make sure all of them display by the time it finishes.

## User Search

Using the Search Bar users can find and view other people's profiles by name.

![Bacefook Search](./screenshots/search.png)

Using the ransack gem it was easy to filter out users based on the searched first name with this controller method:

```ruby
  def search
    @users = User.ransack(first_name_cont: params[:q]).result(distinct: true).limit(8)
  end
```

For real-time front-end updates to display all users as they meet the search criteria, it was necessary to keep track of the state of the search text and continue to query with each update in order to receive the auto complete results.

```javascript
getAutoCompleteResults(e) {
    if (e.target.value.length > 0) {
      this.setState(
        {
          term: e.target.value
        },
        () => {
          $.getJSON("/search?q=" + this.state.term).then(response =>
            this.setState({ autoCompleteResults: response.users })
          );
        }
      );
    } else {
      this.setState(
        {
          term: ""
        },
        () => {
          this.setState({ autoCompleteResults: [] });
        }
      );
    }
  }
```
