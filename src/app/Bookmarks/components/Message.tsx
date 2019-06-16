import { BookmarkState } from "src/app/reducer";
import React from 'react';
import { useAlert } from "react-alert";

export const Message = (op: {operation: BookmarkState['operation']}): JSX.Element => {
    // const alert = useAlert();
    // alert.info(op.operation.message)
    return <div></div>;
}