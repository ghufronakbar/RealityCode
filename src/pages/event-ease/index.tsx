import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import Image from 'next/image';
import { SiTerraform } from 'react-icons/si';


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    let lastScrollTop = 0;

    useEffect(() => {
        const handleScroll = () => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`fixed w-full bg-white shadow-md z-50 ${showNavbar ? 'top-0' : '-top-20'} transition-top duration-300`}>
            <div className="container mx-auto flex justify-between items-center p-4 font-poppins">
                <Image
                    src={'/event-ease/logo.png'} alt="Event Ease Logo" width={200} height={60} className='self-center w-32 h-auto'
                />
                <div className="hidden md:flex space-x-4">
                    <Link href="#hero" className='text-black hover:text-blue-500 font-poppins transition-colors duration-300'>Home</Link>
                    <Link href="#usp" className='text-black hover:text-blue-500 font-poppins transition-colors duration-300'>Why Us</Link>
                    <Link href="#product" className='text-black hover:text-blue-500 font-poppins transition-colors duration-300'>Product</Link>
                    <Link href="#testimonials" className='text-black hover:text-blue-500 font-poppins transition-colors duration-300'>Testimonials</Link>
                    <Link href="#contact" className='text-black hover:text-blue-500 font-poppins transition-colors duration-300'>Contact</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={handleMenuToggle} className="focus:outline-none">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <Link href="#hero" className='block text-black hover:text-blue-500 font-poppins transition-colors duration-300 p-4' onClick={handleMenuToggle}>Home</Link>
                    <Link href="#usp" className='block text-black hover:text-blue-500 font-poppins transition-colors duration-300 p-4' onClick={handleMenuToggle}>Why Us</Link>
                    <Link href="#product" className='block text-black hover:text-blue-500 font-poppins transition-colors duration-300 p-4' onClick={handleMenuToggle}>Product</Link>
                    <Link href="#testimonials" className='block text-black hover:text-blue-500 font-poppins transition-colors duration-300 p-4' onClick={handleMenuToggle}>Testimonials</Link>
                    <Link href="#contact" className='block text-black hover:text-blue-500 font-poppins transition-colors duration-300 p-4' onClick={handleMenuToggle}>Contact</Link>
                </div>
            )}
        </nav>
    );
};
const Hero = () => (
    <>
        <section id="hero" className="bg-event-ease bg-cover md:bg-fixed text-center w-full flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center text-center py-4 px-8 backdrop-brightness-50  w-full">
                <h1 className="text-5xl font-bold mb-4 font-poppins text-white drop-shadow-lg mt-24">Event Ease</h1>
                <p className="text-xl mb-6 font-poppins text-white drop-shadow-2xl">The ultimate event management solution for organizations and users</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                    <Link href="https://play.google.com/store/apps" target='_blank' className='flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-poppins hover:bg-white hover:text-blue-500 transition-colors duration-300 border-blue-500 border w-10/12 md:w-full mx-auto justify-center '>
                        <IoLogoGooglePlaystore />
                        <div >Download on Google Play</div>
                    </Link>
                    <Link href="https://eventease.vercel.app/admin/register" target='_blank' className='flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-poppins hover:bg-white hover:text-green-500 transition-colors duration-300 border-green-500 border w-10/12 md:w-full mx-auto justify-center'>
                        <SiTerraform />
                        <div >Register as Organization</div>
                    </Link>
                </div>
            </div>
            <div className="p-16 backdrop-brightness-50 w-full">
                <Image src="/event-ease/hero.png" alt="App Mockup" className="mx-auto lg:w-1/2 w-full md:mt-12" width={500} height={500} />
            </div>
        </section>

    </>
);

const UniqueSellingPoint = () => (
    <section id="usp" className="bg-white py-16">
        <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8 font-poppins text-black">Why Choose Event Ease?</h2>
            <div className="flex flex-wrap justify-center space-y-8 md:space-y-0 md:space-x-8">
                <div className="w-full md:w-1/3 p-4">
                    <Image src="/event-ease/security.png" alt="Security" className="mx-auto mb-4 w-auto h-40" width={300} height={300} />
                    <h3 className="text-xl font-semibold font-poppins text-black">Top-notch Security</h3>
                    <p className="font-poppins text-black">We ensure all events and organizations are verified and secure.</p>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <Image src="/event-ease/ease.png" alt="Ease of Use" className="mx-auto mb-4 w-auto h-40" width={300} height={300} />
                    <h3 className="text-xl font-semibold font-poppins text-black">Ease of Use</h3>
                    <p className="font-poppins text-black">Our platform is user-friendly and easy to navigate.</p>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <Image src="/event-ease/support.png" alt="Support" className="mx-auto mb-4 w-auto h-40" width={300} height={300} />
                    <h3 className="text-xl font-semibold font-poppins text-black">24/7 Support</h3>
                    <p className="font-poppins text-black">We offer round-the-clock support for any issues you may encounter.</p>
                </div>
            </div>
        </div>
    </section>
);

const Product = () => (
    <section id="product" className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8 font-poppins text-black">Our Product</h2>
            <p className="mb-8 font-poppins text-black">Discover the features that make our platform unique and efficient.</p>
            <div className="grid grid-cols-1 gap-8">
                <div className="flex flex-col md:flex-row items-center w-full">
                    <Image src="/event-ease/iphone.png" alt="Product Mockup" className="w-full md:w-1/2 px-32 py-2" width={500} height={500} />
                    <div className="text-left md:ml-8 font-poppins text-black mt-4 md:mt-0 w-full">
                        <h3 className="text-2xl font-bold">Comprehensive Event Management</h3>
                        <p className="mt-2">Event Ease offers a complete suite of tools to manage your events efficiently. From registration to ticketing, every aspect of event management is streamlined to save you time and effort.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center w-full">
                    <Image src="/event-ease/iphone.png" alt="Product Mockup" className="w-full md:w-1/2 px-32 py-2" width={500} height={500} />
                    <div className="text-left md:ml-8 font-poppins text-black mt-4 md:mt-0 w-full">
                        <h3 className="text-2xl font-bold text-end">Secure and Verified Organizations</h3>
                        <p className="mt-2 text-end">We prioritize security by ensuring all organizations are thoroughly verified. Our verification process includes legality checks and identity confirmation, giving you peace of mind when attending events.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center w-full">
                    <Image src="/event-ease/iphone.png" alt="Product Mockup" className="w-full md:w-1/2 px-32 py-2" width={500} height={500} />
                    <div className="text-left md:ml-8 font-poppins text-black mt-4 md:mt-0 w-full">
                        <h3 className="text-2xl font-bold">User-Friendly Ticket Purchasing</h3>
                        <p className="mt-2">Our platform makes it easy for users to purchase tickets for their favorite events. With a few simple clicks, you can secure your spot and receive instant confirmation, ensuring a smooth and hassle-free experience.</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

const Testimonial = () => (
    <section id="testimonials" className="bg-white py-16">
        <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8 font-poppins text-black">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center space-y-8 md:space-y-0 md:space-x-8">
                <div className="w-full md:w-1/3 p-4">
                    <Image src="/person/elon.webp" alt="Elon Musk" className="mx-auto mb-4 rounded-full w-30 h-30" width={100} height={100} />
                    <p className="font-poppins text-black">&quot;Event Ease has revolutionized how we manage our events. Highly recommended!&quot;</p>
                    <h3 className="text-xl font-semibold font-poppins text-black mt-2">- Elon Musk</h3>
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <Image src="/person/sam.jpeg" alt="Sam Altman" className="mx-auto mb-4 rounded-full w-30 h-30" width={100} height={100} />
                    <p className="font-poppins text-black">&quot;The platform is very user-friendly and secure. A great experience overall.&quot;</p>
                    <h3 className="text-xl font-semibold font-poppins text-black mt-2">- Sam Altman</h3>
                </div>
            </div>
        </div>
    </section>
);

const ContactInfo = () => (
    <section id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8 font-poppins text-black">Get In Touch</h2>
            <p className="mb-8 font-poppins text-black">Have any questions? Reach out to us and we’ll be happy to help.</p>
            <div className="flex flex-row justify-center md:gap-4 gap-2">
                <div>
                    <h3 className="text-xl font-semibold font-poppins text-black">Email</h3>
                    <p className="font-poppins text-black">support@eventease.com</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold font-poppins text-black">Phone</h3>
                    <p className="font-poppins text-black">+1 234 567 890</p>
                </div>
            </div>
        </div>
    </section>
);

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Event Ease - The Ultimate Event Management Solution</title>
                <meta name="description" content="Event Ease is the ultimate event management solution for organizations and users." />
            </Head>
            <Navbar />
            <Hero />
            <UniqueSellingPoint />
            <Product />
            <Testimonial />
            <ContactInfo />
        </div>
    );
};

export default Home;
