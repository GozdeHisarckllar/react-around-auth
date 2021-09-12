import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { inputElementErrorClassName, errorClassName } from "../utils/constants";

const Login = ({ onSetAccount }) => {
    const {
        values, 
        errors, 
        isFormValid, 
        handleChange, 
        resetFormValidation, 
        setValues
      } = useFormAndValidation();

    useEffect(() => {
        onSetAccount("Sign up");
    });

    return(
        <div className="auth-container">
        <form action="#" className="form form_type_auth" name="sign-up">
          <fieldset className="form__input-container form__input-container_type_auth">
            <legend className="form__caption form__caption_type_auth">Log in</legend>
            <label className="form__label">
            <input type="email" className={`form__item form__item_el_email ${errors['email']? inputElementErrorClassName:''}`} 
              value={values['email'] || ''} onChange={handleChange} id="email-input" name="email" placeholder="Email" required/>
            <span className={`form__input-error email-input-error ${errors['email']? errorClassName:''}`}>{errors['email']}</span>
          </label>
          <label className="form__label">
            <input type="password" className={`form__item form__item_el_password ${errors['password']? inputElementErrorClassName:''}`} 
              value={values['password'] || ''} onChange={handleChange} id="password-input" name="password" placeholder="Password" minLength="6" maxLength="20" required/>
            <span className={`form__input-error password-input-error ${errors['password']? errorClassName:''}`}>{errors['password']}</span>
          </label>
              <button type="submit" className={`form__button form__button_type_auth ${!isFormValid?'form__button_disabled':''}`} 
                disabled={!isFormValid && true}>Log in</button>
              <NavLink to="/signup" className="form__auth-redirect">Already a member? Sign up here!</NavLink>
          </fieldset>
        </form>  
      </div>
    );
}

export default Login;