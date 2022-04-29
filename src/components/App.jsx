import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    inputValue: '',
    modalImg: '',
    showModal: false,
  };

  getInputValue = inputValue => {
    this.setState({ inputValue: inputValue });
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
    const { showModal, modalImg } = this.state;
    return (
      <div>
        <Searchbar onSearch={this.getInputValue} />
        <ImageGallery
          inputValue={this.state.inputValue}
          onClick={this.getLargeImgUrl}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} largeImage={modalImg} />
        )}
      </div>
    );
  }
}

export default App;
