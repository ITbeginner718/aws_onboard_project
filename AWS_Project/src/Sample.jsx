import React, { useState } from 'react';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from 'axios';
import s3Client from './aws';

export default function Sample()
{

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [constractAnalysis, setConstractAnalysis]= useState("");


    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const uploadFile = async () => {
      if (!file) {
        alert('파일을 선택해주세요.');
        return;
      }
  
      setUploading(true);
      setUploadProgress(0);
  
      try {
  
        // PutObject 커맨드 생성
        const command = new PutObjectCommand({
          Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
          Key: file.name,
          ContentType: file.type
        });
  
        // 서명된 URL 생성
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
        // 서명된 URL을 사용하여 파일 업로드
        const response =await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });

        if(response.status===200 || response.status==204)
        {
          alert('파일이 성공적으로 업로드되었습니다. 분석을 시작합니다.');

          //http api 호출()
          //결과값: 저장된 s3 키
          textractHTTP(file.name);
        }

      } catch (error) {
        console.error('업로드 중 오류 발생:', error);
        alert('파일 업로드에 실패했습니다.');
      } finally {
        setUploading(false);
      }
    };

    //aws gateway http api 호출
    const textractHTTP =async(fileName)=>
    {
      console.log(fileName);
      try {
        const response = await fetch(`${import.meta.env.VITE_AWS_GATEAPI_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "s3_key": fileName,
            // 필요한 경우 추가 파라미터
          }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Response data:", data);

        setConstractAnalysis(data);

        alert("성공적으로 실행되었습니다.");
    
      } catch (error) {
        console.error("Error:", error);
        alert("오류가 발생했습니다: " + error.message);
      }
    }

return (
    <>
    <div>

    <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? '업로드 중...' : 'S3에 업로드'}
      </button>
      {uploading && <progress value={uploadProgress} max="100" />}

    </div>


    <div>
   
      <div>
        결과 
      </div>
      <div>
        {constractAnalysis}
      </div>
    </div>
    </>
)
}