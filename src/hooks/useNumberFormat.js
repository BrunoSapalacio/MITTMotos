import { useState, useEffect } from 'react'

export const useNumberFormat = (value) => {
    const [newValue, setNewValue] = useState(value)
    console.log(value)

    useEffect(() => {
        if (value > 0 ) {
            return setNewValue(value.toLocaleString('pt-BR'))
        }
    },[value])


    return newValue
}


export default useNumberFormat