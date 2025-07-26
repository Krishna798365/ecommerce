import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import OurPolicy from '../components/OurPolicy'

const About = () => {
  return (
  <div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    <div className ='my-10 flex flex-col md:flex-row gap-16'>
      <img src={assets.about_img} className='w-full md:w-[450px]' alt="" /> 
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem iste quidem, dignissimos quam provident blanditiis ex voluptatibus mollitia eos libero minima et sit aliquam accusamus eveniet! Quod voluptate dolore nobis?</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi animi, saepe, dolorem neque aut odio doloremque quis error qui facere, provident placeat nemo ea? Voluptates saepe repudiandae veniam beatae accusamus.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio voluptatibus vero, similique iure distinctio magni? Ut unde consectetur earum nostrum non molestiae asperiores labore eligendi natus, totam doloribus harum recusandae.</p>
      </div>
    </div>
    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'} />
  
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
         <b>Quality Assurance</b>
         <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem ex, ut, reiciendis maxime eos labore eveniet excepturi asperiores cum recusandae perspiciatis necessitatibus voluptatibus alias velit reprehenderit neque vitae? Accusamus.</p>
      </div>
      <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
         <b>Convinience</b>
         <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem ex, ut, reiciendis maxime eos labore eveniet excepturi asperiores cum recusandae perspiciatis necessitatibus voluptatibus alias velit reprehenderit neque vitae? Accusamus.</p>
      </div>
      <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
         <b>Exceptional customer service</b>
         <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem ex, ut, reiciendis maxime eos labore eveniet excepturi asperiores cum recusandae perspiciatis necessitatibus voluptatibus alias velit reprehenderit neque vitae? Accusamus.</p>
      </div>

    </div>
    <OurPolicy/>
 
  </div>
  )
}

export default About