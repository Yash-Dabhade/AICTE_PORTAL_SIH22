import { ref as dbref, update, child, get } from "firebase/database";
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
      window.location.href = "/";
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
      window.location.href = "/";
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
      window.location.href = "/";
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
    }
  )
    .then((snapshot) => {
      window.location.href = "/";
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
  semester,
  tags,
  fileUrl
) {
  const db = database;
  update(
    dbref(
      db,
      `/institutesDetail/${instituteCode}
        /courses/${courseCode}
        /departments/${departmentCode}
        /semesters/${semester}
        /${code}`
    ),
    {
      title: title,
      code: code,
      semester: semester,
      tags: tags,
      fileUrl: fileUrl,
    }
  )
    .then((snapshot) => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

const handleUpload = async (e) => {
  e.preventDefault();
  // document.getElementById("UploadButton").innerHTML = "Uploading...";
  // document.getElementById("UploadButton").disabled = true;
  let code = 3000; //get curriculum code
  let typeRef = "curriculum_files";
  const pathRef = "curriculums";
  const file = "test";
  let storageRef = ref(storage, `${pathRef}/${typeRef}/${code}`);
  let uploadTask = uploadBytesResumable(storageRef, file);
  console.log("Uploaded");

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      progress.toPrecision(2);
      // document.getElementById(
      //   "UploadButton"
      // ).innerHTML = `Uploading... ${parseInt(progress)}%`;
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      alert("Some error occured ! Please try again");
    },
    () => {
      document.getElementById("UploadButton").innerHTML = `Submitting...`;
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //set download url here
        console.log(downloadURL);
      });
    }
  );
};

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

export {
  saveNewUniversity,
  getAllUniversities,
  saveNewInstitute,
  saveNewInstituteLevelCourse,
  saveNewDepartment,
  saveNewCurriculum,
  getAllInstitutes,
  getFullInstituteDetails,
};
