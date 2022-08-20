import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Courses from "../pages/CurriculumPortal/Courses";

function InstituteList(props) {
  const [institutes, setInstitutes] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);

  function getAllInstitutes(data) {
    if (!data) return;
    let institutesArray = [];
    Object.keys(data).forEach((key) => {
      institutesArray.push(data[key]);
    });
    setInstitutes(institutesArray);
  }

  function handleSearch(searchQuery) {
    let instituteArray = [];
    instituteArray = institutes.filter((institute) => {
      return (
        institute.name
          .toLowerCase()
          .trim()
          .includes(String(searchQuery).toLowerCase().trim()) ||
        institute.code
          .toLowerCase()
          .trim()
          .includes(String(searchQuery).toLowerCase().trim())
      );
    });
    setFilteredInstitutes(instituteArray);
  }

  useEffect(() => {
    if (props.institutes) {
      getAllInstitutes(props.institutes);
    } else {
      if (window.sessionStorage.getItem(props.universityCode + "Institutes")) {
        getAllInstitutes(
          JSON.parse(
            window.sessionStorage.getItem(props.universityCode + "Institutes")
          )
        );
      }
    }

    return () => {};
  }, []);

  return (
    <div className="institute flex flex-col">
      <div className="search-wrapper border border-compatible">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          id="pageSearch"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="feather feather-search"
          viewBox="0 0 24 24"
        >
          <defs></defs>
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </div>
      <div className="overflow-auto sm:-mx-6 lg:-mx-8">
        <div className="h-instituteList py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <table className="min-w-full darkMode">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  email
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  website
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium  px-6 py-4 text-left"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutes && filteredInstitutes.length > 0
                ? filteredInstitutes.map((ele, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                          {ele.code}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.name}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.phone}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.email}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.website}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`${window.location.pathname}/courses`}
                            className="btn-compatible font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              props.getInstituteCode(ele.code);
                            }}
                          >
                            {"View Details"}
                            {/* {ele.details} */}
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : institutes.map((ele, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                          {ele.code}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.name}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.phone}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.email}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {ele.website}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`${window.location.pathname}/courses`}
                            className="btn-compatible font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              props.getInstituteCode(ele.code);
                            }}
                          >
                            {"View Details"}
                            {/* {ele.details} */}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InstituteList;
