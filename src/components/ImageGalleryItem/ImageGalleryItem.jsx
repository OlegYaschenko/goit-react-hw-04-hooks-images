import propTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webImage, largeImage, tags, onClick }) => {
  return (
    <Item>
      <Image src={webImage} alt={tags} onClick={() => onClick(largeImage)} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webImage: propTypes.string.isRequired,
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default ImageGalleryItem;
