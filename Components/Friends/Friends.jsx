"use client"
import React, { useContext, useEffect ,useState} from 'react'
import style from "./Friends.module.css"
import { Chat } from './Chat/Chat'
import { Card } from './Card/Card'
import { ChatAppContect } from '@/Context/ChatAppContext'
// import { useRouter } from 'next/navigation'

export const Friends = () => {
  const {readMessage, sendMessage, friendMsg, account, friendsList, userName, loading, currentUsername, currentuserAddress, readUser} = useContext(ChatAppContect);
 const [name ,setName]=useState("")
 const [address ,setAddress]=useState("")
  return (
    <div className={style.Friend}>
      <div className={style.Friend_box}>
        <div className={style.Friend_box_left}>
          {friendsList.map((el,i)=>(
            <Card key={i+1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
              name={setName}
              address={setAddress}
            />
          ))}
        </div>
        <div className={style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUsername={currentUsername}
            currentuserAddress={currentuserAddress}
            name={name}
            address={address}
          />
        </div>
      </div>
    </div>
  )
}
