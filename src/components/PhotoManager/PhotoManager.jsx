import {React, useState} from 'react';
import { nanoid } from 'nanoid';
import PhotoItem from './PhotoItem/PhotoItem';

const fileToDataUrl = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', e => {
      resolve({
        id: nanoid(),
        url: e.currentTarget.result,
        name: file.name
      });
    });

    fileReader.addEventListener('error', e => {
      console.log(e);
      reject(new Error(e.currentTarget.error));
    });

    fileReader.readAsDataURL(file);
  });
}

export default function PhotoManager() {
  const [photos, setPhotos] = useState([]);

  const onAddPhoto = async (e) => {
    e.preventDefault();
    const files = [...e.target.files];
    const urls = await Promise.all(files.map(file => fileToDataUrl(file)));
    setPhotos(prev => [...prev, ...urls]);
  };

  const onDeletePhoto = id => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  return (
    <div className="photo-manager">
      <form className="photo-manager-select">
        <div className="select-photo">Click to select</div>
        <input type="file" accept="image/*" title="" multiple onChange={onAddPhoto}/>
      </form>
      <div className="gallery">
        {photos.map(photo => <PhotoItem key={photo.id} item={photo} onDeletePhoto={onDeletePhoto}/>)}
      </div>
    </div>
  )
}
