import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
class ResponseDetails extends React.Component{

    COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
   pieData = [
      {
         name: "React JS",
         value: 54.85
      },
      {
         name: "Node JS",
         value: 47.91
      },
      {
         name: "Angulr JS",
         value: 16.85
      },
      {
         name: "Express JS",
         value: 16.14
      },
      {
         name: "Vanila JS",
         value: 10.25
      }
   ];
   CustomTooltip = ({ active, payload, label }) => {
      if (active) {
         return (
         <div
            className="custom-tooltip"
            style={{
               backgroundColor: "#ffff",
               padding: "5px",
               border: "1px solid #cccc"
            }}
         >
            <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
         </div>
      );
   }
   return null;
};

render(){
  return (
    <div className=' overflow-scroll h-screen'>
        <div className="bg-white shadow  sm:rounded-lg my-20 mx-20">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Response Details</h3>
      </div>

      <div className="border-t border-gray-200 ">
        <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Title-43</dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Author</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Elon Musk</dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Prerequisites</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Done</dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Company using</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Tech Mhindra, TCS, Infosys Pvt Ltd.</dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">No of projects.</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">300</dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Must do Concepts</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">DSA</dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Reference</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Let us C</dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Programing</dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Level</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Level-3 Difficult</dd>
            </div>

            {/* <hr className='bg-black'/> */}
            
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 ">Market apture</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 -ml-32">

                <PieChart width={730} height={300}>
                    <Pie
                        data={this.pieData}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {this.pieData.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={this.COLORS[index % this.COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<this.CustomTooltip />} />
                    <Legend />
                    </PieChart>
                </dd>
            </div>

            
        </dl>
      </div>
    </div>
    

    </div>
  )
}
}

export default ResponseDetails
