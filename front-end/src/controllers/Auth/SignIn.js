import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import { signin } from "../../actions/auth";
import { Link } from "react-router-dom";
import $ from "jquery";

class SignIn extends React.Component {
  componentDidMount() {
    $(".show").on("click", () => {
      if ($("input[type=password]").prop("type") === "password") {
        $("input[type=password]").attr("type", "text");
        $(".show").addClass("bi-eye-fill-color");
      } else {
        $("input:last").attr("type", "password");
        $(".show").removeClass("bi-eye-fill-color");
      }
    });
  }
  renderInput({ input, type, label, meta }) {
    return (
      <div className="form-group">
        <div className="form-label">
          <label>{label}</label>
        </div>
        <input
          {...input}
          type={type}
          autoComplete="off"
          className="form-control"
        />
        <div>
          {meta.touched && meta.error ? (
            <div className="alert alert-danger p-1 my-1">{meta.error}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  onSubmit = (formValues) => {
    this.props.signin(formValues, this.props.history);
  };
  renderSignInForm() {
    return (
      <div className="p-3 bg-white rounded col-md-4 col-11 form container ">
        {this.props.auth.errorMessage.length >= 2 ? (
          <div className="text-center alert alert-danger">
            {this.props.auth.errorMessage}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h2>SignIn</h2>
          <Field
            type="email"
            name="email"
            label="Email"
            component={this.renderInput}
          />
          <div style={{ position: "relative" }}>
            <i className="bi bi-eye-fill show"></i>
            <Field
              type="password"
              name="password"
              label="Password"
              component={this.renderInput}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
          <Link to="/" className="btn btn-danger mx-2">
            Cancel
          </Link>
          <br />
          Don't Have a account <Link to="/signup">SignUp</Link>
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
    errors.password = "Password is required.";
  }
  if (!formValues.email) {
    errors.email = "Email is required.";
  }
  return errors;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default compose(
  reduxForm({ form: "signinForm", validate }),
  connect(mapStateToProps, { signin })
)(withRouter(SignIn));
