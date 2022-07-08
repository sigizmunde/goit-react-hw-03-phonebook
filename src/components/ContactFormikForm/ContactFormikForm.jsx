import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, ErrorText } from './ContactFormikForm.styled';
import PropTypes from 'prop-types';

const initialValues = {
  name: '',
  number: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan'"
    )
    .required('You need to type a name'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('You need to type a number'),
});

function ContactFormikForm({ onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ contact: values, onSuccess: resetForm });
    // form clears only on success
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label>
          {'Name '}
          <Field type="text" name="name" />
          <ErrorText>
            <ErrorMessage name="name" />
          </ErrorText>
        </label>
        <label>
          {'Phone '}
          <Field type="tel" name="number" />
          <ErrorText>
            <ErrorMessage name="number" />
          </ErrorText>
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}

export default ContactFormikForm;

ContactFormikForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
