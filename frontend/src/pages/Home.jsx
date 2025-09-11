import { useState } from "react"

//DATA
import projectsFirst from '../data/projectsFirst.json'
import projectsSecond from '../data/projectsSecond.json'
import skills from '../data/skills.json';

//LAYOUTS
import CardsLayout from "../layouts/CardsLayout";

//COMPONENTS
import CTA from "../components/CTA"
import ProjectCard from "../components/ProjectCard";
import SkillsCard from '../components/SkillsCard';

//REACT ICONS
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Home() {

    const [showMore, setShowMore] = useState(false);

    return (
        <>
            <section id="about">
                <div className="about__container">
                    <div className="profile__container">
                        <div className="greetings">
                            <p>Bienvenue ! Je suis...</p>
                            <h1>Carole ROLLAND GRELLETY</h1>
                        </div>
                        <div className="qualification">
                            <p>Développeuse web | JavaScript - React</p>
                        </div>
                        <div className="cta">
                            <CTA 
                                source={<FaLinkedin/>}
                                info='LinkedIn'
                                link='https://www.linkedin.com/in/carole-rolland-grellety/'
                            />
                            <CTA 
                                source={<FaGithub/>}
                                info='GitHub'
                                link='https://github.com/CaroleGrllt/'
                            />
                            <CTA 
                                source={<MdAlternateEmail/>}
                                info='E-mail'
                                link='mailto:carole.rolland.grellety@gmail.com'
                            />
                            <CTA 
                                source={<BsFillTelephoneFill/>}
                                info='Téléphone'
                                link='tel:0033610843867'
                            />
                        </div>
                    </div>
                    <div className="photo__container">
                        <div className="img__container">
                            <img
                                src="/profile-200.jpg"
                                srcSet="/profile-200.jpg 200w,
                                        /profile-500.jpg 500w"
                                sizes="(max-width: 767px) 200px,
                                        500px"
                                alt="profile"
                            />                       
                        </div>
                    </div>
                </div>
                <div className="intro">
                    <p>Spécialisée en développement web <span className="bold"> front-end</span>, mes connaissances en <span className="bold"> back-end </span>me permettent 
                        d'avoir une compréhension et une vision globales d'un projet et de<span className="bold"> faciliter le travail d'équipe. </span> 
                    </p>
                </div>
            </section>
            <section id='projects'>
                <div className="projects__container">
                    <h2>Découvrir mes réalisations</h2>
                    <p>Développement d'applications côté front-end et de sites vitrines</p>
                    <div className="layouts__container">
                        <div className="first-layout">
                            <CardsLayout>
                                {projectsFirst.map((project) => {
                                    return <ProjectCard 
                                        key={project.id}
                                        id={project.id}
                                        cover={project.cover}
                                        alt={project.alt}
                                        title={project.title}
                                        subtitle={project.subtitle}
                                        tags={project.tags}
                                    />
                                })}
                            </CardsLayout> 
                        </div>
                        <div className={`second-layout ${showMore ? "open" : ""}`}>
                            <CardsLayout>
                                {projectsSecond.map((project) => {
                                    return <ProjectCard 
                                        key={project.id}
                                        id={project.id}
                                        cover={project.cover}
                                        alt={project.alt}
                                        title={project.title}
                                        subtitle={project.subtitle}
                                        tags={project.tags}
                                    />
                                })}
                            </CardsLayout> 
                        </div>
                    </div>
                    <div className="btn__container">
                        <button className="see-more" onClick={() => setShowMore(!showMore)}>
                            {showMore ? "Replier" : "Découvrir plus"}
                        </button>                
                    </div>
                </div>
            </section>
            <section id="skills">
                <div className="skills__container">
                    <h2>Explorer mes compétences techniques</h2>
                    <div className="layout__container">
                        <CardsLayout>
                            {skills.map((skill) => {
                                return <SkillsCard 
                                    key={skill.id}
                                    title={skill.title}
                                    tags={skill.tags}
                                />
                            })}
                        </CardsLayout>
                    </div>
                </div>
            </section>
        </>
    )
}