"use client";
import React, { useContext } from 'react';
import { UserCard } from '@/Components';
import style from "../../styles/allusers.module.css";
import { ChatAppContect } from '@/Context/ChatAppContext';
 const Allusers =() =>  {
  const { userList, addFriend } = useContext(ChatAppContect);

  return (
      <div>
          <div className={style.alluser_info}>
              <h1> Find your Friends</h1>
          </div>
          <div className={style.alluser}>
              {userList.map((el, i) => (
                  <UserCard key={i+1} el={el} i={i} addFriend={addFriend} />
              ))}
          </div>
      </div>
  );
};
export default Allusers