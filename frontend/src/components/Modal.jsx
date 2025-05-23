import React, { useCallback, useState } from "react";
import { handleToggleModal } from "../handlerFunctions/ModalHandler.js";
import useFetchModalData from "../hooks/useFetchModalData.jsx";
import useModalState from "../hooks/useModalState.jsx";
import TemplateModal from "./templates/TemplateModal.jsx";
import DelayModal from "./delays/DelayModal.jsx";
import CloseButton from "./buttons/CloseButton.jsx";
import LeadModal from "./leads/LeadModal.jsx";

export default function Modal({ isOpen, onClose, nodeId, nodeType, addNewNode }) {
  const [data, setData] = useState([]);
  const [selectedInstances, setSelectedInstances] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemData, setNewItemData] = useState({});
  const [openDelayModal, setOpenDelayModal] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  useFetchModalData(isOpen, nodeId, nodeType, setData);
  useModalState(isOpen, setIsAddingNew, setSelectedInstances, setNewItemData);

  const onClick = useCallback(() => {
    setIsAddingNew(false);
    setSelectedInstances([]);
    setNewItemData({});
    setOpenDelayModal(false);
    setOpenTemplateModal(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-lg max-h-full overflow-y-auto relative">
        <CloseButton onClick={onClick} className="absolute right-2 top-2 text-gray-500 text-lg cursor-pointer" />

        {nodeType !== 'leadSource' ? (
          <>
            <h3 className="font-bold mb-2 flex gap-2 items-center justify-center">
              <button className={`text-${openTemplateModal ? 'blue-500' : 'white'}`} onClick={() => handleToggleModal('templateModal', setOpenDelayModal, setOpenTemplateModal)}>Template</button>
              <button className={`text-${openDelayModal ? 'blue-500' : 'white'}`} onClick={() => handleToggleModal('delayModal', setOpenDelayModal, setOpenTemplateModal)}>Delay</button>
            </h3>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 flex gap-2 items-center">
              Leads from List(s)
            </h2>
            <LeadModal
              isOpen={isOpen}
              onClose={onClose}
              nodeType={nodeType}
              nodeId={nodeId}
              addNewNode={addNewNode}
              data={data}
              setData={setData}
              isAddingNew={isAddingNew}
              setIsAddingNew={setIsAddingNew}
              newItemData={newItemData}
              setNewItemData={setNewItemData}
              selectedInstances={selectedInstances}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              setSelectedInstances={setSelectedInstances}
            />
          </>
        )}

        {openTemplateModal && !openDelayModal ? (
          <TemplateModal
            isOpen={openTemplateModal}
            nodeId={nodeId}
            nodeType={nodeType}
            addNewNode={addNewNode}
            selectedInstances={selectedInstances}
            setSelectedInstances={setSelectedInstances}
            isAddingNew={isAddingNew}
            setIsAddingNew={setIsAddingNew}
            newItemData={newItemData}
            setNewItemData={setNewItemData}
            data={data}
            setData={setData}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            onClose={onClose}
            closeModal={setOpenTemplateModal}
          />
        ) : openDelayModal && !openTemplateModal ? (
          <DelayModal
            isOpen={openDelayModal}
            onClose={() => setOpenDelayModal(false)}
            nodeId={nodeId}
            nodeType={nodeType}
            addNewNode={addNewNode}
            closeModal={setOpenDelayModal}
          />
        ) : null}
      </div>
    </div>
  );
}