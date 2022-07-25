import React from "react";
import Description from "./Description";
import InstituteList from "./InstituteList";
import ContactCard from "./ContactCard";
import SimpleCard2 from "./SimpleCard2";

function Institute(props) {
  return (
    <div className="universities-section">
      <div className="flex justify-between ">
        <Description
          title={props.title}
          code={props.code}
          fullName={props.fullName}
        />
        {/* <SimpleCard2 /> */}
        <ContactCard />
      </div>
      <div className="universities-section-header">
        <p>Institutes</p>
      </div>
      <InstituteList
        sectionHeader={props.sectionHeader}
        sectionSubHeader={props.sectionSubHeader}
        institutes={props.institutes}
        root={props.root}
      />
    </div>
  );
}

export default Institute;
