import {BarChart, XAxis, YAxis, Bar, 

  ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Line, LineChart} from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Reports = () => {
  const [segmentedBarData, setSegmentedBarData] = useState([]);
  const [segmentedPassFail, setSegmentedPassFail] = useState([]);
  const [passfailData, setPassFailData] = useState([]);
    const [data, setData] = useState([]);
    const [usersData, setuserdata] = useState([]);
     function getFullMonth(i: number){
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
return months[i-1]
          }
    const [lineData, setLineData] = useState([]);
    const [stepData, setStepData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [SupList, setsuplist] = useState([]);
    const [modList, setModList] = useState([]);
    const [traineeHireData, setHireDate] = useState([]);
    const [rawUserData, setRawUserDate] = useState([]);
    const columns = ['Month', 'Trainees in the Program', 'Hired Monthly', 'Terminated/Resigned',
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
         
            return {'name':e['modulename'],...stepData2
        }})
       setSegmentedBarData(data2);

       let newUsers = rawUserData.filter((entry: any) =>{
        let rawDate = new Date( entry['hiredate']);
              return (fromDate2 == null ? 
       fromDate == '' ?
          true : (rawDate.getTime() > fromDate4.getTime()) : (rawDate.getTime() > fromDate3.getTime()) )
        &&
        ( toDate2 == null ?
          toDate == '' ?
          true : (rawDate.getTime() < toDate4.getTime()) : (rawDate.getTime() < toDate3.getTime()))
      
        })
      
        let data3: any = 
            [ {'name': '30D', 'count': newUsers.filter((entry: any) => 
         entry['actualstep'] == '30D').length},
        {'name': '90D', 'count': newUsers.filter((entry: any) =>  entry['actualstep'] == '90D').length,},
         {'name': '180D', 'count':  newUsers.filter((entry: any) =>  entry['actualstep'] == '180D').length},
          {'name': '1Y', 'count': newUsers.filter((entry: any) =>  entry['actualstep'] == '1Y').length},
        { 'name': '2Y', 'count':  newUsers.filter((entry: any) => entry['actualstep'] == '2Y').length,},
        { 'name': '3Y', 'count':  newUsers.filter((entry: any) => entry['actualstep'] == '3Y').length,}
        ]
        setStepData(data3);
   const now = new Date();
          let month = fromDate2 != null 
      ?
       fromDate3.getMonth()+1
: fromDate != '' 
         ? fromDate4.getMonth() +1
         : 1;
         console.log('monthy', month)
            let year = fromDate2 != null 
      ?
       fromDate3.getFullYear()
: fromDate != '' 
         ? fromDate4.getFullYear()
         : now.getFullYear();
        let hasTo = toDate !='' || toDate2 != null;
         let hasFrom = fromDate !='' ||fromDate2 != null;
          let formattedLine: any = [];
          let passfail: any = [];
         
          function getMonth(i: number){
          
let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
return months[i-1]
          }

            function getMonthAndYR(i: number, ){
            
let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
let totalmonths = (month-1)+(i-1) ; 
let months2 = (totalmonths % 12) +1;
let totalyrs = year + Math.floor(totalmonths/12);
return `${months[months2-1]} ${totalyrs}`
              
          }
       
         if (hasTo && year != (toDate2 == null ? toDate4.getFullYear() :toDate3.getFullYear())){
         let toYear =toDate2 == null ? toDate4.getFullYear() : toDate3.getFullYear();
 
         let toMonth = toDate2 == null ? toDate4.getMonth()+1 : toDate3.getMonth()+1
       
        
let month2 = (toYear-year) * 12 + (toMonth - month) +1 

 for (let i=1; i<month2+1; i++){
  let totalmonths = (month-1)+(i-1) ; 
  let months2 = (totalmonths % 12) +1;
let totalyrs = year + Math.floor(totalmonths/12);
formattedLine.push({'date': getMonthAndYR(i, ), 'count': dataRaw.filter((e: any) => {
let eDate = new Date(e['date']);

return (eDate.getMonth()+1) == months2 && eDate.getFullYear() == totalyrs
}).length})
 passfail.push({'date': getMonthAndYR(i), 'Pass': dataRaw.filter((e: any) =>
        {
          let eDate = new Date(e['date']);
          return  (e['result'] == 'PASS' || e['result'] == 'READY') && (eDate.getMonth()+1) == months2 && eDate.getFullYear() == totalyrs
        }).length,  'Fail': dataRaw.filter((e: any) =>
        {
          
            let eDate = new Date(e['date']);
            return  (e['result'] == 'FAIL' || e['result'] == 'NOT READY') && (eDate.getMonth()+1) ==months2 && eDate.getFullYear() ==totalyrs
        }).length })
          
         } 
       }  else if  (hasFrom && year != (toDate2 == null ? toDate4.getFullYear() : toDate == '' ? now.getFullYear() : toDate3.getFullYear())){
      
     let endYear = toDate2 != null ? toDate4.getFullYear() : toDate == '' ? now.getFullYear(): now.getFullYear() +1;
 
         let endMonth =toDate2 != null ? toDate4.getMonth()+1 : toDate == '' ? now.getMonth()+1 : now.getMonth() +1;
       
        
let month2 = (endYear-year) * 12 + (endMonth - month) +1 
console.log('endyr', endYear, endMonth, month2)
 for (let i=1; i<month2+1; i++){
  let totalmonths = (month-1)+(i-1) ; 
  let months2 = (totalmonths % 12) +1;
let totalyrs = year + Math.floor(totalmonths/12);
formattedLine.push({'date': getMonthAndYR(i, ), 'count': dataRaw.filter((e: any) => {
let eDate = new Date(e['date']);

return (eDate.getMonth()+1) == months2 && eDate.getFullYear() == totalyrs
}).length})
 passfail.push({'date': getMonthAndYR(i), 'Pass': dataRaw.filter((e: any) =>
        {
          let eDate = new Date(e['date']);
          return  (e['result'] == 'PASS' || e['result'] == 'READY') && (eDate.getMonth()+1) == months2 && eDate.getFullYear() == totalyrs
        }).length,  'Fail': dataRaw.filter((e: any) =>
        {
          
            let eDate = new Date(e['date']);
            return  (e['result'] == 'FAIL' || e['result'] == 'NOT READY') && (eDate.getMonth()+1) == months2 && eDate.getFullYear() == totalyrs
        }).length })
          
         }    
       }else {
          let toMonth = toDate2 == null ?
          toDate == '' ? now.getMonth()+1:
          toDate4.getMonth()+1 : toDate3.getMonth()+1
       
        
   for (let i=month; i<(toMonth+1); i++){
formattedLine.push({'date': getMonth(i), 'count': dataRaw.filter((e: any) => {
let eDate = new Date(e['date']);
return (eDate.getMonth()+1) == (i) && eDate.getFullYear() == now.getFullYear()
}).length})
 passfail.push({'date': getMonth(i), 'Pass': dataRaw.filter((e: any) =>
        {
          let eDate = new Date(e['date']);
          return  (e['result'] == 'PASS' || e['result'] == 'READY') && (eDate.getMonth()+1) ==i && eDate.getFullYear() == now.getFullYear()
        }).length,  'Fail': dataRaw.filter((e: any) =>
        {
          
            let eDate = new Date(e['date']);
            return  (e['result'] == 'FAIL' || e['result'] == 'NOT READY') && (eDate.getMonth()+1) ==i && eDate.getFullYear() == now.getFullYear()
        }).length })

          } 
          }
          setLineData(formattedLine);
          setSegmentedPassFail(passfail)      
      const userData: any = await supabase.from('users').select().eq('username', sup);
        let chartDatas: any = [{'name': 'On Time', 'count':dataRaw.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getTime() <= nextDate.getTime()}).length}, 
        {'name':'Late', 'count':dataRaw.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
            
          return  lastDate.getTime() >nextDate.getTime()}).length},]
          setPieData(chartDatas)
             let passDatas: any = [{'name': 'Pass', 'count':dataRaw.filter((e: any) =>
        {
          
          return  e['result'] == 'PASS' || e['result'] == 'READY'
        }).length}, 
        {'name':'Fail', 'count':dataRaw.filter((e: any) =>
        {
          
            
            return  e['result'] == 'FAIL' || e['result'] == 'NOT READY'
        }).length},]
       setPassFailData(passDatas)
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
           let nows = new Date();
       
        function getMonth(i: number){
let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
return months[i-1]
          }
           
        const sups: any =  await supabase.from('users').select().neq('role', 'USER');
         const users:any =  await supabase.from('users').select().eq('role', 'USER');
        setuserdata(users.data)
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
            let data3: any = 
            [ {'name': '30D', 'count': users.data.filter((entry: any) => 
         entry['actualstep'] == '30D').length},
        {'name': '90D', 'count': users.data.filter((entry: any) =>  entry['actualstep'] == '90D').length,},
         {'name': '180D', 'count':  users.data.filter((entry: any) =>  entry['actualstep'] == '180D').length},
          {'name': '1Y', 'count': users.data.filter((entry: any) =>  entry['actualstep'] == '1Y').length},
        { 'name': '2Y', 'count':  users.data.filter((entry: any) => entry['actualstep'] == '2Y').length,},
        { 'name': '3Y', 'count':  users.data.filter((entry: any) => entry['actualstep'] == '3Y').length,}
        ]
        setStepData(data3);
        
       setSegmentedBarData(data2);
        let pieData: any = [{'name': 'On Time', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getTime() <= nextDate.getTime()}).length}, 
        {'name':'Late', 'count':dataRaw.data?.filter((e: any) =>
        {
            let lastDate = new Date(e['date']);
            let nextDate = new Date(e['nextdate'])
          return  lastDate.getTime() >nextDate.getTime()}).length},]
          setPieData(pieData)
                let passDatas: any = [{'name': 'Pass', 'count':dataRaw.data?.filter((e: any) =>
        {
          
          return  e['result'] == 'PASS' || e['result'] == 'READY'
        }).length}, 
        {'name':'Fail', 'count':dataRaw.data?.filter((e: any) =>
        {
          
            
            return  e['result'] == 'FAIL' || e['result'] == 'NOT READY'
        }).length},]
       setPassFailData(passDatas)
         let passfail: any = [];
          const now = new Date();
          let month: number = now.getMonth()+1;
          
          let formattedLine: any = [];
          
          for (let i=1; i<month+1; i++){
       
formattedLine.push({'date': getMonth(i), 'count': dataRaw.data.filter((e: any) => {
let eDate = new Date(e['date']);

return (eDate.getMonth()+1) ==i && eDate.getFullYear() == now.getFullYear()
}).length})
passfail.push({'date': getMonth(i), 'Pass': dataRaw.data?.filter((e: any) =>
        {
          let eDate = new Date(e['date']);
          return  (e['result'] == 'PASS' || e['result'] == 'READY') && (eDate.getMonth()+1) ==i && eDate.getFullYear() == now.getFullYear()
        }).length,  'Fail': dataRaw.data?.filter((e: any) =>
        {
          
            let eDate = new Date(e['date']);
            return  (e['result'] == 'FAIL' || e['result'] == 'NOT READY') && (eDate.getMonth()+1) ==i && eDate.getFullYear() == now.getFullYear()
        }).length })
          }
         setSegmentedPassFail(passfail);
          setLineData(formattedLine);
     let formattedData: any = [{'name':'Competency Test', 'count': dataRaw.data?.filter((e: any)=> e['type'] == 'Competency Test').length},
    {'name':'Performance review', 'count': dataRaw.data?.filter((e: any)=> e['type'] == 'Performance review').length}, 

      {'name':'Technical Evaluation', 'count': dataRaw.data?.filter((e: any)=> e['type'] == 'Technical Evaluation').length}
   
    ];
     setData(formattedData);
    let monthList = nows.getFullYear() == 2025 ? 12 : 12 + nows.getMonth()+1;
    
      let before = new Date('2025-12-01')
         let totalCount = users.data.filter((e: any) => {
          let hireDate = new Date(e['hiredate']);
          
          return hireDate < before;
         }).length
  
         let decCount = users.data.filter((e: any) => {
          let hireDate = new Date(e['hiredate']);
          return hireDate.getMonth() == 11 && hireDate.getFullYear() == 2025
         }).length
         let terminated = users.data.filter((e: any) => {

          let hireDate = new Date(e['deactive']);
          return hireDate.getMonth() == 11  && e['deactive'] != null && hireDate.getFullYear() == 2025
         }).length
         const tableData: any =
         
         
         [ {'Month': 'Before December 2025', 'Trainees in the Program': totalCount, 'Hired Monthly': 
          {'monthly': '', 'Total': totalCount}, 'Terminated/Resigned': 
          {'monthly': '', 'Total':''},  'Turnover':  ''
        },
        {'Month': 'December 2025', 'Trainees in the Program': (decCount+totalCount-terminated), 'Hired Monthly': 
          {'monthly': decCount, 'Total': decCount+totalCount}, 'Terminated/Resigned': 
          {'monthly': terminated, 'Total': terminated},  'Turnover': 
            `
        
            ${(((decCount+totalCount-terminated)/(decCount+totalCount))).toFixed(3)}       |     ${
              ((1-((decCount+totalCount-terminated)/(decCount+totalCount)))*100).toFixed(2)}% `
        }];
      
        for (let monthInt=13; monthInt<monthList+1; monthInt++){
  let totalmonths = (monthInt-1)-11 ; 

let totalyrs = 2025 + Math.floor(monthInt/12);

 let hireCount = users.data.filter((e: any) => {
          const [year, month, day] = e['hiredate'].split('-').map(Number)

const hireDate = new Date(year, month - 1, day)
          return hireDate.getMonth()+1 == totalmonths && hireDate.getFullYear() == totalyrs 
         }).length;
    
            let terminatedCount = users.data.filter((e: any) => {
                if (e['deactive'] == null){
                return false;
              }

         const [year, month, day] = e['deactive'].split('-').map(Number)

const hireDate = new Date(year, month - 1, day)

          return (hireDate.getMonth()+1) == totalmonths && hireDate.getFullYear() == totalyrs  && e['deactive'] != null
         }).length;
       let  totalTerm =  terminatedCount + tableData[monthInt-12]['Terminated/Resigned']['Total'];
       let totalHire = hireCount + tableData[monthInt-12]['Hired Monthly']['Total'];
       let traineesInProgram = (hireCount + tableData[monthInt-12]['Trainees in the Program']) - terminatedCount;
  
          tableData.push({'Month': `${getFullMonth(totalmonths)} ${totalyrs}`, 'Trainees in the Program': traineesInProgram, 'Hired Monthly': 
          {'monthly': hireCount, 'Total':totalHire}, 'Terminated/Resigned': 
          {'monthly': terminatedCount, 'Total':  totalTerm},  
          'Turnover': `${((traineesInProgram/totalHire)).toFixed(3)}  |  ${((1-((traineesInProgram/totalHire)))*100).toFixed(2)}% `
        })
        
      }
          setHireDate(tableData);
    }
    
    async function moduleFilter(module: any) {
      const nows = new Date();
       let monthList = nows.getFullYear() == 2025 ? 12 : 12 + nows.getMonth()+1;
      
       const users:any = 
   module == 'Module' ? usersData: 
      usersData.filter((e)=> e['module'] == module)
      let before = new Date('2025-12-01')
         let totalCount = users.filter((e: any) => {
          let hireDate = new Date(e['hiredate']);
          
          return hireDate < before;
         }).length
  
         let decCount = users.filter((e: any) => {
          let hireDate = new Date(e['hiredate']);
          return hireDate.getMonth() == 11 && hireDate.getFullYear() == 2025
         }).length
         let terminated = users.filter((e: any) => {
          let hireDate = new Date(e['deactive']);
          return hireDate.getMonth() == 11  && e['deactive'] != null && hireDate.getFullYear() == 2025
         }).length
         const tableData: any =
         
         
         [ {'Month': 'Before December 2025', 'Trainees in the Program': totalCount, 'Hired Monthly': 
          {'monthly': '', 'Total': totalCount}, 'Terminated/Resigned': 
          {'monthly': '', 'Total':''},  'Turnover':  ''
        },
        {'Month': 'December 2025', 'Trainees in the Program': (decCount+totalCount-terminated), 'Hired Monthly': 
          {'monthly': decCount, 'Total': decCount+totalCount}, 'Terminated/Resigned': 
          {'monthly': terminated, 'Total': terminated},  'Turnover': 
            `
        
            ${(((decCount+totalCount-terminated)/(decCount+totalCount))).toFixed(3)}       |     ${
              ((1-((decCount+totalCount-terminated)/(decCount+totalCount)))*100).toFixed(2)}% `
        }];
      
        for (let monthInt=13; monthInt<monthList+1; monthInt++){
  let totalmonths = (monthInt-1)-11 ; 
let totalyrs = 2025 + Math.floor(monthInt/12);

 let hireCount = users.filter((e: any) => {
          const [year, month, day] = e['hiredate'].split('-').map(Number)

const hireDate = new Date(year, month - 1, day)
          return hireDate.getMonth()+1 == totalmonths && hireDate.getFullYear() == totalyrs 
         }).length;

    
            let terminatedCount = users.filter((e: any) => {
              if (e['deactive'] == null){
                return false;
              }
            
         const [year, month, day] = e['deactive'].split('-').map(Number)

const hireDate = new Date(year, month - 1, day)
          return (hireDate.getMonth()+1) == totalmonths && hireDate.getFullYear() == totalyrs 
         }).length;
       let  totalTerm =  terminatedCount + tableData[monthInt-12]['Terminated/Resigned']['Total'];
       let totalHire = hireCount + tableData[monthInt-12]['Hired Monthly']['Total'];
       let traineesInProgram = (hireCount + tableData[monthInt-12]['Trainees in the Program']) - terminatedCount;
        
       tableData.push({'Month': `${getFullMonth(totalmonths)} ${totalyrs}`, 'Trainees in the Program': traineesInProgram, 'Hired Monthly': 
          {'monthly': hireCount, 'Total':totalHire}, 'Terminated/Resigned': 
          {'monthly': terminatedCount, 'Total':  totalTerm},  
          'Turnover': `${((traineesInProgram/totalHire)).toFixed(3)}  |  ${((1-(traineesInProgram/totalHire))*100).toFixed(2)}% `
        })
        
      }
          setHireDate(tableData);
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
        <div className="flex flex-col w-2/5">
            <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5">Tests Performed</p>
               <div className="w-full h-80 ">
            <ResponsiveContainer width="100%" height='100%'>
<BarChart  data={data}>
<YAxis ></YAxis>
<Tooltip></Tooltip>
    <XAxis dataKey="name" type="category" ></XAxis>
<Bar fill="#3b82f6" dataKey="count"></Bar>
</BarChart>
 
</ResponsiveContainer>
 </div> </div>
 <div className="flex flex-col w-3/10 min-w-110">
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
    <div className="flex flex-col w-3/10 min-w-110">
  <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5">Tests Passed and Failed</p>
<div className="w-full h-80"
>
<ResponsiveContainer width='100%' height='100%'>
<PieChart>
   <Pie innerRadius={50} label={({name, percent}) => `${name}: ${(Math.round(percent! * 100)) }%`} data={passfailData} dataKey="count" nameKey="name">
 { 
 passfailData.map((e) =>
 {
 return <Cell fill={e['name']== 'Fail' ? '#ed2939' : "#3b82f6"}></Cell>
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
           <div className="self-baseline">
             <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5 mt-5">Tests Completed Over Time</p>
             </div>
                 <div className="w-full h-90 flex flex-col self-baseline mt-5 mb-5">
  {/* <p className="font-poppins w-full font-bold text-2xl self-baseline ml-10 mb-5">Trainees per Module and Step</p> */}
<ResponsiveContainer width='100%' height='100%'>
<LineChart data={lineData}>
<YAxis></YAxis>
<Tooltip></Tooltip>
<XAxis dataKey='date'></XAxis>
<Line dataKey='count' fill="#0e4c92" dot={false} strokeWidth={3}  ></Line>

</LineChart>

</ResponsiveContainer> 

</div>
       <div className="w-full h-110 flex flex-col self-baseline mt-10 mb-5">
  <p className="font-poppins w-full font-bold text-2xl self-baseline ml-10 mb-5">Tests Passed and Failed Over Time</p>
  <ResponsiveContainer width='100%' height='100%'>
<BarChart data={segmentedPassFail}>
<YAxis></YAxis>
<Tooltip></Tooltip>
<XAxis dataKey='date'></XAxis>
<Bar dataKey='Pass' stackId='a' fill="#3b82f6"></Bar>
<Bar dataKey='Fail' stackId='a' fill="#d94141"></Bar>

</BarChart>
</ResponsiveContainer>

                 </div>

                 <p className="font-poppins  self-baseline mt-10 font-bold text-3xl text-blue-500  ">Trainees</p>
                 <div className="flex flex-col w-full">
                 <div className="w-full h-110 flex flex-col self-baseline mt-10 mb-5">
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
                   <div className="w-full h-110 flex flex-col self-baseline mt-10 mb-5">
  <p className="font-poppins w-full font-bold text-2xl self-baseline ml-10 mb-5">Trainees per Step</p>

<ResponsiveContainer width='100%' height='100%'>
<BarChart  
layout="vertical"
data={stepData}>
<YAxis dataKey="name" type="category"></YAxis>
<Tooltip></Tooltip>
    <XAxis type="number"    ></XAxis>
<Bar fill="#3b82f6" dataKey="count"></Bar>
</BarChart>
 
</ResponsiveContainer> 
                 </div>
                 <div className="w-full h-90 flex flex-col  mb-100">
                 <p className="font-poppins  font-bold text-2xl self-baseline ml-10 mb-5">Trainee Hire Data</p>
                  <select
          onChange={(e) => moduleFilter(e.target.value)}
          className="border-2 border-blue-500 rounded-lg w-35 p-2.5 self-baseline mb-5">

            <option>Module</option>
            {
                modList.map((e: any) => 
                    <option>{e['modulename']}</option>
                )
            }
          </select>
                 <div className="flex flex-col mx-10">
                  <div className="flex flex-row bg-gradient-to-r from-sky-100 to-blue-400 rounded-md  w-full items-center 
                  border-2 border-blue-500
                  ">
                    {
                    columns.map((e) =>
                      <div className="h-full border-r-2 border-r-blue-600 w-1/5   ">
                   { e == 'Terminated/Resigned' || e== "Hired Monthly"
              ?  <div className="  flex flex-col items-center w-full ">
                 <div className="flex flex-col h-full items-center justify-center border-b-2 border-b-blue-600 w-full">
                <p className="font-poppins font-bold p-2">{e}</p>
                </div>
                <div className="flex flex-row  gap-3  items-stretch ">
   <p className="font-poppins font-bold p-2 text-center">Monthly</p>
   <div className="w-0.5  bg-blue-600"></div>
      <p className="font-poppins p-2 font-bold text-center">Total</p>

                </div>
              
              </div>:
              <div className="flex flex-col h-full items-center justify-center">
                    <p className="p-2 font-poppins font-bold ">{e}</p>
                    </div>
                   }</div>
                    )
                    }
                  </div>
              
{
  traineeHireData.map((entry) =>
    <div className="flex flex-row ">
      {Object.keys(entry).map((e) =>
        <div className={`h-full border-r-2 w-1/5 border-r-blue-600 border-b-2 border-b-blue-600  ${e== 'Month' ?
'border-l-blue-600 border-l-2 ' : ''

         }   `}>
          {
     e == 'Terminated/Resigned' || e== "Hired Monthly"
     ?   <div className="grid grid-cols-2 text-center ">
            <p className="py-2 font-poppins">{entry[e]['monthly']}</p>
            <p className="py-2 font-poppins ">{entry[e]['Total']}</p>
          </div>: 
        <div className="flex flex-col h-full items-center justify-center">
                    <p className="p-2 font-poppins  ">{entry[e]}</p>
                    </div>
          } </div>
      )}
    </div>
  )
  }

</div>
                 
                 </div>
                 </div>
    </section>
}
export default Reports;