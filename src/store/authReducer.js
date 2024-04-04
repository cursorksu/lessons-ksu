import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    createdAt:"2/19/2024, 3:23:27 PM",
    lang:"ru",
    firstName:"Salogubova",
    email:"kursorksu777@gmail.com",
    lastName:"Oksana",
    avatar:"https://lh3.googleusercontent.com/a/ACg8ocIZS1xZnBsghMU-U_ZhMLvQTIBfyWdOkYon5AvlKQ_uFdg=s96-c",
    uid:"T01wddIaCYa8Wx018PdffLhZTv43",
  },
  token:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2Fsb2d1Ym92YSBPa3NhbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVpTMXhabkJzZ2hNVS1VX1poTUx2UVRJQmZ5V2RPa1lvbjVBdmxLUV91RmRnPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2xlc3NvbnMta3N1IiwiYXVkIjoibGVzc29ucy1rc3UiLCJhdXRoX3RpbWUiOjE3MTIxNjE0NDUsInVzZXJfaWQiOiJUMDF3ZGRJYUNZYThXeDAxOFBkZmZMaFpUdjQzIiwic3ViIjoiVDAxd2RkSWFDWWE4V3gwMThQZGZmTGhaVHY0MyIsImlhdCI6MTcxMjE2MTQ0NSwiZXhwIjoxNzEyMTY1MDQ1LCJlbWFpbCI6Imt1cnNvcmtzdTc3N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDQ1MTE3ODY0OTIzNDg4MDIyMyJdLCJlbWFpbCI6WyJrdXJzb3Jrc3U3NzdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.C8dYG8jmpWvGuu71Ti1CKXElQoVR8Z_En6f-M1hn1amy_NlC-cmBa5i6I5qIDBTi-ciR6YBKzVYJxgFEI-O5llrTVO9F_e-XUE3_YtZ1fCqJ_cZ_uAPAl7hqtbMBC20oMGR_2-1f88s0PIk3gcgZmvwPPUsG7wNBo7AMLryR4pMYVJXLcSfGLHd1poHBuHP7lRTOKak1oQ8ZGMA2FqJfbRvTBU76dCgqW-zc94ssuXcT5HuOsM7IxtIEb7rzm_WyZR0jfEiZqEydytteSc6O0DWOPxawZT2gF1I60eZMwOp7yfmrhO2IkVeeR6FR0QEGLoKEwjZDAginfsA3pr-gfQ",
};

export const authReducerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    clearAuthData: () => ({}),
  },
});

// Action creators are generated for each case reducer function
export const { setAuthData, clearAuthData } = authReducerSlice.actions;

export default authReducerSlice.reducer;
