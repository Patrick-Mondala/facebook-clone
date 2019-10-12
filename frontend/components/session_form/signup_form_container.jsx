import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Sign Up'
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        demoLogin: () => dispatch(login({ email: 'jaydoe@email.com', password: '123456' }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);