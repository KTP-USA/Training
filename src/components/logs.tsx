import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient";

const Log = () => {
      function getDates(date: string, ){
    
    if (date == '' || date == null){
      return '';
    } else {
let date2 = new Date(date)

    return date2.toLocaleDateString('en-US', {
  month:'numeric',
           
day:'2-digit',
year:'numeric',
        });
      }
   
  }
    const [logData, setLogData] = useState([]);
    async function loadData() {
        const tdy  = new Date();
        tdy.setDate(tdy.getDate()-30);
    const logs: any =    await supabase.from('testrecords').select().gte('date', tdy.toISOString() );
   let logs2: any =  logs.data.map((e:any) => {
      return {
 'username':e['username'], 'module': e['module'], 'step':e['step'], 

'supervisor':e['supervisor'], 'trainer':e['trainer'], 'type':e['type'], 'result':e['result']
, 'doneby':e['doneby'], 'last_saved_at':e['date']
      }
    })

    setLogData(logs2.sort((a: any,b: any) => {
 let    aDate = new Date( a['last_saved_at'])
  let   bDate =new Date(b['last_saved_at'])

return bDate.getTime() - aDate.getTime();

} ))
    }
    useEffect(()=>{
loadData();
    }, [])
    const columns = ['Username', 'Module', 'Step', 'Supervisor', 'Trainer', 'Type', 'Result', 'Done By', 'Time']
return <section className=" flex justify-center items-center flex-col my-10 mx-10  ">
     <div className="w-full flex items-center justify-center  flex-col">
<h1 className="font-poppins text-blue-500 font-bold text-5xl self-baseline">Log</h1>

<div className=" rounded-md mt-7 w-full">
  <div className="flex flex-row bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg py-2    font-bold font-inter">
{
  columns.map((entry) =>
  <div className= {`m-2 ml-5 w-[10%]`}>
    <p >{entry} </p>
 
  </div>
  )
}
</div>

<div className="flex flex-col font-poppins mb-10 ">
{
logData

// .filter((entry) =>{
 
//   let entryDate: Date = new Date(entry['Next Date']);
//   let maxDates: Date = new Date(maxDate)
//   return (
//     testType == 'Test Type' ? true : entry['Test Type'] == testType) &&
//  (selectedUser == 'Username' ? true : entry['User'] == selectedUser) && (selectedTrainer == 'Trainer' ? true : entry['Trainer'] == selectedTrainer) &&
//  (selectedSupervisor == 'Supervisor' ? true : entry['Supervisor'] == selectedSupervisor) && (
 
//   entryDate <= maxDates)
// }
 
// )

.map((entry) =>
   <div>
   <div className={`flex flex-row items-center   border-b-2 border-b-gray-400`}>
 {   Object.values(entry).map((entrye: any, i) => {

   return (

 <div  className= {`ml-5 
  
    m-2 py-2 ${entrye == 'PASS' || entrye == 'READY' ? 'text-green-500 font-bold' : entrye == 'FAIL' || entrye == 'NOT READY' ? 'text-red-500 font-bold' : ''}
   w-[10%]
    `}>
{
    <p> {i== 8 ? getDates(entrye) : entrye}</p>
 
 }
 
     </div>
   )




     
})}
   
    </div>
     {/* <div className="bg-gray-400 h-0.5 w-full"></div> */}
     </div>
  )
}
</div>

</div>
</div>
</section>
}

export default Log;