"use client" ;
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from './/WorkspaceHeader';
import Canvas from './Canvas';
import Editor from './Editor';
import { useConvex } from 'convex/react';
import { FILE } from '../../dashboard/_components/FileList';
import { api } from '@/convex/_generated/api';

const page = ({params}:any) => {
    const [triggerSave,setTriggerSave]=useState(false);
    const convex = useConvex() ; 
    const [fileData,setFileData]=useState<FILE|any>();
    const getFileData=async()=>{
        const result=await convex.query(api.files.getFileById,{_id:params.field})
        console.log(result);
        setFileData(result);
      }
    useEffect(()=>{
        params.field&&getFileData() ;
    },[])

  return (
    <div>
      <WorkspaceHeader fileName={fileData?.fileName} onSave={()=>setTriggerSave(!triggerSave)}/>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='h-screen'> 
               <Editor onSaveTrigger={triggerSave}
               fileId={params.field}
               fileData={fileData}
               />
            </div>
            <div className='h-screen border'>
                <Canvas 
                onSaveTrigger={triggerSave}
                fileId={params.field} 
                fileData={fileData}
                />
            </div>
        </div>
    </div>
  )
}

export default page
