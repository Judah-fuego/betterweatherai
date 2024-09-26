import Country from "@/components/country/country";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";

export default function Layout({children,
}: {
  children: React.ReactNode;
}) {
    return (<>
    <Navbar/>
    {children}
    <Footer/>
    <Country/>


    </>)
}