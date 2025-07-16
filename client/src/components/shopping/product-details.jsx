import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent } from "../ui/dialog"
import { StarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { useDispatch, useSelector } from "react-redux"
import { reInitializeProductDetails } from "@/store/shopping-slice"
import StarRating from "./star-rating"
import { useEffect, useState } from "react"
import { addReview, getAllReviews } from "@/store/review-slice"
import { toast } from "@/hooks/use-toast"
import ShowMore from "./show-more"

function ProductDetailsModal({open, setOpen, productDetails, handleAddToCart}) {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {isLoading, reviewsList} = useSelector(state => state.review)
    const [rating, setRating] = useState(0)
    const [reviewMsg, setReviewMsg] = useState('')


    const avgRating = reviewsList.reduce((sum, reviewItem) => sum + reviewItem?.reviewRating , 0)/reviewsList.length

    const handleRating = (getRating)  => { 
        setRating(getRating)
    }

    const handleAddReview = () => {

        if(!rating || !reviewMsg){
            return toast({
                title: 'Missing review details', 
                variant: 'destructive'
            })
        }
        dispatch(addReview({
            productId: productDetails._id,
            userId: user.id,
            reviewMessage: reviewMsg,
            username: user.username,
            reviewRating: rating
        })).then(data => {
            if(data?.payload?.success) {
                dispatch(getAllReviews(productDetails?._id))
            }else{
                toast({
                    title: data?.payload.message,
                    variant: 'destructive'
                })
            }
            setRating(0)
            setReviewMsg('')
        })
    }

    useEffect(() => {
        if(productDetails) dispatch(getAllReviews(productDetails?._id))
    }, [productDetails])

  return (
    <Dialog open={open} onOpenChange={() => {
        dispatch(reInitializeProductDetails())
        setOpen(false)
        setRating(0)
        setReviewMsg('')
    }}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogContent className = 'grid max-md:h-[90vh] grid-cols-1 md:grid-cols-2 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] p-8 rounded-lg ' >
            
            <div className="relative overflow-hidden rounded-lg">
                <img
                src={productDetails?.image}
                alt={productDetails?.title}
                width={600}
                height={600}
                className="aspect-square object-cover w-full h-full rounded-lg"
                />
            </div>
            <div className="grid m-1 max-h-[70vh] overflow-y-auto">
                <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
                {/* <p className="text-xl text-muted-foreground">{productDetails?.description}</p> */}
                <ShowMore text={productDetails?.description} addStyles={'text-xl'}/>
                <div className="flex items-center my-2">
                    <StarRating rating={avgRating} iconSize={'w-6 h-6'}/>
                    <span className="text-muted-foreground font-semibold ml-2">({avgRating.toFixed(1)})</span>
                </div>

                <div className="flex items-center text-2xl gap-x-3 font-mono my-1">
                    <h3 className={`${productDetails?.salePrice > 0 ? 'line-through': 'font-semibold'}`}>${productDetails?.price}</h3>
                    <h3 className={`${productDetails?.salePrice > 0 ? 'font-semibold': 'hidden'}`}>${productDetails?.salePrice}</h3>
                </div>
                <Button onClick = {() => handleAddToCart(productDetails._id)} className='w-full mt-4 mb-6'>
                    Add To Cart
                </Button>
                <Separator/>
                <div>
                    <div className="max-h-[150px] overflow-auto mt-2 ">
                        <div className="">
                            {
                                reviewsList?.length > 0 ? reviewsList.map((reviewItem) => (
                                    <div key={reviewItem.userId} className="flex my-2 pb-2 border-b-2 gap-2">
                                        <Avatar >
                                            <AvatarFallback className = 'bg-black text-white text-xl font-semibold'>
                                                {reviewItem.username.split('')[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <div className="flex items-center py-1">
                                                <h4 className="font-semibold text-lg">{reviewItem.username}</h4>
                                            </div>
                                            <StarRating rating={reviewItem.reviewRating} iconSize={'w-4 h-4'}/>
                                            <div className="mt-2 text-lg font-serif">
                                                <p>{reviewItem.reviewMessage}</p>
                                            
                                            </div>

                                        </div>
                                        
                                    </div>
                                )) : <h3>No reviews yet</h3>
                            }
                            
                            
                        </div>
                        
                    </div>
                </div>
                <StarRating rating={rating} handleRating={handleRating}/>
                <div className='flex w-full p-1 rounded-md '>
                    <Input 
                    name = 'reviewMsg' 
                    value={reviewMsg} 
                    placeholder = 'Add your review here' 
                    type='text'
                    onChange = {(e) => setReviewMsg(e.target.value)}
                    />
                    
                    <Button
                    onClick={handleAddReview}
                    >
                        Add
                    </Button>
                </div>
                   
                
                


            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsModal
