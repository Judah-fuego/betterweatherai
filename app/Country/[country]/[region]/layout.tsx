import Finder from "@/components/country/finder";

export default function RegionLayout({ children, params }: { children: React.ReactNode, params: { region: string, country: string } }) {
    return <div>
        {children}
    </div>
}