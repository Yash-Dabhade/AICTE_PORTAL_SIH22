import { ref as dbref, update, child, get } from "firebase/database";
import { database } from "../firebase/init-firebase";

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

export { saveNewUniversity, getAllUniversities };
