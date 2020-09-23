import { OnboardPath } from '../ChatBot';

export const validateAnswer = (
  validation: OnboardPath['validation'],
  message: string,
): boolean | never => {
  if (Array.isArray(validation)) {
    return validation.includes(message);
  } else if (typeof validation === 'boolean') {
    return validation;
  } else if (typeof validation === 'string') {
    return RegExp(validation).test(message);
  } else {
    throw new Error(
      `validation ${validation} isn't a string[], string, or boolean!`,
    );
  }
};
