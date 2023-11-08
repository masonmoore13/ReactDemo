import SadFace from "./SadFace.jpg"

export default function ErrorPage() {
    return (
        <div>
            <h3>Page not found</h3>
            <img src={SadFace} />
        </div>
    )
}