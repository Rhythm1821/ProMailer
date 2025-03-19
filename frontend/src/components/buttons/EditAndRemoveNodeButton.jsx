import { handleNodeEdit, handleNodeRemove } from "../../handlerFunctions/AppHandler";

export default function EditAndRemoveNodeButton({ id, setNodes, setEdges }) {
    return (
        <div className="absolute -top-3.5 -right-3.5 flex gap-1.5">
            <button
              onClick={() => handleNodeEdit(id)}
              className="px-2 py-1 bg-blue-500 text-white border-none rounded cursor-pointer"
            >
              ✏️
            </button>
            <button
              onClick={() => handleNodeRemove(id, setNodes, setEdges)}
              className="px-2 py-1 bg-red-600 text-white border-none rounded cursor-pointer"
            >
              X
            </button>
        </div>
    );
}