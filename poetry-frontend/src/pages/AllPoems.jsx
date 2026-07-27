import { useEffect, useState } from "react";

import { getPoems } from "../services/poemService";
import PoemCard from "../components/PoemCard";

function AllPoemsPage() {

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
        return <h3>Загрузка...</h3>;
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

                <div className="d-flex flex-column gap-3">

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

export default AllPoemsPage;