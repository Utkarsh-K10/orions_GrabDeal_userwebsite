import React from 'react';
import './Modal.css';

import {ImCancelCircle} from 'react-icons/im';



function Modal({open,children, onClose}){
    if(!open){
        return null
    }





    return(
        <div className="ModalBackground"  >
            <div className="PortalModalBg" >
            <button onClick={onClose} className="CloseBtn"><ImCancelCircle className="back"/></button>
            {children}
        </div>
            
        </div>
        
    )
}

export default Modal;