
export default function CountryLayout({ children, params }: { children: React.ReactNode, params: { country: string, region: string } }) {
    return (
        <div>
            {children}
        </div>
    )
}