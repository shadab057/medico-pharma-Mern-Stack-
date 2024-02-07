import React from 'react';
import { Icon } from '@iconify/react';



const Feedback = () => {
  return (
    <>
     <div style={{ background: '#f7fafc', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
  <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '1rem', textDecoration: 'underline' }}>
      Contact Us
    </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e53e3e', marginBottom: '1rem' }}>
                Reach Out To Us
              </h2>
              <p style={{ color: '#4a5568' }}>
                Have a question, concern, or feedback? We're here to help! Reach out to us through the channels below,
                and we'll get back to you as soon as possible.
              </p>

              <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', marginTop: '1rem', textAlign: 'left'  }}>
                
                <p><Icon icon="icon-park-outline:right-two" color="pink" width="25" height="25" /><Icon icon="logos:google-gmail" color="skyblue" width="25" height="25" /><a href="mailto:support@pharmaeasy.com">support@pharmaeasy.com</a></p>
                <p><Icon icon="icon-park-outline:right-two" color="pink" width="25" height="25" /><Icon icon="ic:baseline-add-ic-call" color="blue" width="25" height="25" />Phone:9978545669</p>
                <p><Icon icon="icon-park-outline:right-two" color="pink" width="25" height="25" /><Icon icon="ion:location-sharp" color="skyblue" width="25" height="25" />Address: XYZ Tower near ABC Hospital</p>
              </ul>

              <p style={{ color: '#4a5568', marginTop: '1rem' }}>
               <b> Connect with us on social media for the latest updates, promotions, and delicious content:
               </b></p>
              <div style={{ display: 'flex', marginTop: '0.5rem' }}>
              <Icon icon="logos:facebook" color="skyblue" width="25" height="25" />
                <a href="https://www.facebook.com/login.php/" style={{ color: '#4299e1', textDecoration: 'underline' }}>
                  Facebook
                </a>
              <Icon icon="mdi:twitter"color="skyblue" width="25" height="25" />
                <a href="https://twitter.com/login" style={{ color: '#4299e1', textDecoration: 'underline', marginLeft: '0rem' }}>
                  Twitter
                </a>
                <Icon icon="skill-icons:instagram" color="skyblue" width="25" height="25" />
                <a href="https://www.instagram.com/?hl=en" style={{ color: '#4299e1', textDecoration: 'underline', marginLeft: '0rem' }}>
                  Instagram
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png"
                alt="Contact Foodie"
                style={{ width: '100%', height: 'auto', maxWidth: '34rem', borderRadius: '0.375rem' }}
              />
            </div>
          </div>

          
        </div>
         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div style={{ background: '#edf2f7', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1.25rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', maxWidth: '75vw', padding: '0.75rem' }}>
          <div>
            <img
              style={{ borderRadius: '50%', boxShadow: '0 0 0 1px #4299e1', cursor: 'pointer' }}
              src="https://img.freepik.com/premium-vector/vector-illustration-online-pharmacy-store-medicine-ordering-mobile-app_199064-1184.jpg"
              alt=""
              height="380px"
              width="400px"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', padding: '0.25rem', maxWidth: '50vw' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pharma made it easy</h1>
            <p style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: 'medium' }}>
              
                  Welcome to Our Pharmacy, where we've revolutionized the way you manage your health. 
                  Our online platform offers a seamless experience for booking your prescriptions, 
                  ensuring a hassle-free process from the comfort of your home. With a diverse range
                   of high-quality pharmaceuticals and a commitment to prompt, reliable delivery,
                    we make obtaining your medications easier than ever. Experience the convenience 
                    of online booking and enjoy the peace of mind that comes with our efficient and
                     secure delivery services. Your health is our priority, and we're here to make 
                     your pharmacy experience both easy and accessible.
            </p>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e53e3e', marginBottom: '1rem' }}>If You Have Any an Issue</h2>
            <form style={{ maxWidth: '20rem' }}></form>
          </div>

        <div style={{ display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.375rem', maxWidth: '20rem', alignItems: 'center', padding: '0.75rem' }}>
          <div style={{ padding: '0.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1rem', color: '#e53e3e', fontWeight: 'bold', textTransform: 'capitalize' }}>Let's connect on</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', padding: '0.25rem', maxWidth: '20rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', padding: '0.125rem', maxWidth: '20rem' }}>
              <Icon icon="ic:baseline-email" color="#ff8c00" height="4vh" />
              <p style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: 'medium' }}>lifecare@gmail.com</p>
            </div>
            <a href="https://github.com/login">
              <div style={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', padding: '0.125rem', maxWidth: '20rem' }}>
                <Icon icon="icon-park:github" height="4vh" />
                <p style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: 'medium' }}>GitHub</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/login">
              <div style={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', padding: '0.125rem', maxWidth: '20rem' }}>
                <Icon icon="devicon:linkedin" height="4vh" />
                <p style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: 'medium' }}>Linkedin</p>
              </div>
            </a>
            <a href="https://twitter.com/login">
              <div style={{ display: 'flex', flexDirection: 'row', gap: '0.25rem', padding: '0.125rem', maxWidth: '20rem' }}>
                <Icon icon="devicon:twitter" height="4vh" />
                <p style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: 'medium' }}>Twitter</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      </div>



    </>
  );
};

export default Feedback;