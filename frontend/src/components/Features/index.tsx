import { Camera, Lightning, ShieldCheck } from 'phosphor-react';
import './styles.css';

const Features = () => {
    const features = [
        {
            icon: <Camera size={48} weight="duotone" />,
            title: 'OCR Technology',
            description: 'Scan ingredient lists instantly using your camera or upload images from your library for quick analysis.'
        },
        {
            icon: <Lightning size={48} weight="duotone" />,
            title: 'Instant Analysis',
            description: 'Get real-time results with our advanced AI-powered ingredient recognition and safety assessment.'
        },
        {
            icon: <ShieldCheck size={48} weight="duotone" />,
            title: 'Safety Indicators',
            description: 'Clear color-coded indicators show you which ingredients are safe and which ones to avoid.'
        }
    ];

    return (
        <section className="features section" id="features">
            <div className="container">
                <div className="features-header text-center">
                    <h2 className="section-title animate-fadeInUp">Why Choose Arjunaloka?</h2>
                    <p className="section-description animate-fadeInUp">
                        Powerful features designed to help you make informed decisions about product ingredients
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card card animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
