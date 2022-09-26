import React, { createContext, useContext, useEffect, useState } from 'react'
import { StorageKey } from '../lib/keys/key'


enum enumThemeType {
    dark = 'Dark',
    light = 'Light',
}

type props = {
    children: React.ReactNode | React.ReactNode[]
}

type themeProviderType = {
    currentTheme: enumThemeType,
    setCurrentTheme: React.Dispatch<React.SetStateAction<enumThemeType>>,
    changeCurrTheme: () => void,
}

let themeContext = createContext<themeProviderType>({
    currentTheme: enumThemeType.light,
    setCurrentTheme: '' as unknown as React.Dispatch<React.SetStateAction<enumThemeType>>,
    changeCurrTheme: () => { },
})

export const useThemeContext = () => useContext(themeContext);

export const ThemeProvider: React.FC<props> = ({ children }) => {

    const [currentTheme, setCurrentTheme] = useState<enumThemeType>(() => {
        if (localStorage.getItem(StorageKey.theme)) return localStorage.getItem(StorageKey.theme) as enumThemeType
        else return enumThemeType.light
    });

    const changeCurrTheme = () => {
        const getBody = document.getElementById('body') as HTMLElement;
        if (currentTheme === enumThemeType.light){
            setCurrentTheme(enumThemeType.dark);
            getBody.style.backgroundColor = "#fff"
        } else{
            setCurrentTheme(enumThemeType.light);
            getBody.style.backgroundColor = "#222"
        } 
    }

    useEffect(() => {
        if (currentTheme === enumThemeType.light) localStorage.setItem(StorageKey.theme, enumThemeType.light)
        else localStorage.setItem(StorageKey.theme, enumThemeType.dark)
        
    }, [currentTheme])

    return (
        <div className={currentTheme == enumThemeType.light ? "lightClass" : "darkClass"}>

            <themeContext.Provider value={{ currentTheme : currentTheme, setCurrentTheme : setCurrentTheme, changeCurrTheme : changeCurrTheme}} >
                {
                    children
                }
            </themeContext.Provider>
        </div>
    );
}