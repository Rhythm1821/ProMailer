import { Handle } from "@xyflow/react";

const AddNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #000', borderRadius: 5 }}>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
            />
            <span>{data.label}</span>
        </div>
    );
};

export default AddNode;