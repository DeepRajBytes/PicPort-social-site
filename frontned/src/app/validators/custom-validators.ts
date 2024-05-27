import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validator to ensure there are no spaces in the username
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().indexOf(' ') >= 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

// Validator to ensure the password contains at least one uppercase letter and one number
export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]+/.test(value);
  const hasNumber = /[0-9]+/.test(value);
  const isValid = hasUpperCase && hasNumber;
  return isValid ? null : { 'passwordStrength': true };
}
