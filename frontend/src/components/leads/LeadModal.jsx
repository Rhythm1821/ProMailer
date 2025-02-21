import { handleAdd } from "../../handlerFunctions/ModalHandler";
import AddLeadForm from "./AddLeadForm";
import LeadsDropdown from "./LeadsDropdown";


export default function LeadModal(
    {
        isOpen,
        onClose,
        nodeId,
        addNewNode,
        nodeType,
        data,
        setData,
        isAddingNew,
        setIsAddingNew,
        newItemData,
        setNewItemData,
        selectedInstances,
        isDropdownOpen,
        setIsDropdownOpen,
        setSelectedInstances
    }
) {
    if (!isOpen) return null;
    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontWeight: 'bold', color: '#333' }}>Select your List(s)</h3>
                <button
                    onClick={() => {
                        handleAdd(setIsAddingNew, setNewItemData)
                        setIsAddingNew(true)
                    }
                    }
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
                    + Add Lead
                </button>
            </div>
            {
                isAddingNew ?
                    <AddLeadForm
                        setNewItemData={setNewItemData}
                        newItemData={newItemData}
                        setIsAddingNew={setIsAddingNew}
                        setData={setData}
                        nodeType={nodeType}
                    />
                    :
                    <LeadsDropdown
                        selectedInstances={selectedInstances}
                        setSelectedInstances={setSelectedInstances}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        data={data}
                        nodeId={nodeId}
                        nodeType={nodeType}
                        addNewNode={addNewNode}
                        onClose={onClose}
                    />
            }
        </div>
    )
}