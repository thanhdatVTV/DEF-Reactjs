import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getSubjectList } from '../../services/SubjectsService';

const ModalAddNew = (props) => {
  const {
    show,
    handleClose,
    createApi,
    handleUpdateTable,
    title,
    buttonText,
    successMessage,
    errorMessage,
    inputFields,
  } = props;
  const [inputValues, setInputValues] = useState({});

  const [listSubject, setListSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    getSubjectList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaMonHoc: item.data.MaMonHoc,
          };
        });
        setListSubject(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Subject list', error);
      });
  }, []);

  const handleSelectSubject = (value) => {
    if (value) {
      const SubjectId = listSubject.find((Subject) => Subject.id === value).MaMonHoc;
      setSelectedSubject(SubjectId);
      setInputValues({
        ...inputValues,
        PrerequisiteCourseID: SubjectId,
      });
    } else {
      setInputValues({ ...inputValues, PrerequisiteCourseID: '' });
    }
  };

  const handleInputChange = (fieldName, value) => {
    // setSelectedTenCS(listFaculty.find(Faculty => Faculty.id === value).TenCS);
    setInputValues({ ...inputValues, [fieldName]: value });
  };

  const handleSaveFunc = async () => {
    try {
      console.log(inputValues);
      const res = await createApi(inputValues);
      if (res && res.response) {
        handleClose();
        setInputValues({});
        // setSelectedMajor('');
        // setSelectedMajorName('');
        setSelectedSubject('');
        // setSelectedSubjectName('');
        // setSoTC('');
        // setSelectedSubjectGroup('');
        // setSelectedIsCompulsory('');
        toast.success(successMessage);
        handleUpdateTable();
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {inputFields.map((field, index) => {
              if (field.name === 'PrerequisiteCourseID') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Môn Học Tiên Quyết</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectSubject(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {listSubject.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.MaMonHoc}
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
                    />
                  </div>
                );
              }
            })}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveFunc}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
