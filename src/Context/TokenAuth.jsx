import React, { createContext, useState } from 'react'
export const tokenAuthorizationContext = createContext()
function TokenAuth({children}) {
    const [Isauthorized,setIsAuthorized] = useState(false)
  return (
    <>
    <tokenAuthorizationContext.Provider value={{Isauthorized,setIsAuthorized}}>
      {children}
    </tokenAuthorizationContext.Provider>
    </>
  )
}

export default TokenAuth