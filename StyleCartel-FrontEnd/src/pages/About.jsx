import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import OurPolicy from '../components/OurPolicy'
import Chatbot from '../components/Chatbot'
import { ShieldCheck, ShoppingBag, Headset } from "lucide-react"; // icons

const About = () => {
  const features = [
    {
      title: "Quality Assurance",
      desc: "We ensure every product meets the highest standards of quality, so you always get the best in fashion.",
      icon: <ShieldCheck className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Convenience",
      desc: "Seamless browsing, easy checkout, and fast delivery designed to make your shopping experience effortless.",
      icon: <ShoppingBag className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Exceptional Customer Service",
      desc: "Our dedicated support team is here to help you anytime with personalized style and order assistance.",
      icon: <Headset className="w-8 h-8 text-pink-500" />,
    },
  ];

  return (
    <div>
      <Chatbot />
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About section */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:w-[450px]' alt="" /> 
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem iste quidem, dignissimos quam provident blanditiis ex voluptatibus mollitia eos libero minima et sit aliquam accusamus eveniet! Quod voluptate dolore nobis?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi animi, saepe, dolorem neque aut odio doloremque quis error qui facere, provident placeat nemo ea? Voluptates saepe repudiandae veniam beatae accusamus.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio voluptatibus vero, similique iure distinctio magni? Ut unde consectetur earum nostrum non molestiae asperiores labore eligendi natus, totam doloribus harum recusandae.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-start gap-4 border rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all bg-white"
          >
            <div className="p-3 bg-pink-50 rounded-full">
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-800">{f.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <OurPolicy />
    </div>
  )
}

export default About
