import React from "react";
import { database } from "../../firebase/init-firebase";
import { ref as dbref, child, get } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";

export default function ExpertDetails() {
  const { currentUser } = useAuth();
  const [data, setData] = React.useState([]);

  function getExpertDetails() {
    const db = dbref(database);
    let email = String(currentUser.email).toLowerCase().split("@")[0];
    get(child(db, `/expertsInfo/${email}/data/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
        return new Array();
      });
  }

  React.useEffect(() => {
    getExpertDetails();
  }, []);

  return (
    <>
      {data && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg my-20 mx-20">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Expert Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and information.
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.name}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.email}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Position</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.position}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.company}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Contact No.
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.contact}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
