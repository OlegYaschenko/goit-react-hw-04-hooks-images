import { Component } from 'react';
import propTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    onClose: propTypes.func.isRequired,
    largeImage: propTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalWindow>
          <img src={this.props.largeImage} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
