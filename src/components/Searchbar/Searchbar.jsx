import css from 'components/Searchbar/Searchbar.module.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function Searchbar({ submit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = e => {
    setSearchInput(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchInput.trim() === '') {
      toast.warn('Type your search...');
      return;
    }
    submit(searchInput);
    setSearchInput('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span>Search</span>
        </button>

        <input
          type="text"
          name="searchInput"
          value={searchInput}
          onChange={handleSearchChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

