import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';
import './styles.css';

const Hero = () => {
    const navigate = useNavigate();

    const handleStartNow = () => {
        navigate('/scanner');
    };

    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="container">
                <div className="hero-content">
                    {/* Left Image - Scientist */}
                    <div className="hero-image-left">
                        <img
                            src="/assets/img/scientist.png"
                            alt="Scientist with microscope"
                            className="hero-img hero-img-scientist"
                        />
                    </div>

                    {/* Center Content */}
                    <div className="hero-center">
                        <h1 className="hero-title">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </h1>
                        <p className="hero-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <button className="btn btn-primary btn-large" onClick={handleStartNow}>
                            Start Now
                            <ArrowRight size={20} weight="bold" />
                        </button>
                    </div>

                    {/* Right Image - Girl with cosmetics */}
                    <div className="hero-image-right">
                        <img
                            src="/assets/img/girl-freckles.png"
                            alt="Girl with cosmetic products"
                            className="hero-img hero-img-girl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
