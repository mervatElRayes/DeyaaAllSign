  import { createContext, useReducer } from "react";
  const ThemeContexttt = createContext();
 
 const initialData = { myTheme: localStorage.getItem("lastTheme") === null ? "Dark" : localStorage.getItem("lastTheme") ===  "Dark" ? "Dark" : "Light"};
 const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, myTheme: action.newValue };
    default:
      return firstState;
  }}
   
  
  export function ThemeProvider({ children }) {
    const [firstState, dispatch] = useReducer(reducer, initialData);
    const changeTheme = (newTheme) => {
      localStorage.setItem("lastTheme", newTheme );
      dispatch({ type: "CHANGE_THEME", newValue: newTheme });
    };
  
  
    return (
       <ThemeContexttt.Provider value={{ ...firstState, changeTheme }}>
        {children}
       </ThemeContexttt.Provider>
    );
  }
  
  export default ThemeContexttt;