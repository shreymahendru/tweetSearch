const version = "/api/v1/";

// User Routes
export const loginUser = version + "login"; 
export const signupUser = version + "signup"; 


// auth
export const confirmEmail = version + "confirmation_email";
export const validateToken = version + "validate_token";
export const resetPasswordRequest = version + "reset_password_request";
export const resetPassword = version + "reset_password/{token: string}";

// tweeter Search
export const search = version + "tweet/search?{$search: string}";
export const nMostSearched = version + "tweet/most_searched?{$count: number}";
export const userSearchHistory = version + "tweet/search_history?{$user_id: string}";

