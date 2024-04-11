import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function DeleteModal({ onHideHandler, onShow, confirmDeleteHandler }) {
  return (
    <Modal
      show={onShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Delete!!!</h4>
        <p>Are you sure you want to delete this product</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={confirmDeleteHandler}>
          Confirm
        </Button>
        <Button variant="dark" onClick={onHideHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
