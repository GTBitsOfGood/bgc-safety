import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Router from 'next/router';

class Login extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      email: "klucas-bd@bgcma.org",
      password: "KLucasBGCBusDriver", 
      user: '', 
      sentCredentials: false
    };

  }


  sendCredentials = () => {
    const data = {
      email: this.state.email, 
      password: this.state.password
    };

    console.log(data);
    axios
      .post("http://localhost:3000/api/login", data)
      .then(function(response) {
        console.log(response);
        self.setState({sentCredentials: true});
        self.setState({user: response});
        console.log(this.state.user);
        // cookie.set("token", token, { expires: 1 });
        // Router.push("/roster");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render () {
    const { user } = this.state;
    const { sentCredentials } = this.state;

    return (
      <div className="container">
        <div>
          <div>
            <input className="login-text-field" 
              value={this.state.email} 
              onChange={ this.handleChangeEmail.bind(this) }
              placeholder="Username" />
          </div>
          <div>
            <input className="login-text-field" 
              value={this.state.password} 
              onChange={ this.handleChangePassword.bind(this) }
              placeholder="Password" />
          </div>
        </div>
        <div className="button-container">
          <button type="button" 
            className="btn-login" 
            onClick={this.sendCredentials}>
            Login
          </button>
        </div>
      </div>
    )
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  
   
}


const useStyles = makeStyles(theme => ({
  /* Rectangle 3 */
  // login-btn: {
  //   position: absolute,
  //   width: "468px",
  //   height: "63px",
  //   left: "486px",
  //   top: "800px",

  //   background:"#1C7DB4",
  //   border-radius: "30px",
  //   transform: theme.matrix(1, 0, 0, -1, 0, 0)
  // },

  /* Rectangle 2 */
  // pass-field: {
  //   position: absolute;
  //   width: 558px;
  //   height: 63px;
  //   left: 441px;
  //   top: 605px;

  //   background: #E0E0E0;
  //   border-radius: 30px;
  // },

  /* Rectangle 1 */
  // user-field: {
  //   position: absolute;
  //   width: 558px;
  //   height: 63px;
  //   left: 441px;
  //   top: 524px;
    
  //   background: #E0E0E0;
  //   border-radius: 30px;
  // },



  root: {
    flexGrow: 1
  },
  header: {
    backgroundColor: "#1594D0"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: "bold"
  },
  date: {
    padding: "10px 20px",
    textAlign: "center"
  }
}));

export default Login;
