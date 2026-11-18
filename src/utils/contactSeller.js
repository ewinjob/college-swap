
export const getWhatsAppLink = (phone, itemTitle, collegeName) => {
  if (!phone) return '#';
  
  // Remove non-digit characters
  const cleanPhone = phone.toString().replace(/\D/g, '');
  // Ensure 91 country code for India
  const formattedPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12
    ? cleanPhone
    : `91${cleanPhone.slice(-10)}`;

  const message = `Hi! I saw your listing "${itemTitle}" on CollegeSwap Kerala (${collegeName || 'Campus'}). Is it still available?`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};


export const getMailtoLink = (email, itemTitle, collegeName) => {
  if (!email) return '#';
  const subject = `Inquiry: ${itemTitle} on CollegeSwap Kerala`;
  const body = `Hi,\n\nI am interested in your item "${itemTitle}" listed under ${collegeName || 'Campus Swap'}.\nPlease let me know if it's still available and where we can meet on campus.\n\nThanks!`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
