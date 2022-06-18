import { Link } from "react-router-dom";

function MangaButton({ id, chapId, title = "LOADING..." }) {
    return (
        <Link
            to={`/mangas/${id}/chapter/${chapId}`}
            className="
                text-lg
                btn 
                btn-lg
                border-zinc-700
                btn-block
                btn-primary
                btn-outline
                rounded-lg
                "
        >
            <span className="">{title}</span>
        </Link>
    );
}

export default MangaButton;
