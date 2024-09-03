import Leftauthimage from "./leftauthimage"

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-row ">
      <Leftauthimage/>
      {children}
      </div>
  );
}
