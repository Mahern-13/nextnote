import React, { useState, useContext, createContext } from "react";

const UserContext = createContext({});
const UserActionsContext = createContext({});

export const useUserContext = () => useContext(UserContext);
export const useUserActionsContext = () => useContext(UserActionsContext);

export const UserContextProvider = props => {
  const [user, setUser] = useState("hello user");
  return (
    <UserContext.Provider value={user}>
      <UserActionsContext.Provider value={setUser}>
        {props.children}
      </UserActionsContext.Provider>
    </UserContext.Provider>
  );
};
