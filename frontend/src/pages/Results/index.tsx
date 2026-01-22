import { useNavigate, useLocation } from 'react-router-dom';
import ResultCard from '../../components/ResultCard';
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
                    <h2 className="results-title">Result</h2>

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

                    {/* Done Button */}
                    <div className="results-actions">
                        <button
                            className="btn btn-primary btn-large"
                            onClick={handleDone}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Results;
