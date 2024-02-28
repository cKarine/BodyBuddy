import NavigationBar from "./NavigationBar/NavigationBar";

export default function Layout({ children })
{
    return (
        <div className="container mx-auto px-4">
            <NavigationBar />
            {children}
        </div>
    )
}   