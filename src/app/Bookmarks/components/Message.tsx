import { BookmarkState } from "src/app/reducer";
import React from 'react';

export const Message = (op: {operation: BookmarkState['operation']}): JSX.Element => {
    return <div>
            <h3>Message</h3>
            <div style={{color: op.operation.state === 'fail' ? 'red' : "green"}}>{op.operation.message}</div>
        </div>
}