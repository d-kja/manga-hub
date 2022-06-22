import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScroll } from "../../Hooks/useScroll";
import { useEffect, useState } from "react";

function GoUpButton({ windowRef, screenOffsetRef }) {
    const scrollOffSetCurrentValue = useScroll();
    const [oldValue, setOldValue] = useState(scrollOffSetCurrentValue);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (
            oldValue > scrollOffSetCurrentValue &&
            scrollOffSetCurrentValue > 500
        ) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        setOldValue(scrollOffSetCurrentValue);

        //eslint-disable-next-line
    }, [scrollOffSetCurrentValue]);

    return (
        <div
            className={`fixed right-7 bottom-24 z-50 animate-bounce delay-150 duration-700 ease-in-out transition-all ${
                !isVisible ? "opacity-0 invisible" : "opacity-100"
            }`}
        >
            <button
                className="btn btn-primary btn-circle btn-outline rounded-full h-14 w-14"
                onClick={() =>
                    windowRef.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
            >
                <KeyboardArrowUpIcon sx={{ height: 25, width: 25 }} />
            </button>
        </div>
    );
}

export default GoUpButton;
