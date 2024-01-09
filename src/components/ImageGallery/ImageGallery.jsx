import css from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';

const ImageGallery = ({ onSelect, error, isLoading, pictures }) => {
  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}

      {isLoading && <Loader />}

      {pictures.length > 0 && (
        <ul className={css.ImageGallery}>
          {pictures.map(picture => (
            <li className={css.ImageGalleryItem} key={picture.id}>
              <ImageGalleryItem {...picture} onClick={onSelect} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;
