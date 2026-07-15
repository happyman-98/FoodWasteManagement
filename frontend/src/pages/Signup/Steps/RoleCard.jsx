function RoleCard({

    icon,
    title,
    description,
    selected,
    onClick,

}) {

    return (

        <div
            className={`role-card ${selected ? "selected" : ""}`}
            onClick={onClick}
        >

            <div className="role-icon">
                {icon}
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

        </div>

    );

}

export default RoleCard;