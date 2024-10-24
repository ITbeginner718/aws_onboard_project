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
import { useEffect, useState } from "react";

// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import {auth} from '../../firebase.js';

// core components
// 윗쪽 
import Header from "@components/Headers/Header";
import AnalysisData from "../../components/RDS/AnalysisData.jsx";

export default function Chat(){
  
//id값 불러오기
const user =auth.currentUser;

const rds =[
  {uniqueId: '01c60f58-74fe-4e05-8379-592a951c652e', userId: 'aOqbnhpvjUMcOVKvBJclZh0BtZH3', fileName: '공급계약서.pdf', s3Key: 'analysisFile/20241023T062301_01c60f58-74fe-4e05-8379-592a951c652e'}
 ,
  {uniqueId: '58f639b7-31f9-400a-bc5a-d04bcdc9045c', userId: 'aOqbnhpvjUMcOVKvBJclZh0BtZH3', fileName: '연예인_엔터테이먼트_계약서.pdf', s3Key: 'analysisFile/20241023T062453_58f639b7-31f9-400a-bc5a-d04bcdc9045c'}]
//값 가져오기
const [RdsDatas,setRdsData]= useState();

//값이 들어왔을 때 렌더링
const [isGetData, setIsGetData]=useState(true);
  
//aws gateway http api 호출(rds 데이터 저장)
const getRdsData =async(userId)=>
  {

    try {
      const response = await fetch(`${import.meta.env.VITE_AWS_GATEAPI_ENDPOINT_RDS_GETDATA}?userId=${userId}`, {
        //GET 데이터 호출
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
     
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  

      console.log("rds data:", data.body);

      //분석 데이터 json 저장
      setRdsData(data.body);
    
      alert("성공적으로 실행되었습니다.");
  
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다: " + error.message);
    }
    
    finally{
      //파일 정보 null
    }
  }


  //페이지 이동 시 
  useEffect(() => {

    //http api 호출 (user id 호출)
    getRdsData(user.uid);
    
  }, []); // 빈 의존성 배열을 사용해서 컴포넌트 마운트 시에만 이벤트 리스너를 추가하고, 언마운트 시에 제거

  useEffect(()=>{

  if(!RdsDatas)
  {
    return;
  }

  else{
    // isLoading 활성화
    setIsGetData(true);
  }
  

  },[RdsDatas])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--6" fluid>
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">리스트</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                {isGetData&&
                <>
                {RdsDatas&&
                <>
                 {RdsDatas.map((RdsData)=>(
                  <>
                    <AnalysisData key={RdsData.uniqueId} {...RdsData}/>
                  </>
                 ))}
                </>
                } 
                </>
                }
               
              </CardBody>
            </Card>
      </Container>
    </>
  );
};


