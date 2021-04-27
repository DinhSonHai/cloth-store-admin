import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Wrapper from '../../components/Wrapper';
import AddPhotoField from '../../components/CustomFields/AddPhotoField';
import './styles.scss';
import ProductForm from '../../components/ProductForm';
import { getProductById } from '../../redux/actions/products';
import { getAllCategories } from '../../redux/actions/categories';
import { getAllSizes } from '../../redux/actions/sizes';
import { getAllColors } from '../../redux/actions/colors';
import { getAllBrands } from '../../redux/actions/brands';

AddProductPage.propTypes = {

};

// function AddProductPage({ match, product, categories, brands, sizes, colors, getAllCategories, getAllBrands, getAllSizes, getAllColors, getProductById }) {
function AddProductPage({ match }) {
  const productId = match.params.productId;

  // const [photoList, setPhotoList] = useState([]);

  // useEffect(() => {
  //   if (productId) {
  //     getProductById(productId);
  //   }
  //   getAllCategories();
  //   getAllBrands();
  //   getAllSizes();
  //   getAllColors();
  // }, [productId]);

  return (
    <Wrapper>
      {productId ? (
        <Fragment>
          <ProductForm productId={productId} />
        </Fragment>
      ) : (
        <Fragment>
          <ProductForm />
        </Fragment>
      )}
    </Wrapper>
  );
}

// const mapStateToProps = (state) => ({
//   product: state.products.product,
//   categories: state.categories.categories,
//   brands: state.brands.brands,
//   sizes: state.sizes.sizes,
//   colors: state.colors.colors
// });

// export default connect(mapStateToProps, { getAllCategories, getAllBrands, getAllSizes, getAllColors, getProductById })(AddProductPage);
export default AddProductPage;