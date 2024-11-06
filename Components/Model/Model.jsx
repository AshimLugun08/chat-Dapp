"use client"
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import style from './Model.module.css';
import images from '../../assets';
import { ChatAppContect } from '@/Context/ChatAppContext';
import { Loader } from '../index';

export const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName
}) => {
  const [name, setName] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const { loading } = useContext(ChatAppContect);
  
  

  return (
    <div className={style.Modal}>
      <div className={style.Modal_box}>
        <div className={style.Modal_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={style.Modal_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>
          {loading==true ? (
            <Loader/>
          ):(
            <div className={style.Modal_box_right_name}>
            <div className={style.Modal_box_right_name_info}>
              <Image src={images.username} alt="user" width={30} height={30} />
              <input
                type="text"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={style.Modal_box_right_name_info}>
              <Image src={images.account} alt="account" width={30} height={30} />
              <input
                type="text"
                placeholder="Account address"
                onChange={(e) => setAccountAddress(e.target.value)}
              />
            </div>
            <div className={style.Modal_box_right_name_btn}>
              <button onClick={() => functionName({ name, accountAddress })}>
                <Image src={images.send} alt="send" width={30} height={30} />
                Submit
              </button>
              <button onClick={() => openBox(false)}>
                <Image src={images.close} alt="close" width={30} height={30} />
                Cancel
              </button>
            </div>
          </div>
          )

          }
          
        </div>
      </div>
    </div>
  );
};
