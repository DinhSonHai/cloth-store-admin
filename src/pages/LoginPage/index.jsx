import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { login } from '../../redux/actions/auth';
import TextField from '../../components/CustomFields/TextField';
import { AdminLogo } from '../../assets/icons/index';
import './styles.scss';
import Spinner from '../../components/Spinner';

LoginPage.propTypes = {

};

function LoginPage({ auth, login }) {
  const history = useHistory();

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
    <div className="admin-login">
      <div className="logo">
        <AdminLogo />
      </div>
      <div className="form-login">
        <h1 className="form__title">Log In</h1>
        {auth.error && auth.error.type === 'login' && (<p className="content__error">{auth.error.message}</p>)}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validate}
          onSubmit={values => {
            async function handleLogin() {
              setLoading(true);
              const isSuccess = await login(values);
              setLoading(false);
              if (isSuccess) {
                history.push("/");
              }
            }
            handleLogin();
          }}
          validateOnMount
        >
          {formik => (
            <Form className="content__form">
              <p className="field__label">EMAIL</p>
              <TextField type="text" id="email" name="email" placeholder="Enter your email..." width={"316px"} height={"48px"} backgroundColor={"var(--white-two)"} />
              <p className="field__label">PASSWORD</p>
              <TextField type="password" id="password" name="password" placeholder="Enter your password..." width={"316px"} height={"48px"} backgroundColor={"var(--white-two)"} />

              <button type="submit" className="form__button" disabled={!formik.isValid} >
                {loading && <span className="spinner"><Spinner width="49px" /></span>}
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(LoginPage);