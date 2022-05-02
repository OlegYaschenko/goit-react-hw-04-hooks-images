import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onClick }) => {
  return (
    <div>
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webImage={webformatURL}
              largeImage={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          );
        })}
      </Gallery>
    </div>
  );
};

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    })
  ),
  onClick: propTypes.func.isRequired,
};

export default ImageGallery;
