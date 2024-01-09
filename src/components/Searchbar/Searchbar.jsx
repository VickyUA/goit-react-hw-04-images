import css from 'components/Searchbar/Searchbar.module.css';
import { Component } from 'react';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchInput: '',
  };

  handleSearchChange = e => {
    this.setState({ searchInput: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchInput.trim() === '') {
      toast.warn('Type your search...');
      return;
    }
    this.props.submit(this.state.searchInput);
    this.setState({ searchInput: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span>Search</span>
          </button>

          <input
            type="text"
            name="searchInput"
            value={this.state.searchInput}
            onChange={this.handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
