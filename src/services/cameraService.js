import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const openCamera = async () => {
  return new Promise((resolve, reject) => {
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (response.didCancel) reject("Usuario canceló");
      else if (response.errorCode) reject(response.errorMessage);
      else resolve(response.assets[0]);
    });
  });
};

export const openGallery = async () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) reject("Usuario canceló");
      else if (response.errorCode) reject(response.errorMessage);
      else resolve(response.assets[0]);
    });
  });
};