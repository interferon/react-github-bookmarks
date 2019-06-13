import { BookmarkState } from "src/app/reducer";
import React from 'react';

export const Message = (op: {operation: BookmarkState['operation']}): JSX.Element => {
    return <div style={{color: op.operation.state === 'fail' ? 'red' : "green"}}>{op.operation.message}</div>
}