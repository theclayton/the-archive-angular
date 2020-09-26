import { Technology } from "./technology.model"
import { Link } from "./link.model"
import { Image } from "./image.model"

export interface Project {
    title: string,
    subtitle: string,
    category: string,
    thumbnail: string,
    dateCreated: Date,
    technologies: Array<Technology>,
    description: string,
    links: Array<Link>,
    images: Array<Image>
}