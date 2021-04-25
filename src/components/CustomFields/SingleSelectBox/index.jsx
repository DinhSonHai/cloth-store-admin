import React, { Fragment } from 'react';
import Select from 'react-select';
import { ErrorMessage, useField, Field } from 'formik';

import './styles.scss';

SingleSelectBox.propTypes = {

};

function SingleSelectBox({ id, name, label, width, height, labelColor, backgroundColor, options, ...props }) {
  const customStyles = {
    control: (styles) => ({
      width,
      height,
      backgroundColor,
      border: 'none',
      display: 'flex',
      fontSize: '14px',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.43',
      letterSpacing: 'normal',
      color: 'var(--charcoal-grey)'
    }),
    option: (styles) => ({
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '16px',
      width,
      height,
      backgroundColor,
      fontSize: '14px',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.43',
      letterSpacing: 'normal',
      color: 'var(--charcoal-grey)'
    })
  }
  return (
    <Field id={id} name={name}>
      {({ field, form: { setFieldValue } }) => (
        <div className="single-select-box">
          { label && (
            <Fragment>
              <label style={{ color: labelColor }} className="single-select-box__label" htmlFor={name}>{label}</label>
            </Fragment>)}
          <Select
            className="single-select-box__select"
            {...field}
            {...props}
            value={{ value: 'default', label: 'Select brand...' }}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
            options={options}
            onChange={option => setFieldValue(name, option.value)}
          />
          <ErrorMessage name={name} component="div" className="single-select-box__error" />
        </div>
      )}
    </Field>
  )
}

export default SingleSelectBox;