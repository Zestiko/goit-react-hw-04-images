import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendelClosemodalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendelClosemodalByEscape);
  }

  hendelClosemodalByEscape = e => {
    console.log('escape');
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const {closeModal, modalImage, altPhotos} = this.props
    return createPortal(
      <div
        className={css.Overlay}
        onClick={e => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className={css.Modal}>
          <img src={modalImage} alt={altPhotos} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  altPhotos: PropTypes.string.isRequired,
};
