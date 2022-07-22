
import DataTable from 'react-data-table-component'
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export default function Institutes() {
    const [coutries, setCoutries] = useState([])
    const [search, setSearch] = useState("")
    const [filterCoutries, setFilterCoutries] = useState([])
    const getCountries = async () =>{
      try {
        const responce = await axios.get('https://restcountries.com/v2/all');
        setCoutries(responce.data)
        setFilterCoutries(responce.data)
    
      } catch (error){
        console.log("Something was wrong")
      }
    }
  
    const column = [
      {
        name : "Country Name",
        selector : row => row.name,
        sortable : true
      },
      {
        name : "Country Native Name",
        selector : row => row.nativeName
      },
      {
        name : "Country Capital",
        selector : row => row.capital
      },
      {
        name : "Country Flag",
        selector : row => <img src={row.flag} width={50} height={50} alt="" />
      },
    ]
  
    useEffect(() =>{
      getCountries(); 
    }, [])

    useEffect(() =>{
        const result = coutries.filter(country => {
            return country.name.toLowerCase().match(search.toLowerCase());
        });

        setFilterCoutries(result);
    }, [search])

  return (
    <div> 
        <h1 className='text-center'>Institutes Comes Under MSBTE</h1>
    <DataTable title="Institutes List"
    columns={column}
    data={filterCoutries}
     pagination 
     fixedHeader
     highlightOnHover
     fixedHeaderScrollHeight='450px'
     
     
     subHeader
     subHeaderComponent = {
       <input type="text" placeholder='search here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} />
     } /></div>
  )
}
