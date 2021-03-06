import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.enableCustomGender = this.enableCustomGender.bind(this);
        this.handleCustomGender = this.handleCustomGender.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleBirthday(field) {
        return e => {
            switch (field) {
                case "month":
                    this.setState({ birth_date: this.state.birth_date.slice(0, 5) + e.target.value + this.state.birth_date.slice(7) });
                    break;
                case "day":
                    this.setState({ birth_date: this.state.birth_date.slice(0, 8) + e.target.value });
                    break;
                case "year":
                    if (parseInt(e.target.value) > 1900 && parseInt(e.target.value) < 2019) {
                        this.setState({ birth_date: e.target.value + this.state.birth_date.slice(4) });
                    } else {
                        //in case someone tries to break my switch case, and impossible age
                        this.setState({ birth_date: 2001 + this.state.birth_date.slice(4) })
                    }
                    break;
                default:
                    break;
            }
        }
    }

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

    handleGender(e) {
        this.setState({
            gender: e.target.value,
            custom: false
        })
    }

    enableCustomGender(e) {
        this.setState({
            gender: '',
            custom: true
        })
    }

    handleCustomGender(e) {
        this.setState({
            gender: e.target.value
        })
    }

    yearRange() {
        let range = [];
        for (let i = 2019; i >= 1905; i--) {
            range.push(i);
        }
        return range;
    }

    //call disableFocus on all onBlur or enableFocus on all onFocus
    enableFocus(field) {
        return e => this.setState({ focused: { [field]: true }});
    }

    disableFocus() {
        this.setState({focused: {}})
    }

    //don't hate me future me im sorry
    handleSignupError(field, callback) {
        return e => {
            this.disableFocus();
            let input = e.target.value;
            let newErrors = Object.assign({},this.state.errors);
            switch (field) {
                case "first_name":
                    if (!this.state.errors.first_name) {
                        if (input.length === 0) {
                            newErrors["first_name"] = "What's your name?";
                        }
                    } else {
                        if (input.length > 0) {
                            delete newErrors["first_name"];
                        }
                    }
                    this.setState({ errors: newErrors }, callback);
                    break;
                case "last_name":
                    if (!this.state.errors.last_name) {
                        if (input.length === 0) {
                            newErrors["last_name"] = "What's your name?";
                        }
                    } else {
                        if (input.length > 0) {
                            delete newErrors["last_name"];
                        }
                    }
                    this.setState({ errors: newErrors }, callback);
                    break;    
                case "email":
                    let validEmailRegex = /\S+@\S+\.\S+/;
                    if (!this.state.errors.email) {
                        if (input.length === 0) {
                            this.setState({email_message_flip: false});
                            newErrors["email"] = "You'll use this when you log in and if you ever need to reset your password.";
                        } else if (validEmailRegex.test(input)) {
                            delete newErrors["email"];
                        } else {
                            this.setState({ email_message_flip: true });
                            newErrors["email"] = "Please enter a valid email address";
                        }
                    } else {
                        if (input.length === 0 ) {
                            this.setState({ email_message_flip: false });
                            newErrors["email"] = "You'll use this when you log in and if you ever need to reset your password.";
                        } else if (input.length > 0) { //check for valid email before deleting
                            if (validEmailRegex.test(input)) {
                                delete newErrors["email"];
                            } else {
                                this.setState({ email_message_flip: true });
                                newErrors["email"] = "Please enter a valid email address";
                            }
                        }
                    }
                    this.setState({ errors: newErrors }, callback);
                    break;
                case "password":
                    if (!this.state.errors.password) {
                        if (input.length < 6) {
                            newErrors["password"] = "Enter a combination of at least 6 characters.";
                        }
                    } else {
                        if (input.length >= 6) {
                            delete newErrors["password"];
                        }
                    }
                    this.setState({ errors: newErrors });
                    break;
                case "gender":
                    if (input.length === 0 && !this.state.custom) {
                        if (!this.state.errors.gender) {
                            newErrors["gender"] = "Please choose a gender. You can change who can see this later.";
                        }
                    } else {
                        delete newErrors["gender"];
                    }
                    this.setState({ errors: newErrors });
                    break;
                case "pronoun":
                    if (!this.state.errors.pronoun) {
                        if (input === "default") {
                            newErrors["pronoun"] = "Please select your pronoun.";
                        }
                    } else {
                        if (input !== "default") {
                            delete newErrors["pronoun"];
                        }
                    }
                    this.setState({ errors: newErrors })
                    break;
                default:
                    break;
            }
        }
    }

    signupErrorMessageLabel(field) {
        if (this.state.errors[field]) {
            return (<label
                id={`signup-${field}-error`}
                className={`signup-error-message ${this.signupErrorMessageClass(field)}` + (this.state.email_message_flip && field ==="email" ? " bad-email" : "")}>
                {this.state.errors[field]}
            </label>)
        }
    }

    //classes to add to error label before inputs
    signupErrorMessageClass(field) {
        return this.state.focused[field] ? "" : "hidden"
    }

    //classes to add to input if there's an error
    //ADD TO ALL SIGNUP FORM TEXT INPUTS
    signupErrorInputClass(field) {
        if (this.state.errors[field] && !this.state.focused[field]) {
            return "red-border";
        }
    }

    signupErrorIcon(field) {
        if (this.state.errors[field] && !this.state.focused[field]) {
            return (<i id={`signup-error-icon-${field}`} className="fas fa-exclamation-circle signup-error-icon"></i>)
        }
    }

    demoLogin() {
        return e => {
            e.preventDefault();
            this.props.demoLogin();
        }
    }

    render() {
        return (
            <div className="session-container">
                {this.props.formType === 'Log In' ?
                (
                <form onSubmit={this.handleSubmit} className="login-form">
                    {this.props.errors.length === 1 && this.props.errors[0] === "Invalid email/password combination" ? <p className="login-error">Invalid credentials</p> : null}
                    <label>Email
                    <input type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                    />
                    </label>
                    <label>Password
                    <input type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                    />
                    </label>
                    <div className="login-button-container">
                        <input id="login-button" type="submit" value={this.props.formType} />
                    </div>
                </form>
                ) 
                : 
                (
                <div className="signup-container">
                    <div className="signup-items">
                        <form onSubmit={this.handleSubmit} className="signup-form">
                            <h1>Sign Up</h1>
                            <p>It's quick and easy.</p>
                            <section className="signup-names">
                                {this.signupErrorMessageLabel('first_name')}
                                {this.signupErrorIcon('first_name')}
                                <input type="text" 
                                    value={this.state.first_name}
                                    onChange={this.update('first_name')}
                                    onFocus={this.enableFocus('first_name')}
                                    onBlur={this.handleSignupError('first_name')}
                                    className={this.signupErrorInputClass('first_name')}
                                    placeholder="First name"
                                />
                                {this.signupErrorMessageLabel('last_name')}
                                {this.signupErrorIcon('last_name')}
                                <input type="text"
                                    value={this.state.last_name}
                                    onChange={this.update('last_name')}
                                    onFocus={this.enableFocus('last_name')}
                                    onBlur={this.handleSignupError('last_name')}
                                    className={this.signupErrorInputClass('last_name')}
                                    placeholder="Last name" 
                                />
                            </section>
                            {this.signupErrorMessageLabel('email')}
                            {this.signupErrorIcon('email')}
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                onFocus={this.enableFocus('email')}
                                onBlur={this.handleSignupError('email')}
                                className={this.signupErrorInputClass('email')}
                                placeholder="Email"
                            />
                            {this.signupErrorMessageLabel('password')}
                            {this.signupErrorIcon('password')}
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                onFocus={this.enableFocus('password')}
                                onBlur={this.handleSignupError('password')}
                                className={this.signupErrorInputClass('password')}
                                placeholder="New password"
                            />
                            <h2 className="signup-header">Birthday</h2>
                            <div className="birthday-select-container">
                                <select defaultValue="10" onChange={this.handleBirthday("month")}>
                                    <option value="month" disabled>Month</option>
                                    <option value="01">Jan</option>
                                    <option value="02">Feb</option>
                                    <option value="03">Mar</option>
                                    <option value="04">Apr</option>
                                    <option value="04">Apr</option>
                                    <option value="05">May</option>
                                    <option value="06">Jun</option>
                                    <option value="07">Jul</option>
                                    <option value="08">Aug</option>
                                    <option value="09">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                                <select defaultValue="08" onChange={this.handleBirthday("day")}>
                                    <option value="day" disabled>Day</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                </select>
                                <select defaultValue="1994" onChange={this.handleBirthday("year")}>
                                    <option value="year" disabled>Year</option>
                                    {this.yearRange().map((yr, idx) => <option key={idx} value={yr}>{yr}</option>)}
                                </select>
                            </div>
                            <div className="gender-select-container">
                                <h2 className="signup-header">Gender</h2>
                                <div className="gender-select">
                                    <input name="gender" type="radio" value="female" id="female" onClick={this.handleGender} />
                                    <label>Female</label>
                                    <input name="gender" type="radio" value="male" id="male" onClick={this.handleGender} />
                                    <label>Male</label>
                                    <input name="gender" type="radio" value="custom" id="custom" onClick={this.enableCustomGender} />
                                    <label>Custom</label>
                                </div>
                                {this.state.custom ? (
                                    <div className="custom-gender-input-container">
                                        <select defaultValue="default" required>
                                            <option value="default" disabled>Select your pronoun</option>
                                            <option value="she">She: "Wish her a happy birthday!"</option>
                                            <option value="he">He: "Wish him a happy birthday!"</option>
                                            <option value="they">They: "Wish them a happy birthday!"</option>
                                        </select>
                                        <span className="pronoun-warning">Your pronoun is visible to everyone.</span>
                                        <input type="text" id="custom-gender-input" value={this.state.gender} onChange={this.handleCustomGender} placeholder="Gender (optional)" />
                                    </div>
                                ) : null}
                            </div>
                            <p className="signup-terms">By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</p>
                            <div className="signup-and-demo-login">
                                <input id="signup-button" type="submit" value={this.props.formType} />
                                <button id="demo-login-button" onClick={this.demoLogin()}>Demo Login</button>
                            </div>
                        </form>
                    </div>
                </div>)}
            </div>
        );
    }
}

export default SessionForm;
