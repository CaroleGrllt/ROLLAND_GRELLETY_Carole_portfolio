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
import EducationCard from "../components/EducationCard";

//REACT ICONS
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
{/* <IoSchoolSharp /> */}
{/* <MdWork /> */}
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
            <section id="education">
                <div className="education__container">
                    <h2>Parcourir mes formations et expériences professionnelles</h2>
                    <div className="education__container">
                        <div className="first__container">
                            <div className="point"></div>
                            <div className="arrow"></div>
                            <EducationCard 
                                className="fourth_xp"
                                picto={<IoSchoolSharp />}
                                title="Développeur d'application JavaScript React"
                                type="Titre RNCP niveau VI (bac+3/4)"
                                place="OpenClassrooms"
                                year="2024-2025"
                            />
                        </div>
                        <div className="second__container">
                            <div className="point"></div>
                            <EducationCard 
                                className="third_xp"
                                picto={<MdWork />}
                                title="Assitante développeuse web"
                                type="Alternance"
                                place="Agence de communication Manitoba"
                                year="2023-2024"
                            />                        
                        </div>
                        <div className="third__container">
                            <div className="point"></div>
                            <EducationCard 
                                className="second_xp"
                                picto={<IoSchoolSharp />}
                                title="Développeur intégrateur web"
                                type="Titre RNCP niveau V (bac+2)"
                                place="OpenClassrooms"
                                year="2023-2024"
                            />                        
                        </div>
                        <div className="fourth__container">
                            <div className="point"></div>
                            <EducationCard 
                                className="first_xp"
                                picto={<MdWork />}
                                title="Responsable-adjointe, service archives-documentation"
                                type="CDD fonction publique territoriale"
                                place="Mairie de Maisons-Alfort"
                                year="2018-2022"
                            />                        
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}