export const USER_NAME_PATTERN: RegExp = /^[a-zA-Z0-9]{3,20}$/;
export const USER_NAME_VALIDATION_ERROR_MESSAGE: string =
  'Name must be between 3 and 20 characters and contain only letters and numbers';

export const USER_PASSWORD_PATTERN: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,512}$/;
export const USER_PASSWORD_VALIDATION_ERROR_MESSAGE: string =
  'Password must be between 8 and 512 characters, contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
