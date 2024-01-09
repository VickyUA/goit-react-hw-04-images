import css from 'components/Button/Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={() => onClick()}>
      Load more
    </button>
  );
};

export default Button;
