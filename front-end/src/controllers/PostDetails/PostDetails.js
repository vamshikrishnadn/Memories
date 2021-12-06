import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPost } from '../../actions';

class PostDetails extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
    const data = this.props.post;
    console.log(data);
    return (
      <div className='container bg-white p-3'>
        <div className='row'>
          <div className='col-7'>
            <h2>{data.title}</h2>
            <span className='text-muted'>#{data.tags}</span>
            <p>{data.message}</p>
            <h5>{data.creator}</h5>
            <small>{data.createdAt}</small>
          </div>
          <div className='col-5'>
            <img src={data.selectedFile} className='img-fluid' />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts,
  };
};
export default connect(mapStateToProps, { fetchPosts, fetchPost })(PostDetails);
