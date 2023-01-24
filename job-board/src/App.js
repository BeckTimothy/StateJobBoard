import './App.css';
import {useState} from "react";
import {useEffect} from "react";

function App() {

    let stateTemplate = {
        departmentsParsed: false,
        departments: [],
        positions: []
    }
    const [stateData, setStateData] = useState({});
    const handleStateData = (data) => {
        console.log(data)
        setStateData(data);
    }
    const handleClick =()=>{
        setStateData(localData);
    }
    const concatPositions = (arr) => {
        let data = localData;
        data.positions = data.positions.concat(arr);
        console.log(data);
        setStateData(data)
    }
    let localData = {
        ...stateTemplate,
        ...stateData
    };


    //step 1: build list of departments
    const getAllDepartments = async () => {
        localData.departments = [
        ...await getEmployeeDepartments("Judicial"),
        ...await getEmployeeDepartments("Legislature"),
        ...await getEmployeeDepartments("Executive") ]
        localData.departmentsParsed = true;
        handleStateData(localData);
    }

    const getEmployeeDepartments = async (branch, employeeType = "All") => {
        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployeeDepartments";

        url += "?operation=getEmployeeDepartments"
        url += `&branch=${branch}`
        url += `&employeeType=${employeeType}`
        url += "&year=2023"
        url += "&db=b"

        const response = await fetch(url, {
            "method": "GET",
            "Content-Type": "application/x-www-form-urlencoded"
        })
            .then(response => response)
            .then(data => data)

        let actualResponse = await response.json()

        let data = await JSON.parse(actualResponse.result);
        data = await data.map(data => {
            data.branch = branch;
            return data;
        });
        await data.shift();
        return await data;
    }

    //step 2: use list of departments to build list of positions

    const getPosition = async (branch, unit) => {

        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployees";

        url += "?operation=getEmployees"
        url += `&branch=${branch}`
        url += `&employeeType=All`
        url += "&year=2023"
        url += `&businessUnit=${unit}`
        url += "&db=b"

        const response = await fetch(url, {
            "method": "GET",
            "Content-Type": "application/x-www-form-urlencoded"
        })
            .then(response => response)
            .then(data => data)

        let actualResponse = await response.json()

        let data = await JSON.parse(actualResponse.result);

        data = await data.filter(x => x.status === "Vacant")

        concatPositions(await data);
    }

    const parseDepartment = async () => {
        if (localData.departments.length === 0 || !localData.departmentsParsed) return;

        while (localData.departments.length > 0) {

            let department = localData.departments.shift();

            await getPosition(department.branch, department.businessUnit)
        }
    }

    //step 3: display list of positions to dom
    //          - build position component

    //step 4: filter list of positions
    //          - build filter form component



    if(!localData.departmentsParsed){
        getAllDepartments()
    }



  return (
    <div className="App">
      <header className="App-header">
        <p>peep</p>
          <button onClick={parseDepartment}> Populate Vacant Positions  </button>
      </header>

    </div>
  );
}

export default App;
