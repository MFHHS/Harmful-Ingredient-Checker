import { useNavigate, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { domToPng } from 'modern-screenshot';
import ResultCard from '../../components/ResultCard';
import { DownloadSimple } from 'phosphor-react';
import './styles.css';

export interface IngredientResult {
    type: 'harmful' | 'safe' | 'neutral';
    name: string;
    description: string;
}

const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ingredients = (location.state?.ingredients as IngredientResult[]) || [];
    const productName = (location.state?.productName as string) || 'Product Analysis';
    const downloadRef = useRef<HTMLDivElement>(null);

    const getCategoryCount = () => {
        const counts = {
            harmful: ingredients.filter(i => i.type === 'harmful').length,
            safe: ingredients.filter(i => i.type === 'safe').length,
            neutral: ingredients.filter(i => i.type === 'neutral').length,
        };
        return counts;
    };

    const counts = getCategoryCount();

    const handleDownload = async () => {
        if (!downloadRef.current) return;

        try {
            const dataUrl = await domToPng(downloadRef.current, {
                quality: 1,
                backgroundColor: '#ffffff',
            });

            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const sanitizedProductName = productName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
            link.download = `${sanitizedProductName}-${timestamp}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to download. Please try again.');
        }
    };

    const handleDone = () => {
        navigate('/');
    };

    return (
        <div className="results-page">
            {/* Header */}
            <header className="results-header">
                <div className="container">
                    <h1 className="results-brand">Arjunaloka</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="results-main">
                <div className="container">
                    {/* Downloadable Content */}
                    <div className="download-content" ref={downloadRef}>
                        <div className="results-header-section">
                            <h2 className="results-title">{productName}</h2>
                            <p className="results-date">
                                {new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>

                        {/* Summary Stats */}
                        {ingredients.length > 0 && (
                            <div className="results-summary">
                                <div className="summary-item harmful">
                                    <span className="summary-count">{counts.harmful}</span>
                                    <span className="summary-label">Harmful</span>
                                </div>
                                <div className="summary-item neutral">
                                    <span className="summary-count">{counts.neutral}</span>
                                    <span className="summary-label">Neutral</span>
                                </div>
                                <div className="summary-item safe">
                                    <span className="summary-count">{counts.safe}</span>
                                    <span className="summary-label">Safe</span>
                                </div>
                            </div>
                        )}

                        {/* Results Grid */}
                        <div className="results-grid">
                            {ingredients.length > 0 ? (
                                ingredients.map((ingredient, index) => (
                                    <ResultCard
                                        key={index}
                                        type={ingredient.type}
                                        title={ingredient.name}
                                        description={ingredient.description}
                                    />
                                ))
                            ) : (
                                <div className="results-empty">
                                    <p>No ingredients analyzed yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="results-footer">
                            <p>Generated by Arjunaloka - Ingredient Checker</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="results-actions">
                        <button
                            className="btn btn-secondary"
                            onClick={handleDone}
                        >
                            Back to Home
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleDownload}
                            disabled={ingredients.length === 0}
                        >
                            <DownloadSimple size={20} weight="bold" />
                            Download Results
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Results;
