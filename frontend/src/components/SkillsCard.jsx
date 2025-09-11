import SkillTag from './SkillTag';

export default function SkillsCard({title, tags}) {
    return (
        <article className='article__skills'>
            <div className="title__container">
                <h3>{title}</h3>
            </div>
            <div className="tags-list">
                {tags.map((tag, key) => {
                    return <SkillTag 
                    key={"tag-"+key}
                    el={tag}
                />
                })}
            </div>
        </article>
    )
}