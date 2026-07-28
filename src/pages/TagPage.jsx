import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PoemCard from "../components/PoemCard";
import {
    getPoemsByTag,
    getTagBySlug
} from "../services/poemService";

function TagPage() {

    const { slug } = useParams();

    const [tag, setTag] = useState(null);
    const [poems, setPoems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        async function loadData() {

            try {

                const [tagData, poemsData] = await Promise.all([
                    getTagBySlug(slug),
                    getPoemsByTag(slug)
                ]);

                setTag(tagData);
                setPoems(poemsData);

            } catch (error) {

                console.error(error);

                setError(true);

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, [slug]);

    if (loading) {

        return (
            <div className="text-center py-5">
                Загрузка...
            </div>
        );

    }

    if (error) {

        return (
            <div className="poem-not-found">

                <h1>404</h1>

                <p>
                    Тег не найден.
                </p>

            </div>
        );

    }

    return (

        <section>

            <h1 className="section-title">
                #{tag.name}
            </h1>

            {poems.length === 0 ? (

                <p className="text-muted">
                    В этом разделе пока нет стихотворений.
                </p>

            ) : (

                <div className="poem-list">

                    {poems.map(poem => (

                        <PoemCard
                            key={poem.id}
                            poem={poem}
                        />

                    ))}

                </div>

            )}

        </section>

    );

}

export default TagPage;
