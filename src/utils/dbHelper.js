import { ref as dbref, set, update, child, get, push } from "firebase/database";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, database } from "../firebase/init-firebase";

function saveNewUniversity(initialName, fullName, code, email, phone, website) {
  const db = database;
  update(dbref(db, "/universities/" + code), {
    initialName: initialName,
    fullName: fullName,
    code: code,
    email: email,
    phone: phone,
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
  initialName
) {
  const db = database;
  set(
    dbref(
      db,
      `/institutesDetail/${instituteCode}/courses/${courseCode}/departments/${code}`
    ),
    {
      initialName: initialName,
      title: title,
      code: code,
      desc: desc,
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
            window.location.href = "/home";
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
      } else {
        alert("Data Submitted successfully");
        window.location.href = "/home";
      }
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
function saveNewTag(name) {
  const db = database;

  update(dbref(db, `/tags/${name}/`), {
    name: name,
    value: name,
  })
    .then((snapshot) => {
      alert("Tag added");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

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
  getAllTags,
};
