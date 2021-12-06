import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class NavBar extends React.Component {
  renderButton() {
    const data = JSON.parse(localStorage.getItem('profile'));
    if (!data) {
      return (
        <a href='/signin' className='my-auto btn btn-secondary'>
          SignIn
        </a>
      );
    } else if (data) {
      return (
        <div className='my-auto'>
          Hello<span className='text-primary'> {data.user.name} </span>
          <button href='' className='my-auto btn btn-secondary' onClick={() => this.props.logout()}>
            Log Out
          </button>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <nav className='p-2 text-center bg-white my-3 rounded-pill d-flex justify-content-around'>
          <a href='/' style={{ textDecoration: 'none', color: '#000' }}>
            <h2>
              Memories <i className='bi bi-heart-fill'></i>
            </h2>
          </a>
          {this.renderButton()}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { logout })(NavBar);
