// AlertContext.js
import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Hide the alert after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ alertMessage, alertVisible, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
