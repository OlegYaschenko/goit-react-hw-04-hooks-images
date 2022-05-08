import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import { fetchAPI } from 'services/images-api';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Button from 'components/Button/Button';
import { animateScroll as scroll } from 'react-scroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECTED: 'rejected',
};

function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState('');

  const getInputValue = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    currentPage === 1 ? setStatus(Status.PENDING) : scroll.scrollToBottom();

    (async function fetchImages() {
      try {
        let { hits, totalHits } = await fetchAPI(inputValue, currentPage);
        setImages(image => [...image, ...hits]);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVE);
      } catch (error) {
        alert();
      }
    })();
  }, [inputValue, currentPage]);

  const handleIncrementCurrentPage = () => {
    setCurrentPage(page => page + 1);
  };

  const getLargeImgUrl = url => {
    toggleModal();
    setModalImg(url);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const isHitsEnded = currentPage * 12 >= totalHits;
  return (
    <div>
      <Searchbar onSearch={getInputValue} />
      {status === 'pending' && <Loader />}
      {status === 'resolve' && (
        <ImageGallery images={images} onClick={getLargeImgUrl} />
      )}
      {status === 'resolve' && !isHitsEnded && (
        <Button text={'Load more'} onClick={handleIncrementCurrentPage} />
      )}
      {images.length === 0 && status === 'resolve' && (
        <ErrorMessage text="Nothing found" />
      )}
      {status === 'rejected' && <ErrorMessage text="Something went wrong!" />}
      {showModal && <Modal onClose={toggleModal} largeImage={modalImg} />}
    </div>
  );
}

export default App;
