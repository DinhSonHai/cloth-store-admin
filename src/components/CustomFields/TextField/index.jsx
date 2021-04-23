import React, { Fragment } from 'react';
import { ErrorMessage, useField } from 'formik';

import './styles.scss';

function TextField({ label, width, height, labelColor, backgroundColor, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="text-field">
      { label && (
        <Fragment>
          <label style={{ color: labelColor }} className="text-field__label" htmlFor={field.name}>{label}</label><br />
        </Fragment>)}
      < input
        className={`text-field__input ${meta.touched && meta.error && 'text-field__invalid'}`}
        {...field}
        {...props}
        style={{ width, height, backgroundColor }}
        autoComplete="off"
      />
      <ErrorMessage name={field.name} component="div" className="text-field__error" />
    </div>
  );
}

export default TextField;
