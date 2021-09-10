import React from "react";

const TableCell = ({ name,
    value,
    placeholder,
    type,
    editable,
    onItemChanged,
    maxLength,
    style,
    options }) => {

    const inputField = (type === "select")
        // Select field
        ? (<select name={name} value={value} onChange={onItemChanged}>
            {
                options.map((opt, i) => {
                    return (<option key={i}>{opt}</option>)
                })
            }
        </select>)
        : ((type === "textarea")
            // Iextarea field
            ? (<textarea
                name={name}
                value={value}
                onChange={onItemChanged}
                style={{ ...style, resize: "vertical", minHeight: "60px" }}>
            </textarea>)
            // Input field
            : (<input
                name={name}
                value={value}
                placeholder={placeholder}
                type={type}
                onChange={onItemChanged}
                maxLength={maxLength}
                style={style}
            />))

    return (
        // Return fields if cell is in edit mode, otherwise return simple value
        <td style={style}>
            {editable ? inputField : (<span>{value}</span>)}
        </td>
    )
}

export default TableCell;