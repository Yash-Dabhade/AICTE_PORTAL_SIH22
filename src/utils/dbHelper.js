import {
  ref as dbref,
  set,
  update,
  child,
  get,
  push,
  remove,
} from "firebase/database";
import { database } from "../firebase/init-firebase";

function saveNewUniversity(
  initialName,
  fullName,
  code,
  email,
  phone,
  location,
  website
) {
  const db = database;
  update(dbref(db, "/universities/" + code), {
    initialName: initialName,
    fullName: fullName,
    code: code,
    email: email,
    phone: phone,
    location: location,
    website: website,
  })
    .then((snapshot) => {
      window.location.href = "/home";
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function saveNewInstitute(
  universityCode,
  instituteName,
  code,
  email,
  phone,
  location,
  website
) {
  const db = database;

  update(dbref(db, `/universities/${universityCode}/institutes/${code}`), {
    name: instituteName,
    code: code,
    email: email,
    phone: phone,
    location: location,
    website: website,
  })
    .then((snapshot) => {
      window.location.href = "/home";
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function saveNewInstituteLevelCourse(instituteCode, title, code, level) {
  const db = database;
  update(dbref(db, `/institutesDetail/${instituteCode}/courses/${code}`), {
    title: title,
    code: code,
    level: level,
  })
    .then((snapshot) => {
      window.location.href = "/home";
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function saveNewDepartment(
  instituteCode,
  courseCode,
  title,
  code,
  desc,
  totalSems,
  initialName
) {
  const db = database;
  update(
    dbref(
      db,
      `/institutesDetail/${instituteCode}/courses/${courseCode}/departments/${code}`
    ),
    {
      initialName: initialName,
      title: title,
      code: code,
      desc: desc,
      totalSems: totalSems,
    }
  )
    .then((snapshot) => {
      window.location.href = "/home";
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function saveNewCurriculum(
  instituteCode,
  courseCode,
  departmentCode,
  title,
  code,
  level,
  semester,
  tag,
  fileUrl,
  reference
) {
  // console.log(instituteCode, courseCode, departmentCode);
  const db = database;

  let newRef = reference;
  if (!reference) {
    //getting new reference
    newRef = push(dbref(db, "/curriculumDetails/")).key;
  }

  update(dbref(db, `/curriculumDetials/${newRef}/${code}`), {
    title: title,
    code: code,
    level: level,
    semester: semester,
    tag: tag,
    instituteCode: instituteCode,
    departmentCode: departmentCode,
    fileUrl: fileUrl,
  })
    .then((snapshot) => {
      console.log("Uploaded");
      if (!reference) {
        update(
          dbref(
            db,
            `/institutesDetail/${instituteCode}/courses/${courseCode}/departments/${departmentCode}/curriculum/`
          ),
          {
            curriculumId: newRef,
          }
        )
          .then((snapshot) => {
            alert("Data Submitted successfully");
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
      } else {
        alert("Data Submitted successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveNewReport(reportName, btnFunc) {
  const db = database;
  let newRef = push(dbref(db, "/reportsList/")).key;
  update(dbref(db, `/reportsList/${newRef}/`), {
    id: newRef,
    name: reportName,
    date: new Date(Date.now()),
  })
    .then((snapshot) => {
      console.log("Saved new report");
      btnFunc();
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveNewTag(name, btnFunc) {
  const db = database;

  update(dbref(db, `/tags/${name}/`), {
    name: name,
    value: name,
  })
    .then((snapshot) => {
      alert("Tag added");
      btnFunc();
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function addNewExpert(email, field, btnFunc) {
  const db = database;

  const registerStatus = {
    isRegistered: false,
  };

  let expertName = String(email).toLowerCase().split("@")[0];

  update(dbref(db, `/expertsEmails/${expertName}`), {
    email: email,
    field: field,
    registerStatus: registerStatus,
  })
    .then((snapshot) => {
      alert("New Expert is Successfully Added");
      btnFunc();
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

function saveExpertDetails(name, email, position, company, contact, btnFunc) {
  const db = database;
  let emailID = String(email).toLowerCase().split("@")[0];
  set(dbref(db, `/expertsInfo/${emailID}/data/`), {
    name: name,
    email: email,
    position: position,
    company: company,
    contact: contact,
  })
    .then((snapshot) => {
      btnFunc();
    })
    .catch((error) => {
      console.log(error);
    });
}

function saveNewTrendingResponse(
  reportID,
  title,
  mcapture,
  prereq,
  company,
  project,
  concept,
  reference,
  level,
  tag,
  author
  // btnFunc
) {
  const db = database;
  let responseID = push(dbref(db, `/reportDetails/${reportID}/responses/`)).key;
  update(dbref(db, `/reportDetails/${reportID}/responses/${responseID}/`), {
    reportID: reportID,
    id: responseID,
    title: title,
    mcapture: mcapture,
    prereq: prereq,
    company: company,
    project: project,
    concept: concept,
    reference: reference,
    level: level,
    author: author,
    tag: tag,
  })
    .then((snapshot) => {
      // btnFunc();
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
}

function assignToExperts(reportID, name, date, emails) {
  const db = database;
  update(dbref(db, `/reportDetails/${reportID}/expertsEmails/`), {
    ...emails,
  })
    .then((snapshot) => {
      // btnFunc();
      emails.forEach((email) => {
        let emailID = String(email).split("@")[0];
        update(dbref(db, `/expertDetails/${emailID}/pending/${reportID}/`), {
          ID: reportID,
          name: name,
          date,
        })
          .then((snapshot) => {})
          .catch((err) => {
            alert("Something went wrong !");
            console.log(err);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      alert("Assigned successfully");
    });
}

function removeAssignedFormsFromExpert(reportID, email) {
  let emailID = String(email).split("@")[0];
  const db = database;
  remove(dbref(db, `/expertsInfo/${emailID}/pending/${reportID}`))
    .then(() => {
      alert("Removed Assigned Form successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeExpert(email) {
  let emailID = String(email).split("@")[0];
  const db = database;
  remove(dbref(db, `/expertsEmails/${emailID}`))
    .then(() => {
      alert("Removed Expert successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

function removeTag(tagName) {
  const db = database;
  remove(dbref(db, `/tags/${tagName}`))
    .then(() => {
      alert("Removed Tag successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

// ---------------------------------------------------------------------------------------------------

function getAllUniversities() {
  const db = dbref(database);
  get(child(db, `/universities/`))
    .then((snapshot) => {
      let allData = new Array();
      if (snapshot.exists()) {
        let data = snapshot.val();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
      }
      return allData;
    })
    .catch((error) => {
      console.error(error);
      return new Array();
    });
}

function getAllInstitutes() {
  const db = dbref(database);
  let universityCode = window.sessionStorage.getItem("UniversityCode");
  get(child(db, "/universities/" + universityCode + "/institutes/"))
    .then((snapshot) => {
      let allData = new Array();
      if (snapshot.exists()) {
        let data = snapshot.val();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
        //setState
        console.log(allData);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getFullInstituteDetails(instituteCode) {
  const db = dbref(database);
  let universityCode = window.sessionStorage.getItem("UniversityCode");
  get(child(db, `/institutesDetail/${instituteCode}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        // Object.keys(data).forEach((key) => {
        //   allData.push(data[key]);
        // });
        //setState
        console.log(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllCurriculums(reference) {
  const db = dbref(database);

  get(child(db, "/curriculumDetails/" + reference + "/"))
    .then((snapshot) => {
      let allData = new Array();
      if (snapshot.exists()) {
        let data = snapshot.val();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
        //setState
        console.log(allData);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Tags

function getAllTags() {
  const db = dbref(database);
  get(child(db, `/tags/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        let allData = new Array();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
        // setState
        console.log(allData);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllReports() {
  const db = dbref(database);
  get(child(db, `/reportsList/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        let allData = new Array();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
        // setState here
        //ex : setData(allData)
        console.log(allData);
      }
    })
    .catch((error) => {
      console.error(error);
      console.error(error);
    });
}

function getAllExpertEmails() {
  const db = dbref(database);
  get(child(db, `/expertsEmails/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        let allData = new Array();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
        // setState here
        //ex : setData(allData)
        console.log(allData);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getExpertDetails(email) {
  const db = dbref(database);
  let emailID = String(email).split("@")[0];
  get(child(db, `/expertDetails/${emailID}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let val = snapshot.val();
        //set state
        //setData(val.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllResponsesByReportID(reportID) {
  const db = dbref(database);
  get(child(db, `/reportDetails/${reportID}/responses/`))
    .then((snapshot) => {
      let allData = new Array();
      if (snapshot.exists()) {
        let data = snapshot.val();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
      }
      //set state
      //setData(allData)
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllExpertEmailsByReportID(reportID) {
  const db = dbref(database);
  get(child(db, `/reportDetails/${reportID}/expertsEmails/`))
    .then((snapshot) => {
      let allData = new Array();
      if (snapshot.exists()) {
        let data = snapshot.val();
        console.log(data);
        // Object.keys(data).forEach((key) => {
        //   allData.push(data[key]);
        // });
      }
      //set state
      //setData(allData)
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllExpertAssignedReports(email) {
  const db = dbref(database);
  let emailID = String(email).split("@")[0];
  get(child(db, `/expertDetails/${emailID}/pending/`))
    .then((snapshot) => {
      let allData = new Array();
      if (snapshot.exists()) {
        let data = snapshot.val();
        Object.keys(data).forEach((key) => {
          allData.push(data[key]);
        });
      }
      //set state
      console.log(allData);
      //setData(allData)
    })
    .catch((error) => {
      console.error(error);
    });
}

export {
  saveNewUniversity,
  getAllUniversities,
  saveNewInstitute,
  saveNewInstituteLevelCourse,
  saveNewDepartment,
  saveNewCurriculum,
  getAllInstitutes,
  getFullInstituteDetails,
  saveNewTag,
  addNewExpert,
  getAllTags,
  saveNewReport,
  getAllReports,
  getAllExpertEmails,
  saveExpertDetails,
  saveNewTrendingResponse,
  assignToExperts,
};
