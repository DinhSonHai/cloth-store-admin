import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { addProduct, editProduct } from '../../redux/actions/products';
import Spinner from '../Spinner';
import TextField from '../CustomFields/TextField';
import './styles.scss';
import TextAreaField from '../CustomFields/TextAreaField';
import SingleSelectBox from '../CustomFields/SingleSelectBox';
import MultiSelectBox from '../CustomFields/MultiSelectBox';
import AddPhotoField from '../CustomFields/AddPhotoField';
import { getProductById } from '../../redux/actions/products';
import { getAllCategories } from '../../redux/actions/categories';
import { getAllSizes } from '../../redux/actions/sizes';
import { getAllColors } from '../../redux/actions/colors';
import { getAllBrands } from '../../redux/actions/brands';

ProductForm.propTypes = {

};

function ProductForm({ product, categories, brands, sizes, colors, getProductById, getAllCategories, getAllBrands, getAllSizes, getAllColors, productId, editProduct }) {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [photoList, setPhotoList] = useState([]);

  const validate = Yup.object({
    name: Yup.string()
      .required('Please enter a valid name!'),
    categories: Yup.array()
      .min(1, 'Please select categories!'),
    brand: Yup.string()
      .required('Please select brand!'),
    price: Yup.number()
      .min(1, 'Price must be greater than or equal to 1')
      .required('Please enter a valid price!'),
    sizes: Yup.array()
      .min(1, 'Please select sizes!'),
    colors: Yup.array()
      .min(1, 'Please select colors!'),
    quantity: Yup.number()
      .min(1, 'Quantity must be greater than or equal to 1')
      .required('Please enter a valid quantity!'),
    description: Yup.string()
      .required('Please enter description')
  })

  const handleCancel = () => {
    // return history.push("/admin/products");
    return history.goBack();
  }

  useEffect(() => {
    async function getData() {
      if (productId) {
        setLoading(true);
        await getProductById(productId);
        setLoading(false);
      }
      getAllCategories();
      getAllBrands();
      getAllSizes();
      getAllColors();
    }

    getData();
  }, [getAllCategories, getAllBrands, getAllSizes, getAllColors, getProductById, productId]);
  return (
    <div className="product__form">

      { loading ? (<Spinner width="200px" />) : productId && product ? (
        <AddPhotoField photoList={photoList} setPhotoList={setPhotoList} photos={product.photos} />
      ) : (
        <AddPhotoField photoList={photoList} setPhotoList={setPhotoList} />
      )}
      {/* {auth?.error?.type === 'login' && (<p className="content__error">{auth.error.message}</p>)} */}
      {productId && product ? (
        <Formik
          enableReinitialize
          initialValues={{
            name: product.name,
            categories: product.categories.map(category => ({ value: category._id, label: category.categoryName })),
            brand: product.brandId._id,
            price: product.price,
            sizes: product.sizes.map(size => ({ value: size._id, label: size.sizeName })),
            colors: product.colors.map(color => ({ value: color._id, label: color.colorName })),
            quantity: product.quantity,
            description: product.description
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            const categories = values.categories.map(item => item.value);
            const sizes = values.sizes.map(item => item.value);
            const colors = values.colors.map(item => item.value);
            const photos = photoList.filter(photo => photo);

            async function sendData() {
              setLoading(true);
              const result = await editProduct({ ...values, categories, sizes, colors, brandId: values.brand, photos }, productId);
              setLoading(false);
              // console.log({ ...values, categories, sizes, colors, brandId: values.brand, photos });
              if (result) {
                return history.goBack();
              }
            }
            sendData();
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <TextField type="text" label="NAME" id="name" name="name" placeholder="Enter product name..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
              {categories.length > 0 && (
                <MultiSelectBox label="CATEGORIES" id="categories" name="categories" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={categories.map(category => ({ value: category._id, label: category.categoryName }))} defaultValue={product.categories.map(category => ({ value: category._id, label: category.categoryName }))} />
              )}
              {brands.length > 0 && <SingleSelectBox label="BRAND" id="brand" name="brand" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={brands.map(brand => ({ value: brand._id, label: brand.brand }))} defaultValue={{ value: product.brandId._id, label: product.brandId.brand }} />}
              <TextField type="number" label="PRICE($)" id="price" name="price" placeholder="Enter product price..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
              {sizes.length > 0 && (
                <MultiSelectBox label="SIZE" id="sizes" name="sizes" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={sizes.map(size => ({ value: size._id, label: size.sizeName }))} defaultValue={product.sizes.map(size => ({ value: size._id, label: size.sizeName }))} />
              )}
              {colors.length > 0 && (
                <MultiSelectBox label="COLOR" id="colors" name="colors" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={colors.map(color => ({ value: color._id, label: color.colorName }))} defaultValue={product.colors.map(color => ({ value: color._id, label: color.colorName }))} />
              )}
              <TextField type="number" label="QUANTITY" id="quantity" name="quantity" placeholder="Enter product quantity..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
              <TextAreaField label="DESCRIPTION" id="description" name="description" placeholder="Add product description..." width={"803px"} height={"112px"} backgroundColor={"var(--white)"} />

              <div className="button">
                <button type="button" onClick={handleCancel} className="button__cancel">Cancel</button>
                <button type="submit" className="button__complete" disabled={!formik.isValid} >
                  {loading && <span className="spinner"><Spinner width="49px" /></span>}
                  Complete
              </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
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
          onSubmit={(values) => {
            const categories = values.categories.map(item => item.value);
            const sizes = values.sizes.map(item => item.value);
            const colors = values.colors.map(item => item.value);
            const photos = photoList.filter(photo => photo);
            async function sendData() {
              setLoading(true);
              const result = await addProduct({ ...values, categories, sizes, colors, brandId: values.brand, photos });
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
              {categories.length > 0 && (
                <MultiSelectBox label="CATEGORIES" id="categories" name="categories" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={categories.map(category => ({ value: category._id, label: category.categoryName }))} />
              )}
              {brands.length > 0 && <SingleSelectBox label="BRAND" id="brand" name="brand" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={brands.map(brand => ({ value: brand._id, label: brand.brand }))} />}
              <TextField type="number" label="PRICE($)" id="price" name="price" placeholder="Enter product price..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
              {sizes.length > 0 && (
                <MultiSelectBox label="SIZE" id="sizes" name="sizes" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={sizes.map(size => ({ value: size._id, label: size.sizeName }))} />
              )}
              {colors.length > 0 && (
                <MultiSelectBox label="COLOR" id="colors" name="colors" width={"803px"} height={"48px"} backgroundColor={"var(--white)"} options={colors.map(color => ({ value: color._id, label: color.colorName }))} />
              )}
              <TextField type="number" label="QUANTITY" id="quantity" name="quantity" placeholder="Enter product quantity..." width={"803px"} height={"48px"} backgroundColor={"var(--white)"} />
              <TextAreaField label="DESCRIPTION" id="description" name="description" placeholder="Add product description..." width={"803px"} height={"112px"} backgroundColor={"var(--white)"} />

              <div className="button">
                <button type="button" onClick={handleCancel} className="button__cancel">Cancel</button>
                <button type="submit" className="button__complete" disabled={!formik.isValid} >
                  {loading && <span className="spinner"><Spinner width="49px" /></span>}
                  Complete
                  </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}


const mapStateToProps = (state) => ({
  product: state.products.product,
  categories: state.categories.categories,
  brands: state.brands.brands,
  sizes: state.sizes.sizes,
  colors: state.colors.colors
});

export default connect(mapStateToProps, { getAllCategories, getAllBrands, getAllSizes, getAllColors, getProductById, editProduct })(ProductForm);