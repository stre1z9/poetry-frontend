import { Link } from "react-router-dom";

function PoemCard({ poem }) {

    return (

        <Link
            to={`/poem/${poem.slug}`}
            className="poem-card"
        >

            <h2 className="poem-card-title">

                {poem.title}

            </h2>

            {poem.description && (

                <p className="poem-card-description">

                    {poem.description}

                </p>

            )}

            <div className="poem-card-footer">

                <span>

                    Читать →

                </span>

            </div>

        </Link>

    );

}

export default PoemCard;