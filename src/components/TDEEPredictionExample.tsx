/**
 * Example: How to use the Backend API to get TDEE predictions
 * 
 * This file demonstrates how to integrate the ML backend predictions
 * into your React components.
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { AppRootState } from '../store/store';
import { predictTDEE, mapActivityLevel, mapGoal, checkBackendHealth } from '../services/api';

export function TDEEPredictionExample() {
    const userData = useSelector((state: AppRootState) => state.user.userData);
    const [prediction, setPrediction] = useState<number | null>(null);
    const [uncertainty, setUncertainty] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [backendAvailable, setBackendAvailable] = useState(false);

    // Check if backend is available on component mount
    useEffect(() => {
        checkBackendHealth().then(setBackendAvailable);
    }, []);

    // Fetch prediction when user data is available
    useEffect(() => {
        if (!userData || !backendAvailable) return;

        const fetchPrediction = async () => {
            setLoading(true);
            setError(null);

            try {
                // Prepare input data for backend
                const input = {
                    age: userData.age,
                    gender: userData.gender.toLowerCase() as 'male' | 'female',
                    weight: userData.weight,
                    height: userData.height,
                    activity_level: mapActivityLevel(userData.activity_level),
                    goal: mapGoal(userData.goal),
                    goal_weight: userData.goal_weight,
                };

                // Get prediction from ML model
                const result = await predictTDEE(input);

                setPrediction(result.tdee);
                setUncertainty(result.uncertainty);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Prediction failed');
                console.error('TDEE Prediction Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [userData, backendAvailable]);

    if (!backendAvailable) {
        return (
            <div className="alert alert-warning">
                ⚠️ Backend ML service is not available. Please start the backend server:
                <pre>cd backend && python -m uvicorn main:app --reload</pre>
            </div>
        );
    }

    if (loading) {
        return <div>Loading prediction...</div>;
    }

    if (error) {
        return <div className="alert alert-error">Error: {error}</div>;
    }

    if (!prediction) {
        return <div>No prediction available. Please complete your profile.</div>;
    }

    return (
        <div className="tdee-prediction">
            <h3>Your Daily Calorie Needs</h3>
            <div className="prediction-result">
                <p className="tdee-value">
                    {Math.round(prediction)} <span className="unit">kcal/day</span>
                </p>
                {uncertainty && (
                    <p className="uncertainty">± {Math.round(uncertainty)} kcal/day</p>
                )}
            </div>
            <p className="info-text">
                This is calculated using our trained machine learning model based on your:
                <ul>
                    <li>Age: {userData?.age} years</li>
                    <li>Gender: {userData?.gender}</li>
                    <li>Weight: {userData?.weight} kg</li>
                    <li>Height: {userData?.height} cm</li>
                    <li>Activity Level: {userData?.activity_level}</li>
                    <li>Goal: {userData?.goal}</li>
                </ul>
            </p>
        </div>
    );
}

/**
 * Simpler hook-based approach for getting TDEE
 */
export function useTDEEPrediction() {
    const userData = useSelector((state: AppRootState) => state.user.userData);
    const [tdee, setTdee] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPrediction = async () => {
        if (!userData) return;

        setLoading(true);
        setError(null);

        try {
            const input = {
                age: userData.age,
                gender: userData.gender.toLowerCase() as 'male' | 'female',
                weight: userData.weight,
                height: userData.height,
                activity_level: mapActivityLevel(userData.activity_level),
                goal: mapGoal(userData.goal),
                goal_weight: userData.goal_weight,
            };

            const result = await predictTDEE(input);
            setTdee(result.tdee);
            return result;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Prediction failed';
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { tdee, loading, error, getPrediction };
}
