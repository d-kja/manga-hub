import { Link } from "react-router-dom";

function MangaButton({ id, chapId }) {
    return (
        <Link
            to={`/mangas/${id}/chapter/${chapId}`}
            class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-block btn-ghost"
        >
            CHAPTER 01
        </Link>
    );
}

export default MangaButton;
