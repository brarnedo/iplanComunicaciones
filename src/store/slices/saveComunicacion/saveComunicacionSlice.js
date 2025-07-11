import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saveComunicacion: null,    
  isLoadingSaveComunicacion: false, 
   errorSaveComunicacion: null
};


export const saveComunicacionSlice = createSlice({
  name: "saveComunicacion", 
  initialState,   
  
 
  reducers: {
   
    setLoadingSaveComunicacion: (state, action) => {
      state.isLoadingSaveComunicacion = action.payload;
    },

    setSaveComunicacion: (state, action) => {
      state.saveComunicacion = action.payload; 
      state.isLoadingSaveComunicacion = false; // ← Auto-stop loading
      state.errorSaveComunicacion = null;      // ← Limpiar error
    },

     setErrorSaveComunicacion: (state, action) => { 
      state.errorSaveComunicacion = action.payload;
      state.isLoadingSaveComunicacion = false;
    }


  }
});

export const {
  setLoadingSaveComunicacion,
  setSaveComunicacion,
  setErrorSaveComunicacion     
} = saveComunicacionSlice.actions;