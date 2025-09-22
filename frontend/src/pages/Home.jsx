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
import Form from "../components/Form";
import ProjectModal from "../components/ProjectModal";

//REACT ICONS
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";

export default function Home() {

    const [showMore, setShowMore] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const openProjectById = (id) => {
        const allProjects = [...projectsFirst, ...projectsSecond];
        const project = allProjects.find(pr => pr.id === id);
        if (project) setSelectedProject(project);
    }

    const closeModal = () => setSelectedProject(null);

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
                                link='mailto:contact@carole-rollandgrellety.fr'
                            />
                            <CTA 
                                source={<BsFillTelephoneFill/>}
                                info='Téléphone'
                                link='tel:0756857155'
                            />
                        </div>
                    </div>
                    <div className="photo__container">
                        <div className="img__container">
                            <img
                                src="/profile.webp"
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
                    <p>Développement d'applications côté front-end et de sites vitrines.</p>
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
                                        onOpen={openProjectById}
                                    />
                                })}
                            </CardsLayout> 
                        </div>
                        <div className={`second-layout ${showMore ? "open" : ""}`}>
                            <CardsLayout>
                                {projectsSecond.map((projectsecond) => {
                                    return <ProjectCard 
                                        key={projectsecond.id}
                                        id={projectsecond.id}
                                        cover={projectsecond.cover}
                                        alt={projectsecond.alt}
                                        title={projectsecond.title}
                                        subtitle={projectsecond.subtitle}
                                        tags={projectsecond.tags}
                                        onOpen={openProjectById}
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
                    <p>Une stack moderne pour développer des applications web fiables et performantes.</p>
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
                    <div className="education__content">
                        <div className="arrow-desktop"></div>
                        <div className="first__container">
                            <div className="arrow"></div>
                            <div className="point"></div>
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
                    <CTA 
                        source={<FaFileDownload />}
                        info="Télécharger le CV"
                        link="/cv.pdf"
                        download="Carole-Rolland-Grellety-CV.pdf"
                    />
                </div>
            </section>
            <section id="contact">
                <div className="contact__container">
                    <h2>Me contacter</h2>
                    <p className="subtitle">Vous avez un projet ? Une opportunité ? Je serai ravie d'en parler avec vous !</p>
                    <div className="contact__content">
                        <div className="identity__container">
                            <h3>Carole ROLLAND GRELLETY</h3>
                            <span className="contact__place">78600, Maisons-Laffitte<br/>(Yvelines, Ile-de-France)</span>
                            <span className="contact__tel">+33 (0)7 56 85 71 55</span>
                            <span className="contact__email">contact@carole-rollandgrellety.fr</span>
                            <div className="contact__cta">
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
                            </div>
                        </div>
                        <div className="form__container">
                            <Form/>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectModal project={selectedProject} onClose={closeModal} />
        </>
    )
}