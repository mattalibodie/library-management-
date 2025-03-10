import {useState, useEffect, useRef} from "react";
import { ReactReader } from "react-reader";
export const EpubReader = () => {
    let url = "https://res.cloudinary.com/dmayqakw1/raw/upload/v1741106410/k4oz979jirvelfqiliza.epub";
    const renditionRef = useRef(null)
    const tocRef = useRef(null)
    const [page,setPage] = useState('');
    const [location, setLocation] = useState(() => {
        const storedLocation = localStorage.getItem("epub-location");
        return storedLocation ? storedLocation : 0;
    });
    const locationChanged = (epubcfi) => {
        setLocation(epubcfi);
        if (renditionRef.current && tocRef.current) {
            const {displayed, href} = renditionRef.current.location.start
            const chapter = tocRef.current.find(item => item.href === href)
            setPage(
                `Page ${displayed.page} of ${displayed.total} in chapter ${
                    chapter ? chapter.label : 'n/a'
                }`
            )
        }
    };
    useEffect(() => {
        localStorage.setItem("epub-location", location.toString()); // Ensure location is stored as string
    }, [location]);

    return (
        <div style={{height: '100vh'}}>
            <ReactReader
                tocChanged={toc => (tocRef.current = toc)}
                getRendition={rendition => (renditionRef.current = rendition)}
                url={url}
                location={location}
                locationChanged={locationChanged} // Removed type annotation here
            />
            <div className="text-center absolute left-[1rem] right-[1rem] bottom-[1rem] z-[1] text-center">
                {page}
            </div>
        </div>
    );
};
export default EpubReader;