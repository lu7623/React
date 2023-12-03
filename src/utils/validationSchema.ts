import * as yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name')
    .uppercase('Name should be uppercase'),
  age: yup
    .number()
    .positive('Age is not valid')
    .integer('Age is not valid')
    .required('Please enter your age'),
  email: yup
    .string()
    .email('E-mail is not valid')
    .required('Please enter your email'),
  password: yup
    .string()
    .required()
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('special charcter'))
    .matches(/[\W|_/g]/, getCharacterValidationError('special caracter')),
  confirm: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  gender: yup
    .string()
    .required('Please select your gender')
    .oneOf(['male', 'female', 'other']),
  // country: yup.string().oneOf(countriesArr).required('Please select your country'),
  accept: yup
    .bool()
    .required('You have to accept terms and conditions to coninue')
    .oneOf([true], 'You must accept the terms and conditions'),
});
