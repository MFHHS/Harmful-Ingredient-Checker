import { Camera, Scan, CheckCircle } from 'phosphor-react';
import './styles.css';

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            icon: <Camera size={32} weight="duotone" />,
            title: 'Capture or Upload',
            description: 'Take a photo of the ingredient list or upload an image from your gallery'
        },
        {
            number: 2,
            icon: <Scan size={32} weight="duotone" />,
            title: 'AI Analysis',
            description: 'Our OCR technology scans and identifies all ingredients automatically'
        },
        {
            number: 3,
            icon: <CheckCircle size={32} weight="duotone" />,
            title: 'Get Results',
            description: 'View detailed safety information with color-coded indicators for each ingredient'
        }
    ];

    return (
        <section className="how-it-works section" id="how-it-works">
            <div className="container">
                <div className="how-it-works-header text-center">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-description">
                        Three simple steps to safer product choices
                    </p>
                </div>
                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <div className="step-icon">{step.icon}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="step-connector"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
