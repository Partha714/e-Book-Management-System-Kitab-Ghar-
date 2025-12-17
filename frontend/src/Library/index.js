import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth.js'
const library = configureStore({
  reducer: {
    auth: authReducer,
    
  },
})

export default library