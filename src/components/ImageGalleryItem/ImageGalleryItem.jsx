import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  onClick,
  id,
  webformatURL,
  tags,
  largeImageURL,
}) => {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <img
      id={id}
      src={webformatURL}
      alt={tags}
      className={css.ImageGalleryItemImage}
      onClick={handleClick}
    />
  );
};

export default ImageGalleryItem;
