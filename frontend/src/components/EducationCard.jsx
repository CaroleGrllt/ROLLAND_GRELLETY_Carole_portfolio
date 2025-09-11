
export default function EducationCard({className, picto, title, type, place, year}) {
    return (
        <article className={'article__education '+className}>
            <div className="picto__container">
                {picto}
            </div>
            <div className="txt-container">
                <h3>{title}</h3>
                <p>{year}</p>
                <p>{place}</p>
                <p>{type}</p>
            </div>
        </article>
    )
}