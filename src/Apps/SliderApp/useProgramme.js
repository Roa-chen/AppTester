import React, { useState, useEffect } from "react";
import { getProgramme } from "./programme";

export default useEditingProgramme = (programmeId) => {

  const [programme, setProgramme] = useState(getProgramme(programmeId));
  const [number, setNumber] = useState(7); //FIX create real id

  const addWeek = () => {
    setProgramme(({data}) => ({data: [...data, {name: 'week', id: number*111,data: []}]}))
    setNumber(number => number+1)
  }
  
  const delWeek = (index) => {
    setProgramme(({data}) => ({data: [...data.slice(0, index), ...data.slice(index+1)]}))
  }

  const swapWeek = (index1, index2) => {
    const min = Math.min(index1, index2)
    const max = Math.max(index1, index2)
    setProgramme(({data}) => ({data: [...data.slice(0, min), data[max], ...data.slice(min+1, max), data[min], ...data.slice(max+1)]}));
  }

  return {programme, addWeek, delWeek, swapWeek}
}

