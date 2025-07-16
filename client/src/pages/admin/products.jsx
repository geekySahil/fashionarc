import AdminProductTile from "@/components/admin/product-tile"
import ProductImageUpload from "@/components/admin/productImageUpload"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config/auth"
import { toast } from "@/hooks/use-toast"
import { addNewProduct, editProductDetails, getAllProducts, removeProduct } from "@/store/product-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AdminProducts() {

  const initialFormState = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
  }

  const {isLoading, products}  = useSelector(state => state.product)

  const dispatch = useDispatch()
  
  const [addProductSidebar, setAddProductSidebar] = useState(false)
  const [productForm, setProductform] = useState(initialFormState)
  const [imageFile, setImageFile] = useState(null)
  const [uploadImageUrl, setUploadImageUrl] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [editProductId, setEditProductId] = useState(null)



  const handleRemoveProduct = (id) => {
    console.log('eidt ', editProductId)
    dispatch(removeProduct(id)).then((data) => {
      console.log(data.payload.success)
      if(data.payload.success){
        dispatch(getAllProducts()).then((data) => {console.log(data)})

      }
    })
  }





  async function onSubmit (e) {
    e.preventDefault()

    editProductId !== null ? 
    dispatch(editProductDetails({
      formData: productForm,
      id: editProductId
    })).then((data) => {
      console.log(data)

      if(data.payload.success) {
        dispatch(getAllProducts())
        setProductform(initialFormState)
        setEditProductId(null)
        setAddProductSidebar(false)

      }
    }) : 
    dispatch(addNewProduct({
      ...productForm,
      image: uploadImageUrl
    })).then((data) => {
      if(data.payload.success) {
        dispatch(getAllProducts())
        setImageFile(null)
        setProductform(initialFormState)
        toast({
          title: 'Product added successfully'
        })
      }
      setAddProductSidebar(false)
    })
  }


  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const isFormCompleted = Object.keys(productForm).map((key) => productForm[key] !== "").every(item => item)
  // console.log('isformcompleted', isFormCompleted)




  return (
    <div className="flex-col h-full w-full">
      <div className="flex items-center justify-end">
        <Button onClick={()=> {
            setAddProductSidebar(!addProductSidebar)
            setProductform(initialFormState)
            setEditProductId(null)
          }} className=''>
            Add Product
          </Button>
      </div>
       
        <Sheet open={addProductSidebar} onOpenChange={
          () => setAddProductSidebar(!addProductSidebar)
        }>
          <SheetContent side = 'right' className= 'overflow-auto'>
            <SheetHeader >
              <SheetTitle className = 'flex items-center gap-x-1 px-3'>
              <label htmlFor="sidebar">Add Product</label>
              </SheetTitle>
            </SheetHeader>
            <h3 className="mx-5 mt-2 font-semibold text-gray-500">Product Image</h3>
            <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            imageUploading={imageUploading}
            setImageUploading={setImageUploading}
            isEditMode={editProductId !== null }
            />
            <CommonForm 
            formController={addProductFormElements} 
            form={productForm} 
            setForm={setProductform} 
            onSubmit={onSubmit} 
            buttonText={`${editProductId ? 'Edit' : 'Add'}`}
            isDisable={isFormCompleted !== true}
            />
          </SheetContent>
        </Sheet>
        <div className="grid grid-cols-1 sm:grid-cols-3 m-2 gap-4 ">
          {
            products && products.length > 0 && products.map((product) => 
            <AdminProductTile 
            key = {product._id} 
            setEditProductId={setEditProductId} 
            setAddProductSidebar={setAddProductSidebar}
            setProductform={setProductform}
            product={product}
            handleRemoveProduct={(id) => handleRemoveProduct(id)}
            />)
          }
        </div>
        
    </div>
  )
}

export default AdminProducts