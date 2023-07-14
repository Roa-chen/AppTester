import React, { useState, useEffect } from "react";
import { getProgramme } from "./programme";

export default useEditingProgramme = (programmeId) => {

  const [programme, setProgramme] = useState(getProgramme(programmeId));

  const addWeek = () => {
    setProgramme(({data}) => ({data: [...data, {name: 'week', data: []}]}))
  }
  
  const delWeek = (index) => {


    // console.log([...programme.data.toSpliced(0, index), ...programme.data.splice(index+1)])

    setProgramme(({data}) => ({data: [...data.slice(0, index), ...data.slice(index+1)]}))
  }

  return {programme, addWeek, delWeek}
}

