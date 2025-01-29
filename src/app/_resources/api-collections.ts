export const url_list: { [key: string]: string } = {
  // auth apis
  LOGIN_API: "login",
  REGISTER_REQUEST_API: "registration-request",
  OTP_CONFIRM_API: "otp-verify",
  REGISTER_API: "register",
  COMPLETE_REGISTER_API: "v2/complete-registration",
  RECAPTCHA_API: "captcha",
  EMAIL_VERIFICATION_API: "email/verify-request",
  RELATED_COURSES: "public/related-courses",

  HOME_API: "public/home",
  GLOBAL_SEARCH_API: "public/search",

  DIVISON_API: "public/division",
  DISTRICT_API: "public/district",

  // public apis
  COURSE_TYPE_API: "public/course-type",
  CATEGORY_API: "public/category",
  SUB_CATEGORY_API: "public/sub-category",

  CHANGE_PASSWORD_API: "update-password",
  PROFILE_API: "profile",
  PROFILE_EDUCATION_REMOVE_API: "profile/education",
  PROFILE_EXPERIENCE_REMOVE_API: "profile/experience",
  USER_ENROLLED_COURSE_API: 'order/user/enrolled',
  USER_TRANSACTION_HISTORY_API: 'order/user/invoices',
  USER_PROFILE_API: "user-management/profile",

  COURSE_API: "public/courses",
  EBOOK_API: "public/ebooks",
  REQUESTED_COURSE: "public/requested-courses",

  CART_API: "order/carts",
  PLACE_ORDER_API: "order/place/order",
  INVOICE_API: "order/invoice",
  PAYMENT_API: "order/payment",

  CONTENT_API: "generate",
  INSTRUCTOR_API: "public/users/instructors",
  CONTENT_PROGRESS_API: "course-management/progress",

  OTHERS_PROFILE_API: 'public/users/profile'
};
