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
import { useEffect, useState } from "react";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from 'axios';
import s3Client from '../aws.js';
import { v4 as uuidv4 } from 'uuid';

import {
  Container,
  Row,
  Col,
  CardHeader,
  Card,
  Button,
  CardBody,
  Spinner,

} from "reactstrap";


import Header from "../components/Headers/Header.jsx";
import ContractAnalysis from "../components/ContractAnalysis/ContractAnalysis.jsx";
import ContractAnalysisResult from "../components/ContractAnalysis/ContractAnalysisResult.jsx";
import {auth} from '../firebase.js';

export default function Index() {

  // const [uploading, setUploading] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState(0);

  const [contractAnalysis, setContractAnalysis]= useState("");

  const [file, setFile] = useState(null);
  const [uploadedInfo, setUploadedInfo] = useState(null);

  //s3 ID값
  const [uniqueId, setUniqueID]= useState();
  const [s3key, setS3key] =useState();
  
  // 분석 진행 로딩 상태
  const [isAnaysisLoading, setIsAnalysisLoading]=useState(false);

  // 사용자 정보
  const user = auth.currentUser;

  
  // 파일 변경
  const handleFileChange = (newFile) => {

    setFile(newFile);

    // 분석 결과 데이터 null
    setContractAnalysis(null);

    console.log("상위 컴포넌트 파일 정보:", newFile);

    if (newFile) {
        const { name, size: byteSize, type } = newFile;
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        setUploadedInfo({ name, size, type });
    } else {
        setUploadedInfo(null);
    }
};

//s3 키값:`${prefix}/${timestamp}_${uniqueId}`

//RDB:, uniqueId, UserId, 원래 파일명(공백은 _으로 대체해서 저장), s3 키값

const generateS3Key = (prefix = 'rawFile') => {

  const uniqueId = uuidv4();

  //s3 ID 값 저장(RDB에 저장할 예정) 
  setUniqueID(uniqueId);

  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  
  //s3 키값(파일명) 저장(RDB에 저장할 예정)
  const s3KeyValue = `${prefix}/${timestamp}_${uniqueId}`;
  
  setS3key(s3KeyValue);

  return s3KeyValue;
};


//파일 데이터 업로드
const onClickUploadfile = async(e)=>{

  e.preventDefault();

  if (!file) {
    alert('파일을 선택해주세요.');
    return;
  }

  const ok = confirm("해당 계약서를 분석하겠습니까?");
  
  if(!ok)
    return;
  //분석 로딩
  setIsAnalysisLoading(true);

  try {

    //키값 생성
    const uniqueId = uuidv4();
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    //s3 키값(파일명) 저장(RDB에 저장할 예정)
    const s3KeyValue = `rawFile/${timestamp}_${uniqueId}`;


    // PutObject 커맨드 생성
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
      Key: s3KeyValue, // 
      ContentType: file.type
    });

    // 서명된 URL 생성
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // 서명된 URL을 사용하여 파일 업로드
    const response =await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type
      },
    });
    
    
    //RDS에 파일에 대한 메타 데이터 생성(userID, fileID, s3 key)
    
    //업로드 성공하면 http api 호출()
    if(response.status===200 || response.status==204)
    {
      //http api 호출()
      //rds에 s3 메타데이터 저장
      //DB_rdsDatatHTTP(file.name);

      //http api 호출()
      textractHTTP(file.name,uniqueId,s3KeyValue);
    }

  } catch (error) {
    console.error('업로드 중 오류 발생:', error);
    alert('파일 업로드에 실패했습니다.');
    setIsAnalysisLoading(false);
  } finally {
    // setUploading(false);
  }
  //
}


 //aws gateway http api 호출
 const textractHTTP =async(fileName,uniqueId,s3KeyValue)=>
  {
    const fileNameReplace = fileName.replace(/\s+/g, '_');   //공백은 _으로 대체
    console.log(fileNameReplace);
    console.log("textractHTTP:", uniqueId,user.uid,fileNameReplace ,s3KeyValue);
    try {
      const response = await fetch(`${import.meta.env.VITE_AWS_GATEAPI_ENDPOINT_TEXTRACT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "uniqueId": uniqueId,
          "userId": user.uid,
          "fileName": fileNameReplace, 
          "s3Key": s3KeyValue
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response data:", data);

      //분석 데이터 json 저장
      setContractAnalysis(data);
    
      alert("성공적으로 실행되었습니다.");

      // 파일 초기화
      setFile(null);
  
    } catch (error) {
      console.error("Error:", error);
      setIsAnalysisLoading(false);
      alert("오류가 발생했습니다: " + error.message);
    }
    
    finally{
      //파일 정보 null
      setFile(null);
      setUploadedInfo(null);
    }
  }

  //rds 파일 저장

  //aws gateway http api 호출(rds 데이터 저장)
 const DB_rdsDatatHTTP =async(fileName)=>
  {
    const fileNameReplace = fileName.replace(" ",'_'); //공백은 _으로 대체

    console.log(fileNameReplace);

 

    try {
      const response = await fetch(`${import.meta.env.VITE_AWS_GATEAPI_ENDPOINT_RDS_SAVEDATA}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //여기서 키값을 받는 것이 아닌 키값을 저장하고 있는 RDB에서 ID값 전송
          "uniqueId": uniqueId,
          "userId": user.uid,
          "fileName": fileNameReplace, 
          "s3Key": s3key
          // 필요한 경우 추가 파라미터
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response data:", data);

      //분석 데이터 json 저장
      setContractAnalysis(data);
    
      alert("성공적으로 실행되었습니다.");

      // 파일 초기화
      setFile(null);
  
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다: " + error.message);
    }
    
    finally{
      //파일 정보 null
      setUploadedInfo(null);
      setIsAnalysisLoading(false);
    }
  }


  useEffect(()=>{
    //데이터 분석 값 받으면 loading 해제  
    if(contractAnalysis)
    {
      setIsAnalysisLoading(false);
      setFile(null);
    }

  },[contractAnalysis])

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
                      onClick={onClickUploadfile}
                      size="mm"
                    >
                      {isAnaysisLoading ? `Anaysis...`:`Constract Analysis`}
                    
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                {/* 계약서 분석 창 */}
                {isAnaysisLoading ==true ?
                <>
                <div>

                  <Spinner
                    color="primary"
                    style={{
                    height: '2em',
                    width: '2em'
                    }}
                >
                    Loading...
                </Spinner> 
                
                <span style={{fontSize:"30px"}}>
                {` 결과가 나오고 있습니다. 잠시만 기달려 주세요..`} 
                </span>

                </div>
                </>
                    
                :
                <>
                <ContractAnalysis
               file={file} 
               onFileChange={handleFileChange} 
               uploadedInfo={uploadedInfo} 
              />
                </>
              }

              </CardBody>
            </Card>
      </Container>
      {/* json 값이 들어 있을 때만 컴포넌트 활성화 및 json 결과값 props 전달 */}
      {contractAnalysis&& 
      <>
       <ContractAnalysisResult contractAnalysis={contractAnalysis}/>
      </>
     }

    </>
  );
};


