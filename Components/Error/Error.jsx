import React from 'react'
import style from "./Error.module.css"
export const Error = ({error}) => {
  return (
    <div className={style.Error}>
    <div className={style.Error_box}>
    <h1>Please Fix this error & reload browser</h1> 
    {error}
    </div></div>
  )
}
