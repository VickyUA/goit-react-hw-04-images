import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import css from 'components/styles.module.css';
import { fetchPictures } from '../api/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [buttonIsShown, setButtonIsShown] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  const handleFormSubmit = searchInput => {
    setSearchInput(searchInput);
    setPictures([]);
    setIsLoading(true);
    setError(null);
    setPage(1);
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (searchInput === '') {
      return;
    }

    const getPictures = async () => {
      try {
        const picturesFetched = await fetchPictures(searchInput, page);
        setPictures(prevState => [...prevState, ...picturesFetched.hits]);
        setButtonIsShown(page < Math.ceil(picturesFetched.totalHits / 12));
        console.log(picturesFetched);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPictures();
  }, [searchInput, page]);

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div className={css.App}>
      <Searchbar submit={handleFormSubmit} />
      <ImageGallery
        error={error}
        isLoading={isLoading}
        pictures={pictures}
        onSelect={openModal}
      />
      {buttonIsShown && <Button onClick={handleClick} />}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
}
