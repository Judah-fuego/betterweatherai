import AuthButton from "@/components/header-auth";
import Navbar from "@/components/nav/navbarauth";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import WeatherWidget from "@/components/weatherWidget/main";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
    <div className="">
    <Navbar/>
    <WeatherWidget/>

    </div>
    </>
  );
}
