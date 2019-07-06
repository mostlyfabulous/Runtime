import React from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Meteor } from 'meteor/meteor';


class Login extends React.Component {

    render() {
        return (
          <div>
              <AccountsUIWrapper />
          </div>
        )
    }
}

export default Login;
