import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import css from 'components/styles.module.css';
import { fetchPictures } from '../api/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    searchInput: '',
    pictures: [],
    isLoading: false,
    error: null,
    page: 1,
    buttonIsShown: false,
    largeImageURL: null,
  };

  handleFormSubmit = searchInput => {
    this.setState({
      searchInput,
      pictures: [],
      isLoading: true,
      error: null,
      page: 1,
    });
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchInput !== this.state.searchInput ||
      prevState.page !== this.state.page
    ) {
      try {
        const pictures = await fetchPictures(
          this.state.searchInput,
          this.state.page
        );

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures.hits],
          buttonIsShown: this.state.page < Math.ceil(pictures.totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar submit={this.handleFormSubmit} />
        <ImageGallery
          error={this.state.error}
          isLoading={this.state.isLoading}
          pictures={this.state.pictures}
          onSelect={this.openModal}
        />
        {this.state.buttonIsShown && <Button onClick={this.handleClick} />}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
        {this.state.largeImageURL && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
