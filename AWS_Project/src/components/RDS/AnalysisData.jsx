import { Link, useNavigate } from "react-router-dom";

export default function AnalysisData({uniqueId, userId,fileName, s3Key })
{

    const navigate = useNavigate();

    //onclick evenet
    const onclickanalysisDetail = (e) =>
    {
        e.preventDefault();
        console.log("버튼 출력:", uniqueId);
        navigate(`/admin/analysisData/detail/${uniqueId}`)
        //http 호출
    }

    return(
        <>
        <Link>
        <div onClick={onclickanalysisDetail}>

            <div key={uniqueId} className="p-4 border rounded-lg mb-4">
                <h3 className="font-bold">{fileName}</h3>
            </div>

        </div>
        </Link>
        </>
    )
}