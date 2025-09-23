import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ firstStatement, secondStatement }) => {
    const phrases = [firstStatement, secondStatement];

    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                setCurrentText(currentPhrase.substring(0, currentText.length - 1));
                setTypingSpeed(75);
            } else {
                setCurrentText(currentPhrase.substring(0, currentText.length + 1));
                setTypingSpeed(150);
            }
        };

        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting && currentText === currentPhrase) {
            timer = setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
            timer = setTimeout(() => {}, 500);
        } else {
            timer = setTimeout(handleTyping, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, phraseIndex, typingSpeed, phrases]);

    return (
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000', minHeight: '3rem' }}>
            <span>{currentText}</span>
        </div>
    );
};

export default TypewriterEffect;
