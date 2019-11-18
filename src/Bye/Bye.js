import React from 'react';
import PropTypes from 'prop-types';

const Bye = ({ name }) => {
  return <p>안녕히가세요, {name}</p>;
};

Bye.propTypes = {
  name: PropTypes.string
};

export default Bye;
