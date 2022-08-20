import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CompareSubject from "./CompareSubject";

function ResponseDetails({ responseObj }) {
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  const [market, setmarket] = useState(0);

  const pieData = [
    {
      name: responseObj.title,
      value: market,
    },
    { name: "Others", value: 100 - market },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    let m = new String(responseObj.mcapture).split("%")[0];
    setmarket(new Number(m));
    console.log(m);
    // settitle(responseObj.title);

    return () => {};
  }, []);

  return (
    <div id="formRoot" className="parent-section darkMode">
      <Routes>
        <Route
          path="*"
          element={
            <div className="overflow-scroll overflow-x-hidden h-4/5 mb-3 border border-gray-600 shadow-2xl border-compatible rounded-lg ">
              <div className="bg-white shadow flex items-start  justify-between flex-row  sm:rounded-lg my-20 mx-20">
                <div className="border-t  flex flex-col items-start  justify-center  border-gray-200 ">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Response Details
                    </h3>
                  </div>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-semibold text-gray-500">
                        Title
                      </dt>
                      <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.title}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-extrabold text-slate-500">
                        Author
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.author}
                      </dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Prerequisites
                      </dt>
                      <dd className="mt-1 text-s text-right m text-gray-900 sm:mt-0 sm:col-span-2  ">
                        {responseObj.prereq}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Company using
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.company}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Rate of projects.
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.project}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Must do Concepts
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.concept}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Reference
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.reference}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Category
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.tag}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-b-slate-300 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Level
                      </dt>
                      <dd className="mt-1 text-sm text-right  text-gray-900 sm:mt-0 sm:col-span-2">
                        {responseObj.level}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* right section/////////////////////////////////////////////////////////////////// */}
                <div className="w-2/5 h-report flex flex-col  justify-center ">
                  <div className="items-center justify-center border-b border-b-slate-300  bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-lg text-left  font-medium text-gray-500 ">
                      Market Capture
                    </dt>
                    <dd className="mt-1 text-sm  text-gray-900 sm:mt-0 sm:col-span-2">
                      <PieChart width={300} height={250}>
                        <Pie
                          data={pieData}
                          color="#000000"
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          fill="#8884d8"
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </dd>
                  </div>
                  <Link
                    to="/Trending/ReportDetails/ResponseDetails/compareSubject"
                    className="border-2 mx-3 mt-2 text-center  hover:bg-slate-600 hover:text-zinc-100 border-slate-800 p-2 rounded-xl shadow-xl font-bold font-sans text-lg"
                  >
                    Find Place In Curriculum
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="compareSubject/*"
          element={<CompareSubject responseObj={responseObj} />}
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default ResponseDetails;
