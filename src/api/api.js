import axios from 'axios';

const fetchPictures = async (search, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=41535540-3e2fcae5f9a93b6d79476b27b&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};

export { fetchPictures };
