import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const RatingStar = (props) => {
    const [hover, setHover] = useState(false)

  return (
    <div>
        <div className=' flex gap-2'>
        {([...Array(5)].map((star, i) => {
            const ratingValue = i + 1
            return (
                <label>
                    <input className=' hidden' type="radio" name="rating" value={ratingValue} onClick={() => props.setRating(ratingValue)} />
                    <FaStar
                        className=' cursor-pointer'
                        color={ratingValue <= (hover || props.rating) ? "#ffc107" : "#e4e5e9"}
                        size={18}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        />
                </label>
            )
        }))}
        </div>
        </div>

  )
}

export default RatingStar