import React from 'react';

import { connect } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, fetchPost, updatePost } from '../../actions';
import { signup } from '../../actions/auth';

class Form extends React.Component {
  state = {
    creator: localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile')).user.name
      : '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    _user: localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile')).user._id
      : '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.fetchId !== prevProps.fetchId) {
      this.props.fetchPost(this.props.fetchId);
      const value = this.props.post.find(val => val._id === this.props.fetchId);
      this.setState(value);
    }
  }

  clearValues() {
    this.setState({ creator: '', title: '', message: '', tags: '', selectedFile: '', _user: '' });
    this.props.setCurrentId(0);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.fetchId === 0) {
      this.props.createPost(this.state);
      // console.log(this.state);
      this.clearValues();
    } else {
      this.props.updatePost(this.props.fetchId, this.state);
      this.clearValues();
    }
  }

  renderContent() {
    return (
      <div>
        <form className='p-3 rounded bg-white' method='POST' onSubmit={this.onSubmit.bind(this)}>
          <h3 className='text-center'>{this.props.fetchId === 0 ? 'Create Post' : 'Edit Post'}</h3>
          <div className='form-group'>
            <input
              type='hidden'
              name='creator'
              value={this.state.creator}
              onChange={e => this.setState({ creator: e.target.value })}
              className='form-control'
              required
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Title</label>
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              className='form-control'
              required
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Message</label>
            <textarea
              name='message'
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              className='form-control'
              required
              autoComplete='off'
            ></textarea>
          </div>
          <div className='form-group'>
            <label className='form-label'>Tags</label>
            <input
              type='text'
              name='tags'
              value={this.state.tags}
              onChange={e => this.setState({ tags: e.target.value })}
              className='form-control'
              required
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Chose Your Photo</label>
            <br />
            <FileBase
              type='file'
              onDone={({ base64 }) => this.setState({ selectedFile: base64 })}
            />
          </div>
          <input value={this.state._user} type='hidden' name='_user' />
          <button className='btn btn-info my-2 text-white' type='submit'>
            Submit
          </button>
          <button className='btn btn-danger m-2' type='button' onClick={() => this.clearValues()}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  renderForm() {
    const data = JSON.parse(localStorage.getItem('profile'));
    if (!data) {
      return (
        <div className='p-3 bg-white rounded text-center text-danger'>
          <h4>Please Login To Create A New Memory</h4>
        </div>
      );
    } else if (data) {
      return this.renderContent();
    }
  }
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { createPost, fetchPost, updatePost, signup })(Form);
