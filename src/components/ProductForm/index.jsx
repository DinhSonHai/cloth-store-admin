import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { addProduct } from '../../redux/actions/products';
import Spinner from '../Spinner';
import TextField from '../CustomFields/TextField';
import './styles.scss';
import TextAreaField from '../CustomFields/TextAreaField';
import SingleSelectBox from '../CustomFields/SingleSelectBox';
import MultiSelectBox from '../CustomFields/MultiSelectBox';

ProductForm.propTypes = {

};

function ProductForm({ categoriesData, brandsData, sizesData, colorsData, photoList }) {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const validate = Yup.object({
    name: Yup.string()
      .required('Please enter a valid name!'),
    categories: Yup.array()
      .min(1, 'Please select categories!'),
    brand: Yup.string()
      .required('Please select brand!'),
    price: Yup.number()
      .required('Please enter a valid price!'),
    sizes: Yup.array()
      .min(1, 'Please select sizes!'),
    colors: Yup.array()
      .min(1, 'Please select colors!'),
    quantity: Yup.number()
      .required('Please enter a valid quantity!'),
    description: Yup.string()
      .required('Please enter description')
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
        validationSchema={validate}
        onSubmit={values => {
          const categories = values.categories.map(item => item.value);
          const sizes = values.sizes.map(item => item.value);
          const colors = values.colors.map(item => item.value);
          async function sendData() {
            setLoading(true);
            const result = await addProduct({ ...values, categories, sizes, colors, brandId: values.brand, photos: photoList });
            setLoading(false);
            if (result) {
              return history.push("/admin/products");
            }
          }
          sendData();
        }}
        validateOnMount
      >
        {formik => (
          <Form className="content__form">
            <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter product name..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <MultiSelectBox label="CATEGORIES" id="categories" name="categories" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={categoriesData.map(category => ({ value: category._id, label: category.categoryName }))} />
            <SingleSelectBox label="BRAND" id="brand" name="brand" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={brandsData.map(brand => ({ value: brand._id, label: brand.brand }))} />
            <TextField type="number" label="PRICE($)" id="price" name="price" placeholder="Enter product price..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
            <MultiSelectBox label="SIZE" id="sizes" name="sizes" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={sizesData.map(size => ({ value: size._id, label: size.sizeName }))} />
            <MultiSelectBox label="COLOR" id="colors" name="colors" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={colorsData.map(color => ({ value: color._id, label: color.colorName }))} />
            <TextField type="number" label="QUANTITY" id="quantity" name="quantity" placeholder="Enter product quantity..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
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