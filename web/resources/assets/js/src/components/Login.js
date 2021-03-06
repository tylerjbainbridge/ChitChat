import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import MakeForm from './HOCs/MakeForm';
import FormError from './reusable/FormError';
import FontAwesome from 'react-fontawesome';

class Login extends Component {
  state = { error: null, loading: false };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post(`/api/login`, this.props.getEscapedFields())
      .then(() => {
        this.setState({ loading: false });
        window.location = '/';
      })
      .catch(err => {
        if (err.response.data.email) {
          this.setState({ error: err.response.data.email });
        } else {
          this.setState({ error: 'An unknown error has occured.' });
        }
      });
  };

  render() {
    const { fields, errors } = this.props;
    document.title = 'Login';
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <h1>Login to <Link className="leaveForm" to="/">Roomio</Link></h1>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="text"
            onChange={this.props.onChange}
            onBlur={this.props.validateFieldOnBlur}
            value={fields.email}
            className="formInput"
          />
          <FormError error={errors.email} />
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            onChange={this.props.onChange}
            value={fields.password}
            className="formInput"
          />
          <FormError error={errors.password} />
          <div className="buttonContainer">
            {this.state.loading
              ? <button className="formButton inactive">
                  Signing In <FontAwesome name="circle-o-notch" spin />
                </button>
              : <button className="formButton">Sign In!</button>}
          </div>
          <FormError error={this.state.error} />
        </form>
        <div className="linkContainer">
          <Link to="/register" className="link">sign up here.</Link>
        </div>
      </div>
    );
  }
}

const fields = ['email', 'password'];
const rules = {
  email: 'required',
  password: 'required',
};

export default MakeForm(fields, rules)(Login);
