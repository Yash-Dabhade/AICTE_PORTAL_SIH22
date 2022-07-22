import React from 'react'
import SimpleCard from '../components/SimpleCard';

function TestPage() {
  return (
    <>
     <SimpleCard title = "Maharashtra State Board of Technical Education"  desc="The MSBTE is an autonomous Board of the Government of Maharashtra. MSBTE designs and implements diploma, post diploma and advanced diploma programs to affiliated institutions." logo={require('../res/MSBTE_logo.png')}/>
    </>
  );
}

export default TestPage;