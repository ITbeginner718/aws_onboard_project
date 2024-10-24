import { useEffect, useState } from "react";
import Header from "../Headers/Header";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

export default function AnalysisDataDetail()
{

    const { uniqueId } = useParams();
    const [isLoading, setIsLoading]=useState(false);
    const [analysisData, setAnalysisData]=useState();

    //aws gateway http api 호출(rds 데이터 저장)
    const DB_rdsDatatHTTP =async(uniqueId)=>
        {
            console.log(uniqueId);
        try {
            //?uniqueId=01c60f58-74fe-4e05-8379-592a951c652e
            const response = await fetch(`${import.meta.env.VITE_AWS_GATEAPI_ENDPOINT_RDS_GETDATA_DETAIL}?uniqueId=${uniqueId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },      
            });
        
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log("Response data:", data);

            setAnalysisData(data);
            alert("성공적으로 실행되었습니다.");
    
        
        } catch (error) {
            console.error("Error:", error);
            alert("오류가 발생했습니다: " + error.message);
        }
        
        finally{
            //파일 정보 null
        }
        }

    useEffect(()=>{
        DB_rdsDatatHTTP(uniqueId);
    },[])

    useEffect(()=>{
        setIsLoading(true);
    },[analysisData])

    return(
        <>
        {/* 헤더 */}
        <Header />

        {isLoading&&
        <>
        {analysisData&&
      <>
     <Container className="mt--6" fluid>
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">계약서 분석 결과</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>    
              <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>

                    <h1>계약 세부 사항</h1>

                    <h2>일반 정보</h2>
                    <p><strong>계약 유형:</strong> {analysisData.generalInfo.contractType}</p>
                    <p><strong>계약 기간:</strong> {analysisData.generalInfo.contractPeriod}</p>
                    <p><strong>효력 발생일:</strong> {analysisData.generalInfo.effectiveDate}</p>
                    <h3>계약 당사자</h3>
                    <ul>
                    {analysisData.generalInfo.parties.map((party, index) => (
                        <li key={index}>{party.name} - {party.role}</li>
                    ))}
                    </ul>

                    <h2>주요 용어</h2>
                    <ul>
                    {analysisData.keyTerms.map((term, index) => (
                        <li key={index}>
                        <strong>{term.term}:</strong> {term.definition} (관련 조항: {term.relevantClauses.join(', ')})
                        </li>
                    ))}
                    </ul>

                    <h2>의무 및 권리</h2>

                    <h3>갑</h3>
                    <ul>
                    {analysisData.obligationsAndRights.supplier.map((item, index) => (
                        <li key={index}>{item.obligation} (관련 조항: {item.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>
                    <h3>을</h3>
                    <ul>
                    {analysisData.obligationsAndRights.buyer.map((item, index) => (
                        <li key={index}>{item.right} (관련 조항: {item.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>

                    <h2>재무 조건</h2>
                    <p><strong>지불 금액:</strong> {analysisData.financialTerms.paymentAmount.description} (관련 조항: {analysisData.financialTerms.paymentAmount.relevantClauses.join(', ')})</p>
                    <p><strong>지불 조건:</strong> {analysisData.financialTerms.paymentConditions.description} (관련 조항: {analysisData.financialTerms.paymentConditions.relevantClauses.join(', ')})</p>
                    <p><strong>지연 수수료:</strong> {analysisData.financialTerms.lateFee.description} (관련 조항: {analysisData.financialTerms.lateFee.relevantClauses.join(', ')})</p>

                    <h2>계약 종료 조항</h2>
                    <ul>
                    {analysisData.terminationClauses.map((clause, index) => (
                        <li key={index}>{clause.clause} (관련 조항: {clause.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>

                    <h2>책임 및 보상</h2>
                    <ul>
                    {analysisData.liabilityAndIndemnity.map((item, index) => (
                        <li key={index}>{item.description} (관련 조항: {item.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>

                    <h2>지적 재산권</h2>
                    <ul>
                    {analysisData.intellectualProperty.map((item, index) => (
                        <li key={index}>{item.description} (관련 조항: {item.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>

                    <h2>기밀 유지</h2>
                    <ul>
                    {analysisData.confidentiality.map((item, index) => (
                        <li key={index}>{item.description} (관련 조항: {item.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>

                    <h2>분쟁 해결</h2>
                    <p><strong>관할권:</strong> {analysisData.disputeResolution.jurisdiction} (관련 조항: {analysisData.disputeResolution.relevantClauses.join(', ')})</p>

                    <h2>특별 조항</h2>
                    <ul>
                    {analysisData.specialClauses.map((clause, index) => (
                        <li key={index}>{clause.description} (관련 조항: {clause.relevantClauses.join(', ')})</li>
                    ))}
                    </ul>

                    <h2>잠재적 문제</h2>
                    {analysisData.potentialIssues.map((issue, index) => (
                    <div key={index}>
                        <h3>{issue.issue}</h3>
                        <p><strong>설명:</strong> {issue.description}</p>
                        <p><strong>영향:</strong> {issue.impact}</p>
                        <p><strong>권장사항:</strong> {issue.recommendation}</p>
                        <p><strong>관련 조항:</strong> {issue.relevantClauses.join(', ')}</p>
                    </div>
                    ))}

                    <h2>전체 평가</h2>
                    <p>{analysisData.overallAssessment}</p>
                    </div>
             
              </CardBody>
            </Card>
      </Container>

      </>
        }
        </>
        }
        </>
    )
}