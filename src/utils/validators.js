// Form Validation Helpers for CollegeSwap

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email address is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g., student@college.edu or gmail.com).';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return 'WhatsApp phone number is required.';
  const clean = phone.replace(/\D/g, '');
  // Standard 10 digit Indian mobile number starting with 6, 7, 8, or 9
  const phoneRegex = /^[6-9]\d{9}$/;
  const tenDigit = clean.length === 12 && clean.startsWith('91') ? clean.slice(2) : clean;
  if (!phoneRegex.test(tenDigit)) {
    return 'Please enter a valid 10-digit Indian mobile number (e.g., 9847123456).';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return '';
};

export const validateListing = (formData) => {
  const errors = {};

  if (!formData.title || formData.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters long.';
  }

  if (formData.dealType === 'sell') {
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = 'Please enter a valid price greater than ₹0.';
    }
  }

  if (!formData.college) {
    errors.college = 'Please select your college or campus.';
  }

  if (!formData.category) {
    errors.category = 'Please select a category.';
  }

  if (!formData.sellerName || formData.sellerName.trim().length < 2) {
    errors.sellerName = 'Please enter your name.';
  }

  const phoneError = validatePhone(formData.sellerPhone);
  if (phoneError) errors.sellerPhone = phoneError;

  if (formData.sellerEmail && formData.sellerEmail.trim()) {
    const emailError = validateEmail(formData.sellerEmail);
    if (emailError) errors.sellerEmail = emailError;
  }

  return errors;
};
