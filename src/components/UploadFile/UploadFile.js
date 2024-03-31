import React, { useRef, useState, useEffect, useContext } from 'react';
import * as pdfjs from 'pdfjs-dist/build/pdf';

import './UploadFile.scss';

import { ImageConfig } from './config/ImageConfig';
import uploadImg from './config/cloud-upload-regular-240.png';
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// Set the worker script URL
pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js';

const UploadFile = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const [apiPageCount, setApiPageCount] = useState(null);
  const [filePageCount, setFilePageCount] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [showPrintPopup, setShowPrintPopup] = useState(false);
  const [isRedirectToPagePurchase, setIsRedirectToPagePurchase] = useState(false);

  const [loadingUpload, setLoadingUpload] = useState(false);


  useEffect(() => {
    const fetchApiForPageCount = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint to fetch the page count
        console.log(user.account.codeId)
        const response = await fetch(
          'https://localhost:7280/api/PagePurchase/get-page-count?codeId=' + user.account.codeId
          //'https://localhost:7280/api/PagePurchase/get-page-count?codeId=2233223'
        );
        const data = await response.json();
        setApiPageCount(data.response.pageCount); // Adjust the property accordingly based on your API response
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };
    fetchApiForPageCount();
  }, [apiPageCount])

  const handleFileChange = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        try {
          const pdf = await pdfjs.getDocument(typedarray).promise;
          const pageCount = pdf.numPages;
          setFilePageCount(pageCount);
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (fileList.length < 1) { // Set the limit to 5 files, change as needed
      handleFileChange(newFile);
      if (newFile) {
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        props.onFileChange(updatedList);
      }
    }
    else {
      alert('You can only upload up to 1 files.');
    }
  }

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    setFilePageCount(null);
    props.onFileChange(updatedList);
  }

  const handleUpload = async () => {
    try {
      if (!fileList) {
        console.error('No file selected');
        return;
      }

      setLoadingUpload(true); // Set loading to true when upload starts

      const formData = new FormData();
      formData.append('fileData', fileList[0]);

      let response = await fetch('http://localhost:5193/api/Files/PostSingleFile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result);

        setFileContent(result.response.fileData);
        setShowPrintPopup(true); // Open the print popup after successful upload
      } else {
        console.error('Failed to upload file:', response);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      setLoadingUpload(false); // Set loading to false after upload attempt
    }
  };


  const closePrintPopup = () => {
    setShowPrintPopup(false);
  };

  const printFile = async () => {
    // Implement printing logic here
    // For demonstration purposes, you can use window.print()
    // window.print();
    toast.success('Print success');
    let updatedPage = apiPageCount - filePageCount;
    const res = await fetch('https://localhost:7280/api/PagePurchase/update-page-count?codeId=' + user.account.codeId + '&pageCount=' + updatedPage, { method: 'POST' })
    if (res) {
      setApiPageCount(updatedPage)
    }
    // if(res.json())
  };

  const redirectToPagePurchase = () => {
    console.log('ssss')
    navigate("/purchase");
  }

  return (
    <>
      <div className='upload-container'>
        <p style={{ fontSize: '18px' }}>Số trang giấy còn lại: {apiPageCount}</p>
        <p style={{ fontSize: '18px' }}>Số trang giấy cần in: {filePageCount}</p>
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input__label">
            <img src={uploadImg} alt="" />
            <p>Drag & Drop your files here</p>
          </div>
          <input type="file" value="" accept=".pdf" onChange={onFileDrop} />
        </div>
        {
          fileList.length > 0 ? (
            <div className="drop-file-preview">
              <p className="drop-file-preview__title">
                Ready to upload
              </p>
              {
                fileList.map((item, index) => (
                  <div key={index} className="drop-file-preview__item">
                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                    <div className="drop-file-preview__item__info">
                      <p>{item.name}</p>
                      <p>{item.size} Byte</p>
                    </div>

                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                  </div>
                ))
              }
              {apiPageCount < filePageCount ?
                <div>
                  <p>
                    Số trang in hiện tải của bạn không đủ, vui lòng chuyển đến trang thanh toán
                  </p>
                  <button className="drop-file-preview__item__upl" onClick={redirectToPagePurchase} disabled={!fileList}>
                    Chuyển đến trang thanh toán
                  </button>
                </div>
                :
                <button className="drop-file-preview__item__upl" onClick={handleUpload} disabled={!fileList}>
                  {loadingUpload ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    'Upload File'
                  )}
                </button>
              }

            </div>

          ) : null
        }

        {showPrintPopup && !isRedirectToPagePurchase && (
          <div className="print-popup">
            <div className='btn-group'>
              <button className="btn btn-success btn-print-close" onClick={printFile}>Print</button>
              <button className="btn btn-secondary btn-print-close" onClick={closePrintPopup}>Close</button>
            </div>
            <p>File Content:</p>
            {/* Use an iframe to render the file content */}
            <iframe
              title="File Content"
              width="100%"
              height="1000px"
              src={`data:application/pdf;base64,${fileContent}`}
            />

          </div>
        )}
      </div>
    </>
  );
}

export default UploadFile;