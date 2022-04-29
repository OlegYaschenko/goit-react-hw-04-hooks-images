import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import propTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import fetchImages from 'services/images-api';
import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import { Gallery } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
    inputValue: propTypes.string.isRequired,
  };

  state = {
    images: null,
    currentPage: 1,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.inputValue === '') {
      return;
    }

    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ status: Status.PENDING, currentPage: 1 });
      this.fetchFirstPage();
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchMorePage();
    }
  }

  fetchFirstPage = () => {
    const { currentPage } = this.state;
    const { inputValue } = this.props;

    fetchImages(inputValue, currentPage)
      .then(response =>
        this.setState({
          images: response.hits,
          status: Status.RESOLVE,
        })
      )
      .catch(error => this.setState({ status: Status.REJECTED }));
  };

  fetchMorePage = () => {
    const { currentPage } = this.state;
    const { inputValue } = this.props;

    fetchImages(inputValue, currentPage)
      .then(response =>
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: Status.RESOLVE,
        }))
      )
      .catch(error => this.setState({ status: Status.REJECTED }));

    scroll.scrollToBottom();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolve') {
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
                  onClick={this.props.onClick}
                />
              );
            })}
          </Gallery>
          {this.state.images.length !== 0 ? (
            <Button text="Load more" onClick={this.handleLoadMore} />
          ) : (
            <ErrorMessage text="Ничего не найдено" />
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;
