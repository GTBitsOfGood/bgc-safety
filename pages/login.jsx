import React from "react";
import Cookie from "js-cookie";

class Login extends React.Component {
  static getInitialProps({ req }) {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/api/login.js`
      : `${protocol}://${req.headers.host}/api/login.js`;

    return { apiUrl };
  }

  constructor(props) {
    super(props);

    this.state = { username: "", error: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     showContent: false,
  //     selected: props.defaultSelected
  //   };

  //   this.toggleDropdown = this.toggleDropdown.bind(this);

  //   Router.events.on("routeChangeComplete", url => {
  //     const route = routes.find(rt => rt.link === url);
  //     if (route) {
  //       this.setState({ selected: route.name });
  //     }
  //     this.setState({ showContent: false });
  //   });
  // }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const url = this.props.apiUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const { token } = await response.json();
        Cookie.set("token", token);
      } else {
        console.log("Login failed.");
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
      }
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );
      throw new Error(error);
    }
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">BGCMA Email</label>

          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
          />

          <button type="submit">Login</button>

          <p className={`error ${this.state.error && "show"}`}>
            {this.state.error && `Error: ${this.state.error}`}
          </p>
        </form>
      </div>
    );
  }
}
export default Login;
