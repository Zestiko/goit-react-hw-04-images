import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    isModalOpen: false,
    lagImage: '',
  };

  render() {
    return (
      <>
        <ul className={css.gallery}>
          {this.props.images.map(
            ({ webformatURL, id, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  smallImage={webformatURL}
                  key={id}
                  altPhotos={tags}
                  lagImage={largeImageURL}
                />
              );
            }
          )}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
