import { StarIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

function StarRating({rating, handleRating, iconSize }) {
  return (
    <div className='space-x-[5px] mt-1'>
        {handleRating ?
            [1,2,3,4,5].map((star) => (
                <Button 
                size='icon'
                variant='outline'
                key={star}
                className = {`rounded-full  ${rating >= star ? 'hover:bg-black' : 'hover:bg-yellow-300'}`} 
                onClick = {handleRating? ()=> handleRating(star): null }
                >
                    <StarIcon 
                    className={`${rating >= star ? 'fill-yellow-300': 'fill-black'} ${iconSize}`}
                    />
                </Button>
            )) : <div className='flex'>
              {
                [1,2,3,4,5].map((star) => (
                  <StarIcon 
                  key={star}
                  className={`${!rating ? 'fill-transparent' : rating >= star ? 'fill-yellow-300': 'fill-black'} ${iconSize}`}
                  />
                ))
              }
            </div>
        }
    </div>
  )
}


export default StarRating