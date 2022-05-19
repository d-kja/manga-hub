import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function GoUpButton({ windowRef, screenOffsetRef }) {
    return (
        <div className={`fixed right-7 bottom-24 z-50`}>
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
