import { handleAdd, handleInsert, handleRemove, handleSelect } from "../../handlerFunctions/ModalHandler";
import InsertButton from "../buttons/InsertButton";

export default function TemplatesDropdown(
    {
        selectedInstances,
        setSelectedInstances,
        isDropdownOpen,
        setIsDropdownOpen,
        data,
        setIsAddingNew,
        setNewItemData,
        nodeId,
        nodeType,
        addNewNode,
        onClose,
        closeModal
    }) {
    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#333' }}>Select your List(s)</h3>
                    <button
                        onClick={() => handleAdd(setIsAddingNew, setNewItemData)}
                        style={{
                            border: '1px solid #3b82f6',
                            color: '#3b82f6',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <span style={{ marginRight: '4px' }}>+</span>
                        Add Template
                    </button>
                </div>
                <div
                    style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '8px',
                        minHeight: '100px',
                        position: 'relative',
                    }}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                        {selectedInstances.map((item) => (
                            <span
                                key={item._id}
                                style={{
                                    backgroundColor: '#f3f4f6',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#6b7280',
                                }}
                            >
                                {item.name}
                                <button
                                    onClick={() => handleRemove(item, selectedInstances, setSelectedInstances)}
                                    style={{ marginLeft: '4px', color: '#6b7280' }}
                                >
                                    X
                                </button>
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '8px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            background: 'white',
                            color: '#333',
                            cursor: 'pointer',
                        }}
                    >
                        Select options
                    </button>
                    {isDropdownOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                right: 0,
                                maxHeight: '200px',
                                overflowY: 'auto',
                                border: '1px solid #e5e7eb',
                                borderTop: 'none',
                                borderRadius: '0 0 4px 4px',
                                background: 'white',
                                zIndex: 10,
                            }}
                        >
                            {data
                                .filter((item) => !selectedInstances.some((selected) => selected._id === item._id))
                                .map((item) => (
                                    <button
                                        key={item._id}
                                        onClick={() => handleSelect(item, selectedInstances, setSelectedInstances, setIsDropdownOpen)}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px',
                                            cursor: 'pointer',
                                            border: 'none',
                                            background: 'none',
                                            color: '#333',
                                        }}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                        </div>
                    )}
                    <InsertButton
                        onClick={() => handleInsert(selectedInstances, nodeId, nodeType, addNewNode, onClose, closeModal)}
                    />
                </div>
            </div>
        </>
    )
}