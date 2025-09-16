import SkillTag from "./SkillTag";
import CTA from "./CTA";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaEarthEurope } from "react-icons/fa6";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal__backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
        <div className="modal__dialog project__dialog" onClick={(e) => e.stopPropagation()}>
            <button
            type="button"
            className="modal__close"
            aria-label="Fermer"
            onClick={onClose}
            >
            <IoClose />
            </button>
            <div className="modal__content">
                <div className="modal__cover">
                    <img src={project.cover} alt={project.alt} />
                </div>
                <h3 id="project-modal-title">{project.title}</h3>
                <div className="project__details">
                    <div className="skills__content">
                        {Array.isArray(project.skills) && project.skills.length > 0 && (
                            <ul>
                            {project.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                            </ul>
                        )}
                    </div>
                    <div className="more__content">
                        <div className="tags-list">
                            {Array.isArray(project.tags) && project.tags.length > 0 && (
                                project.tags.map((tag, key) => (
                                <SkillTag 
                                    key={"tag-" + key}
                                    el={tag}
                                />
                                ))
                            )}
                        </div>                    
                        <div className="links__container">
                            <CTA 
                                source={<FaGithub/>}
                                info='GitHub'
                                link={project.github}
                            />
                            <CTA 
                                source={<FaEarthEurope/>}
                                info='Site'
                                link={project.website}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}