import { cn } from "@/utils/cn";
import { CardStack } from "../ui/card-stack";
import Highlight from "../ui/highlight";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-40 bg-cover bg-fixed text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white my-20">
          Testimonials
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <CardStack items={TESTIMONIAL.slice(0, 5)} />
          <CardStack items={TESTIMONIAL.slice(5, 10)} />
        </div>
      </div>
    </section>
  );
};



interface TestimonialProps {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

const TESTIMONIAL: TestimonialProps[] = [
  {
    id: 0,
    name: "Alex Johnson",
    designation: "Full Stack Developer",
    content: (
      <p>
        Reality Code helped me{" "}
        <Highlight>understand complex algorithms</Highlight> in a simple way. A
        must-visit platform for anyone learning to code!
      </p>
    ),
  },
  {
    id: 1,
    name: "Sarah Thompson",
    designation: "Junior Frontend Developer",
    content: (
      <p>
        The tutorials here are incredibly easy to follow.{" "}
        <Highlight>Reality Code</Highlight> is my go-to resource when I&apos;m
        stuck.
      </p>
    ),
  },
  {
    id: 2,
    name: "John Richards",
    designation: "Amateur Developer",
    content: (
      <p>
        I started learning JavaScript with Reality Code, and now I&apos;m
        confident in building projects.{" "}
        <Highlight>Highly recommended</Highlight> for beginners!
      </p>
    ),
  },
  {
    id: 3,
    name: "Emily Davis",
    designation: "Backend Engineer",
    content: (
      <p>
        The best part about Reality Code is the community and the comprehensive{" "}
        <Highlight>reference documentation</Highlight>. It’s an all-in-one
        platform.
      </p>
    ),
  },
  {
    id: 4,
    name: "Michael Lee",
    designation: "Tech Enthusiast",
    content: (
      <p>
        As someone who loves tech, I find the posts and tutorials here{" "}
        <Highlight>engaging and insightful</Highlight>. Keep up the great work!
      </p>
    ),
  },
  {
    id: 5,
    name: "Raka Putra",
    designation: "Fresh Graduate",
    content: (
      <p>
        Setelah lulus, saya merasa <Highlight>bingung memulai</Highlight>, tapi
        Reality Code memberikan saya arah yang jelas untuk belajar teknologi.
        Tutorialnya sangat membantu.
      </p>
    ),
  },
  {
    id: 6,
    name: "Rina Kusuma",
    designation: "Mahasiswa Baru",
    content: (
      <p>
        Sebagai <Highlight>mahasiswa baru</Highlight> yang belum punya banyak
        pengalaman, Reality Code sangat membantu saya memahami dasar-dasar
        pemrograman dengan cara yang mudah!
      </p>
    ),
  },
  {
    id: 7,
    name: "Adi Nugroho",
    designation: "Pelajar SMA",
    content: (
      <p>
        Saya masih <Highlight>anak sekolah</Highlight>, tapi Reality Code
        membuat saya bisa belajar coding dengan cepat. Sekarang saya bisa
        membuat aplikasi sederhana!
      </p>
    ),
  },
  {
    id: 8,
    name: "Fajar Setiawan",
    designation: "Awam IT",
    content: (
      <p>
        Sebagai orang yang <Highlight>awam dengan dunia IT</Highlight>, platform
        ini sangat mudah dipahami dan membantu saya untuk mulai belajar coding
        dari nol.
      </p>
    ),
  },
  {
    id: 9,
    name: "Nadia Pratama",
    designation: "Mahasiswa D3 Informatika",
    content: (
      <p>
        Reality Code memberikan <Highlight>penjelasan yang sederhana</Highlight>{" "}
        dan praktis, sangat cocok buat pemula seperti saya yang baru terjun ke
        dunia teknologi.
      </p>
    ),
  },
  {
    id: 10,
    name: "Sinta Wijaya",
    designation: "Ibu Rumah Tangga",
    content: (
      <p>
        Saya seorang ibu rumah tangga yang baru belajar coding, dan{" "}
        <Highlight>Reality Code</Highlight> benar-benar membantu saya belajar
        dengan langkah-langkah yang mudah diikuti!
      </p>
    ),
  },
];


export default TestimonialsSection;
