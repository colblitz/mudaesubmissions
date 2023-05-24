import { createContext, useState, useEffect } from "react";

const Context = createContext();

const useLocal = (key, initialState) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

const ContextProvider = ({ children }) => {
  const [token, setToken] = useLocal("userToken", "");
  const [username, setUsername] = useLocal("username", "");

  const setTokenHandler = (jwt) => {
    setToken(jwt);
  };

  const setUsernameHandler = (username) => {
    setUsername(username);
  };

  return (
    <Context.Provider
      value={{
        token,
        setTokenHandler,
        username,
        setUsernameHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
