import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchSearchedTerm } from '../../actions';

class SearchTerm extends React.Component {
  state = { searchTerm: false, title: '', tags: '' };
  renderInput({ input, type, placeholder }) {
    return (
      <div className='form-group mb-2'>
        <input
          {...input}
          type={type}
          autoComplete='off'
          placeholder={placeholder}
          className='form-control'
        />
        <div></div>
      </div>
    );
  }

  onSubmit = formValues => {
    if (this.state.searchTerm) {
      this.props.fetchSearchedTerm(formValues);
      console.log(this.state);
    }
  };

  renderContent() {
    return (
      <div className='p-3 bg-white rounded  container mb-3'>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h5>Search Your Term</h5>
          <Field
            type='text'
            name='title'
            placeholder='Title'
            component={this.renderInput}
            onChange={() => this.setState({ searchTerm: true })}
          />
          <Field
            type='text'
            name='tags'
            placeholder='Tags'
            component={this.renderInput}
            onChange={() => this.setState({ searchTerm: true })}
          />

          <button type='submit' className='btn btn-primary my-2'>
            Search
          </button>
          <br />
        </form>
      </div>
    );
  }
  renderSearchForm() {
    const data = JSON.parse(localStorage.getItem('profile'));
    if (!data) {
      return null;
    } else if (data) {
      return this.renderContent();
    }
  }
  render() {
    return <div>{this.renderSearchForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
export default compose(
  reduxForm({ form: 'searchForm' }),
  connect(mapStateToProps, { fetchSearchedTerm })
)(SearchTerm);
