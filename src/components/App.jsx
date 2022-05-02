import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import { fetchAPI, fetchTotalHits } from 'services/images-api';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Button from 'components/Button/Button';
import { animateScroll as scroll } from 'react-scroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    images: [],
    inputValue: '',
    currentPage: 1,
    modalImg: '',
    showModal: false,
    status: Status.IDLE,
    totalHits: '',
  };

  getInputValue = inputValue => {
    this.setState({
      inputValue: inputValue,
      images: [],
      currentPage: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, currentPage } = this.state;

    if (this.props.inputValue === '') {
      return;
    }
    if (
      prevState.inputValue !== inputValue ||
      prevState.currentPage !== currentPage
    ) {
      if (currentPage === 1) {
        fetchTotalHits(inputValue, currentPage).then(r => {
          this.setState({ totalHits: r });
        });
        this.setState({
          status: Status.PENDING,
        });
      }
      this.fetchImages();

      if (currentPage > 1) {
        scroll.scrollToBottom();
      }
    }
  }

  async fetchImages() {
    const { inputValue, currentPage } = this.state;
    try {
      let dataImages = await fetchAPI(inputValue, currentPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...dataImages],
        status: Status.RESOLVE,
      }));
    } catch (error) {
      alert();
    }
  }

  handleIncrementCurrentPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  getLargeImgUrl = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, modalImg, status, images, currentPage, totalHits } =
      this.state;
    const isHitsEnded = currentPage * 12 >= totalHits;
    return (
      <div>
        <Searchbar onSearch={this.getInputValue} />
        {status === 'pending' && <Loader />}
        {status === 'resolve' && (
          <ImageGallery images={images} onClick={this.getLargeImgUrl} />
        )}
        {status === 'resolve' && !isHitsEnded && (
          <Button
            text={'Load more'}
            onClick={this.handleIncrementCurrentPage}
          />
        )}
        {images.length === 0 && status === 'resolve' && (
          <ErrorMessage text="Nothing found" />
        )}
        {status === 'rejected' && <ErrorMessage text="Something went wrong!" />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={modalImg} />
        )}
      </div>
    );
  }
}

export default App;
