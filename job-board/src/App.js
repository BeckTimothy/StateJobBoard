import './App.css';
import React, {useState} from "react";
import {useEffect} from "react";
import Position, {PositionItem} from "./components/position/Position";

function App() {
    let stateTemplate = {
        judParsed: false,
        legParsed: false,
        execParsed: false,
        departments: [],
        positions: []
    }
    const [stateData, setStateData] = useState({});
    let localData = {
        ...stateTemplate,
        ...stateData
    };
    const concatDepartments = (arr) => {
        let data = localData;
        data.departments = data.departments.concat(arr);
        data.departments = [...new Map(data.departments.map((m) => [m.agency, m])).values()]
        setStateData(data)
    }

    const concatPositions = (arr) => {
        let data = localData;
        data.positions = data.positions.concat(arr);
        setStateData(data)
    }


    //step 1: build list of departments
    const getDepartments = async (branch) => {
        await getEmployeeDepartments("Judicial")
            .then(()=>{
                localData.judParsed = true;
            })
        await getEmployeeDepartments("Legislature")
            .then(()=>{
                localData.legParsed = true;
            })
        await getEmployeeDepartments("Executive")
            .then(()=>{
                localData.execParsed = true;
            })
    }

    const getEmployeeDepartments = async (branch) => {
        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployeeDepartments";

        url += "?operation=getEmployeeDepartments"
        url += `&branch=${branch}`
        url += `&employeeType=All`
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

        switch(branch){
            case "Judicial":
                localData.judParsed = true;
                break;
            case "Executive":
                localData.execParsed = true;
                break;
            case "Legislature":
                localData.legParsed = true;
                break;
        }

        concatDepartments(await data);
    }

    useEffect( ()=>{
        getEmployeeDepartments("Judicial")
        getEmployeeDepartments("Executive")
        getEmployeeDepartments("Legislature")
    }, [])

    //step 2: use list of departments to build list of positions
    const getPosition = async (branch, unit) => {

        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployees";
        url += "?operation=getEmployees"
        url += `&branch=${branch}`
        url += `&employeeType=All`
        url += "&year=2023"
        url += `&businessUnit=${unit}`
        url += "&db=b"

        //const response =
        await fetch(url, {
            "method": "GET",
            "Content-Type": "application/x-www-form-urlencoded"
        })
            .then(response => response.json())
            .then(data => {
                data = JSON.parse(data.result);
                //filter non-vacant positions
                data = data.filter(x => x.status.toLowerCase() === "vacant");
                //filter by keyword in job title
                //data = data.filter(x => x.position.toLowerCase().includes('application'));
                concatPositions(data);
            })
    }

    const parseDepartment = () => {
        let areAllDepartmentsProcessed = localData.departments?.length === 0
        let areBranchesProcessed = stateData.judParsed && stateData.legParsed && stateData.execParsed;

        //escapes this function if there are either:
        //1. No departments remaining to process
        //2. All departments have yet to be aggregated
        if (areAllDepartmentsProcessed  || !areBranchesProcessed) return;

        if (localData.departments.length > 0) {
            let department = localData.departments.shift();
            getPosition(department.branch, department.businessUnit)
        }
    }
    parseDepartment();

    //step 3: filter, sort, and display list of departments

    //sort localData by salary midpoint
    localData.positions = localData.positions?.sort((x,y) => {return Number(x.positionMidPoint) - Number(y.positionMidPoint)})



    localData.positions = localData.positions?.filter(x => x.position.toLowerCase().includes('project manager'))

  return (
    <div className="App">
      <header className="App-header">
        <p>peeeeeeeeep</p>
          <button onClick={()=>{parseDepartment()}}> Populate Vacant NM State Government Positions  </button>
          <span>{localData.positions?.length} vacant state positions</span>
          <div className={'positionBar thick'}>
              <span className={'spannum'}>{`Salary MidPoint`}</span>
              <span className={'spanner-l'}>{`Position Title`}</span>
              <span className={'spanner-r'}>{`State Department`}</span>
          </div>

          {localData.positions?.length > 0?
              localData.positions.map(x => {
                  return <PositionItem props={x} />
              }): <></>
          }
      </header>

    </div>
  );
}

export default App;
