// Utility function to get a cookie by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts?.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Example usage to get the token
// const token = getCookie("auth-token");

export default getCookie;
