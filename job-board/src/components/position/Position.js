import React, {useState} from 'react';

export const PositionItem = ({props}) => {

    return (
        <>
            <div className={'positionBar'}>
                <span className={'spannum'}>{`$${Math.round(props.positionMidPoint)}`}</span>
                <span className={'spanner-l'}>{`${props.position}`}</span>
                <span className={'spanner-r'}>{`${props.organization}`}</span>
            </div>
        </>
    );
};

export default PositionItem;