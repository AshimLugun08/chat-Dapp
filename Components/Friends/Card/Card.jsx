import Link from 'next/link'
import React from 'react'
import style from "./Card.module.css"
import image from "../../../assets"
import Image from 'next/image'

export const Card = ({readMessage,name,address,el,i,readUser}) => {
  return (
    <div>
       <Link href={{pathname:'/',
       query: {name: `${el.name}`, address: `${el.pubkey}`}}}>
            <div className={style.card} onClick={()=>(readMessage(el.pubkey),readUser(el.pubkey),name(el.name),address(el.pubkey))}>
                <div className={style.Card_box}>
                    <div className={style.Card_box_left}>
                        <Image src={image.accountName}
                            alt ="username" 
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className={style.Card_box_right}>
                        <div className={style.Card_box_right_middle}> 
                        <h4>{el.name}</h4>
                        <small >{el.pubkey.slice(21)}..</small>
                         </div>
                         <div className={style.Card_box_right_end}>
                            <small>{i+1}</small>
                         </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
