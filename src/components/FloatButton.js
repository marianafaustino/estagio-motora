import { PlusIcon } from "@heroicons/react/24/outline";

function FloatButton({ disabled, onClick }) {
    return (
        <button 
        type="button" 
        disabled={disabled}  
        onClick={onClick} 
        className="float-button bottom-20 mr-14 text-motoraDarkBlue font-medium rounded-full border border-motoraDarkBlue text-sm p-2.5 text-center inline-flex items-center me-2"
        >
            {<PlusIcon className="h-10 w-10 text-motoraDarkBlue hover:text-motoraLightBlue" title="Plus"/>}
        </button>
    );
}

export default FloatButton;