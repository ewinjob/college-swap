/**
 * Formats a number as Indian Rupee (₹)
 */
export const formatCurrency = (amount, isFree = false, isSwap = false) => {
  if (isFree) return 'Free';
  if (isSwap) return 'Swap Only';
  if (!amount || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
