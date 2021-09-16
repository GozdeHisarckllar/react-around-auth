import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { inputElementErrorClassName, errorClassName } from '../utils/constants';


const Register = ({ onRegister, onSetAccountState }) => {
  //{"error":"User with this email address already exists"}
//data: {_id: "614249d767c0c800131e97a5", email: "gozde@mail.com"} practicum
// example@mail.com  practicum
//{"data":{"_id":"61424e9c67c0c800131e97be","email":"example@gmail.com"}} practicum
// gozde@gmail.com  practicum
// gozde@example1.com -4
  const {
    values, 
    errors, 
    isFormValid, 
    handleChange, 
    resetFormValidation, 
    setValues
  } = useFormAndValidation();

  useEffect(() => {
    onSetAccountState("Log in");
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = values;
    onRegister(password, email);
  }

  return(
    <div className="auth-container">
      <form action="#" onSubmit={handleSubmit} className="form form_type_auth" name="sign-up">
        <fieldset className="form__input-container form__input-container_type_auth">
          <legend className="form__caption form__caption_type_auth">Sign up</legend>
          <label className="form__label form__label_type_auth">
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
              disabled={!isFormValid && true}>Sign up</button>
            <Link to="/signin" className="form__auth-redirect hover-effect">Already a member? Log in here!</Link>
        </fieldset>
      </form>  
    </div>
  );
}

export default Register;