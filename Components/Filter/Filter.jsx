"use client";
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import style from "./Filter.module.css";
import { ChatAppContect } from '@/Context/ChatAppContext';
import { Model } from '../index'; // Adjusted import path
import image from "../../assets";

export const Filter = () => {
    const { account, addFriend } = useContext(ChatAppContect);
    const [addFriends, setAddFriend] = useState(false);

    return (
        <div className={style.Filter}>
            <div className={style.Filter_box}>
                <div className={style.Filter_box_left}>
                    <div className={style.Filter_box_left_search}>
                        <Image src={image.search} alt="image" width={20} height={20} />
                        <input type="text" placeholder='search...' />
                    </div>
                </div>
                <div className={style.Filter_box_right}>
                    <button>
                        <Image src={image.clear} alt="clear" width={20} height={20} />
                        CLEAR CHAT
                    </button>
                    <button onClick={() => setAddFriend(true)}>
                        <Image src={image.create2} alt="clear" width={20} height={20} />
                        ADD FRIEND
                    </button>
                </div>
            </div>
            {/* MODAL COMPONENT */}
            {addFriends && (
                <div className={style.Filter_model}>
                    <Model 
                        openBox={setAddFriend}
                        title="WELCOME TO"
                        head="CHAT BUDDY"
                        info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
                        smallInfo="Kindly Select Your Friend Name & Address.."
                        image={image.hero}
                        functionName={addFriend}
                    />
                </div>
            )}
        </div>
    );
};
