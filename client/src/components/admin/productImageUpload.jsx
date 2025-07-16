import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { CloudUpload, FileIcon, X, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadImageUrl,
    setUploadImageUrl,
    imageUploading,
    setImageUploading,
    isEditMode
}) {

    const inputRef = useRef(null)

    // console.log('ref', inputRef)
    
    const handleImageFileChange = (event) => {
        const selectImageFile = event.target.files?.[0]
        if(selectImageFile) setImageFile(selectImageFile)
        
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if(droppedFile) setImageFile(droppedFile)

    }

    const handleRemoveImage = () => {
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = null
        }
    }

    const uploadImageToCloudinary = async() => {
        try {
            setImageUploading(true)
            const data = new FormData();
            data.append('my_file', imageFile)
    
            const result = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/admin/products/upload-image`,
                data,
            )
    
            // console.log(result.data.success)
    
            if(result.data.success) setUploadImageUrl(result.data?.result.url) 
        } catch (error) {
            console.log(error.message)
        }finally{
            setImageUploading(false)
            
        }
    }

    useEffect(() => {
        if(imageFile){
            uploadImageToCloudinary()
        }
    }, [imageFile])



  return (
    <div className='w-full px-5 pt-2'>
        {/* <label className='font-semibold '>Product Image</label> */}
        <div onDragOver={handleDragOver}  onDrop={handleDrop} className='p-4 border-2 border-dashed rounded-lg mt-1'>
            <Input
            id='image-upload'
            type='file'
            className='hidden'
            ref={inputRef}
            onChange={handleImageFileChange}
            disabled = {isEditMode}
            />
            {
                !imageFile ?  (
                    <label htmlFor='image-upload' className={` ${isEditMode ? 'cursor-not-allowed opacity-60' : '' } flex flex-col items-center justify-center p-4 text-center font-serif`}>
                        <CloudUpload size={33} />
                        Drag & drop or Click to upload Image
                    </label>
            ): (
                imageUploading ? <Skeleton className='h-10 bg-slate-300'/> :
                <div className='flex items-center justify-between'>
                    <div className='w-10 h-10 flex items-center'>
                        <FileIcon/>
                    </div>
                    <p className='text-sm font-medium truncate'>{imageFile.name}</p>
                    <Button 
                    variant = 'ghost'  
                    className='hover:bg-muted cursor-pointer'
                    size='icon'
                    onClick={handleRemoveImage}
                    >
                        <XIcon/>
                    </Button>
                </div>
            ) 
            }
        </div>

    </div>
  )
}

export default ProductImageUpload