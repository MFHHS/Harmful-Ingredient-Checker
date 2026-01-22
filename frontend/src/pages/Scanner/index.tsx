import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkle } from 'phosphor-react';
import ImageUpload from '../../components/ImageUpload';
// Using the notebook API adapter
import { analyzeImage } from '../../services/api-notebook';
import './styles.css';

const Scanner = () => {
    const navigate = useNavigate();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (file: File) => {
        setUploadedFile(file);
        setError(null);
    };

    const handleAnalyze = async () => {
        if (!uploadedFile) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            // Call the backend API to analyze the image
            const response = await analyzeImage(uploadedFile);

            // Navigate to results page with actual data
            navigate('/results', { 
                state: { 
                    ingredients: response.ingredients,
                    summary: response.summary,
                    extractedText: response.extracted_text
                } 
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image. Please try again.';
            setError(errorMessage);
            console.error('Analysis error:', err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="scanner-page">
            {/* Header */}
            <header className="scanner-header">
                <div className="container">
                    <div className="scanner-header-content">
                        <button
                            className="btn-back"
                            onClick={() => navigate('/')}
                            aria-label="Go back to home"
                        >
                            <ArrowLeft size={24} weight="bold" />
                        </button>
                        <h1 className="scanner-title">Scan Ingredients</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="scanner-main">
                <div className="container">
                    <div className="scanner-content">
                        <div className="scanner-intro">
                            <h2>Upload Product Ingredients</h2>
                            <p>Take a photo or upload an image of the ingredient list to check for harmful substances</p>
                        </div>

                        <ImageUpload onFileSelect={handleFileSelect} />

                        {error && (
                            <div className="scanner-error" role="alert" style={{
                                padding: '1rem',
                                marginTop: '1rem',
                                backgroundColor: '#fee',
                                color: '#c00',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        {uploadedFile && (
                            <div className="scanner-actions">
                                <button
                                    className="btn btn-primary btn-large btn-analyze"
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                >
                                    <Sparkle size={24} weight="fill" />
                                    {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Scanner;
