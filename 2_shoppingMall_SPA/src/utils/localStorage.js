const LocalStorageUtil = {
    setItem: (key, value) => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    },
  
    getItem: (key) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error("Error reading from localStorage", error);
        return null;
      }
    },
  
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing item from localStorage", error);
      }
    },
  
    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage", error);
      }
    }
  };
  
  export default LocalStorageUtil;