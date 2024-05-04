import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { getSubjectGroupList } from '../../services/SubjectGroupsService';

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

  const [listSubjectGroup, setListSubjectGroup] = useState([]);
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState('');

  const [selectedIsCompulsory, setSelectedIsCompulsory] = useState('');

  useEffect(() => {
    getSubjectGroupList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            GroupId: item.data.SubjectGroupID,
          };
        });
        setListSubjectGroup(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Subject Group list', error);
      });
  }, []);

  const handleSelectSubjectGroup = (value) => {
    if (value) {
      const SubjectGroupId = listSubjectGroup.find(
        (SubjectGroup) => SubjectGroup.id === value
      ).GroupId;
      setSelectedSubjectGroup(SubjectGroupId);
      setInputValues({
        ...inputValues,
        GroupId: SubjectGroupId,
      });
    } else {
      setInputValues({ ...inputValues, GroupId: '' });
    }
  };

  const handleSelectIsCompulsory = (value) => {
    if (value) {
      setSelectedIsCompulsory(value);
      setInputValues({
        ...inputValues,
        IsCompulsory: value,
      });
    } else {
      setInputValues({ ...inputValues, IsCompulsory: '' });
    }
  };

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
              if (field.name === 'IsCompulsory') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Có bắt buộc không</label>
                    <select
                      className="form-select"
                      // value={selectedCoSo}
                      onChange={(event) => {
                        // setSelectedCoSo(event.target.value);
                        handleSelectIsCompulsory(event.target.value);
                      }}
                    >
                      <option></option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  </div>
                );
              } else if (field.name === 'GroupId') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn nhóm môn học</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectSubjectGroup(event.target.value);
                      }}
                    >
                      {listSubjectGroup.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.GroupId}
                        </option>
                      ))}
                    </select>
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
                      readOnly
                    />
                  </div>
                );
              }
            })}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEdit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
