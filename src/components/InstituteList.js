import React, { useEffect, useState } from "react";
import InstituteDetails from "./InsituteDetails";

function InstituteList(props) {
  const [institutes, setInstitutes] = useState([]);
  let userData = [];

  function getAllInstitutes() {
    if (!props.institutes) return;
    Object.keys(props.institutes).forEach((key) => {
      userData.push(props.institutes[key]);
    });
    setInstitutes(userData);
  }

  useEffect(() => {
    getAllInstitutes();
    return () => {};
  }, []);

  function renderCardDetails(code) {
    // Add Institute name after fetching from database
    // props.sectionHeader()
    props.sectionSubHeader("Courses");
    // sectionSubHeader("Courses");
    props.root.render(
      <InstituteDetails
        code={code}
        sectionSubHeader={props.sectionSubHeader}
        root={props.root}
      />
    );
  }

  return (
    <div className="institute flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    website
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {institutes
                  ? institutes.map((ele, index) => {
                      return (
                        <tr className="border-b" key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ele.code}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {ele.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {ele.phone}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {ele.email}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {ele.website}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                              onClick={(e) => {
                                renderCardDetails(e, ele.code);
                              }}
                            >
                              {"View Details"}
                              {/* {ele.details} */}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstituteList;
