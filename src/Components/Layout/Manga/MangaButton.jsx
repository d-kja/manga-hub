import { Link } from "react-router-dom";

function MangaButton({ id, chapId, title = "LOADING..." }) {
    return (
        <Link
            to={`/mangas/${id}/chapter/${chapId}`}
            className="
                text-lg
                btn 
                btn-lg
                sm:btn-sm 
                md:btn-md 
                lg:btn-lg 
                btn-block 
                btn-ghost
                
                rounded-lg
                "
        >
            {title}
        </Link>
    );
}

export default MangaButton;
