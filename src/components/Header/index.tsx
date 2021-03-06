import React, { useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { useCookies } from "react-cookie";

import { IState } from "../../types";
import * as actions from "../../store/actions";
import { getUser } from "../../services/blogApi";

import "../Header/style.scss";

const Header: FC<PropsFromRedux> = ({ user, setUserAction }) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logOut = () => {
    setCookie("token", "", { maxAge: -1 });
    setUserAction(null);
    navigate("/");
  };

  useEffect(() => {
    if (cookies.token) {
      getUser(cookies.token)
        .then((value) => {
          setUserAction(value.user);
        })
        .catch((err) => console.log(err));
    }
  }, [cookies.token, setUserAction]);

  function RegisteredContent() {
    if (user) {
      const { username } = user;
      let { image } = user;

      return (
        <div className="header__button">
          <Link to="/new-article" className="header__button-item">
            Create Article
          </Link>
          <Link to="/profile">
            <div className="header__profile">
              <h6 className="header__profile-name">{username}</h6>
              <img
                src={
                  image ||
                  "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
                alt="Avatar"
                className="header__profile-image"
              />
            </div>
          </Link>
          <button onClick={logOut} className="header__button-item">
            Log Out
          </button>
        </div>
      );
    }
    return null;
  }

  function UnregisteredContent() {
    return (
      <div className="header__button">
        <Link to="/sign-in" className="header__button-item">
          Sign In
        </Link>
        <Link to="/sign-up" className="header__button-item">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      {user ? <RegisteredContent /> : <UnregisteredContent />}
    </header>
  );
};

const mapStateToProps = (state: IState) => {
  const { user } = state;
  return { user };
};

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

const headerWithConnector = connector(Header);

export { headerWithConnector as Header };
