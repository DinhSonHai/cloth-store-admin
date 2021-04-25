import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
// import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import TextField from '../CustomFields/TextField';
import './styles.scss';
import TextAreaField from '../CustomFields/TextAreaField';
import SingleSelectBox from '../CustomFields/SingleSelectBox';
import MultiSelectBox from '../CustomFields/MultiSelectBox';

ProductForm.propTypes = {

};

function ProductForm(props) {
  const [loading, setLoading] = useState(false);

  const validate = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email!')
      .required('Please enter a valid email!'),
    password: Yup.string()
      .min(6, 'Your passwords must be more than 6 characters!')
      .required('Please enter a valid password!')
  })

  return (
    <div className="product__form">
      {/* {auth?.error?.type === 'login' && (<p className="content__error">{auth.error.message}</p>)} */}
      <Formik
        initialValues={{
          name: '',
          categories: [],
          brand: '',
          price: '',
          sizes: [],
          colors: [],
          quantity: '',
          description: ''
        }}
        // validationSchema={validate}
        onSubmit={values => {
          setLoading(true);
          const categories = values.categories.map(item => item.value)
          console.log(categories);
          // login(values, hideLogin);
          console.log(values);
          setLoading(false);
        }}
      // validateOnMount
      >
        {formik => (
          <Form className="content__form">
            <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter product name..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <SingleSelectBox label="BRAND" id="brand" name="brand" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <MultiSelectBox label="CATEGORIES" id="categories" name="categories" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <TextField type="text" label="PRICE($)" id="price" name="price" placeholder="Enter product price..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <TextField type="text" label="QUANTITY" id="quantity" name="quantity" placeholder="Enter product quantity..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <TextAreaField label="DESCRIPTION" id="description" name="description" placeholder="Add product description..." width={"803px"} height={"112px"} backgroundColor={"var(--white)"} />
            <div className="button">
              <button className="button__cancel">Cancel</button>
              <button type="submit" className="button__complete" disabled={!formik.isValid} >
                {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Complete
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductForm;