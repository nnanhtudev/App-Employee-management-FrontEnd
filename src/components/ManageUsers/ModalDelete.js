import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure this delete user: {props.dataModel.email} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDelete