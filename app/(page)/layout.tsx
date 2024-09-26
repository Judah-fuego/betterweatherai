import Navbar from "@/components/nav/navbar";

export default function Layout({children,
}: {
  children: React.ReactNode;
}) {
    return (<>
    <Navbar/>
    {children}
    </>)
}