import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const CARD_WIDTH = 200 // Adjust as needed
const GAP = 24 // px, matches 'gap-6'
const SCROLL_STEP = 2 // px
const IMAGE_HEIGHT = 210 // px

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])
  const scrollRef = useRef(null)

  // Create an "infinite" carousel list
  useEffect(() => {
    const base = products.slice(0, 15)
    setLatestProducts([...base, ...base, ...base])
  }, [products])

  useEffect(() => {
    const { current } = scrollRef
    if (!current) return

    let animationId
    let isPaused = false

    const maxScroll = (latestProducts.length / 3) * (CARD_WIDTH + GAP)

    function slide() {
      if (!isPaused) {
        if (current.scrollLeft >= maxScroll) {
          current.scrollLeft = 0 // Reset for seamless infinite loop
        } else {
          current.scrollLeft += SCROLL_STEP
        }
      }
      animationId = requestAnimationFrame(slide)
    }

    animationId = requestAnimationFrame(slide)

    // Pause on hover/touch
    const pause = () => { isPaused = true }
    const resume = () => { isPaused = false }

    current.addEventListener('mouseenter', pause)
    current.addEventListener('mouseleave', resume)
    current.addEventListener('touchstart', pause)
    current.addEventListener('touchend', resume)

    return () => {
      cancelAnimationFrame(animationId)
      current.removeEventListener('mouseenter', pause)
      current.removeEventListener('mouseleave', resume)
      current.removeEventListener('touchstart', pause)
      current.removeEventListener('touchend', resume)
    }
  }, [latestProducts])

  return (
    <div className="my-10">
      <div className="text-center pb-4">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-1">
          Discover products with smooth, auto-centered sliding showcase.
        </p>
      </div>
      <div className="relative flex justify-center"> {/* Center the carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-2 py-4 no-scrollbar items-center"
          style={{
            scrollBehavior: 'smooth',
            cursor: 'grab',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'center'
          }}
        >
          {latestProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center min-w-[200px] max-w-[200px] flex-shrink-0 hover:shadow-lg transition-shadow duration-100 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[200px] h-[210px] object-cover rounded-md mb-2 mx-auto"
                style={{ display: 'block' }}
              />
              <div className="font-semibold text-base text-gray-800 text-center truncate w-full">
                {item.name}
              </div>
              <div className="text-gray-600 font-medium text-center">
                ${item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LatestCollection
