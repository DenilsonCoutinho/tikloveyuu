
interface buttonProps {
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    disabled?: boolean;
    text:string;
}
export default function ButtonUiUniverse({ disabled, onClick,text }: buttonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className="uiverse mt-3">
            <div className="wrapper">
                <span className=" px-2 flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">
                   {text}
                </span>
                <div className="circle circle-12"></div>
                <div className="circle circle-11"></div>
                <div className="circle circle-10"></div>
                <div className="circle circle-9"></div>
                <div className="circle circle-8"></div>
                <div className="circle circle-7"></div>
                <div className="circle circle-6"></div>
                <div className="circle circle-5"></div>
                <div className="circle circle-4"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-1"></div>
            </div>
        </button>
    )
}