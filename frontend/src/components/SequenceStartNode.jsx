import { Handle } from "@xyflow/react";

const SequenceStartNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid #000', borderRadius: 5 }}>
            <span>{data.label}</span>
            <Handle
                type="source"
                position="bottom"
                style={{ background: '#555' }}
            />
        </div>
    );
};

export default SequenceStartNode;