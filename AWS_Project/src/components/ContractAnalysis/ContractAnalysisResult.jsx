
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
  } from "reactstrap";

import resultData from './example.json'
import { useEffect, useState } from "react";

export default function ContractAnalysisResult({contractAnalysis})
{
    const [contractAnalysisParsing, setParsedData] = useState(null);

    //props 값을 받지 못한 상태에서 객체에 접근하려고 하면 "해당 속성을 찾을 수 없다고 에러 뜸"
    //props 값을 받은 후
    useEffect(() => {
        const parseData = () => {
          try {
            if (typeof contractAnalysis === 'string') {
              // JSON 문자열인 경우:JS객체로 변환 후 저장
              setParsedData(JSON.parse(contractAnalysis));

            } 
            
            else if (typeof contractAnalysis === 'object' && contractAnalysis !== null) {
              // 이미 객체인 경우
              setParsedData(contractAnalysis);
            }
            
            else {
              console.error('Invalid contract analysis data type');
            }
          } catch (error) {
            console.error('Error parsing contract analysis:', error);
          }
        };
    
        parseData();
      }, [contractAnalysis]);

    return(
        <>
   <Container className="mt-6" fluid>
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

               <div>

                {
                    // 중요!!!! 데이터가 들어온 이후에 렌더링을 진행해야 함
                    // 데이터가 안들어온 상태에서 객체 접근 시 에러 발생....!
                    contractAnalysisParsing&& 
                    <>
                    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>

                        <h1>계약 세부 사항</h1>

                        <h2>일반 정보</h2>
                        <p><strong>계약 유형:</strong> {contractAnalysisParsing.generalInfo.contractType}</p>
                        <p><strong>계약 기간:</strong> {contractAnalysisParsing.generalInfo.contractPeriod}</p>
                        <p><strong>효력 발생일:</strong> {contractAnalysisParsing.generalInfo.effectiveDate}</p>
                        <h3>계약 당사자</h3>
                        <ul>
                        {contractAnalysisParsing.generalInfo.parties.map((party, index) => (
                            <li key={index}>{party.name} - {party.role}</li>
                        ))}
                        </ul>

                        <h2>주요 용어</h2>
                        <ul>
                        {contractAnalysisParsing.keyTerms.map((term, index) => (
                            <li key={index}>
                            <strong>{term.term}:</strong> {term.definition} (관련 조항: {term.relevantClauses.join(', ')})
                            </li>
                        ))}
                        </ul>

                        <h2>의무 및 권리</h2>

                        <h3>갑</h3>
                        <ul>
                        {contractAnalysisParsing.obligationsAndRights.supplier.map((item, index) => (
                            <li key={index}>{item.obligation} (관련 조항: {item.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>
                        <h3>을</h3>
                        <ul>
                        {contractAnalysisParsing.obligationsAndRights.buyer.map((item, index) => (
                            <li key={index}>{item.right} (관련 조항: {item.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>

                        <h2>재무 조건</h2>
                        <p><strong>지불 금액:</strong> {contractAnalysisParsing.financialTerms.paymentAmount.description} (관련 조항: {contractAnalysisParsing.financialTerms.paymentAmount.relevantClauses.join(', ')})</p>
                        <p><strong>지불 조건:</strong> {contractAnalysisParsing.financialTerms.paymentConditions.description} (관련 조항: {contractAnalysisParsing.financialTerms.paymentConditions.relevantClauses.join(', ')})</p>
                        <p><strong>지연 수수료:</strong> {contractAnalysisParsing.financialTerms.lateFee.description} (관련 조항: {contractAnalysisParsing.financialTerms.lateFee.relevantClauses.join(', ')})</p>

                        <h2>계약 종료 조항</h2>
                        <ul>
                        {contractAnalysisParsing.terminationClauses.map((clause, index) => (
                            <li key={index}>{clause.clause} (관련 조항: {clause.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>

                        <h2>책임 및 보상</h2>
                        <ul>
                        {contractAnalysisParsing.liabilityAndIndemnity.map((item, index) => (
                            <li key={index}>{item.description} (관련 조항: {item.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>

                        <h2>지적 재산권</h2>
                        <ul>
                        {contractAnalysisParsing.intellectualProperty.map((item, index) => (
                            <li key={index}>{item.description} (관련 조항: {item.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>

                        <h2>기밀 유지</h2>
                        <ul>
                        {contractAnalysisParsing.confidentiality.map((item, index) => (
                            <li key={index}>{item.description} (관련 조항: {item.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>

                        <h2>분쟁 해결</h2>
                        <p><strong>관할권:</strong> {contractAnalysisParsing.disputeResolution.jurisdiction} (관련 조항: {contractAnalysisParsing.disputeResolution.relevantClauses.join(', ')})</p>

                        <h2>특별 조항</h2>
                        <ul>
                        {contractAnalysisParsing.specialClauses.map((clause, index) => (
                            <li key={index}>{clause.description} (관련 조항: {clause.relevantClauses.join(', ')})</li>
                        ))}
                        </ul>

                        <h2>잠재적 문제</h2>
                        {contractAnalysisParsing.potentialIssues.map((issue, index) => (
                        <div key={index}>
                            <h3>{issue.issue}</h3>
                            <p><strong>설명:</strong> {issue.description}</p>
                            <p><strong>영향:</strong> {issue.impact}</p>
                            <p><strong>권장사항:</strong> {issue.recommendation}</p>
                            <p><strong>관련 조항:</strong> {issue.relevantClauses.join(', ')}</p>
                        </div>
                        ))}

                        <h2>전체 평가</h2>
                        <p>{contractAnalysisParsing.overallAssessment}</p>
                        </div> 
                    </>
                }
               </div>
              </CardBody>
            </Card>
      </Container>
        </>
    )
}