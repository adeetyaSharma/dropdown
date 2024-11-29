import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MultiSelectDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [predictedDisease, setPredictedDisease] = useState('');

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/symptoms');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSymptoms(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchSymptoms();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemChange = (item) => {
        setSelectedSymptoms((prevSelected) =>
            prevSelected.includes(item)
                ? prevSelected.filter((s) => s !== item)
                : [...prevSelected, item]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedSymptoms.length === 0) {
            alert('Please select at least one symptom.');
            return; // Prevent submission if no symptoms are selected
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                symptoms: selectedSymptoms,
            });
            console.log('Prediction response:', response.data); // Log the response
            setPredictedDisease(response.data.predicted_disease);
        } catch (error) {
            console.error('Error predicting disease:', error);
            setPredictedDisease('Error predicting disease');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            {/* Dropdown Header */}
            <div
                className="border rounded-md p-2 w-full flex items-center justify-between cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="flex items-center gap-2 flex-wrap w-full">
                    {selectedSymptoms.length > 0 ? (
                        selectedSymptoms.map((item) => (
                            <div
                                key={item}
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center gap-2"
                            >
                                {item}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent dropdown toggle
                                        handleItemChange(item); // Remove item
                                    }}
                                    className="text-red-500 font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    ) : (
                        <button className='mt-10'>
                            <span className="text-gray-400">Select symptoms </span>
                            <span className="text-gray-600 cursor-pointer">{isOpen ? "▲" : "▼"}</span>
                        </button>
                    )}
                </div>

            </div>

            {/* Dropdown Items */}
            {isOpen && (
                <div className="border mt-2 rounded-md shadow-md bg-white max-h-48 overflow-y-auto w-full">
                    {symptoms.map((symptom) => (
                        <label
                            key={symptom}
                            className="p-2 flex items-center hover:bg-gray-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedSymptoms.includes(symptom)}
                                onChange={() => handleItemChange(symptom)}
                                className="mr-2"
                            />
                            {symptom}
                        </label>
                    ))}
                </div>
            )}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
            >
                Predict Disease
            </button>

            {/* Predicted Disease */}
            {predictedDisease && (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-700">Predicted Disease:</h3>
                    <p className="text-lg text-green-700">{predictedDisease}</p>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
