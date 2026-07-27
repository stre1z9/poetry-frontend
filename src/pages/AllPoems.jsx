import { useEffect, useState } from "react";

import PoemCard from "../components/PoemCard";
import { getPoems } from "../services/poemService";

function AllPoems() {

    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadPoems() {

            try {

                const data = await getPoems();

                setPoems(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadPoems();

    }, []);

    if (loading) {

        return (
            <div className="text-center py-5">
                Загрузка...
            </div>
        );

    }

    return (

        <section>

            <h1 className="mb-4">
                Все стихотворения
            </h1>

            {poems.length === 0 ? (

                <p>
                    Стихотворений пока нет.
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

export default AllPoems;