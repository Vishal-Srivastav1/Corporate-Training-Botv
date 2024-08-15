
"use client";

import { FaBars } from "react-icons/fa";
import { Card } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { FaMicrophone,FaUserSecret } from "react-icons/fa";
import { GiLightningMask } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import PropTypes from "prop-types";


import { HiArrowSmRight, HiChartPie, HiInbox, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { use, useContext, useState } from "react";
import { Context } from "./context/Context";

export default function Home() {
   const [extended, setExtended]= useState(false)
  
  const { onSend, recentPrompt,showResult, loading, prevPrompts,resultData,setInput,input,setRecentPrompt,newChat,cardData,setCardData } =useContext(Context)
  
  const loadPrompt= async (prompt)=>{
        setRecentPrompt(prompt)
        await onSend(prompt)
  }
  
  const exampleMessages = [
    {
      id:1,
      heading: 'Technical Courses', 
    },
    {
      id:2,
      heading: 'Management Courses', 
    },
    {
      id:3,
      heading: 'Behavioral Courses',
      
    },
    {
      id:4,
      heading: 'Leadership Courses',
    
    },
    {
      id:5,
      heading: 'Compliance Courses',
    
    },
    {
      id:6,
      heading: 'Social Impact Courses',
    
    }
  ]
  
   return (
    <div className=" font-serif overflow-hidden ">
         <div className="flex flex-row"> 
          <div className=" hidden md:block min-h-screen flex-col ">
          <Sidebar className="w-30 font-serif fixed" aria-label="Default sidebar example">
      <Sidebar.Items className="px-1">
        <Sidebar.ItemGroup>
          
          <Sidebar.Item onClick={()=>setExtended(prev=>!prev)} icon={FaBars} className="hover:bg-transparent ">
          </Sidebar.Item>
          <Sidebar.Item icon={HiChartPie}>
           {extended ? <p>Corporate Training Bot</p> :null}
          </Sidebar.Item>

          <Sidebar.Item onClick={()=>newChat()} >
          <div className="flex gap-2 cursor-pointer -translate-x-3 opacity-70 bg-[#d6dbdc] p-2 rounded-3xl">
          <IoMdAdd size={'25px'}/>
           {extended ? <p>NewChat</p> :null}
           </div>
          </Sidebar.Item>
         
     {extended 
        ? <div className="itemsp overflow-y-scroll h-[320px]  animate-pulse">
          <Sidebar.Item  className=" ">
          <p className="">Recent&nbsp;.....</p> 
          {prevPrompts.map((item,index)=> {
                return (
                  <Sidebar.Item  onClick={()=>loadPrompt(item)} >
                    <div className="flex flex-row gap-2 cursor-pointer ">
                  <MdOutlineForwardToInbox size={'25px'} />
                  <p key={index} className=" "> {item.slice(0,18)}&nbsp;...</p>
                  </div>
                  </Sidebar.Item>
                )
          })}
          </Sidebar.Item>
          </div>
          :<p className=" h-[320px]"></p>}
          
         
         <div className="mt-0 fixed">
         <div className="mt-0">
         <Sidebar.Item  icon={HiArrowSmRight}>
            {extended ? <p> Sign In</p> :null}
          </Sidebar.Item>
          </div>
          <Sidebar.Item  icon={HiTable}>
             {extended ? <p> Sign Up</p> :null}
          </Sidebar.Item>
          <Sidebar.Item  icon={BiBuoy}>
            {extended ? <p> Help</p> :null}
          </Sidebar.Item>
         </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
          </div>
         
          <div className=" flex  flex-col items-center w-full m-auto overflow-hidden ">
           
            <div className="flex pb-0 w-full flex-col items-center overflow-hidden ">
              <div className="flex flex-row justify-between md:w-[1000px] w-[390px]  rounded-3xl overflow-hidden ">
               <div className="p-2"> 
                 <h1 className=" bg-white p-3 rounded-3xl md:w-[300px]"><b>Corporate Training Bot</b></h1>
               </div>

               <div className="p-2 md:hidden">
                <p onClick={()=>newChat()} className=" bg-white p-3 rounded-3xl  text-end">New Chat</p>
               </div>
              </div>
              {!showResult
              ? <>
              <div className="font-mono md:mt-15 p-2 text-center md:text-left">
              <p><span className=" md:text-4xl text-lg text-[#549afd66] bg-transparent">Hello, Sr.</span></p>
              <p className="md:text-3xl text-lg text-[#5656]  bg-transparent">How can i help you today?</p>
              <p className=" text-[#5656]  bg-transparent hidden md:block">Corporate Training Bot: Provides training resources for employees.</p>
             </div>

              <div className="flex flex-row md:gap-2 p-1 mb-8 md:mb-20">
              <div className="  grid grid-cols-2">
               
                 {exampleMessages.map((example)=> {
                return (
                  <div onClick={()=>loadPrompt(example.heading)} className="Card p-1 cursor-pointer ">
                  <Card  className="max-w-sm hover:bg-[#d6dbdc]">
                   <p key={example.id}> {example.heading} </p>
                   </Card>
                  </div>
                )
          })}

                  </div>

             </div>
       
              </>
              :<div className="result overflow-y-scroll mb-0 pt-[-20px] md:w-[750px] w-[340px] md:h-[465px] h-[422px] justify-center">
                  <div className="mb-4 mt-2 flex flex-row gap-4 ">
                   <FaUserSecret size={'28px'}/>
                    <p className="text-2xl font-semibold">{recentPrompt}</p>
                  </div>

                  <div className="resultData mb-3 flex flex-row gap-4 ">
                    <GiLightningMask size={'30px'}/>
                   {loading
                   ? <div className="loader w-full flex flex-col gap-3">
                    <hr />
                    <hr />
                    <hr />
                   </div>
                  : <p className="font-light font-sans leading-6 justify-between items-center " dangerouslySetInnerHTML={{__html:resultData}}></p>
                     }
                    
                  </div>
                </div>
              }
             
            
             <div className="pt-0 pb-4 md:pb-0 mt-4 md:mt-0 items-center justify-center flex ">
              <div className="p-0 flex flex-row  sticky  m-auto" >
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" name="text"  className=" shadow-lg rounded-s-3xl md:h-16 h-14  py-2.5 px-4 font-mono md:w-[650px]  text-lg  text-gray-900 border-0  appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 bg-[#ffffff] peer" placeholder=" Write your Prompt here...! " required />
                
              <div className="flex justify-around md:h-16 h-14 w-32 md:pt-5 pt-6 rounded-e-3xl shadow-lg bg-[#ffffff]">
                <p className="opacity-75 hidden md:block"><LuImagePlus size={'22px'} /></p>
                <p className="opacity-75 hidden md:block"><FaMicrophone size={'22px'} /></p>
                {input?<p onClick={()=>onSend()} className="opacity-75 hidden -translate-y-1 mr-1 md:block"><IoIosSend size={'30px'} /></p>:null}
               
                <p className="opacity-75 md:hidden "><LuImagePlus size={'18px'} /></p>
                <p className="opacity-75 md:hidden"><FaMicrophone size={'18px'} /></p>
                {input?<p onClick={()=>onSend()} className="opacity-75 md:hidden -translate-y-1 mr-1"><IoIosSend size={'26px'} /></p>:null}
              
              </div>

              </div>
              </div>
             <a className="p-1 hidden md:block">Corporate AI Training Bot: Provides training resources for employees.</a>
    </div>
    </div>
    </div>
    </div>
  );
}
