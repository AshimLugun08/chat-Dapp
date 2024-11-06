'use client'
import React, { useEffect, useState } from 'react';
import style from "./Chat.module.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import image from "../../../assets";
import { convertTime } from '@/Utils/apiFeature';
import { Loader } from '@/Components';

export const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUsername,
  currentuserAddress,
  name,
  address
}) => {
  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({ name: "", address: "" });

  const router = useRouter();

  // Ensure dependencies are specified correctly

  
    console.log("Chat Data:", name, address);
 

  return (
    <div className={style.Chat}>
      {currentUsername && currentuserAddress ? (
        <div className={style.Chat_user_info}>
          <Image src={image.accountName} alt="image" width={70} height={70} />
          <div className={style.Chat_user_info_box}>
            <h4>{currentUsername}</h4>
            <p className={style.show}>{currentuserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.Chat_user_box}>
        <div className={style.Chat_box}>
          <div className={style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div key={i}>
                {el.sender === address ? (
                  <div className={style.Chat_box_left_title}>
                    <Image src={image.accountName} alt="image" width={50} height={50} />
                    <span>{name} </span>
                    <small>Time: {convertTime(el.timestamp)}</small>
                  </div>
                ) : (
                  <div className={style.Chat_box_left_title}>
                    <Image src={image.accountName} alt="image" width={50} height={50} />
                    <span>{userName} </span>
                    <small>Time: {convertTime(el.timestamp)}</small>
                  </div>
                )}
                <p>{el.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {currentUsername && currentuserAddress ? (
          <div className={style.Chat_box_send}>
            <div className={style.Chat_box_send_img}>
              <Image src={image.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                placeholder="type.."
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={image.file} alt="file" width={50} height={50} />
              {loading ? (
                <Loader />
              ) : (
                <Image
                  src={image.send}
                  alt="send"
                  width={50}
                  height={50}
                  onClick={() => functionName(message, address)}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
