import { Technology } from "./technology.model"
import { Link } from "./link.model"
import { Image } from "./image.model"

export interface Project {
    title: string,
    subtitle: string,
    category: string,
    thumbnail: string,
    featured: string,
    description: string,
    dateCreated: Date,
    technologies: Array<Technology>,
    links: Array<Link>,
    images: Array<Image>
}