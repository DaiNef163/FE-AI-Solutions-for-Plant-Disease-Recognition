import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

const DiseaseRecognition = () => {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const tokenUser = localStorage.getItem("tokenUser");

    const handleFileChange = (event) => {
        if (!tokenUser) {
            notification.warning({
                message: "Bạn chưa đăng nhập",
                description: "Vui lòng đăng nhập để tiếp tục.",
            });
            navigate("/login");
            return;
        }
        setSelectedFile(event.target.files[0]);
    };

    const handlePredict = async () => {
        if (!selectedFile) {
            notification.warning({
                message: "Vui lòng chọn ảnh",
                description: "Chọn ảnh để chẩn đoán bệnh của lá",
            });
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error during prediction:", error);
        }
    };

    console.log(tokenUser);
    return (
        <div className="flex flex-col items-center justify-center bg-backgroundPageGradient p-20 w-full">
            <div className=" w-2/4 bg-white shadow-md rounded-lg p-6 m-5">
                <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Chẩn đoán bệnh cho lá</h1>

                <div className="mb-4">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                        <MdDriveFolderUpload className="w-8 h-8" />
                        <span className="text-gray-500 text-xl">Kéo và thả tập tin vào đây</span>
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </div>

                {selectedFile && (
                    <div className="mb-4 text-center">
                        <h2 className="text-gray-600 mb-2 text-2xl">Chọn ảnh:</h2>
                        <div className="flex justify-center">
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="mt-2 max-w-full h-32 object-contain border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center gap-4 mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded-lg text-2xl w-full font-semibold text-center"
                        onClick={handlePredict}
                    >
                        Chẩn đoán
                    </button>
                    {result && (
                        <>
                            <label
                                className={`py-2 px-4 rounded-lg w-full text-center text-2xl font-semibold text-black ${
                                    result?.code == null
                                        ? "bg-red-500"
                                        : result?.severityLevel == "low"
                                        ? "bg-green-600"
                                        : result?.severityLevel == "moderate"
                                        ? "bg-lime-400"
                                        : result?.severityLevel == "high"
                                        ? "bg-yellow-300"
                                        : "bg-orange-500"
                                }`}
                            >
                                {result?.name}
                            </label>
                            <img
                                src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-feedback-scale-rating-satisfaction-colored-png-image_5585845.png"
                                alt=""
                            />
                            {result?.code != null && result?.severityLevel != "low" && (
                                <>
                                    <label className={"bg-gray-200 text-xl  font-medium rounded-md px-2 w-full"}>
                                        <p className={"text-red-500 font-medium text-2xl underline"}>Triệu chứng:</p>
                                        {result?.symptoms}
                                    </label>
                                    <label className={"bg-gray-200 text-xl  font-medium rounded-md px-2 w-full"}>
                                        <p className={"text-red-500 font-medium text-2xl underline"}>
                                            Nguyên nhân bệnh:
                                        </p>
                                        {result?.causes}
                                    </label>
                                    <label className={"bg-gray-200 text-xl  font-medium rounded-md px-2 w-full"}>
                                        <p className={"text-red-500 font-medium text-2xl underline"}>
                                            Phương pháp điều trị:
                                        </p>
                                        {result?.treatment}
                                    </label>
                                    <label className={"bg-gray-200 text-xl  font-medium rounded-md px-2 w-full"}>
                                        <p className={"text-red-500 font-medium text-2xl underline"}>Phòng ngừa:</p>
                                        {result?.prevention}
                                    </label>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiseaseRecognition;
