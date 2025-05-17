import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {AuthModal} from "@/components/AuthModal";
import {TabsContainer} from "@/components/TabsContainer";
import {useToast} from "@/components/ui/use-toast";
import {LogIn, LogOut} from "lucide-react";

const Homepage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
    const {toast} = useToast();

    useEffect(() => {
        // Check if user is already authenticated
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        });
    };

    const handleAuthenticated = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="min-h-screen bg-researcher-background">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 sm:px-4">
                <div className="container flex justify-between items-center">
                    <div className="flex items-center">
                        <img className=""
                             src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gADAP/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIADIAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/9oADAMBAAIQAxAAAAHvzDmm4wvFqdAreK6XFevFtBS+lxXzjZVxYUbyCvTTqMqQ0WZ4NZnWCyyR9ieKxbgq5XLpsaGRrehx5mV002fTSwN2wU5rVcoWr/sxNn5UvlDjdLLTXHk3vJiTa3s5qxuwnNOkH3nOrqQxaetZpEFnQj2pgW9OSunMet6YycvqYjEh6f4Y/wB2BHidD5PQAAAAAAAAAAAAAAAAP//EACcQAAICAQQBAwQDAAAAAAAAAAIDAQQSAAUTFBEVITQjJDA1QEVQ/9oACAEBAAEFAv5R2WvZ0WTqYt1NJcD1rMis8wdg7qgFNkXyu0prluBh+pK5AcDGJcDxZbWo9KcDZK+mEzfUKouq4V3lM0vcFNZ3U9UHCbZ3BUMvskK7D6SQsciu7AIX9vuKvmNBp7w2CGqL+FFaTrNqtWF3+6Wtx7htXnq8sidVsuTRasXR5mnuEMCm6VlQquKbtT53Xj1hTVr3NBSNzcfaLRnmoCG1DSCYym4r5j7SUOAkORWdVfqxaStiutZhV1L2m9KHixQviUnaO8lLWTWUOSIeQCyBUsIBS16gRicYyJCTKa6ClyocopPhr5sCFhX1TSeSvmWsBvVWy7btpKeC3z+p7Zj09rKeO+kbF6kxh7oj9rZ/YtWLlbUH0vwWR8oihkhNFCZ1ADBmsGa8ewoUBYxkIiOoQkSxiSxHLGMsYmdQMDH+B//EACMRAAIABQIHAAAAAAAAAAAAAAECAAMRIDEEEhMhIkBBYcH/2gAIAQMBAT8BdwscRhlY3DlaCDdp1DTzXxGpoh6YTNPfy1EIObkFJquI1JZ5h24gJSlO4//EAB8RAAEEAwADAQAAAAAAAAAAAAEAAgMREiAhMUBBYf/aAAgBAgEBPwENtYj4VWtbTuxi4hI6uryL/NS4HZ/WFpUcTQAXLK/Y/8QAORAAAgEDAgQDBAYKAwAAAAAAAQIAAxESITEEEyJBMlFhFCOBghAzQlJxcgUkMEBQYnSRsbLBwtH/2gAIAQEABj8C/ejT4XYb1DLvxdS/pMs+fT7g7wOkrIdltaGh9sLl8JWJv7k2bSGyVFt99LSpSRuun4pURd6ZsZhy6+XlyjKlMeKno0LJsGKzFr6bkDb6Hx+w2J/GCp1EF8BZe85jLVAyx1Q3j1WDoq75paOAHDIMihSxtOWqVstj7s6T2i5w221v5SpTF8ktf4x0CVWKmxxpkzFfE5xlOnTAue8W+7NjEJFzfEzFdKdYXt6ziPljClV5Z5A1xv3n6TDvk2a3a1vKVqlTikr4C/SALThqr0aiZXWq7bHKcYGdQTUFgT6Qf0//AGnGcqvy+pb9F+0e5uea+vxlTiM1vli1I9x/7MzbU7DtOKQuoY8QbC84cK2Le1mx+JlLmVgW5y9eNrSp7RxXNUMOumPDDRarT4j3d+ao1HoZx351/wBZhf3dufh/NtOMzdVvha59JxX62lJedqjAayk/ZXnLwVwdRpAG2W8OJtOFU+IAsZxHyyxVmq4/YS5tDVUK1N9TpvMafDEK435NgYKL03ckZWVMoK6IjeuOt4ClKpc9OfL0/vERul62xtvDQUWa2egjpgOagBJxhp8qrkT2p+KLxD0gLkdWGoi8PgMvHYLt6yzqGHkRCFpqoO9hOhFX8otCQBc7zKwy2vMmpIW8ysuaNMnzKxkPeGjVHvKWoPmJXq7sRaZ1zr2p9zG4it9Y/byE4j5ZdeJ9nr4bsOlhOYVC3B8O0oj2tGGH1VhcS/DleYOHJsw31gdWyLksxP3u8Qe1pbJvc2F95w1Jtij/AAlRaw96lEK3rrvOL/Kn/M4H5/8AEam4urCxj1XbKoWxv6Lp+xfTXEymrOy23xlwt282+hmA1bedaK34iW7TJaSA+YWZWGW150gDvpMhSQHzxgawuNjMrDLzhawue8BIFxt9FlAH4fwH/8QAKBABAAICAgEDAwQDAAAAAAAAAQARITFBUWFxgaEQkbEwQNHwUMHx/9oACAEBAAE/If3QYBg1PaVfUOn5hVKHgCO1h2cj1FAx1V2Nwaw0WVjKom9Qp5NVXe4Q+aF/S5d8UBUVh3c5q4nwm9itX6RzWwsOy4pioLKyNMS5tMyX1bx9BVtveVhMu7Eipvj2jmrgDJdUczkG8jfQ5mfCol7BzMbA5At56nn5h2Kw7ucPbU1SyXlJ5A+pOqATuxC+ZdhWI77ikrLJpISqwfp/X5nx/wAWADNFG5eBCPlDHCVq38MDzENjpFqs57lQ/oRcY/IijclBF8YAFRdSrYWYToFGosnmVwOnzLBdKRcHEBqQ6bp6YMcf4ZdeJUwgrjmVq+YMAKRGTgxP7DpP4PXf/v1hGthGXGMEbYMTlcTwYXF2cySwrUtGKKOo5rZtgVVuvi8z4/4sDJVkYvOuIHPLuvv7RItyvRGd6mZE1cB394HjLuaDu83GE7A3/wAJVch7A7ZUf7igpd+stwKDtrPtF4bt+RtO5vZ2G15eolyVTgZ/Zmc9tyia+0DBhKGuUC0FqyoN+s8PNGa6nhOwWOXHKFWauxvpl5gP2LKUGgh53Gayck2nnqNOrTF8f8WLuYib/nkhtfhilvJ4dy1tQP3C7lBFAWPDA3JbKbOFcQyi94Dm78zBTlTaopPJKAClwzR6ifRb507bhBHujTfoD4v3/RBeVAxmEwwULayx7urfpSkqt3WoOBJqpqU0HCoUF+AM8NNGa6gqWralWwwK5ALioNxGSZucKwzUBAW6mWKqtpMn0qxbuhX+B//aAAwDAQACAAMAAAAQ2R8w40w604w0wmkFw0cwAQ4Qkw4EiYoYEwY8888gc88888888888/8QAJREBAAEDAwEJAAAAAAAAAAAAAREAITEgYbFBQFGBkaHR4fDx/9oACAEDAQE/EIWbrgMtZjB4PoVJIvOPKdKiDjUzGYFtv3igcwb1ZBgXJ50y9s+3+MalQQiDud1KwAWGehtUcdDLvZ9+0f/EACIRAQABBAEDBQAAAAAAAAAAAAERACAhMUFAUbFhcZGh8P/aAAgBAgEBPxBtamwE1LM8WqCW5AlEvHf95rOba+IzSoraPNpERm5AjD9NPQr29femRXnqP//EACYQAQEAAgICAgIBBQEAAAAAAAERACExQVFhcZEQgaEwQMHh8fD/2gAIAQEAAT8Q/Fy/2ygVxd9wdP8Az0r/ADi45FUQYXc5gfcOX+X4xibqT5SPOCFWShKNu+DBJtgdiG/NHWbOrVUFQ+DjHTxFR6vIb46zYdgRF8Pc4Zw4iqAYAgI96TKTsOdVwTt3xiEo4oDJHvTiopD/AHMGNEwaA1wu2XVxF2hMALPJs3mxNQ2AgN8vAIvhquUvhTvKpOCUPAhaUNd56euiosoeNd5orEDGKDSUec+4e/dvRMfIC5JwB70YmHxBoMhOEyrUEhzHn+NfvKYKQ0UCvar9YA4VD2KPUyOogg5NfKRD5wCiiyBC8dcP/H4FdCGFCEUm+8FaIBK0sMNT6zXvmSIOm1qBcGl6xrfSdSFDWAcX0Quha71j03fk9MQy3ovU7SYS0wXJazqu5iHJvCXOW3sMjxg+/wCKZh6nfzmwEoRiRNceGsidQ0l+MN4WEW4rcnLbvABEDpo0Y0Kr05OBDJyCJ2tJOOMV3/uweR+O7Po8MEGUIO/iu+T7x+FkgO9ANGtDxgXzdepz/jGof3yJyR5MJcC7iPDxXD6kgBHdGPZiu+F1FAf0H4FRxygd5QpV5ebmvINkh1TaaR2SZUXzwuLFb495KeqR1KAZAfxl4a5jESEBO9kx6XgAAtGYUPcuD0XBIUA8mwL8YISDlVmxykbh6GpqBdO3L4wGIZeE2A67pcaepbFkWWFBXhyAK2GEU8JTHlbm67aC3mOeEVaLNgb1iNvgReWGILwGiwgrvWt59ZK5rtzLuYwSouteNpdY7/aCPKpXNIcR4Gx/TiyPBOrij3KfXkwQyhbvaD4mD17DdBBwvn/WcB4OfAeuDXg9v4VL3yoMFBsqLwiDlsNmiUS9EfOMbYhlZeFIXk7xMgsZINYkVm+MGHQgNoHRJPWMAgjrWPyfD+MUFCDaC+0AnxkoNMbCnqQ+VxErv/FiOb/gz3AlQSfeNHuXGyb7Ly/0UNTZK2OD51gB/OBGt+NH6wgQtIJ8nQ+5kyTRGzwJ9K492aDV5KawOepwanieMHEiAtedhc1tRKfJduZdzBUziNHKzlfOKVKHh8iFuHCFEKLzHkuAAMLJsbC8z1h4gAiAcC8sy+horUjHqnj8b4CgirVh2v8ARcP7f//Z"
                             width={150}
                             alt="..."/>

                    </div>

                    <div>
                        {isAuthenticated ? (
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="border-researcher-primary text-researcher-primary hover:bg-researcher-muted"
                            >
                                <LogOut className="h-4 w-4 mr-2"/> Logout
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setShowAuthModal(true)}
                                className="bg-researcher-primary hover:bg-researcher-secondary"
                            >
                                <LogIn className="h-4 w-4 mr-2"/> Login
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-4 px-2 sm:px-4">
                {isAuthenticated ? (
                    <TabsContainer/>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                        <h2 className="text-3xl font-bold mb-4 text-researcher-primary">Welcome to the HLS' Researcher
                            App</h2>
                        <p className="text-muted-foreground max-w-md mb-8">
                            Please log in to access the researcher platform and manage your supplements.
                        </p>
                        <Button
                            onClick={() => setShowAuthModal(true)}
                            className="bg-researcher-primary hover:bg-researcher-secondary"
                        >
                            <LogIn className="h-4 w-4 mr-2"/> Login / Register
                        </Button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t py-4 px-2 sm:px-4 mt-auto">
                <div className="container mx-auto text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} HLS' Researcher App. All rights reserved.</p>
                </div>
            </footer>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onAuthenticated={handleAuthenticated}
            />
        </div>
    );
}

export default Homepage;
