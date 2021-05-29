import { Fragment } from 'react';
import ReactDOM from 'react-dom'
import classes from './Modal.module.css';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onHide} />
};

const ModalView = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};

const Modal = props => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onHide={props.onHide} />,document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalView>{props.children}</ModalView>,document.getElementById('overlays'))}
    </Fragment>
}


export default Modal;