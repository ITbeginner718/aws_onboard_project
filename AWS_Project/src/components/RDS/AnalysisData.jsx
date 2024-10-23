export default function AnalysisData({uniqueId, userId,fileName, s3Key })
{
    //onclick evenet
    return(
        <>
           <div key={uniqueId} className="p-4 border rounded-lg mb-4">
          <h3 className="font-bold">{fileName}</h3>
          <p>User ID: {userId}</p>
          <p>S3 Key: {s3Key}</p>
        </div>
        </>
    )
}