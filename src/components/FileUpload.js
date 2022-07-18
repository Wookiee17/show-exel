import React from "react";
import { Button } from "react-bootstrap";
import "../styles/fileUpload.css";
import * as XLSX from "xlsx";
import { EXCEL_FILE_FORMAT } from "../constants/fileConstants";

const FileUpload = (props) => {
  const { setFileData, setColumnHeaders } = props;
  const [fileError, setFileError] = React.useState(false);
  const hiddenFileInput = React.useRef(null);

  const handleDataImport = () => {
    hiddenFileInput.current.click();
  };

  const transformJson = (sheetData) => {
    const sheetHeaders = sheetData[0];
    setColumnHeaders(sheetHeaders);
    const transformedData = [...sheetData].slice(1).map((data) => {
      const orderItem = {};
      for (let iterate = 0; iterate < sheetHeaders.length; iterate++) {
        orderItem[sheetHeaders[iterate]] = data[iterate];
      }
      return orderItem;
    });
    return transformedData;
  };

  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile.type === EXCEL_FILE_FORMAT) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        let readData = XLSX.read(data, { type: "binary" });
        const sheet = readData.SheetNames[0];
        const currentSheet = readData.Sheets[sheet];
        const dataParse = XLSX.utils.sheet_to_json(currentSheet, { header: 1 });
        const trasnformedData = transformJson(dataParse);
        setFileData(trasnformedData);
      };
      reader.readAsBinaryString(uploadedFile);
      return;
    }
    setFileError(true);
  };

  return (
    <>
      <div className="fileUploadContainer">
        <p style={{ fontSize: 18, marginBottom: "unset" }}>
          Upload the Excel File
        </p>
        <Button className="fileUploadBtn" onClick={handleDataImport}>
          Select & Upload
        </Button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      {fileError && (
        <p style={{ color: "red" }} className="mt-2">
          <strong>Error</strong> : Please upload only excel files.
        </p>
      )}
    </>
  );
};

export default FileUpload;
