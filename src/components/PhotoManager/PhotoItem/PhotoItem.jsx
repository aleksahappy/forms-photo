import React from 'react';
import PropTypes from 'prop-types';

export default function PhotoItem({item, onDeletePhoto}) {
  return (
    <div className="photo-item">
      <img src={item.url} alt={item.name}></img>
      <button className="btn delete" onClick={() => onDeletePhoto(item.id)}></button>
    </div>
  )
}

PhotoItem.propTypes = {
  item: PropTypes.object
};
