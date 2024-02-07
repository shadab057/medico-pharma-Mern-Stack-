// utils.js

export const getError = (error) => {
  return error.response && error.response.data
    ? error.response.data.message
    : error.message || 'Something went wrong';
};
