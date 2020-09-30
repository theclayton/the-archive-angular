import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../models/project.model';
import { Injectable } from '@angular/core';
import { Technology } from '../models/technology.model';
import { Link } from '../models/link.model';
import { Image } from '../models/image.model';

const API_URL = environment.apiUrl + "/projects"

@Injectable({ providedIn: "root" })

export class ProjectService {

  constructor(private httpClient: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  async getAllProjects() {
    try {
      let res = await this.httpClient.get<{ message: string, projects: Array<any> }>(API_URL).toPromise()

      let projects: Array<Project> = res.projects.map((project) => this.constructProjectObject(project))
      return { message: res.message, projects: projects }

    } catch (ex) {
      return { message: "Unable to get project list" }
    }
  }

  async getOneProject(projectName: string) {
    let name = encodeURI(projectName);

    try {
      let res = await this.httpClient.get<{ message: string, project: any }>(`${API_URL}/${name}`).toPromise()
      let project: Project = this.constructProjectObject(res.project)
      return { message: res.message, project: project }

    } catch (ex) {
      return { message: "Unable to get project" }
    }
  }

  async createProject(projectTitle: string) {
    const title = { title: projectTitle }

    try {
      let res = await this.httpClient.post<{ message: string, project: any }>(API_URL + "/create", title).toPromise()
      const project: Project = this.constructProjectObject(res.project)

      return { message: res.message, project: project }

    } catch (ex) {
      return { message: "Unable to create project" }
    }
  }


  async getFeaturedProjects(type: string) {
    try {
      let res = await this.httpClient.get<{ message: string, projects: Array<any> }>(API_URL + "/featured/" + type).toPromise()

      let projects: Array<Project> = res.projects.map((project) => this.constructProjectObject(project))
      return { message: res.message, projects: projects }

    } catch (ex) {
      return { message: "Unable to get featured list" }
    }
  }


  async updateFeaturedProjects(type: string, featuredProjects: Array<{ title: string }>) {
    try {
      let res = await this.httpClient.post<{ message: string }>(API_URL + "/featured/" + type, featuredProjects).toPromise()

      return { message: res.message }

    } catch (ex) {
      return { message: "Unable to save featured list" }
    }
  }



  constructProjectObject(project) {
    let technologies: Array<Technology> = project.technologies.map((tech) => {
      return {
        name: tech.name,
        src: tech.src
      }
    });

    let links: Array<Link> = project.technologies.map((link) => {
      return {
        name: link.name,
        type: link.type,
        url: link.url
      }
    });

    let images: Array<Image> = project.technologies.map((image) => {
      return {
        name: image.name,
        src: image.src,
        caption: image.caption,
        width: image.width,
        height: image.height
      }
    });

    return {
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      thumbnail: project.thumbnail,
      featured: project.featured,
      description: project.description,
      dateCreated: project.dateCreated,
      technologies: technologies,
      links: links,
      images: images
    }
  }

}