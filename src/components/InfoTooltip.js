import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

const InfoTooltip = ({ isOpen, isAuthSuccess, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'modal_opened': ''}`}>
      <div className="modal__container modal__container_type_info">
        <div className="info-tool">
          <img className="info-tool__icon" src={isAuthSuccess?successIcon:failIcon} alt={isAuthSuccess?'sucess icon': 'fail icon'} />
          <p className="info-tool__text">{isAuthSuccess? 'Success! You have now been registered.': 'Oops, something went wrong! Please try again.'}</p>
        </div>
        
        <button onClick={onClose} className="modal__close-btn modal__close-btn_type_info hover-effect" aria-label="Close" type="button"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;