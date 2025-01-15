import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';

const UpdateProfileImage = () => {
  const [image, setImage] = useState(null);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        640,
        510,
        'JPEG',
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const resizedImage = await resizeFile(file);
        setImage(resizedImage);
        
        // toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error('Error resizing image');
        console.error('Error resizing image:', error);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {/* Hidden File Input */}
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        id='file-input'
        className='hidden'
      />

      {/* Custom Label */}
      <label
        htmlFor='file-input'
        className='cursor-pointer px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-200'
      >
        Update Profile Picture
      </label>

      {image && (
        <div className='mt-4'>
          <p>Preview:</p>
          <img
            src={image}
            alt='Preview'
            className='w-32 h-32 rounded-full object-cover'
          />
        </div>
      )}
    </div>
  );
};

export default UpdateProfileImage;
