import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpnet: false,
  };

  hendelShowModal = value => {
    console.log('hendelShowModal');
    this.setState({ modalImage: value });
  };

  hendelCloseModal = () => {
    this.setState(prevState => ({ modalIsOpnet: !prevState.modalIsOpnet }));
  };
  render() {
    const { smallImage, altPhotos, lagImage } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            className={css['ImageGalleryItem-image']}
            src={smallImage}
            alt={altPhotos}
            onClick={this.hendelCloseModal}
          />
        </li>
        {this.state.modalIsOpnet && (
          <Modal
            modalImage={lagImage}
            closeModal={this.hendelCloseModal}
            altPhotos={altPhotos}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  altPhotos: PropTypes.string.isRequired,
  lagImage: PropTypes.string.isRequired,
};

