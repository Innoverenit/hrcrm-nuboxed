// import { useState, useEffect } from 'react';

// const useGoogleMapsLoader = (apiKey, libraries = '') => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const scriptId = 'google-maps-script';

//     // Check if the script is already loaded
//     if (document.getElementById(scriptId)) {
//       setIsLoaded(true);
//       return;
//     }

//     // Create a new script element
//     const script = document.createElement('script');
//     script.id = scriptId;
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;
//     script.async = true;
//     script.defer = true;

//     // Handle script load and error
//     script.onload = () => setIsLoaded(true);
//     script.onerror = () => setError('Failed to load Google Maps script');

//     // Append the script to the document
//     document.head.appendChild(script);

//     // Cleanup script on unmount
//     return () => {
//       document.getElementById(scriptId)?.remove();
//     };
//   }, [apiKey, libraries]);

//   return { isLoaded, error };
// };

// export default useGoogleMapsLoader;


import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const useGoogleMapsLoader = (apiKey, libraries = '') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      libraries: libraries.split(','),
    });

    loader
      .load()
      .then(() => setIsLoaded(true))
      .catch((err) => {
        console.error('Google Maps API failed to load:', err);
        setError(err.message);
      });
  }, [apiKey, libraries]);

  return { isLoaded, error };
};

export default useGoogleMapsLoader;

