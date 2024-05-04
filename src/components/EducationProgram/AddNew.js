import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getMajorList } from '../../services/MajorService';
import { getSubjectList } from '../../services/SubjectsService';
import { getSubjectGroupList } from '../../services/SubjectGroupsService';

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

  const [listMajor, setListMajor] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedMajorName, setSelectedMajorName] = useState('');

  const [listSubject, setListSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [soTC, setSoTC] = useState('');

  const [listSubjectGroup, setListSubjectGroup] = useState([]);
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState('');

  const [selectedIsCompulsory, setSelectedIsCompulsory] = useState('');

  useEffect(() => {
    getMajorList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            NganhId: item.data.MaNganh,
            TenNganh: item.data.TenNganh,
            MaKhoa: item.data.MaKhoa,
          };
        });
        setListMajor(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Major list', error);
      });
  }, []);

  useEffect(() => {
    getSubjectList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaMonHoc: item.data.MaMonHoc,
            TenMonHoc: item.data.TenMonHoc,
            SoTC: item.data.SoTC,
          };
        });
        setListSubject(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Subject list', error);
      });
  }, []);

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

  const handleInputChange = (fieldName, value) => {
    // setSelectedTenCS(listFaculty.find(Faculty => Faculty.id === value).TenCS);
    setInputValues({ ...inputValues, [fieldName]: value });
  };

  const handleSelectMajor = (value) => {
    if (value) {
      const MajorId = listMajor.find((Major) => Major.id === value).NganhId;
      setSelectedMajor(MajorId);
      const MajorName = listMajor.find((Major) => Major.id === value).TenNganh;
      setSelectedMajorName(MajorName);
      setInputValues({
        ...inputValues,
        NganhId: MajorId,
        TenNganh: MajorName,
      });
    } else {
      setInputValues({ ...inputValues, NganhId: '', TenNganh: '' });
    }
  };

  const handleSelectSubject = (value) => {
    if (value) {
      const SubjectId = listSubject.find((Subject) => Subject.id === value).MaMonHoc;
      setSelectedSubject(SubjectId);
      const SubjectName = listSubject.find((Subject) => Subject.id === value).TenMonHoc;
      setSelectedSubjectName(SubjectName);
      const SoTC = listSubject.find((Subject) => Subject.id === value).SoTC;
      setSoTC(SoTC);
      setInputValues({
        ...inputValues,
        MaMonHoc: SubjectId,
        TenMonHoc: SubjectName,
        SoTC: SoTC,
      });
    } else {
      setInputValues({ ...inputValues, NganhId: '', TenNganh: '', SoTC: '' });
    }
  };

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

  const handleSaveFunc = async () => {
    try {
      console.log(inputValues);
      const res = await createApi(inputValues);
      if (res && res.response) {
        handleClose();
        setInputValues({});
        setSelectedMajor('');
        setSelectedMajorName('');
        setSelectedSubject('');
        setSelectedSubjectName('');
        setSoTC('');
        setSelectedSubjectGroup('');
        setSelectedIsCompulsory('');
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
              if (field.name === 'NganhId') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Ngành</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectMajor(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {listMajor.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.NganhId}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (field.name === 'MaMonHoc') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Môn Học</label>
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
              } else if (field.name === 'GroupId') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Nhóm Môn Học</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectSubjectGroup(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {listSubjectGroup.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.GroupId}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (field.name === 'IsCompulsory') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Có Bắt Buộc Không</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectIsCompulsory(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
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
