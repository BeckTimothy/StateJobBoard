import React, {useState} from 'react';

export const DepartmentDict = (props) => {
    let department = props.department
    const dictionary = {
        "example": {"name": "name","url": "url.com"},
        "10th Judicial District Court": {"name": "New Mexico 10th Judicial District Court", "url": ""},
        "11th Judicial District Court": {"name": "New Mexico 11th Judicial District Court", "url": ""},
        "12th Judicial District Court": {"name": "New Mexico 12th Judicial District Court", "url": ""},
        "13th Judicial District Court": {"name": "New Mexico 13th Judicial District Court", "url": ""},
        "1st Judicial District Court": {"name": "New Mexico 1st Judicial District Court", "url": ""},
        "2nd Judicial District Court": {"name": "New Mexico 2nd Judicial District Court", "url": ""},
        "3rd Judicial District Court": {"name": "New Mexico 3rd Judicial District Court", "url": ""},
        "4th Judicial District Court": {"name": "New Mexico 4th Judicial District Court", "url": ""},
        "5th Judicial District Court": {"name": "New Mexico 5th Judicial District Court", "url": ""},
        "6th Judicial District Court": {"name": "New Mexico 6th Judicial District Court", "url": ""},
        "7th Judicial District Court": {"name": "New Mexico 7th Judicial District Court", "url": ""},
        "8th Judicial District Court": {"name": "New Mexico 8th Judicial District Court", "url": ""},
        "9th Judicial District Court": {"name": "New Mexico 9th Judicial District Court", "url": ""},
        "Admnstrtive Offc of the Courts": {"name": "New Mexico Administrative Office of the Courts", "url": ""},
        "Admnstrtve Office of DAs": {"name": "New Mexico Administrative Office of the District Attorneys", "url": ""},
        "Bernalillo Metropolitan Court": {"name": "Bernalillo Metropolitan Court", "url": ""},
        "Court of Appeals": {"name": "New Mexico Court of Appeals", "url": ""},
        "District Attorney 10th Distrct": {"name": "10th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 11th Dst I": {"name": "11th Judicial District Attorneys Office I of New Mexico", "url": ""},
        "District Attorney 11th Dst II": {"name": "11th Judicial District Attorneys Office II of New Mexico", "url": ""},
        "District Attorney 12th Distrct": {"name": "12th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 13th Distrct": {"name": "13th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 1st District": {"name": "1st Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 2nd District": {"name": "2nd Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 3rd District": {"name": "3rd Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 4th District": {"name": "4th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 5th District": {"name": "5th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 6th District": {"name": "6th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 7th District": {"name": "7th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 8th District": {"name": "8th Judicial District Attorneys Office of New Mexico", "url": ""},
        "District Attorney 9th District": {"name": "9th Judicial District Attorneys Office of New Mexico", "url": ""},
        "House Chief Clerk Office": {"name": "New Mexico House of Representatives Chief Clerk Office", "url": ""},
        "Judicial Standards Commission": {"name": "New Mexico Judicial Standards Commission", "url": "https://www.nmjsc.org/"},
        "Department of Cultural Affairs": {"name": "New Mexico Department of Cultural Affairs", "url": ""},
        "Department of Early Childhood": {"name": "New Mexico Department of Early Childhood", "url": ""},
        "Department of Environment": {"name": "New Mexico Department of Environment", "url": ""},
        "Department of Ethics": {"name": "New Mexico Department of Ethics", "url": ""},
        "Department of Finance & Admnst": {"name": "New Mexico Department of Finance & Administration", "url": ""},
        "Department of Game & Fish": {"name": "New Mexico Department of Game & Fish", "url": ""},
        "Department of Health": {"name": "New Mexico Department of Health", "url": ""},
        "Department of Indian Affairs": {"name": "New Mexico Department of Indian Affairs", "url": ""},
        "Department of Public Safety": {"name": "New Mexico Department of Public Safety", "url": ""},
        "Department of Transportation": {"name": "New Mexico Department of Transportation", "url": ""},
        "Department of Veteran Services": {"name": "New Mexico Department of Veteran Services", "url": ""},
        "Dept of  Workforce Solutions": {"name": "New Mexico Department of  Workforce Solutions", "url": ""},
        "Dept of Information Technology": {"name": "New Mexico Department of Information Technology", "url": ""},
        "State Investment Council": {"name": "New Mexico State Investment Council", "url": ""},
        "State Land Office": {"name": "New Mexico State Land Office", "url": ""},
        "State Personnel Board": {"name": "New Mexico State Personnel Board", "url": ""},
        "State Racing Commission": {"name": "New Mexico State Racing Commission", "url": ""},


        "Enrgy_ Minrls & Ntrl Rsrcs Dpt": {"name": "New Mexico Department of Energy, Minerals, and Natural Resources", "url": "https://www.emnrd.nm.gov/"},
        "Governor's Comm. on Disability": {"name": "State of New Mexico Governor's Commission on Disability", "url": "https://gcd.state.nm.us/"},
        "Homeland Security & Emgncy Mgt": {"name": "New Mexico Department of Homeland Security & Emergency Management", "url": "https://www.nmdhsem.org/"},
        "New Mexico Corrections Dept": {"name": "New Mexico Corrections Department", "url": "https://www.cd.nm.gov/"},
        "Ofc of the Lieutenant Governor": {"name": "Office of the Lieutenant Governor", "url": null},
        "Ofc of the State Engineer": {"name": "Office of the State Engineer", "url": "https://www.ose.state.nm.us/"},
        "Office of African Amer Affairs": {"name": "New Mexico Office of African American Affairs", "url": "https://www.oaaa.state.nm.us/"},
        "Office of Natural Resc Trustee": {"name": "Office of Natural Resources Trustee", "url": "https://onrt.env.nm.gov/"},
        "Prof Engneers & Lnd Srvyrs Brd": {"name": "New Mexico Board of Licensure for Professional Engineers & Professional Surveyors", "url": "https://www.sblpes.state.nm.us/"},
        "Public Empl Labor Relations Bd": {"name": "New Mexico Public Employee Labor Relations Board", "url": "https://www.pelrb.state.nm.us/"},
        "Public Employee Retiremnt Asso": {"name": "Public Employees Retirement Association of New Mexico", "url": "https://www.nmpera.org/"},
        "Legislatve Ed. Study Committee": {"name": "Legislative Education Study Committee", "url": null},
        "Aging & Long-Term Services Dpt": {"name": "New Mexico Aging and Long-Term Services Department", "url": "https://aging.nm.gov/"},
        "Children_ Youth & Families Dpt": {"name": "Children, Youth & Families Department of New Mexico", "url": "https://www.cyfd.nm.gov/"},
        "Com for Deaf/Hard of Hearing": {"name": "The New Mexico Commission for Deaf & Hard of Hearing", "url": "https://www.cdhh.nm.gov/"},
        "Comm on the Status of Women": {"name": "New Mexico Commission on the Status of Women", "url": "https://nmcsw.org/"},
        "Crime Victims Reparation Comm": {"name": "New Mexico Crime Victim Reparation Commission", "url": "https://www.cvrc.state.nm.us/"},
        "Dev Disabilities Council": {"name": "New Mexico Developmental Disabilities Planning Council", "url": "https://www.nmddpc.com/"},
        "Division of Vocational Rehab": {"name": "New Mexico Division of Vocational Rehabilitation", "url": "https://www.dvr.state.nm.us/"},
        "Economic Developmnt Department": {"name": "New Mexico Economic Development Department", "url": "https://edd.newmexico.gov/"},
        "Public School Insurance Auth": {"name": "New Mexico Public Schools Insurance Authority", "url": "https://nmpsia.com/"},
        "Public Schools Facility Auth": {"name": "Public School Facilities Authority", "url": "https://www.nmpsfa.org/"},
        "Regulation & Licensing Dept": {"name": "New Mexico Regulation and Licensing Department", "url": "https://www.rld.nm.gov/"},


        "Supreme Court": {"name": "", "url": ""},
        "House": {"name": "", "url": ""},
        "Legislative Council Service": {"name": "", "url": ""},
        "Legislative Finance Committee": {"name": "", "url": ""},
        "Legislative Maintenance": {"name": "", "url": ""},
        "Legislature House/Senate": {"name": "", "url": ""},
        "Senate": {"name": "", "url": ""},
        "Senate Chief Clerk Services": {"name": "", "url": ""},
        "Administrative Hearings Office": {"name": "", "url": ""},
        "Adult Parole Board": {"name": "", "url": ""},
        "Architect Examiners Board": {"name": "", "url": ""},
        "Board of Nursing": {"name": "", "url": ""},
        "Border Development Authority": {"name": "", "url": ""},
        "Commission for the Blind": {"name": "", "url": ""},
        "Commission of Public Records": {"name": "", "url": ""},
        "Educational Retirement Board": {"name": "", "url": ""},
        "EXPO New Mexico": {"name": "", "url": ""},
        "Gaming Control Board": {"name": "", "url": ""},
        "General Services Department": {"name": "", "url": ""},
        "Higher Education Department": {"name": "", "url": ""},
        "Human Services Department": {"name": "", "url": ""},
        "Inter Tribal Ceremonial Office": {"name": "", "url": ""},
        "Livestock Board": {"name": "", "url": ""},
        "Martin Luther King Jr Com": {"name": "", "url": ""},
        "Medical Examiners Board": {"name": "", "url": ""},
        "Military Affairs": {"name": "", "url": ""},
        "Military Homebase Planning": {"name": "", "url": ""},
        "Miners Colfax Medical Center": {"name": "", "url": ""},
        "NM Education Trust Board": {"name": "", "url": ""},
        "Office of the Attorney General": {"name": "", "url": ""},
        "Office of the Governor": {"name": "", "url": ""},
        "Public Education Department": {"name": "", "url": ""},
        "Public Regulation Commission": {"name": "", "url": ""},
        "Retiree Health Care Authority": {"name": "", "url": ""},
        "Secretary of State": {"name": "", "url": ""},





        "SpacePort Authority": {"name": "New Mexico SpacePort Authority", "url": null},
        "State Auditor": {"name": "New Mexico Office of the State Auditor", "url": "https://www.saonm.org/"},
        "State Treasurer": {"name": "New Mexico State Treasurer", "url": "https://nmsto.gov/"},
        "Superintendent of Insurance": {"name": "New Mexico Office of Superintendent of Insurance", "url": "https://www.osi.state.nm.us/"},
        "Taxation & Revenue Department": {"name": "Taxation & Revenue Department", "url": "https://www.tax.newmexico.gov/"},
        "Tourism Department": {"name": "New Mexico Tourism Department", "url": null},
        "Veterinary Examiners Board": {"name": "New Mexico Board of Veterinary Medicine", "url": "https://www.nmbvm.org/"},
        "Workers Compensation Admin": {"name": "New Mexico Workers Compensation Administration", "url": "https://workerscomp.nm.gov/"},
        "Youth Conservation Corps": {"name": "New Mexico Youth Conservation Corps", "url": "https://www.emnrd.nm.gov/about-ycc/"}
    }

    let url = Object.hasOwn(dictionary, department)?dictionary[department].url:"";
    let name = Object.hasOwn(dictionary, department)?dictionary[department].name:department;
    if(name === ""){
        name = department
    }

    return (
        <>
            <a href={url} id={department}>{name}</a>
        </>
    );
};

export default DepartmentDict;