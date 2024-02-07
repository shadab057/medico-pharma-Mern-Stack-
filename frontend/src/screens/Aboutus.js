import React from 'react';
import { Icon } from '@iconify/react';
import Footer from '../components/Footer';
import ReactEmoji from 'react-emoji';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SubdirectoryArrowRightTwoToneIcon from '@mui/icons-material/SubdirectoryArrowRightTwoTone';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';

const Aboutus = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8 relative">
        
         {/* Section for the catchy title with added emoji */}
         <div className="text-3xl font-extrabold text-blue-600 mb-8 underline">
          <h4><AddReactionIcon/>Laughter is the Best Medicine, but We've Got the Second Best....</h4>
          
        </div>

        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 underline">
            About Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">
              Our Mission
              </h2>
              <p className="text-gray-700">
                <h6><LocalHospitalTwoToneIcon/>At Easypharma, our mission is to redefine global healthcare through a relentless 
                pursuit of innovation, patient-centered solutions, and unwavering ethical standards. Committed to enhancing lives, 
                we strive to develop and provide cutting-edge pharmaceuticals that not only address current healthcare needs but also 
                anticipate and meet the evolving challenges of the future. Grounded in scientific excellence, we leverage advanced research and
                 development to push the boundaries of medical knowledge, contributing to breakthroughs that positively impact patients 
                 worldwide.</h6>
                 
                 <h6>Our dedication extends beyond scientific endeavors; it encompasses a profound commitment to ethical integrity, ensuring
                 transparency, trust, and compliance in every aspect of our operations. We believe in making quality healthcare accessible 
                 globally, striving to bridge gaps and promote equality in healthcare outcomes. Empowering our diverse workforce is fundamental 
                 to our success, fostering a culture of collaboration, inclusion, and innovation.</h6>
              </p>
            </div>

            <div className="md:flex md:items-center">
              <img
                src="https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBoYXJtYWN5fGVufDB8fDB8fHww"
                alt="About Pharma Store"
                className="w-full h-auto md:w-96 mx-auto rounded-md"
              />
            </div>
          </div>
          

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              OUR PHARMACY BENEFITS
            </h2>
            
          </div>

          <p className="mt-8 text-gray-700">
            <h4>
            <p><SubdirectoryArrowRightTwoToneIcon/>Health at Your Fingertips..</p>
            <p><SubdirectoryArrowRightTwoToneIcon/>Confidential Care, Conveniently Delivered..</p>
            <p><SubdirectoryArrowRightTwoToneIcon/>Empowering Wellness through Information..</p>
            <p><SubdirectoryArrowRightTwoToneIcon/>Seamless Medication Management..</p>
            <p><SubdirectoryArrowRightTwoToneIcon/>Heading: 24/7 Health Support..</p>
            </h4>
            </p>
            
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Aboutus;