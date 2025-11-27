import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserData, updateUserData, clearUserData } from '../store/slices/userSlice';
import type { UserProfileData } from '../store/slices/userSlice';

/**
 * Example component demonstrating how to use the Redux user slice
 * This shows how to read and update user data in the store
 */
export const UserProfileExample = () => {
    const dispatch = useAppDispatch();
    const { userData, isLoading, error } = useAppSelector((state) => state.user);

    // Example: Set complete user data
    const handleSetUserData = () => {
        const newUserData: UserProfileData = {
            name: 'John Doe',
            age: 30,
            gender: 'Male',
            sex: 'Male',
            height: 175, // cm
            weight: 75, // kg
            goal: 'Lose weight and build muscle',
        };
        dispatch(setUserData(newUserData));
    };

    // Example: Update specific fields
    const handleUpdateWeight = () => {
        dispatch(updateUserData({ weight: 73 }));
    };

    // Example: Clear user data
    const handleClearData = () => {
        dispatch(clearUserData());
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {userData ? (
                <div className="space-y-2">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Sex:</strong> {userData.sex}</p>
                    <p><strong>Height:</strong> {userData.height} cm</p>
                    <p><strong>Weight:</strong> {userData.weight} kg</p>
                    <p><strong>Goal:</strong> {userData.goal}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}

            <div className="mt-6 space-x-2">
                <button
                    onClick={handleSetUserData}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Set User Data
                </button>
                <button
                    onClick={handleUpdateWeight}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                    disabled={!userData}
                >
                    Update Weight
                </button>
                <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                    disabled={!userData}
                >
                    Clear Data
                </button>
            </div>
        </div>
    );
};
