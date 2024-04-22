// import React, { useEffect, useState } from 'react';
// import { updateUser, deleteUser } from '../services/AuthService';
// import { setAuthToken } from '../services/api';

// // const UserProfile: React.FC = () => {
// //   const [email, setEmail] = useState('');

// //   const handleUpdateUser = async () => {
// //     await updateUser({ email })
// //       .then(response => {
// //         console.log(response.data);
// //         // Handle successful user update
// //       })
// //       .catch(error => {
// //         console.error(error);
// //         // Handle user update error
// //       });
// //   };

// //   const handleDeleteUser = () => {
// //     deleteUser()
// //       .then(response => {
// //         console.log(response.data);
// //         setAuthToken(null); // Clear the auth token after deleting the user
// //         // Handle successful user deletion
// //       })
// //       .catch(error => {
// //         console.error(error);
// //         // Handle user deletion error
// //       });
// //   };

// //   return (
// //     <div>
// //       <h2>User Profile</h2>
// //       <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
// //       <button onClick={handleUpdateUser}>Update User</button>
// //       <button onClick={handleDeleteUser}>Delete User</button>
// //     </div>
// //   );
// // };

// // export default UserProfile;






// // /**
// //  * UserProfile component manages user's profile information and allows updating or deleting the user.
// //  * It uses React functional component along with hooks for state and effects.
// //  */
// // const UserProfile: React.FC = () => {
// //   const [email, setEmail] = useState<string>('');

// //   // Effect hook to set auth token on component mount
// //   useEffect(() => {
// //     // Since getAuthToken might be asynchronous, handle it with async-await inside an IIFE
// //     (async () => {
// //       const token = await setAuthToken();
// //       if (token) {
// //         setAuthToken(token);
// //       }
// //     })();
// //   }, []);

// //   /**
// //    * Handles updating the user's email.
// //    * Utilizes the updateUser service and logs the response or error.
// //    * This function is asynchronous and uses async-await pattern for API calls.
// //    */
// //   const handleUpdateUser = async () => {
// //     try {
// //       const response = await updateUser({ email });
// //       console.log('Update Successful:', response.data);
// //       // Optionally, handle additional logic post-update
// //     } catch (error) {
// //       console.error('Update Error:', error);
// //     }
// //   };

// //   /**
// //    * Handles deletion of the user.
// //    * Utilizes the deleteUser service, clears the auth token, and logs the response or error.
// //    * This function handles both the API call and local storage cleanup.
// //    */
// //   const handleDeleteUser = async () => {
// //     try {
// //       const response = await deleteUser();
// //       console.log('Deletion Successful:', response.data);
// //       setAuthToken(null); // Clear the auth token after deleting the user
// //       localStorage.removeItem('userToken'); // Also clear the token from local storage
// //     } catch (error) {
// //       console.error('Deletion Error:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>User Profile</h2>
// //       <input
// //         type="text"
// //         placeholder="Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <button onClick={handleUpdateUser}>Update User</button>
// //       <button onClick={handleDeleteUser}>Delete User</button>
// //     </div>
// //   );
// // };

// // export default UserProfile;





// const UserProfile: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [authToken, setAuthToken] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchAuthToken = async () => {
//       const token = await setAuthToken();
//       if (isMounted && token) {
//         setAuthToken(token);
//       }
//     };

//     fetchAuthToken();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   /**
//    * Handles updating the user's email.
//    * Utilizes the updateUser service and logs the response or error.
//    * This function is asynchronous and uses async-await pattern for API calls.
//    */
//   const handleUpdateUser = async () => {
//     try {
//       const response = await updateUser({ email });
//       console.log('Update Successful:', response.data);
//       // Optionally, handle additional logic post-update
//     } catch (error) {
//       console.error('Update Error:', error);
//     }
//   };

//   /**
//    * Handles deletion of the user.
//    * Utilizes the deleteUser service, clears the auth token, and logs the response or error.
//    * This function handles both the API call and local storage cleanup.
//    */
//   const handleDeleteUser = async () => {
//     try {
//       const response = await deleteUser();
//       console.log('Deletion Successful:', response.data);
//       setAuthToken(null); // Clear the auth token after deleting the user
//       localStorage.removeItem('userToken'); // Also clear the token from local storage
//     } catch (error) {
//       console.error('Deletion Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleUpdateUser}>Update User</button>
//       <button onClick={handleDeleteUser}>Delete User</button>
//     </div>
//   );
// };

// export default UserProfile;












import React, { useEffect, useState } from 'react';
import { updateUser, deleteUser } from '../services/AuthService';
import { getAuthToken } from '../services/api';

const UserProfile: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAuthToken = async () => {
      const token = await getAuthToken();
      if (isMounted) {
        setAuthToken(token);
      }
    };

    fetchAuthToken();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Handles updating the user's email.
   * Utilizes the updateUser service and logs the response or error.
   * This function is asynchronous and uses async-await pattern for API calls.
   */
  const handleUpdateUser = async () => {
    try {
      const response = await updateUser({ email });
      console.log('Update Successful:', response.data);
      // Optionally, handle additional logic post-update
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  /**
   * Handles deletion of the user.
   * Utilizes the deleteUser service, clears the auth token, and logs the response or error.
   * This function handles both the API call and local storage cleanup.
   */
  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser();
      console.log('Deletion Successful:', response.data);
      setAuthToken(null); // Clear the auth token after deleting the user
      localStorage.removeItem('userToken'); // Also clear the token from local storage
    } catch (error) {
      console.error('Deletion Error:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdateUser}>Update User</button>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default UserProfile;