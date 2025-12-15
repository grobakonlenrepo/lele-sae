import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Menu from "@/components/menu";
import Testimoni from "@/components/testimoni";
import FAQ from "@/components/faq";
import TentangKami from "@/components/tentang-kami";
import Kontak from "@/components/kontak";
import Footer from "@/components/footer";
import Watermark from "@/components/watermark";
import ScrollToTop from "@/components/scroll-to-top";
import WhatsappButton from "@/components/wa-bubble";
//import Sertifikat from "@/components/sertifikat";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <Testimoni />
      <FAQ />
      <TentangKami />
      
      <Kontak />
      <Footer />
      <Watermark />
      <WhatsappButton />
      <ScrollToTop />
    </>
  );
};

export default page;
