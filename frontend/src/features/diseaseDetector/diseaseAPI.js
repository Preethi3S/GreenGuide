import api from '../../utils/api';

const BASE_URL = '/disease';

export const detectDisease = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post(`${BASE_URL}/detect`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
export default detectDisease;