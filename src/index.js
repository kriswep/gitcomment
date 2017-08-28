import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ children }) => <div>{children('gitcomment to be done!')}</div>;
MyComponent.propTypes = {
  children: PropTypes.func.isRequired,
};

export default MyComponent;
