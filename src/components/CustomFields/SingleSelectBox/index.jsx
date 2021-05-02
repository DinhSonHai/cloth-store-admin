import React, { Fragment, useState } from 'react';
import Select from 'react-select';
import { ErrorMessage, Field } from 'formik';

import './styles.scss';

SingleSelectBox.propTypes = {

};

function SingleSelectBox({ id, name, label, width, height, labelColor, backgroundColor, options, defaultValue, ...props }) {
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
    // singleValue: (styles) => ({ color: "rgba(77, 77, 77, 0.5)" })
  }

  const handleChange = (option, setFieldValue) => {
    setSelectedOption(option);
    setFieldValue(name, option.value);
  }

  // useEffect(() => {
  //   if (!(defaultValue?.value !== selectedOption?.value)) {
  //     setSelectedOption(defaultValue);
  //   }
  // }, [defaultValue, selectedOption]);

  return (
    <Field id={id} name={name}>
      {({ field, form: { setFieldValue } }) => (
        <div className="single-select-box">
          { label && (
            <Fragment>
              <label style={{ color: labelColor }} className="single-select-box__label" htmlFor={name}>{label}</label>
            </Fragment>)}
          <Select
            {...field}
            {...props}
            // defaultValue={defaultValue}
            value={selectedOption || defaultValue}
            isSearchable={false}
            isClearable={false}
            options={options}
            styles={customStyles}
            onChange={option => handleChange(option, setFieldValue)}
          />
          <ErrorMessage name={name} component="div" className="single-select-box__error" />
        </div>
      )}
    </Field>
  )
}

export default SingleSelectBox;
