import React from 'react'
import Image from 'next/image'
import style from "./Loader.module.css"
import image from "../../assets"


export const Loader = () => {
  return (
    <div className={style.Loader}>
      <div className={style.Loader_box}>
        <Image src={image.loader} alt="loading....."   width={100 } height={100}/>
      </div>
    </div>
  )
}
