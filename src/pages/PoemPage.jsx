import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPoem } from "../services/poemService";

function PoemPage() {

    const { slug } = useParams();

    const [poem, setPoem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        async function loadPoem() {

            try {

                const data = await getPoem(slug);

                setPoem(data);

            } catch (e) {

                console.error(e);

                setError(true);

            } finally {

                setLoading(false);

            }

        }

        loadPoem();

    }, [slug]);

    if (loading) {

        return <h3>Загрузка...</h3>;

    }

    if (error) {

        return (

            <div className="poem-not-found">

                <h1>404</h1>

                <p>
                    Стихотворение не найдено.
                </p>

            </div>

        );

    }

    return (

        <article className="poem">

            <Link
                to="/poems"
                className="back"
            >
                ← Назад
            </Link>

            <h1 className="poem-title">
                {poem.title}
            </h1>

            {poem.description && (

                <p className="poem-description">
                    {poem.description}
                </p>

            )}

            {poem.createdAt && (

                <p className="poem-date">
                    {new Date(poem.createdAt).toLocaleDateString("ru-RU")}
                </p>

            )}

            {poem.tags && poem.tags.length > 0 && (

                <div className="poem-tags">

                    {poem.tags.map(tag => (

                        <Link
                            key={tag.id}
                            to={`/tag/${tag.slug}`}
                            className="poem-tag"
                        >
                            #{tag.name}
                        </Link>

                    ))}

                </div>

            )}

            <div className="poem-content">

                {poem.content}

            </div>

        </article>

    );

}

export default PoemPage;

