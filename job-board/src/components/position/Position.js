import React, {useState} from 'react';
import {DepartmentDict} from "../departmentDict/departmentDict";

export const PositionItem = ({props}) => {

    return (
        <>
            <div className={'positionBar'}>
                <span className={'spannum'}>{`$${Math.round(props.positionMidPoint)}`}</span>
                <span className={'spanner-l'}>{`${props.position}`}</span>
                <span className={'spanner-r'}><DepartmentDict department={props.organization}/></span>
            </div>
        </>
    );
};

export default PositionItem;