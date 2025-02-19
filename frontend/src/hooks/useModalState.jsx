import { useEffect } from "react";

export default function useModalState(isOpen, setIsAddingNew, setSelectedInstances, setNewItemData) {
    useEffect(() => {
        if (!isOpen) {
          setIsAddingNew(false);
          setSelectedInstances([]);
          setNewItemData({});
        }
      }, [isOpen]);
}