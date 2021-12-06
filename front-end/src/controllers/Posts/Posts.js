import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts, deletePost } from '../../actions';

class FetchPosts extends React.Component {
  state = { id: '' };
  componentDidMount() {
    this.props.fetchPosts();
  }
  deletePost(id) {
    this.props.deletePost(id);
  }
  renderButtons(id) {
    return (
      <div>
        <button className='btn btn-white text-danger' onClick={() => this.deletePost(id)}>
          <i className='bi bi-trash-fill'></i>
        </button>
        <button
          className='btn btn-white text-info mx-2'
          onClick={() => this.props.setCurrentId(id)}
        >
          <i className='bi bi-pencil-fill'></i>
        </button>
      </div>
    );
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div className='col mb-4 position-relative' key={post._id}>
          <div className='card h-100'>
            <img
              src={
                `${post.selectedFile}` ||
                'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
              }
              style={{ cursor: 'pointer' }}
              onClick={() => (window.location.href = `/post/${post._id}`)}
              className='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <span className='text-muted'>#{post.tags}</span>
              <h3 className='card-title'>{post.title}</h3>
              <small className='text-muted' style={{ fontSize: '.8rem' }}>
                by {post.creator}
              </small>
              <p className='card-text'>{post.message}</p>
              <div className='d-flex justify-content-between'>
                <div>
                  {JSON.parse(localStorage.getItem('profile'))
                    ? JSON.parse(localStorage.getItem('profile')).user._id === post._user
                      ? this.renderButtons(post._id)
                      : null
                    : ''}
                </div>
                <div>
                  <span>{post.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <div className='row row-cols-1 row-cols-lg-3 row-col-md-2'>{this.renderPosts()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts, auth: state.auth };
};
export default connect(mapStateToProps, { fetchPosts, deletePost })(FetchPosts);
