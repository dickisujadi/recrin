interface HeaderProps {
    menuName: string
}

export default function Header({menuName} : HeaderProps) {
    return <div className="Header">
        <h1 className="Header-menu">{menuName}</h1>
    </div>
}