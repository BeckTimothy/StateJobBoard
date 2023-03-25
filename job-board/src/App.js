import './App.css';
import React, {useState} from "react";
import {useEffect} from "react";
import {PositionItem} from "./components/position/Position";
import {Form, Button} from "react-bootstrap"


function App() {
    let stateTemplate = {
        judParsed: false,
        legParsed: false,
        execParsed: false,
        gotJobs: false,
        filteredPositions: [],
        departments: [],
        positions: []
    }
    const [stateData, setStateData] = useState({});
    let localData = {
        ...stateTemplate,
        ...stateData
    };
    const [filters, setFilters] = useState([]);
    const handleSetFilters = (arr) => {
        setFilters(arr);
    }

    const concatPositions = (arr) => {
        let data = localData;
        data.positions = data.positions.concat(arr);
        setStateData(data)
    }


    //step 1: build list of departments
    const getAllDepartments = async () => {
        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployeeDepartments";
        url += "?operation=getEmployeeDepartments"
        url += `&branch=Judicial`
        url += `&employeeType=All`
        url += "&year=2023"
        url += "&db=b"
        await fetch(url, {
            "method": "GET",
            "Content-Type": "application/x-www-form-urlencoded"
        })
            .then(response => response)
            .then(async data => {
                localData.judParsed = true;
                data = await data.json();
                data = await JSON.parse(data.result);
                data = await data.map(chunk => {
                    chunk.branch = 'Judicial';
                    return chunk;
                });
                localData.departments = localData.departments.concat(data);

                let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployeeDepartments";
                url += "?operation=getEmployeeDepartments"
                url += `&branch=Legislature`
                url += `&employeeType=All`
                url += "&year=2023"
                url += "&db=b"
                await fetch(url, {
                    "method": "GET",
                    "Content-Type": "application/x-www-form-urlencoded"
                })
                    .then(response => response)
                    .then(async data => {
                        localData.legParsed = true;
                        data = await data.json();
                        data = await JSON.parse(data.result);
                        data = await data.map(chunk => {
                            chunk.branch = 'Legislature';
                            return chunk;
                        });
                        localData.departments = localData.departments.concat(data);

                        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployeeDepartments";
                        url += "?operation=getEmployeeDepartments"
                        url += `&branch=Executive`
                        url += `&employeeType=All`
                        url += "&year=2023"
                        url += "&db=b"
                        await fetch(url, {
                            "method": "GET",
                            "Content-Type": "application/x-www-form-urlencoded"
                        })
                            .then(response => response)
                            .then(async data => {
                                localData.execParsed = true;
                                data = await data.json();
                                data = await JSON.parse(data.result);
                                data = await data.map(chunk => {
                                    chunk.branch = 'Executive';
                                    return chunk;
                                });
                                localData.departments = localData.departments.concat(await data);
                                setStateData(localData)
                            })
                    })
            })
    }

    useEffect( ()=>{
        let allParsed = stateData.judParsed && stateData.legParsed && stateData.execParsed && stateData.gotJobs
        if(!allParsed) {
            getAllDepartments();
        }
    },[])

    //step 2: use list of departments to build list of positions
    const getPosition = async (branch, unit) => {

        let url  = "https://us-central1-nm-gov-1.cloudfunctions.net/ssp-prod/getEmployees";
        url += "?operation=getEmployees"
        url += `&branch=${branch}`
        url += `&employeeType=All`
        url += "&year=2023"
        url += `&businessUnit=${unit}`
        url += "&db=b"

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
            if (localData.departments.length === 0) {localData.gotJobs = true;}
            getPosition(department.branch, department.businessUnit)
        }
    }
    parseDepartment();

    //step 3: filter, sort, and display list of departments

    const submitFilters = (event) => {
        const form = event.currentTarget;

       let arr = []
        for(let i=0;i<form.length;i++){
            if(form[i].checked){
                arr.push(form[i].name)
            }
        }

        console.log(arr)
        handleSetFilters(arr)
    }
    const DatForm = () => {
        return (
            <Form onChange={submitFilters} className={'boop'}>

                <Form.Group controlId={`application developer`} className={'beep'}>
                    <Form.Check
                        className={`checkboxes`}
                        type={`checkbox`}
                        id={`default-checkbox`}
                        label={`Developers`}
                        name={`application developer`}
                        checked={filters.includes(`application developer`)}
                    />
                </Form.Group>

                <Form.Group controlId={`it project manager`} className={'beep'}>
                    <Form.Check
                        className={`checkboxes`}
                        type={`checkbox`}
                        id={`default-checkbox`}
                        label={`IT PM`}
                        name={`it project manager`}
                        checked={filters.includes(`it project manager`)}
                    />
                </Form.Group>
            </Form>
        )
    }
    //sort by salary midpoint
    localData.filteredPositions = localData.positions?.sort((x,y) => {return Number(x.positionMidPoint) - Number(y.positionMidPoint)})

    if(filters?.length > 0) localData.filteredPositions = localData.positions?.filter(x => filters?.some(filter => x.position.toLowerCase().includes(filter)))

  return (
    <div className="App">
      <header className="App-header">
          <h1>State of New Mexico: Funded and Vacant Positions</h1>
          {localData.gotJobs ? <><DatForm /><span>This page lags when displaying several thousand results</span></>: <><p>Filters will appear when all data has been received...</p> </>}



          <span>Showing {localData.filteredPositions?.length} of {localData.positions?.length} vacant state positions</span>
          <div className={'positionBar thick'}>
              <span className={'spannum'}>{`Salary MidPoint`}</span>
              <span className={'spanner-l'}>{`Position Title`}</span>
              <span className={'spanner-r'}>{`State Department`}</span>
          </div>

          {localData.filteredPositions?.length > 0?
              localData.filteredPositions.map(x => {
                  return <PositionItem props={x} />
              }): <></>
          }
      </header>

    </div>
  );
}




export default App;
