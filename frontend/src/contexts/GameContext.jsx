import { createContext, useState, useContext, useEffect } from "react";

const GameContext = createContext()

export const useGameContext = () => useContext(GameContext)

export const GameProvider = ({children}) => {
   
   const [userID, setUserID] = useState([])

    useEffect(() => {
        const storedUserID = localStorage.getItem("userID")

        if (storedUserID) setUserID(storedUserID)
    }, [])

    useEffect(() => {
        localStorage.setItem('userID', userID)
    }, [userID])

    const addToUserID = (userID) => {
        setUserID(userID)
    }

    const removeFromUserID = () => {
        setUserID(0)
    }

    const [username, setUsername] = useState([])

    useEffect(() => {
        const storedUsername = localStorage.getItem("username")

        if (storedUsername) setUsername(storedUsername)
    }, [])

    useEffect(() => {
        localStorage.setItem('username', username)
    }, [username])

    const addToUsername = (username) => {
        setUsername(username)
    }

    const removeFromUsername = () => {
        setUsername("Log In")
    }
    
    const value = {
        userID,
        addToUserID,
        removeFromUserID,
        username,
        addToUsername,
        removeFromUsername
    }

    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>
}