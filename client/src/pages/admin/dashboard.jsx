import ProductImageUpload from "@/components/admin/productImageUpload"
import { Button } from "@/components/ui/button"
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice"
import {Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AdminDashboard() {

  const [imageFile, setImageFile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const {featuredImagesList} = useSelector(state => state.feature)
  const dispatch = useDispatch()

  // console.log('upload image url ', uploadImageUrl, featuredImagesList)

  function handleUploadImage () {

    if(uploadImageUrl) {
      dispatch(addFeatureImage(uploadImageUrl)).then((data) => {
        if(data?.payload.success){
          dispatch(getFeatureImages())
        }
        setImageFile(null)
        setUploadImageUrl(null)
      })
    }
  }

  function handleDeleteFeaturedImage (imageId) {

    dispatch(deleteFeatureImage(imageId)).then(data => {
      if(data?.payload.success){
        dispatch(getFeatureImages())
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  },[])


  return (
    <div className="w-full">
      <label className= 'font-semibold text-xl ml-4'>Add Feature Images</label>
      <div className="mt-2">
        <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadImageUrl={uploadImageUrl}
        setUploadImageUrl={setUploadImageUrl}
        imageUploading={imageUploading}
        setImageUploading={setImageUploading}
        />
         
      </div>
      <div className="m-5">
      <Button
          onClick = {handleUploadImage}
          className='w-full'
          disabled={!uploadImageUrl}
          >
            Uplaod 
        </Button>
      </div>
      <h3 className="text-2xl font-semibold text-gray-400">{featuredImagesList.length > 0 ? `${featuredImagesList.length} Featured Images` : null} </h3>
      {
        featuredImagesList?.length ? featuredImagesList.map(featuredImage => (
          <div className = 'relative mt-4 rounded-sm overflow-hidden' key={featuredImage.image}>
            <img
            src={featuredImage.image}
            className="w-full h-[400px]"
            />
            <Button onClick = {() => handleDeleteFeaturedImage(featuredImage._id)} className="absolute z-10 right-2 top-4 ">
               <Trash2 size={30}/>

            </Button>

          </div>
        )) : (<h1>No featured Images added</h1>)
      }
        
    </div>
    
  )
}

export default AdminDashboard