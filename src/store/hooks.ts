import { useDispatch, useSelector } from 'react-redux';
import type { AppRootState, AppStoreDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppStoreDispatch>();
export const useAppSelector = useSelector.withTypes<AppRootState>();
