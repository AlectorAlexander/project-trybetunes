import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { onClick, disabled, onChange } = this.props;
    return (
      <form data-testid="page-login">
        <p>Login</p>
        <label htmlFor="name">
          <span>
            Nome:
            {' '}
          </span>
          <input
            data-testid="login-name-input"
            onChange={ onChange }
            type="text"
            name="name"
          />
        </label>
        <button
          disabled={ disabled }
          onClick={ onClick }
          data-testid="login-submit-button"
          type="button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Login;
