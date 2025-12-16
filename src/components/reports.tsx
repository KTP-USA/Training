import {BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, PieChart, Pie, Cell} from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Reports = () => {
  const [segmentedBarData, setSegmentedBarData] = useState([]);
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [SupList, setsuplist] = useState([]);
    const [modList, setModList] = useState([]);
    const [rawUserData, setRawUserDate] = useState([]);
    const columns = ['2025', 'Trainees in the Program', 'Hired in 2025', 'Terminated/Resigned',
      'Turnover'
    ];
    const [pieData, setPieData]=useState([]);
    const [user, setUser] = useState('Name');
    const [module, setModule] = useState('Module')
    async function setFilters(mod: any, sup: any, fromDate2: any, toDate2: any){
      let fromDate3  = new Date(fromDate2);
      let fromDate4 = new Date(fromDate);
      let toDate3 = new Date(toDate2);
      let toDate4 = new Date(toDate);
        if (sup != null){
            setUser(sup)
        }

        if (mod != null){
            setModule(mod)
        }
      const dataRaw =  rawData.filter((e: any) => { 
        let rawDate = new Date( e['date']);
        return   (
        (  mod == 'Module' ? true :
          mod == null ? 
          module == 'Module' ?
          true : (e['module'] ==  module) : (e['module'] == mod) )&& 
         (sup == 'Name' ? true :sup == null ? 
          user == 'Name' ?
          true : (e['doneby'] ==  user) : (e['doneby'] == sup) ) 
        && 
        (fromDate2 == null ? 
          fromDate == '' ?
          true : (rawDate.getTime() > fromDate4.getTime()) : (rawDate.getTime() > fromDate3.getTime()) )
        &&
        ( toDate2 == null ?
          toDate == '' ?
          true : (rawDate.getTime() < toDate4.getTime()) : (rawDate.getTime() < toDate3.getTime())) 
        
        )
        })
 const steps = ['30D', '90D', '180D', '1Y', '2Y']
       
        let data2: any = modList.map((e: any) => {
         
          const stepData= steps.map((er) => { return {[er]: rawUserData.filter((entry: any) => 
           
           
            {
               let rawDate = new Date( entry['hiredate']);
              return entry['module'] == 
          e['modulename'] && entry['actualstep'] == er    
        && (fromDate2 == null ? 
          fromDate == '' ?
          true : (rawDate.getTime() > fromDate4.getTime()) : (rawDate.getTime() > fromDate3.getTime()) )
        &&
        ( toDate2 == null ?
          toDate == '' ?
          true : (rawDate.getTime() < toDate4.getTime()) : (rawDate.getTime() < toDate3.getTime()))
      
        }).length} });
         let stepData2 = Object.assign({}, ...stepData)
         console.log('stepdata2', stepData2);
            return {'name':e['modulename'],...stepData2
        }})
        console.log('data2', data2)
       setSegmentedBarData(data2);
  //       const dataRaw =
  //       mod == null ?
  //       sup == 'Name' ?  
  //         module == 'Module' ? 
  //       await supabase.from('testrecords').select().not('result', 'is', null) :
  //       await supabase.from('testrecords').select().eq('module', module).not('result', 'is', null)
  //       :
  //       module == 'Module' ? 
  //         await supabase.from('testrecords').select().eq('doneby', sup).not('result', 'is', null) :
  //       await supabase.from('testrecords').select().eq('doneby', sup).eq('module', module).not('result', 'is', null)
  //       : 
  // mod == 'Module' ?  
  //        user == 'Name' ? 
  //       await supabase.from('testrecords').select().not('result', 'is', null) :
  //       await supabase.from('testrecords').select().eq('name',user).not('result', 'is', null)
  //       :
  //       user == 'Name' ? 
  //       await supabase.from('testrecords').select().eq('module', mod) .not('result', 'is', null)
  //       :  await supabase.from('testrecords').select().eq('module', mod) .eq('doneby', user).not('result', 'is', null);
  //       ;
   
      const userData: any = await supabase.from('users').select().eq('username', sup);
        let chartDatas: any = [{'name': 'On Time', 'count':dataRaw.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getTime() <nextDate.getTime()}).length}, 
        {'name':'Late', 'count':dataRaw.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
            
          return  lastDate.getTime() >nextDate.getTime()}).length},]
          setPieData(chartDatas)
     let formattedData: any =
     userData.data!['role'] == 'TRAINER' ? 
        [{'name':'Competency Test', 'count': dataRaw.filter((e)=> e['type'] == 'Competency Test').length},
   
      {'name':'Technical Evaluation', 'count': dataRaw.filter((e)=> e['type'] == 'Technical Evaluation').length}
   
    ]:
    userData.data!['role'] == 'SUPERVISOR' && userData.data!['trainer'] != 'Y' ?
        [{'name':'Competency Test', 'count': dataRaw.filter((e)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.filter((e)=> e['type'] == 'Performance review').length},
  
    ]:
     [{'name':'Competency Test', 'count': dataRaw.filter((e)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.filter((e)=> e['type'] == 'Performance review').length},
      {'name':'Technical Evaluation', 'count': dataRaw.filter((e)=> e['type'] == 'Technical Evaluation').length}
   
    ];
     setData(formattedData);
    }
    async function loadData() {
        const dataRaw: any = await supabase.from('testrecords').select().not('result', 'is', null);
        setRawData(dataRaw.data);
        const sups: any =  await supabase.from('users').select().neq('role', 'USER');
         const users:any =  await supabase.from('users').select().eq('role', 'USER');
            const modules: any =  await supabase.from('module').select();
            setModList(modules.data)
            setRawUserDate(users.data);
            setsuplist(sups.data);
           let data2 = modules.data.map((e: any) => {
            
            return {'name':e['modulename'], '30D': users.data.filter((entry: any) => entry['module'] == 
          e['modulename'] && entry['actualstep'] == '30D').length,
        '90D': users.data.filter((entry: any) => entry['module'] == 
          e['modulename'] && entry['actualstep'] == '90D').length,
          '180D': users.data.filter((entry: any) => entry['module'] == 
          e['modulename'] && entry['actualstep'] == '180D').length,
          '1Y': users.data.filter((entry: any) => entry['module'] == 
          e['modulename'] && entry['actualstep'] == '1Y').length,
          '2Y': users.data.filter((entry: any) => entry['module'] == 
          e['modulename'] && entry['actualstep'] == '2Y').length,
        }})
       setSegmentedBarData(data2);
        let pieData: any = [{'name': 'On Time', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getTime() <nextDate.getTime()}).length}, 
        {'name':'Late', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getTime() >nextDate.getTime()}).length},]
          setPieData(pieData)
          console.log('pi', pieData)
     let formattedData: any = [{'name':'Competency Test', 'count': dataRaw.data?.filter((e: any)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.data?.filter((e: any)=> e['type'] == 'Performance review').length}, 

      {'name':'Technical Evaluation', 'count': dataRaw.data?.filter((e: any)=> e['type'] == 'Technical Evaluation').length}
   
    ];
     setData(formattedData);
    }
useEffect(()=>{
loadData();
}, [])
const [fromDate, setFromDate] = useState('');
const [toDate, setToDate] = useState('');

    return <section className="flex justify-baseline items-center flex-col my-15 mx-10">
      <div className="flex flex-row gap-6 self-baseline items-center">
         <h1 className="font-poppins text-blue-400 font-bold text-5xl ">Reports</h1>
          <p className="font-poppins font-bold text-xl ml-10">From:</p>
           <input 
           onChange={(e) =>{ setFromDate(e.target.value); setFilters(null, null, e.target.value, null)}}
           value={fromDate}
           type="date"
    
         className="border-2  border-blue-500 rounded-lg w-35 p-2.5  "> 
           
          </input>
          <p className="font-poppins font-bold text-xl">To:</p>
          <input
          onChange={(e) => {setToDate(e.target.value); setFilters(null, null, null, e.target.value)}}
          type="date"
        value={toDate}
          className="border-2 border-blue-500 rounded-lg w-35 p-2.5 ">

          </input>
         </div>
         <div className="flex flex-row items-center gap-6 self-baseline mt-20">
         <p className="font-poppins  font-bold text-3xl text-blue-500  ">Supervisors & Trainers</p>
         <select 
         onChange={(e) => setFilters(null, e.target.value, null, null)}
         className="border-2 border-blue-500 rounded-lg w-35 p-2.5 font-poppins "> <option>Name</option>
            {
                SupList.map((e: any) => {
                   
                 return   <option>{e['username']}
            </option>
 } )
            }
          </select>
          <select
          onChange={(e) => setFilters( e.target.value, null, null, null)}
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
 { 
 pieData.map((e) =>
 {
 return <Cell fill={e['name']== 'Late' ? '#d3d3d3' : "#3b82f6"}></Cell>
 }
 )
          }
    </Pie> 
    <Tooltip/>
</PieChart>
</ResponsiveContainer>
</div>
   </div>
           </div>
                 <p className="font-poppins  self-baseline mt-10 font-bold text-3xl text-blue-500  ">Trainees</p>
                 <div className="flex flex-col w-full">
                 <div className="w-full h-90 flex flex-col self-baseline mt-10 mb-5">
  <p className="font-poppins w-full font-bold text-2xl self-baseline ml-10 mb-5">Trainees per Module and Step</p>
<ResponsiveContainer width='100%' height='100%'>
<BarChart data={segmentedBarData}>
<YAxis></YAxis>
<Tooltip></Tooltip>
<XAxis dataKey='name'></XAxis>
<Bar dataKey='30D' stackId='a' fill="#0e4c92"></Bar>
<Bar dataKey='90D' stackId='a' fill="#57a0d2"></Bar>
<Bar dataKey='180D' stackId='a' fill="#008ecc"></Bar>
<Bar dataKey='1Y' stackId='a' fill="#add8e6"></Bar>
<Bar dataKey='2Y' stackId='a' fill="#95c8d8"></Bar>
</BarChart>

</ResponsiveContainer> 
                 </div>
                 <div className="w-full h-90 flex flex-col ">
                 <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5">Trainee Hire Data</p>
                 <div className="flex flex-col mx-10">
                  <div className="flex flex-row bg-gradient-to-r from-sky-100 to-blue-400 rounded-md justify-between  items-center 
                  border-2 border-blue-500
                  ">
                    {
                    columns.map((e) =>
                      <div className="h-full border-r-2 border-r-blue-600 w-full   ">
                   { e == 'Terminated/Resigned' || e== "Hired in 2024/2025"
              ?  <div className="  flex flex-col items-center w-full ">
                 <div className="flex flex-col h-full items-center justify-center border-b-2 border-b-blue-600 w-full">
                <p className="font-poppins font-bold p-2">{e}</p>
                </div>
                <div className="flex flex-row  gap-8  items-stretch ">
   <p className="font-poppins font-bold p-2">Monthly</p>
   <div className="w-0.5  bg-blue-600"></div>
      <p className="font-poppins p-2 font-bold">Yearly</p>

                </div>
              
              </div>:
              <div className="flex flex-col h-full items-center justify-center">
                    <p className="p-2 font-poppins font-bold ">{e}</p>
                    </div>
                   }</div>
                    )
                    }
                  </div>
                 </div>
                 </div>
                 </div>
    </section>
}
export default Reports;