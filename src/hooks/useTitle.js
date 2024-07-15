import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useTitle = (title) => {
  const location = useLocation();
    useEffect(() => {
        document.title = `${title} - CodeBook`;
    }, [title, location]);
    
  return null;
}
