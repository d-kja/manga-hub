import { Link } from "react-router-dom";

function MangaButton({ id, chapId }) {
    return (
        <Link
            to={`/mangas/${id}/chapter/${chapId}`}
            className="
                btn 
                btn-xs 
                sm:btn-sm 
                md:btn-md 
                lg:btn-lg 
                btn-block 
                btn-ghost
                py-7
                rounded-lg
                "
        >
            CHAPTER 01
        </Link>
    );
}

export default MangaButton;
