import { createClient } from "@/utils/supabase/server"

export default async function page() {
    const supabase = createClient()
    const{data: profiles } = await supabase.from('profiles').select()
    
    return<pre>{JSON.stringify(profiles,null,2)}</pre>
}