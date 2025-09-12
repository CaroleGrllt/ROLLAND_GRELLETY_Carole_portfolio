
export default function EducationCard({className, picto, title, type, place, year}) {
    return (
        <article className={'article__education '+className}>
            <div className="picto__container">
                {picto}
            </div>
            <div className="txt__container">
                <h3>{title}</h3>
                <p>{place}</p>
                <p>{year}</p>
                <p>{type}</p>
            </div>
        </article>
    )
}