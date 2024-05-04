import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getCoSoList } from '../../services/CoSoService';
import { getBuildingList } from '../../services/BuildingService';
import { getRoomList } from '../../services/RoomService';
import { getNhomLopList } from '../../services/NhomLopService';
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

  const [listCoSo, setListCoSo] = useState([]);
  const [selectedCoSo, setSelectedCoSo] = useState('');

  const [listBuilding, setListBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [record, setRecord] = useState(listBuilding);

  const [listRoom, setListRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [recordRoom, setRecordRoom] = useState(listRoom);

  const [listNhomLop, setListNhomLop] = useState([]);
  const [selectedNhomLop, setSelectedNhomLop] = useState('');

  const [listSubject, setListSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    getCoSoList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaCS: item.data.MaCS,
          };
        });
        setListCoSo(dataList);
      })
      .catch((error) => {
        console.error('Error fetching CoSo list', error);
      });
  }, []);

  useEffect(() => {
    getBuildingList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaTN: item.data.MaTN,
            MaCS: item.data.CoSoId,
          };
        });
        setListBuilding(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Building list', error);
      });
  }, []);

  useEffect(() => {
    getRoomList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaTN: item.data.ToaNhaId,
            MaPhong: item.data.MaPhong,
          };
        });
        console.log(dataList);
        setListRoom(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Room list', error);
      });
  }, []);

  useEffect(() => {
    getNhomLopList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaNhom: item.data.MaNhom,
          };
        });
        console.log(dataList);
        setListNhomLop(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Nhom Lop list', error);
      });
  }, []);

  useEffect(() => {
    getSubjectList('', 1, 4)
      .then((response) => {
        const dataList = response.response.map((item) => {
          return {
            id: item.id,
            MaMonHoc: item.data.MaMonHoc,
          };
        });
        console.log(dataList);
        setListSubject(dataList);
      })
      .catch((error) => {
        console.error('Error fetching Subject list', error);
      });
  }, []);

  const handleSelectBuilding = (value) => {
    if (value) {
      const BuildingId = listBuilding.find((Subject) => Subject.id === value).MaTN;
      setSelectedCoSo(BuildingId);
      setRecordRoom(listRoom.filter((item) => item.MaTN === BuildingId));
      console.log(listRoom);
      console.log(BuildingId);
      console.log(recordRoom);
      setInputValues({
        ...inputValues,
        MaTN: BuildingId,
      });
    } else {
      setInputValues({ ...inputValues, MaTN: '' });
    }
  };

  const handleSelectCoSo = (value) => {
    if (value) {
      const CoSoId = listCoSo.find((Subject) => Subject.id === value).MaCS;
      setSelectedCoSo(CoSoId);
      setRecord(listBuilding.filter((item) => item.MaCS === CoSoId));
      setInputValues({
        ...inputValues,
        MaCS: CoSoId,
      });
    } else {
      setInputValues({ ...inputValues, MaCS: '' });
    }
  };

  const handleSelectRoom = (value) => {
    if (value) {
      const RoomId = listRoom.find((Subject) => Subject.id === value).MaPhong;
      setSelectedCoSo(RoomId);
      setInputValues({
        ...inputValues,
        MaPhong: RoomId,
      });
    } else {
      setInputValues({ ...inputValues, MaPhong: '' });
    }
  };

  const handleSelectNhomLop = (value) => {
    if (value) {
      const NhomLopId = listNhomLop.find((Subject) => Subject.id === value).MaNhom;
      setSelectedNhomLop(NhomLopId);
      setInputValues({
        ...inputValues,
        MaNhom: NhomLopId,
      });
    } else {
      setInputValues({ ...inputValues, MaNhom: '' });
    }
  };

  const handleSelectSubject = (value) => {
    if (value) {
      const SubjectId = listSubject.find((Subject) => Subject.id === value).MaMonHoc;
      setSelectedSubject(SubjectId);
      setInputValues({
        ...inputValues,
        PhanCongMonHocId: SubjectId,
      });
    } else {
      setInputValues({ ...inputValues, PhanCongMonHocId: '' });
    }
  };

  const handleSelectTestSchedule = (value) => {
    setInputValues({ ...inputValues, TenLichThi: value });
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
        setSelectedCoSo('');
        setSelectedBuilding('');
        setSelectedRoom('');
        setSelectedNhomLop('');
        setSelectedSubject('');
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
              if (field.name === 'TenLichThi') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Lịch Thi</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectTestSchedule(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      <option value="thigiuaky">Thi giữa kỳ</option>
                      <option value="thicuoiky">Thi cuối kỳ</option>
                    </select>
                  </div>
                );
              } else if (field.name == 'PhanCongMonHocId') {
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
              } else if (field.name == 'MaCS') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Cơ Sở</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectCoSo(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {listCoSo.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.MaCS}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (field.name == 'MaTN') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Tòa Nhà</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectBuilding(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {record.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.MaTN}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (field.name == 'MaPhong') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Phòng</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectRoom(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {recordRoom.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.MaPhong}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (field.name == 'MaNhom') {
                return (
                  <div key={index} className="mb-3">
                    <label className="form-label">Chọn Nhóm Lớp</label>
                    <select
                      className="form-select"
                      // value={selectedFaculty}
                      onChange={(event) => {
                        // setSelectedFaculty(event.target.value);
                        handleSelectNhomLop(event.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {listNhomLop.map((Major) => (
                        <option key={Major.id} value={Major.id}>
                          {Major.MaNhom}
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
