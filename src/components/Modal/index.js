import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Modal from "react-modal";

import { Creators as ModalActions } from "../../store/ducks/modal";
import { Creators as UserActions } from "../../store/ducks/users";

import "./styles.css";

Modal.setAppElement(document.getElementById("root"));

class ModalUser extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      visible: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      cordinates: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number
        })
      ])
    }).isRequired,
    esconder: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired
  };

  state = {
    userInput: ""
  };

  handleHide = () => {
    this.props.esconder();
    this.setState({ userInput: "" });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { userInput } = this.state;

    if (!userInput) return;

    this.props.addUserRequest(userInput, this.props.modal.cordinates);
    this.setState({ userInput: "" });
  };

  handleInputChange = e => {
    this.setState({ userInput: e.target.value });
  };

  render() {
    const { userInput } = this.state;
    const { modal } = this.props;
    return (
      <Modal
        isOpen={modal.visible}
        contentLabel="Modal de Adicionar Usuario"
        onRequestClose={this.handleHide}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <h2>Adicionar novo usuário</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <input
            placeholder="Usuário do GitHub"
            value={userInput}
            onChange={this.handleInputChange}
          />
          <div className="buttons-container">
            <button type="button" onClick={this.handleHide}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ModalActions, ...UserActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUser);
