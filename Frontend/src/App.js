import "bootstrap/dist/css/bootstrap.min.css";
import { Component, React } from "react";
import { Link, Route, Routes } from "react-router-dom";

import NavDropdown from 'react-bootstrap/NavDropdown';
import EventBus from "./common/EventBus";
import UpdateUser from "./components/admin/UpdateUser";
import UserList from "./components/admin/UserList";
import Calculator from "./components/calculator/Calculator";
import Counter from "./components/counter/Counter";
import ErrorPage from "./components/errorPage/ErrorPage";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import Home from "./components/home";
import Login from "./components/login/login";
import Profile from "./components/profile";
import Register from "./components/register/register";
import TodoList from "./components/todo/TodoList";
import UpdateTodo from "./components/todo/UpdateTodo";
import AuthService from "./services/auth.service";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">

            {showAdminBoard && (
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="/userList">User List</NavDropdown.Item>
                <NavDropdown.Item href="/userList">All Todo List</NavDropdown.Item>
              </NavDropdown>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/todo"} className="nav-link">
                  Todos
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to={"/calculator"} className="nav-link">
                Calculator
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/counter"} className="nav-link">
                Counter
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/profile" element={<Profile />} />
            <Route path="/UserList" element={<UserList />} />
            <Route path="/UserList/:id" element={<UpdateUser />} />


            <Route path="/forgotPassword" element={<ForgotPassword />} />

            <Route path="/todo" element={<TodoList />} />
            <Route path="/todo/:id" element={<UpdateTodo />} />

            <Route path="/counter" element={<Counter />} />
            <Route path="/calculator" element={<Calculator />} />

            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

