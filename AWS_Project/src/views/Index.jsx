/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// reactstrap components
import { useState } from "react";

import {
  Container,
  Row,
  Col,
  CardHeader,
  Card,
  Button,
  CardBody

} from "reactstrap";


import Header from "../components/Headers/Header.jsx";
import ContractAnalysis from "../components/ContractAnalysis/ContractAnalysis.jsx";

const Index = () => {

  const [file, setFile] = useState(null);
  const [uploadedInfo, setUploadedInfo] = useState(null);

  const handleFileChange = (newFile) => {
    setFile(newFile);
    console.log("상위 컴포넌트 파일 정보:",newFile);
    if (newFile) {
        const { name, size: byteSize, type } = newFile;
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        setUploadedInfo({ name, size, type });
    } else {
        setUploadedInfo(null);
    }
};

const onClick=(e)=>{
  e.preventDefault();
}
  return (
    <>
      <Header />

      <Container className="mt--6" fluid>
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">계약서 분석</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={onClick}
                      size="sm"
                    >
                     Constract Analysis
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                {/* 계약서 분석 창 */}
                
                
                <ContractAnalysis
                 file={file} 
                 onFileChange={handleFileChange} 
                 uploadedInfo={uploadedInfo} 

                />
                  
              </CardBody>
            </Card>
      </Container>
    </>
  );
};

export default Index;
