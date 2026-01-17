import '../Custom Component/ProjectCard.css';

const ProjectCard = ({
    projectImage,
    projectTitle,
    projectDescription,
    projectLink,
    projectTags,
    skillsUsed
}) => {
    return (
        <>
            <div className='project-card'>
                <img src={projectImage} alt={projectTitle} />
                <div className='project-card-content'>
                    <h3>{projectTitle}</h3>
                    <p>{projectDescription}</p>
                    <div className="tags">
                        {projectTags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                    <a href={projectLink} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
            </div>
        </>
    )
}

export default ProjectCard