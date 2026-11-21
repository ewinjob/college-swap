import Swal from 'sweetalert2';

// Custom SweetAlert2 Base Theme matching CollegeSwap Kerala (Sky Blue & Slate)
const collegeSwapSwal = Swal.mixin({
  customClass: {
    popup: 'rounded-3xl border border-slate-100 shadow-2xl p-6 font-sans',
    title: 'text-xl font-black text-slate-900 tracking-tight',
    htmlContainer: 'text-sm text-slate-600 leading-relaxed',
    confirmButton: 'rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold px-6 py-2.5 text-xs shadow-md shadow-sky-500/25 transition cursor-pointer mx-1',
    cancelButton: 'rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 text-xs transition cursor-pointer mx-1',
    denyButton: 'rounded-xl bg-red-500 text-white font-bold px-5 py-2.5 text-xs transition cursor-pointer mx-1'
  },
  buttonsStyling: false
});

/**
 * Pretty Toast Notification (Top Right)
 */
export const showToast = (title, icon = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: 'rounded-2xl border border-slate-100 shadow-lg text-xs font-bold text-slate-800 bg-white/95 backdrop-blur-md px-4 py-2.5'
    }
  });

  return Toast.fire({
    icon,
    title
  });
};

/**
 * Pretty Success Modal Alert
 */
export const showSuccessAlert = (title, text = '') => {
  return collegeSwapSwal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonText: 'Great, got it!'
  });
};

/**
 * Pretty Error Modal Alert
 */
export const showErrorAlert = (title, text = '') => {
  return collegeSwapSwal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Try Again'
  });
};

/**
 * Pretty Warning / Notice Alert
 */
export const showWarningAlert = (title, text = '') => {
  return collegeSwapSwal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'Understood'
  });
};

/**
 * Pretty Confirm Modal (e.g. Delete, Logout, Actions)
 */
export const showConfirmAlert = async ({
  title,
  text,
  confirmButtonText = 'Yes, Proceed',
  cancelButtonText = 'Cancel',
  icon = 'warning'
}) => {
  const result = await collegeSwapSwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true
  });

  return result.isConfirmed;
};

/**
 * 🔒 Specialized Login Required Alert
 * Used when a visitor attempts to post a product or access student-only features.
 */
export const showLoginRequiredAlert = async (navigate) => {
  const result = await collegeSwapSwal.fire({
    icon: 'info',
    title: 'Student Login Required 🎓',
    html: `
      <p class="text-xs text-slate-600 mb-2">
        You need to sign in with your Kerala college account or Google to post and swap items.
      </p>
      <div class="mt-3 inline-flex items-center gap-2 rounded-xl bg-sky-50 border border-sky-100 px-3 py-2 text-xs font-semibold text-sky-800">
        <span>🛡️ Keeps Kerala campus deals authentic & verified</span>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Sign In Now',
    cancelButtonText: 'Browse First',
    reverseButtons: true
  });

  if (result.isConfirmed && typeof navigate === 'function') {
    navigate('/auth?redirect=/add-product');
    return true;
  }
  return false;
};
