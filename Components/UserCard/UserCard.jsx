import React from 'react';
import style from './UserCard.module.css';
import image from '../../assets';
import Image from 'next/image';

export const UserCard = ({ el, i, addFriend }) => {
  return (
    <div className={style.UserCard}>
      <div className={style.UserCard_box}>
        <Image
          src={image[`image${i + 1}`]} // Using standard img instead of Image
          alt="user"
          width={100}
          height={100}
          className={style.userImage} // Add styles if needed
        />
        <div className={style.UserCard_box_info}>
          <h3 className={style.name}>{el.name}</h3>
          <p className={style.name}>{el.accountAddress.slice(0, 25)}..</p>
          <button onClick={() => addFriend( el.name,  el.accountAddress )}>
            Add Friend
          </button>
        </div>
      </div>
      <small className={style.number}>{i + 1}</small>
    </div>
  );
};
