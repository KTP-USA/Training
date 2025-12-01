import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";

const Sops = ()=>{
    const loc = useLocation();
    const [step, module] = loc.state ?? ['no step', 'no module'];
     async function openUrl(sop: any) {
      
         let url =supabase.storage.from('module').getPublicUrl(sop);
     console.log('url', url)
     
      window.open(url.data.publicUrl.replace('%0D%0A', ''), "_blank", "noopener,noreferrer");
     }
    const [data, setData] = useState([]);
    async function loadData() {
        if (step == 'no step' && module == 'no module'){
        let rawData: any = await supabase.from('documents').select().not('sop', 'is', null)
        console.log('data', rawData);
        setData(rawData.data ?? [])
        } else {
           let rawData: any = await supabase.from('documents').select().eq('step', step).eq('module', module)
        console.log('data', rawData);
        setData(rawData.data ?? [])   
        }
    }

    const columns = ['Step', 'Module', 'SOP' ];
    useEffect(() =>{
loadData();
    },[])
    return (
        <section className="m-10">
<h1 className="font-poppins text-blue-500 font-bold text-5xl self-baseline">SOPs</h1>
<div className=" rounded-md mt-7 w-full flex flex-col">
  <div className="flex flex-row bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg py-2    font-bold font-inter">
{
  columns.map((entry) =>
  <div className= {`m-2 ml-5 w-[10%]`}>
    <p >{entry} </p>
  
  </div>
  )
}
</div>
<div className="flex flex-col font-poppins ">
{
    
    
data.map((e) => { return {'module': e['module'], 'step': e['step'], 'sop': e['sop'], 'sop2':e['sop']}}).map((entry) =>
   <div>
   <div className={`flex flex-row items-center`}>
 {   Object.values(entry).map((entrye: any, i) => {
 

   return (
 
 <div  className= {`ml-5  m-2 py-2
  ${ i==2 ? 'w-[20%]' :'w-[10%]' }
    `}>
 {
i ==3 ?
<button
onClick={() => {
  
 openUrl(entry['sop']);
}}
className="
flex flex-row rounded-3xl  cursor-pointer p-3 w-35 text-lg items-center justify-center hover:scale-102 transition-all
duration-300 hover:bg-blue-600 py-2
text-white gap-2 bg-blue-500 font-poppins">
View
</button> 

: 
<p>{entrye}</p>
 
 }
  
     </div>
   )

     
})}
   
    </div>
     <div className="bg-gray-400 h-0.5 w-full"></div>
     </div>
  )
}
</div>
</div>

        </section>
    )
}
export default Sops;