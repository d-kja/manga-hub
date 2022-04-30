import { Link } from "react-router-dom";

function MangaButton() {
    return (
        <Link
            to="/"
            class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-block btn-ghost"
        >
            CHAPTER 01
        </Link>
    );
}

export default MangaButton;
