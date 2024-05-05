import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ModalEdit = (props) => {
  const {
    show,
    handleClose,
    dataEdit,
    updateApi,
    handleEditFromModal,
    title,
    successMessage,
    inputFields,
  } = props;
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (fieldName, value) => {
    setInputValues({ ...inputValues, [fieldName]: value });
  };

  const handleEdit = async () => {
    let res = await updateApi({ ...inputValues, Id: dataEdit.id });
    if (res) {
      //success
      handleEditFromModal({
        ...inputValues,
        Id: dataEdit.id,
      });
      handleClose();
      toast.success(successMessage);
    } else {
      //error
    }
    console.log(res);
  };

  useEffect(() => {
    if (show) {
      setInputValues({ ...dataEdit.data, Id: dataEdit.id });
    }
  }, [dataEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form>
                        {inputFields.map((field, index) => (
                            <div key={index} className="mb-3">
                                <label className="form-label">{field.label}</label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    value={inputValues[field.name] || ''}
                                    onChange={(event) => handleInputChange(field.name, event.target.value)}
                                />
                            </div>
                        ))}
                    </form> */}
          <form>
            {inputFields.map((field, index) => {
              if (field.name === 'SoTC') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      value={inputValues[field.name] || ''}
                      onChange={(event) => handleInputChange(field.name, event.target.value)}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      value={inputValues[field.name] || ''}
                      onChange={(event) => handleInputChange(field.name, event.target.value)}
                    // readOnly
                    />
                  </div>
                );
              }
            })}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleEdit()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
