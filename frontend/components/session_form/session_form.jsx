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
            birth_date: '',
            gender: '',
            custom: false
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
                    this.setState({ birth_date: (this.state.birth_date.slice(0, 5) + e.target.value + this.state.birth_date.slice(7)) })
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
        }
        this.props.processForm(user);
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

    renderErrors() {
        return (
            <ul className="session-errors">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderErrors()}
                    <div>
                        {this.props.formType === 'Log In' ?
                        (<div className="login-form">
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
                        </div>) 
                        : 
                        (
                        <div className="signup-container">
                            <aside className="signup-aside">
                                {/* move this into its own functional component */}
                                <h2>Connect with friends and the world around you on Facebook.</h2>
                            </aside>
                            <div className="signup-form">
                                <h1>Sign Up</h1>
                                <p>It's quick and easy.</p>
                                <section className="signup-names">
                                    <input type="text" 
                                        value={this.state.first_name}
                                        onChange={this.update('first_name')}
                                        placeholder="First name"
                                    />
                                    <input type="text"
                                        value={this.state.last_name}
                                        onChange={this.update('last_name')}
                                        placeholder="Last name" 
                                    />
                                </section>
                                <input type="text"
                                    value={this.state.email}
                                    onChange={this.update('email')}
                                    placeholder="Email"
                                />
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    placeholder="New password"
                                />
                                <h2 className="signup-header">Birthday</h2>
                                <input type="date" 
                                    value={this.state.birth_date}
                                    onChange={this.update('birth_date')}
                                />
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
                                <input id="signup-button" type="submit" value={this.props.formType} />
                            </div>
                        </div>)}
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
