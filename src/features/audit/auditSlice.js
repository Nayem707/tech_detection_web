import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Progress messages shown while an audit is running (client-side only).
  progressSteps: [],
  // Last submitted URL, used for the loading screen.
  submittedUrl: null,
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    beginAudit(state, action) {
      state.submittedUrl = action.payload;
      state.progressSteps = [];
    },
    pushProgress(state, action) {
      state.progressSteps.push(action.payload);
    },
    resetAudit(state) {
      state.submittedUrl = null;
      state.progressSteps = [];
    },
  },
});

export const { beginAudit, pushProgress, resetAudit } = auditSlice.actions;
export default auditSlice.reducer;
