import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import axios from "axios";

const DiseaseRecognition = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePredict = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
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

            // Update result with the entire API response
            setResult(response.data);
        } catch (error) {
            console.error("Error during prediction:", error);
        }
    };

    console.log(result);

    return (
        <div className="flex flex-col items-center justify-center bg-backgroundPageGradient p-20">
            <div className="w-96 bg-white shadow-md rounded-lg p-6 m-5">
                <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Disease Recognition</h1>

                <div className="mb-4">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                        <MdDriveFolderUpload className="w-8 h-8" />
                        <span className="text-gray-500">Drag and drop file here</span>
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </div>

                {selectedFile && (
                    <div className="mb-4 text-center">
                        <h2 className="text-gray-600 mb-2">Selected Image:</h2>
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
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full"
                        onClick={handlePredict}
                    >
                        Predict
                    </button>
                    {result && (
                        <>
                            <label
                                className={`py-2 px-4 rounded-lg w-full text-center font-semibold text-white ${
                                    result?.id == null ? "bg-red-500" : "bg-green-500"
                                }`}
                            >
                                {result.name}
                            </label>
                            {result.id != null && (
                                <label className={"bg-gray-300 rounded-md px-2"}>
                                    Phương pháp điều trị: {result.treatment}
                                </label>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiseaseRecognition;
