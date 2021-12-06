import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { signup } from '../../actions/auth';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
  renderInput({ input, type, label, meta }) {
    return (
      <div className='form-group'>
        <div className='form-label'>
          <label>{label}</label>
        </div>
        <input {...input} type={type} autoComplete='off' className='form-control' />
        <div>
          {meta.touched && meta.error ? (
            <div className='alert alert-danger p-1 my-1'>{meta.error}</div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
  onSubmit = formValues => {
    this.props.signup(formValues, this.props.history);
  };
  renderSignInForm() {
    return (
      <div className='p-3 bg-white rounded col-md-4 col-11 form container'>
        {this.props.auth.errorMessage.length >= 2 ? (
          <div className='text-center alert alert-danger'>{this.props.auth.errorMessage}</div>
        ) : (
          ''
        )}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h2>SignUp</h2>
          <Field type='text' name='name' label='Name' component={this.renderInput} />
          <Field type='email' name='email' label='Email' component={this.renderInput} />
          <Field type='password' name='password' label='Password' component={this.renderInput} />
          <button type='submit' className='btn btn-primary my-2'>
            Submit
          </button>
          <br />
          Already have a account <Link to='/signin'>SignIn</Link>
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.renderSignInForm()}</div>;
  }
}

function validate(formValues) {
  const errors = {};
  if (!formValues.password) {
    errors.password = 'Password is required.';
  }
  if (!formValues.email) {
    errors.email = 'Email is required.';
  }
  if (!formValues.name) {
    errors.name = 'Name is required.';
  }
  return errors;
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
export default compose(
  reduxForm({ form: 'signupForm', validate }),
  connect(mapStateToProps, { signup })
)(withRouter(SignUp));
