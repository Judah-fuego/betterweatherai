import Image from "next/image"

export default function CountryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="flex flex-row gap-4 justify-center items-center p-3">
                <Image src="/logo/logo.svg" className="pointer" alt="logo" width={100} height={100} />
                <div className="primary-color text-white text-center p-4 text-4xl">Better Weather Search</div>
                <div className="text-md flex flex-col gap-2 pl-3 border-l-2 border-black justify-center">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}