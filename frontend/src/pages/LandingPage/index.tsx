import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Features from '../../components/Features'
import HowItWorks from '../../components/HowItWorks'
import Footer from '../../components/Footer'
import './styles.css'

function LandingPage() {
    return (
        <div className="landing-page">
            <Header />
            <main>
                <div className="hero-section-wrapper">
                    <Hero />
                    <Footer />
                </div>
                <Features />
                <HowItWorks />
            </main>
        </div>
    )
}

export default LandingPage
