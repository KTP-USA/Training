// import React from "react"
// const Printable = React.forwardRef<HTMLDivElement>((userData2: any, topBar: any, labels: any, sectionData: any ) =>{
//   return(
//     <div>
  
// <div className="border-blue-500 rounded-t-xl  border-2 p-2 flex justify-center mt-6  flex-col">
//     <div className="grid grid-cols-2 w-full px-40 gap-y-5 pt-4 pb-4 ">
// {
//     topBar.map((e, i) =>
//     <div 
//         className={`font-poppins flex flex-row ${i == 0 || i ==2 || i==4 ? "justify-self-start" : "justify-self-end"}`}>
//             {e} 
//             { e != 'Name' &&
//             <p className="ml-2"> { e == 'Supervisor:' ? (userData2.length == 0 ? '' : userData2[0]['supervisor']) : 
//             e == 'Module:' ?(userData2.length == 0 ? '' :userData2[0]['module']) : e=='Machine:' ? ( userData2.length == 0 ? '' : userData2[0]['machine']) :
//         e == 'Date:' ?   `${date.toLocaleDateString('en-US', {
// year:'2-digit',
// month:'numeric',
// day:'2-digit'
//         })}`:  '' }</p>
// }
//             {
//                 e == 'Name:'  && (
//                 name != 'no name' ? <p className="ml-2">{name}</p> :
//              <select 
//  value={selectedUser}
//   onChange={(er)=> {
//     setSelectedUser(er.target.value)
//     setUserData2(userData.filter((entry) => entry['username'] == er.target.value))

//     formatData(userData.filter((entry) => entry['username'] == er.target.value));
//   }}
//    className='border-2 ml-3 rounded-md  border-blue-400 p-2 
//  font-poppins'>
//    <option>Select a user...</option>
//   {
// userData.map((entry) =>  
//   <option>{entry['username']}</option>
// )
// }
//  </select>  
//            ) }
//             </div>
//     )
// }

// </div>

// </div>
// <div className="border-x-blue-500  border-b-blue-500  border-x-2 border-b-2 p-2  font-poppins ">
// <p> The following information is an assessment of the employee capacity to demonstrate area knowledge on a timely manner. The 30-90-180 day training cycle requires the
// coating operator to be assessed on current abilities performance and completion of required task. The scores are rated in observation for: <span className="text-red-500 font-bold ">Demonstrated skills sets in
// completing the task Safely, with Quality detail, acceptable Process- Machine understanding and executed on a Timely manner.</span> Audit 4 = Excellent (ANSWERED 100% of the
// Topic), Audit 3 = Good (ANSWERED up to 75% of the Topic), Audit 2 = Need assistance (ANSWERED up to 50% of the Topic ), Audit 1 = under the expected level (ANSWERED below than 49% of the Topic)
// </p>

// </div>
// <div className="border-x-blue-500 bg-blue-50 border-b-blue-500 flex flex-row border-x-2 border-b-2   font-poppins justify-center">
// {
//     labels.map((e,i) =>
//         <div className={` flex flex-row justify-center
//     ${e == 'Section' ? 'w-[20%]':
// e == 'Topic' ?'w-[70%]'
//  : 'w-[10%]'
// }
// `}>
    
//     <p className={`font-poppins text-blue-400 font-bold
//    p-2
// `} >{e} </p>
// <div className="flex-1"></div>
// { i != 2 &&
//  <span className="inline-block w-0.5 h-full bg-blue-500 ml-2"></span>
// }
// </div>
//     )
// }


// </div>
// <div className="flex flex-col mb-10 "



// >
// {
//     sectionsData.map((e: any,i) =>
//     <div className="flex flex-row ">
// <div className={`w-[20%] p-1 items-center flex justify-center 
// font-poppins font-bold  text-2xl border-x-2 border-x-blue-500 
// ${i == 0 ? 'bg-red-500 border-t-blue-500 border-1' : i == 1 ? 'bg-blue-400' :i==2 ?
// 'bg-gray-400 ' : i==3 ? 'bg-yellow-300' : i==sectionsData.length-1 ? 'bg-blue-200 border-b-blue-500 border-b-2 rounded-bl-xl' : 'bg-green-300'
// }` }>
//     {e['label']}
// </div >
// <div className="flex flex-col w-[80%]">
// {
//     e['topics'].map((topic: string, i2:any) =>
//         <div className="flex flex-row">
//        <div className={`border-y-blue-500 w-[94%] border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
//        ${topic== 'Process of adding Oil' ? 'border-b-2 ' : 'border-b-2'}
//        `}>

//         {topic}
//        </div >
//        <div className="w-[13.5%]">
//         { 
      
//          <div
//        onClick={()=>{
      
//        }}
//           className={`border-y-blue-500 border-r-blue-500 p-2 font-poppins border-t-1 border-r-2  w-full h-full
//        border-b-2`}
//        ></div>
// }
//        </div>
//        </div>
//     )
// }
// {/* <div className="flex flex-col w-[25%]">
// {
//     e.topics.map((e) =>
//        <input className={`border-y-blue-500 border-r-blue-500 p-2 font-poppins border-t-1 border-r-2
       
//         ${e== 'Process of adding Oil' ? 'border-b-2' : 'border-b-1'}`}>

    
//        </input>
//     )
// }
// </div> */}
// </div>

//     </div>
//     )
// }
// </div>    
//     </div>
//   )
// })