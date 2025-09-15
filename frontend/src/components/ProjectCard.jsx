import CTA from './CTA';
import SkillTag from './SkillTag';
import { FaRegEye } from "react-icons/fa";

export default function ProjectCard({id, title, cover, alt, subtitle, tags}) {
    return (
        <article className='article__project'>
            <div className="cover__container">
                <img src={cover} alt={alt}/>
            </div>
            <div className="txt__container">
                <div className="card-txt">
                    <h3>{title}</h3>
                    <span>{subtitle}</span>
                </div>
                <div className="tags-list">
                    {tags.map((tag, key) => {
                        return <SkillTag 
                        key={"tag-"+key}
                        el={tag}
                    />
                    })}
                </div>
                <CTA
                    source={<FaRegEye />}
                    info="Voir plus"
                    link={"/project/"+id}
                />
            </div>
        </article>
    )
}