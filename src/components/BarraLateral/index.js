import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as UsersActions } from "../../store/ducks/users";

import "./styles.css";

const BarraLateral = ({ users, removeUser }) => (
  <div className="left-bar">
    {!users.data.length && <h4>Nenhum usuário adicionado</h4>}
    <ul>
      {users.data.map(user => (
        <li key={user.id}>
          <div>
            <img src={user.avatar} alt={user.name} />
            <div className="user-info">
              <h2>{user.name}</h2>
              <h3>{user.login}</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                removeUser(user);
              }}
            >
              <i class="fa fa-fw fa-user-times remove" />
            </button>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-fw fa-sign-in go-to-page" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

BarraLateral.propTypes = {
  users: PropTypes.shape({}).isRequired,
  removeUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BarraLateral);
