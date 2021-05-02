import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import { ErrorMessage, Field } from 'formik';

import './styles.scss';

MultiSelectBox.propTypes = {

};

function MultiSelectBox({ id, name, label, width, height, labelColor, backgroundColor, options, defaultValue, ...props }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (styles) => ({
      width,
      height,
      backgroundColor,
      border: 'none',
      display: 'flex',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1.43',
      color: 'var(--charcoal-grey)',
      padding: "6px"
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
    }),
    placeholder: (styles) => ({ color: "rgba(77, 77, 77, 0.5)" })
  }

  const handleChange = (option, setFieldValue) => {
    setSelectedOption(option);
    setFieldValue(name, option);
  }

  return (
    <Field id={id} name={name}>
      {({ field, form: { setFieldValue } }) => (
        <div className="multi-select-box">
          { label && (
            <Fragment>
              <label style={{ color: labelColor }} className="multi-select-box__label" htmlFor={name}>{label}</label>
            </Fragment>)}
          {/* {  console.log(defaultValue)} */}
          <Select
            className="multi-select-box__select"
            {...field}
            {...props}
            isMulti
            value={selectedOption || defaultValue}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
            options={options}
            onChange={option => handleChange(option, setFieldValue)}
          />
          <ErrorMessage name={name} component="div" className="multi-select-box__error" />
        </div>
      )}
    </Field>
  )
}

export default MultiSelectBox;
