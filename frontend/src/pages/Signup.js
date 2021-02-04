import React from 'react';
import { connect } from 'react-redux';
import {
  setUser,
  setPassword,
  create,
  setEmail,
  setUserType,
} from '../redux/actions/userActions';
import { Redirect } from 'react-router-dom';

const Signup = ({
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
  email,
}) => {
  
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (loadingState === 'loading') {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Sign up</h2>
      <div> 
        {/* this is a comment */}
        <label>Email:</label>
        <input type="email" placeholder='Valid email address'
          value={email}
          onChange={e => dispatch(setEmail(e.target.value))}
        />
      </div><br/>
      <div> 
        {/* this is a comment */}
        <label>Full Name:</label>
        <input placeholder ='Full name'
          value={user}
          onChange={e => dispatch(setUser(e.target.value))}
        />
      </div><br/>
      <div>
        <label>Password:</label>
        <input
          type="password" placeholder='Password'
          value={password}
          onChange={e => dispatch(setPassword(e.target.value))}
        />
      </div>
      <div id="radioGroup" onChange={e => dispatch(setUserType(e.target.value))}>
        <label>
          <input type="radio" value="Buyer" name="usertype"/>
          Buyer
        </label>
        <label>
          <input type="radio" value="Seller" name="usertype"/>
          Seller
        </label>
      </div>
      <div>
        {loadingState === 'error' && <b>User name already exists</b>}
        {loadingState === 'Not' && <b> enter a valid email- address </b>}
        <button id="signup" onClick={() => dispatch(create())}>Sign up</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  // this maps react props to redux state
  return {
    user: state.userReducer.user,
    password: state.userReducer.password,
    email: state.userReducer.email,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
  };
};

export default connect(mapStateToProps)(Signup);