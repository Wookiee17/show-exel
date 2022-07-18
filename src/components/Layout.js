import React from "react";
import { Col, Container, Row, Stack, Table, Alert } from "react-bootstrap";
// import { dummyColumnHeaders, dummyData } from "../dummyData";
import FileUpload from "./FileUpload";
import "../styles/columnListItem.css";
import CustomBarChart from "./CustomBarChart";
import CustomLineChart from "./CustomLineChart";

const Layout = () => {
  const [fileData, setFileData] = React.useState();
  const [columnHeaders, setColumnHeaders] = React.useState();
  const [selectedColumnHeaders, setSelectedColumnHeaders] = React.useState([]);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (e, header) => {
    const DragCondition = selectedColumnHeaders.includes(header);
    if (DragCondition) {
      return e.preventDefault();
    }
    e.dataTransfer.setData("header", header);
  };

  const onDrop = (e) => {
    const selectedColumn = e.dataTransfer.getData("header");
    const newSelectedColumnHeaders = [...selectedColumnHeaders];
    newSelectedColumnHeaders.push(selectedColumn);
    setSelectedColumnHeaders(newSelectedColumnHeaders);
  };

  const renderTable = () => {
    return (
      <Table striped bordered className="my-3">
        <thead>
          <tr>
            {selectedColumnHeaders.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fileData.map((dataItem) => (
            <tr>
              {selectedColumnHeaders.map((column) => (
                <td>{dataItem[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      {!fileData && (
        <FileUpload
          setFileData={setFileData}
          setColumnHeaders={setColumnHeaders}
        />
      )}
      {fileData && (
        <>
        <div style={{ display: "flex", height: "500px" }} className="my-5">
            <CustomBarChart fileData={fileData} />
            <CustomLineChart fileData={fileData} />
          </div>
          <h3 className="mt-3" style={{ color: "#34568b" }}>
            Dashboard:
          </h3>
          <Row
            className="mt-3"
            style={{
              border: "2px solid #34568b",
            }}
          >
            <Col
              sm={2}
              md={2}
              lg={2}
              xl={2}
              xxl={2}
              style={{ borderRight: "2px solid #34568b" }}
              className="position-relative"
            >
              <Stack gap={3} className="my-3 position-sticky top-0">
                {columnHeaders?.map((header, index) => (
                  <div
                    className="columnListItem"
                    onDragStart={(e) => onDragStart(e, header)}
                    draggable={true}
                    key={index}
                  >
                    {header}
                  </div>
                ))}
              </Stack>
            </Col>
            <Col
              sm={10}
              md={10}
              lg={10}
              xl={10}
              xxl={10}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e)}
            >
              <div>
                {selectedColumnHeaders.length > 0 ? (
                  renderTable()
                ) : (
                  <div>
                    <Alert variant="primary" className="mt-2">
                      
                      Please drag and drop 
                    </Alert>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          
        </>
      )}
    </Container>
  );
};

export default Layout;
