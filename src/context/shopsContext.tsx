import React, { createContext, type ReactNode } from 'react'

// Define the initial state of your store
const initialState = {
  shops: []
  // Add your initial state properties here
}

// Create the StoreContext
const StoreContext = createContext(initialState)

export const ShopsProvider = ({ children }: { children: ReactNode }) => {
  const [shops] = React.useState([])
  return (
    <StoreContext.Provider
      value={{
        shops
        // Add your state properties here
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContext
