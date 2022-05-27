import { CircularProgress } from "@mui/material";

const Spinner = ({ heigth = 300 }) => {
    return (
        <div
            className="grid place-items-center text-white"
            style={{
                minHeight: heigth,
            }}
        >
            <CircularProgress color="inherit" />
        </div>
    );
};

export default Spinner;
