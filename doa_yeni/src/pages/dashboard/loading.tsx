import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-20 w-20">
            <Loader className="animate-spin" size={40} color="#42438b" />
        </div>
    );
};

export default Loading;
