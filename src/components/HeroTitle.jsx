
import { useEffect, useState } from "react";

function HeroTitle() {

    const text = "Poetry.";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {

        let index = 0;

        const interval = setInterval(() => {

            setDisplayedText(text.slice(0, index + 1));

            index++;

            if (index === text.length) {
                clearInterval(interval);
            }

        }, 120);

        return () => clearInterval(interval);

    }, []);

    return (
        <h1 className="hero-title">
            {displayedText}
            <span className="typing-cursor">|</span>
        </h1>
    );

}

export default HeroTitle;

