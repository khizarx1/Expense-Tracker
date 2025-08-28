window.getRandomId = () => Math.random().toString(36).slice(2);

export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  // Agar Firestore Timestamp mila hai
  if (typeof timestamp.toDate === "function") {
    const date = timestamp.toDate();
    return date.toLocaleString(); 
  }

  // Agar normal JS Date mila hai
  const date = new Date(timestamp);
  return date.toLocaleString();
};