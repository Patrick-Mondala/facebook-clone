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
            <ul>
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
                        (<div>
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
                        <input type="submit" value={this.props.formType} />
                        </div>) 
                        : 
                        (<div>
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
                            <input type="date" 
                                value={this.state.birth_date}
                                onChange={this.update('birth_date')}
                            />
                            <div>
                                <label>Female
                                    <input name="gender" type="radio" value="female" id="female" onClick={this.handleGender} />
                                </label>
                                <label>Male
                                    <input name="gender" type="radio" value="male" id="male" onClick={this.handleGender} />
                                </label>
                                <label>Custom
                                    <input name="gender" type="radio" value="custom" id="custom" onClick={this.enableCustomGender} />
                                    {this.state.custom ? (
                                        <div>
                                            <select defaultValue="default" required>
                                                <option value="default" disabled>Select your pronoun</option>
                                                <option value="she">She: "Wish her a happy birthday!"</option>
                                                <option value="he">He: "Wish him a happy birthday!"</option>
                                                <option value="they">They: "Wish them a happy birthday!"</option>
                                            </select>
                                            <input type="text" value={this.state.gender} onChange={this.handleCustomGender} placeholder="Gender (optional)"/>
                                        </div>
                                    ) : null }
                                </label>
                            </div>
                            <input type="submit" value={this.props.formType} />
                        </div>)}
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
