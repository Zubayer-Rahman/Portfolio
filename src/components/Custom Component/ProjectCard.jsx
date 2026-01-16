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
            <div className="project-card">
                <img src={projectImage} alt={projectTitle} />
                <h3>{projectTitle}</h3>
                <p>{projectDescription}</p>
                <a href={projectLink} target="_blank" rel="noopener noreferrer">View Project</a>
                <div className="tags">
                    {projectTags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>
                <div className="skills-used">
                    <h4>Skills Used:</h4>
                    <ul>
                        {skillsUsed.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ProjectCard