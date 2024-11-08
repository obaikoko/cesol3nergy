'use client';
import { ClipLoader, SyncLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: 'auto',
};

const Spinner = ({ loading, clip, sync, size }) => {
  return (
    <>
      {clip && (
        <ClipLoader
          color='#CF5855'
          loading={loading}
          cssOverride={override}
          size={size}
          aria-label='Loading Spinner'
        />
      )}
      {sync && (
        <SyncLoader
          color='#CF5855'
          loading={loading}
          cssOverride={override}
          size={size}
          aria-label='Loading Spinner'
        />
      )}
    </>
  );
};
export default Spinner;
