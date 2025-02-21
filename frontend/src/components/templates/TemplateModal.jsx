import AddTemplateForm from "./AddTemplateForm";
import TemplatesDropdown from "./TemplatesDropdown";

export default function TemplateModal(
  {
    isOpen,
    onClose,
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
    setSelectedInstances,
    addNewNode,
    closeModal
  }
) {
  if (!isOpen) return null;

  return (
    <>
      <div>
        <h3 style={{ fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
          Add New Template
        </h3>
        {
          isAddingNew ?
            (
              <AddTemplateForm
                setIsAddingNew={setIsAddingNew}
                setNewItemData={setNewItemData}
                newItemData={newItemData}
                nodeType={nodeType}
                setData={setData}
              />
            ) : (
              <TemplatesDropdown
                selectedInstances={selectedInstances}
                setSelectedInstances={setSelectedInstances}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                data={data}
                setIsAddingNew={setIsAddingNew}
                setNewItemData={setNewItemData}
                nodeId={nodeType}
                nodeType={nodeType}
                addNewNode={addNewNode}
                onClose={onClose}
                closeModal={closeModal}
              />
            )
        }
      </div>
    </>
  )
}