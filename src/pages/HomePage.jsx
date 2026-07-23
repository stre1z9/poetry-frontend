import { useEffect, useState } from "react";

import PoemCard from "../components/PoemCard";
import { getPoems } from "../services/poemService";

function HomePage() {

    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadPoems();

    }, []);

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

    if (loading) {

        return (

            <div className="text-center py-5">

                Загрузка...

            </div>

        );

    }

    return (

        <>

            <section className="hero">

                <h1 className="hero-title">

                    Poetry.

                </h1>

                <p className="hero-description">

                    Небольшой сборник моих стихотворений.
                    Здесь собраны мысли, переживания и моменты,
                    которые однажды захотелось сохранить словами.

                </p>

            </section>

            <section>

                <div className="poem-list">

                    {poems.map(poem => (

                        <PoemCard
                            key={poem.id}
                            poem={poem}
                        />

                    ))}

                </div>

            </section>

        </>

    );

}

export default HomePage;