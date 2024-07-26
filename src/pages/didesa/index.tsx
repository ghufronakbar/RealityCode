import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaGooglePlay } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";

const Hero = () => {
    return (
        <>
            <section id="hero" className="w-full h-fit min-h-screen bg-didesa bg-cover md:bg-fixed">
                <div className="w-full h-full min-h-screen py-40 lg:px-32 md:px-20 px-8 gap-2 bg-black bg-opacity-25 backdrop-blur-sm">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="font-playfair text-white lg:text-6xl md:text-5xl text-4xl md:max-w-[40vw] drop-shadow-lg">Membawa Desa ke Era Digital.</div>
                        <div className="font-rubik text-white text-base md:text-lg drop-shadow-lg">Di Desa - Digitalisasi Desa</div>
                    </div>
                    <div className="flex w-full md:w-8/12 lg:w-5/12 mt-12 mx-auto">
                        <input className="w-10/12 h-10 px-4 !rounded-l-lg focus:outline-none bg-white bg-opacity-20 backdrop-blur-sm text-white font-rubik placeholder:text-white" type="text" placeholder="Cari" />
                        <div className="w-2/12 h-10 px-4 !rounded-r-lg focus:outline-none bg-didesa-1 text-white items-center flex font-rubik">
                            <CiSearch className="w-6 h-6 mx-auto " />
                        </div>
                    </div>
                    <Link href={"https://play.google.com/store/apps/details?id=com.didesa"} target="_blank">
                    <button className="w-fit h-fit py-2 px-4 mt-24 mx-auto bg-didesa-1 text-white text-sm items-center flex  backdrop-blur-sm rounded-lg font-rubik gap-2 hover:scale-105 transition-all duration-300"> <FaGooglePlay />Unduh Aplikasi</button>
                    </Link>
                </div>
            </section>
        </>
    )
};

const BeritaPopuler = () => {
    return (
        <>
            <section id="berita" className="w-full bg-white">
                <div className="w-full h-full pt-32 lg:px-32 md:px-20 px-8 gap-2">
                    <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
                        <div className="w-full h-full flex flex-col gap-2">
                            <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">Berita Populer</div>
                            <div className="md:w-1/4 w-1/2 h-[2px] bg-didesa-1" />
                            <div className="font-rubik text-gray-500 text-sm md:text-base ">Dapatkan berita terkini dan informasi penting langsung dari sumber terpercaya di desa.</div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-didesa-2 text-white hover:bg-didesa-1 transition-colors duration-300">
                                <MdOutlineNavigateNext className="w-6 h-6 rotate-180" />
                            </div>
                            <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-didesa-1 text-white hover:bg-didesa-2 transition-colors duration-300">
                                <MdOutlineNavigateNext className="w-6 h-6" />
                            </div>
                        </div>                        
                    </div>
                </div>
                {/* CONTAINER CARD */}
                    <div className="horizontal-scroll mt-4">
                        <div className="scroll-container">                            
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1" index={"first"}/>       
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1"/>       
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1"/>       
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1"/>       
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1"/>       
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1"/>       
                           <CardBerita image="/didesa/wallpaper.jpg" title="Didesa 1" date="20.01.2022" content="Didesa 1" index={"last"}/>                        
                        </div>                                                                    
                    </div>
            </section>
        </>
    )
}

interface CardBeritaProps {
    image: string
    title: string
    date: string
    content: string
    index?: "first" | "last"
}
const CardBerita = ({ image, title, date, content,index }: CardBeritaProps) => {
    return (
      <div className={`relative w-60 h-80 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 hover:scale-105 transition-transform duration-300 ${index=="first"? "lg:ml-32 md:ml-20 ml-8":""}  ${index=="last"? "lg:mr-32 md:mr-20 mr-8":""}  `}>        
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-2xl" />
        <div className="absolute inset-0 flex flex-col items-start justify-end bg-black bg-opacity-25 p-4 rounded-2xl">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="text-white font-playfair text-2xl max-w-[40vw] line-clamp-1">{title}</div>
            <div className="text-white font-rubik text-xs">{date}</div>
          </div>
          <div className="text-white line-clamp-1 font-rubik text-xs">{content}</div>
        </div>
      </div>
    );
  };


const UMKM = () => {
    return (
        <>
         <section id="umkm" className="w-full bg-white">
                <div className="w-full h-full pt-16 lg:px-32 md:px-20 px-8 gap-2">
                    <div className="w-full h-full flex flex-col md:flex-row-reverse justify-between gap-4">
                        <div className="w-full h-full flex flex-col gap-2 self-end text-end ">
                            <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl ">UMKM</div>
                            <div className="md:w-1/4 w-1/2 h-[2px] bg-didesa-1 self-end" />
                            <div className="font-rubik text-gray-500 text-sm md:text-base ">Dukung dan kembangkan usaha kecil dan menengah dengan platform pemasaran digital yang efektif.</div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-didesa-2 text-white hover:bg-didesa-1 transition-colors duration-300">
                                <MdOutlineNavigateNext className="w-6 h-6 rotate-180" />
                            </div>
                            <div className="w-fit h-fit p-2 rounded-lg focus:outline-none bg-didesa-1 text-white hover:bg-didesa-2 transition-colors duration-300">
                                <MdOutlineNavigateNext className="w-6 h-6" />
                            </div>
                        </div>                        
                    </div>
                </div>
                {/* CONTAINER CARD */}
                    <div className="horizontal-scroll mt-4">
                        <div className="scroll-container">                            
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" index="first"/>                    
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" />                    
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" />                    
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" />                    
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" />                    
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" />                    
                          <CardUMKM image="/didesa/wallpaper.jpg" name="McDonald" type="Makanan" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit." address="Magelang, Jawa Tengah" />                    
                        </div>                                                                    
                    </div>
            </section>
        </>
    )
}

interface CardUMKMProps {
    image: string;
    name: string;
    type: string;
    description: string;
    address: string;
    index?: "first" | "last"
  }
  
  const CardUMKM = ({ image, name, type, description, address, index }: CardUMKMProps) => {
    return (
      <div className={`w-60 h-96 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 bg-white hover:scale-105  transition-transform duration-300 ${index=="first"? "lg:ml-32 md:ml-20 ml-8":""}  ${index=="last"? "lg:mr-32 md:mr-20 mr-8":""}`}>
        <div className="relative h-2/5">
          <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-2xl" />
        </div>
        <div className="p-4 h-3/5 flex flex-col justify-between bg-didesa-3">
          <div>
            <div className="md:text-2xl text-xl font-bold font-rubik text-black">{name}</div>
            <div className="bg-didesa-1 text-white text-xs px-2 py-1 rounded-full inline-block mt-2 font-rubik uppercase">{type}</div>
            <div className="text-sm mt-2 line-clamp-3 font-rubik text-black">{description}</div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-gray-600 font-rubik">{address}</div>
            <button className="bg-didesa-1 text-white text-xs px-4 py-2 rounded-lg font-rubik">Detail</button>
          </div>
        </div>
      </div>
    );
  };
  const PemilihanKepalaDesa = () => {
    return(
        <section id="pemilihan" className="w-full pt-16 pb-40 bg-white">
            <div className="w-full h-full lg:px-32 md:px-20 px-8 gap-2">
                <div className="w-full h-full flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="font-playfair text-black lg:text-6xl md:text-5xl text-4xl">Pemilihan Kepala Desa</div>
                        <div className="md:w-1/4 w-1/2 h-[2px] bg-didesa-1" />
                        <div className="font-rubik text-gray-500 text-sm md:text-base ">Ikuti pemilihan kepala desa dengan mudah dan aman melalui sistem voting online yang transparan dan terjamin.</div>
                    </div>                                     
                </div>
            </div>
            
            <div className="w-full h-full mt-8 flex md:flex-row flex-col lg:px-32 md:px-20 px-8 gap-8">
                <div className="w-full h-full">
                    <Image src={"/didesa/wallpaper.jpg"} alt="wallpaper" width={500} height={500} className="object-cover rounded-lg self-center mx-auto w-full"
                    />
                </div>
                <div className="w-full h-full my-auto">
                    <div className="w-full flex flex-col gap-4">
                        <div className="font-playfair text-black lg:text-4xl md:text-3xl text-2xl">Menuju Desa Demokrasi</div>
                        <div className="font-rubik text-black text-base">Menjadi desa demokrasi berarti memberdayakan setiap warga untuk terlibat aktif dalam proses pengambilan keputusan. Melalui sistem yang transparan dan inklusif, setiap suara dihargai dan setiap pendapat didengar. Sistem pemilihan yang adil dan terbuka memastikan bahwa semua warga memiliki kesempatan yang sama untuk berpartisipasi dalam memilih pemimpin mereka. Dengan teknologi digital, proses pemilihan menjadi lebih mudah diakses dan efisien, menghilangkan hambatan geografis dan administratif. Ini adalah langkah besar menuju pemerintahan desa yang lebih partisipatif dan representatif.</div>
                        <div className="font-rubik text-didesa-1 text-sm md:text-base">Lihat Selengkapnya &rarr;</div>
                        
                    </div>
                </div>
            </div>           
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="bg-didesa-2 py-8">
            <div className="container mx-auto text-center text-white font-playfair">
                <p>&copy; 2024 DiDesa. All rights reserved.</p>
            </div>
        </footer>
    );
}

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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
            
            if (scrollTop > window.innerHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
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
        <nav className={`fixed w-full z-50 ${showNavbar ? 'top-0' : '-top-20'} transition-top duration-300 ${isScrolled ? 'bg-white text-black shadow-md' : 'bg-transparent text-white'}`}>
            <div className="container mx-auto flex justify-between items-center p-4 font-rubik">
                <div className="text-xl font-bold font-playfair">DiDesa</div>
                <div className="hidden md:flex space-x-4">
                    <Link href="#hero" className='hover:text-didesa-1 font-rubik transition-colors duration-300'>Beranda</Link>
                    <Link href="#berita" className='hover:text-didesa-1 font-rubik transition-colors duration-300'>Berita</Link>
                    <Link href="#umkm" className='hover:text-didesa-1 font-rubik transition-colors duration-300'>UMKM</Link>
                    <Link href="#pemilihan" className='hover:text-didesa-1 font-rubik transition-colors duration-300'>Pemilihan</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={handleMenuToggle} className="focus:outline-none">
                        <svg className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-transparent'} shadow-md`}>
                    <Link href="#hero" className='block hover:text-didesa-1 font-rubik transition-colors duration-300 p-4' onClick={handleMenuToggle}>Beranda</Link>
                    <Link href="#berita" className='block hover:text-didesa-1 font-rubik transition-colors duration-300 p-4' onClick={handleMenuToggle}>Berita</Link>
                    <Link href="#umkm" className='block hover:text-didesa-1 font-rubik transition-colors duration-300 p-4' onClick={handleMenuToggle}>UMKM</Link>
                    <Link href="#pemilihan" className='block hover:text-didesa-1 font-rubik transition-colors duration-300 p-4' onClick={handleMenuToggle}>Pemilihan</Link>
                </div>
            )}
        </nav>
    );
};

const DiDesa = () => {
    return (
        <>
            <Head>
                <title>DiDesa</title>
                <meta name="description" content="Digitalisasi Desa" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <Hero />
                <BeritaPopuler />
                <UMKM />
                <PemilihanKepalaDesa />
                <Footer />
            </main>
        </>
    );
};

export default DiDesa;
