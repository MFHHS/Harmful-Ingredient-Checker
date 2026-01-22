import './styles.css';

const Footer = () => {
    const repeatingText = "LOREM • IPSUM • DOLOR • AMET • LOREM • IPSUM • DOLOR • AMET • ";

    return (
        <footer className="footer">
            <div className="footer-content">
                <span className="footer-text">{repeatingText}{repeatingText}</span>
            </div>
        </footer>
    );
};

export default Footer;
