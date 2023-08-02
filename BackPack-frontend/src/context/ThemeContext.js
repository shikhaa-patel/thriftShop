import React, { createContext, useState,useEffect } from "react";
const ThemeContext=createContext()
export default ThemeContext;

export const ThemeProvider=({children})=>{
    
    const [theme,setTheme]=useState(localStorage.getItem('theme')?localStorage.getItem('theme'):'light')
    const toggleTheme=()=>{
        if(theme==='light'){
            setTheme('dark');
            localStorage.setItem('theme','dark');
        }
        else {
            setTheme('light');
            localStorage.setItem('theme','light');
        }
    }

    const [myStyle, setMyStyle] = useState({})

    const [inputStyle,setInputStyle]=useState({})

    useEffect(() => {
        if (theme === 'dark') {
            setMyStyle({
                background: '#121212',
                color: 'white'
            })
            setInputStyle({
                background:'#404040',
                color:"rgb(10 229 245)"
            })
        }
        else {
            setMyStyle({
                background: 'white',
                color: '#181818'
            })
            setInputStyle({
                background:"white",
                color:"rgba(1, 90, 72, 0.822)"
            })
        }
    }, [theme])


    return(
        <ThemeContext.Provider value={{theme,toggleTheme,myStyle,inputStyle}}>  
            {children}
        </ThemeContext.Provider>
    )
}