## TODO - Medical history in Profile

- [x] Update `src/store/slices/userSlice.ts` to add `MedicalHistoryEntry` type and `medical_history` to `UserProfileData` (localStorage persisted via existing reducers).
- [ ] Update `src/pages/Profile.tsx`:
  - [x] Initialize formData with `medical_history` (default empty array for backward compatibility).
  - [x] Add UI in **profile view**: render medical history list.
  - [x] Add UI in **edit/create**: allow adding and removing entries (condition, date, medications, allergies, surgeries, notes).
- [x] Run build/typecheck to ensure TypeScript/React compiles.




