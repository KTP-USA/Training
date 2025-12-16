import {BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, PieChart, Pie} from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Reports = () => {
    const [data, setData] = useState([]);
    const [SupList, setsuplist] = useState([]);
    const [modList, setModList] = useState([]);
    const [pieData, setPieData]=useState([]);
    const [user, setUser] = useState('Name');
    const [module, setModule] = useState('Module')
    async function setFilters(mod: any, sup: any){
        if (mod == null){
            setUser(sup)
        }

        if (sup == null){
            setModule(mod)
        }
        const dataRaw =
        mod == null ?
        sup == 'Name' ?  
          module == 'Module' ? 
        await supabase.from('testrecords').select().not('result', 'is', null) :
        await supabase.from('testrecords').select().eq('module', module).not('result', 'is', null)
        :
        module == 'Module' ? 
          await supabase.from('testrecords').select().eq('doneby', sup).not('result', 'is', null) :
        await supabase.from('testrecords').select().eq('doneby', sup).eq('module', module).not('result', 'is', null)
        : 
  mod == 'Module' ?  
         user == 'Name' ? 
        await supabase.from('testrecords').select().not('result', 'is', null) :
        await supabase.from('testrecords').select().eq('name',user).not('result', 'is', null)
        :
        user == 'Name' ? 
        await supabase.from('testrecords').select().eq('module', mod) .not('result', 'is', null)
        :  await supabase.from('testrecords').select().eq('module', mod) .eq('doneby', user).not('result', 'is', null);
        ;
        console.log('datata', dataRaw)
      const userData: any = await supabase.from('users').select().eq('username', sup);
        let chartDatas: any = [{'name': 'On Time', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getDate() <nextDate.getDate()}).length}, 
        {'name':'Late', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
            
          return  lastDate.getDate() >nextDate.getDate()}).length},]
          setPieData(chartDatas)
     let formattedData: any =
     userData.data!['role'] == 'TRAINER' ? 
        [{'name':'Competency Test', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Competency Test').length},
   
      {'name':'Technical Evaluation', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Technical Evaluation').length}
   
    ]:
    userData.data!['role'] == 'SUPERVISOR' && userData.data!['trainer'] != 'Y' ?
        [{'name':'Competency Test', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Performance review').length},
  
    ]:
     [{'name':'Competency Test', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Performance review').length},
      {'name':'Technical Evaluation', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Technical Evaluation').length}
   
    ];
     setData(formattedData);
    }
    async function loadData() {
        const dataRaw = await supabase.from('testrecords').select().not('result', 'is', null);
        const sups: any =  await supabase.from('users').select().neq('role', 'USER');
            const modules: any =  await supabase.from('module').select();
            setModList(modules.data)
            setsuplist(sups.data);
            console.log('modu', modules.data, sups.data)
        let pieData: any = [{'name': 'On Time', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getDate() <nextDate.getDate()}).length}, 
        {'name':'Late', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getDate() >nextDate.getDate()}).length},]
          setPieData(pieData)
          console.log('pi', pieData)
     let formattedData: any = [{'name':'Competency Test', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Performance review').length}, 

      {'name':'Technical Evaluation', 'count': dataRaw.data?.filter((e)=> e['type'] == 'Technical Evaluation').length}
   
    ];
     setData(formattedData);
    }
useEffect(()=>{
loadData();
}, [])

    return <section className="flex justify-baseline items-center flex-col my-15 mx-10">
         <h1 className="font-poppins text-blue-400 font-bold text-5xl self-baseline">Reports</h1>
         <div className="flex flex-row items-center gap-6 self-baseline mt-10">
         <p className="font-poppins  font-bold text-3xl text-blue-500  ">Supervisors & Trainers</p>
         <select 
         onChange={(e) => setFilters(null, e.target.value)}
         className="border-2 border-blue-500 rounded-lg w-35 p-2.5 font-poppins "> <option>Name</option>
            {
                SupList.map((e: any) => {
                   
                 return   <option>{e['username']}
            </option>
 } )
            }
          </select>
          <select
          onChange={(e) => setFilters( e.target.value, null)}
          className="border-2 border-blue-500 rounded-lg w-35 p-2.5 ">

            <option>Module</option>
            {
                modList.map((e: any) => 
                    <option>{e['modulename']}</option>
                )
            }
          </select>
         </div>
         
       
        <div className="flex flex-row gap-6 h-90 w-full mt-10">
        <div className="flex flex-col w-3/6">
            <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5">Tests Performed</p>
               <div className="w-full h-80 ">
            <ResponsiveContainer width="100%" height='100%'>
<BarChart  data={data}>
<YAxis ></YAxis>
<Tooltip></Tooltip>
    <XAxis dataKey="name" ></XAxis>
<Bar fill="#3b82f6" dataKey="count"></Bar>
</BarChart>
 
</ResponsiveContainer>
 </div> </div>
 <div className="flex flex-col w-1/2">
  <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5">Tests Completed On Time</p>
<div className="w-full h-80"
>
<ResponsiveContainer width='100%' height='100%'>
<PieChart>
   <Pie innerRadius={50} label={({name, percent}) => `${name}: ${(Math.round(percent! * 100)) }%`} data={pieData} dataKey="count" nameKey="name">
    
    </Pie> 
    <Tooltip/>
</PieChart>
</ResponsiveContainer>
</div>
   </div>
           </div>
    </section>
}
export default Reports;