"use client"
import Image from "next/image";
import { ChatAppContect } from "@/Context/ChatAppContext";
import { useContext } from "react";
import { Filter } from "../Components/index";
import { Friends } from "../Components/index";

export default function Home() {
  const {title}=useContext(ChatAppContect);
  return (
    
    <>
    <Filter/>
    <Friends/>
    </>
  );
}
