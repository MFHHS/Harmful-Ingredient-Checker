import { Warning, Check, SmileyMeh } from 'phosphor-react';
import './styles.css';

export interface IngredientResult {
    type: 'harmful' | 'safe' | 'neutral';
    name: string;
    description: string;
}

export interface ResultCardProps {
    type: 'harmful' | 'safe' | 'neutral';
    title: string;
    description: string;
}

const ResultCard = ({ type, title, description }: ResultCardProps) => {
    const getIcon = () => {
        switch (type) {
            case 'harmful':
                return <Warning size={20} weight="bold" />;
            case 'safe':
                return <Check size={20} weight="bold" />;
            case 'neutral':
                return <SmileyMeh size={20} weight="regular" />;
        }
    };

    return (
        <div className={`result-card result-card--${type}`}>
            <div className="result-card__icon">
                {getIcon()}
            </div>
            <div className="result-card__content">
                <h3 className="result-card__title">{title}</h3>
                <p className="result-card__description">{description}</p>
            </div>
        </div>
    );
};

export default ResultCard;
