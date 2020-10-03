import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-project-content',
  templateUrl: './edit-project-content.component.html',
  styleUrls: ['./edit-project-content.component.css']
})
export class EditProjectContentComponent implements OnInit {
  project: Project
  projectForm: FormGroup;
  isFeatured: Boolean = false
  isLoading: Boolean = false
  Error: Boolean = false
  ErrorText: string = "Error saving project."

  links = new FormArray([])

  thumbnail: string = ""
  thumbnailUpload: FormData = new FormData()
  canUploadThumbnail = false

  newTech: string = "https://flaresoftware.com/images/flaresoftware-logo.png"
  newTechUpload: FormData = new FormData()
  canUploadNewTech = false

  allTechnologies = []
  techs = new FormArray([])


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectService, private uploadService: UploadService, private snackBar: MatSnackBar) {
    try {
      this.project = this.router.getCurrentNavigation().extras.state.project;
      this.isLoading = false
    } catch {
      this.getProjectDatafromAPI(this.activatedRoute.snapshot.params['name'])
    }
  }

  async getProjectDatafromAPI(projectName) {
    const res = await this.projectService.getOneProject(projectName)
    if (res) {
      this.project = res.project
      this.updateDefaults()
      this.isLoading = false
    } else {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'subtitle': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'dateCreated': new FormControl(new Date(), [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'allTechnologiesSelect': new FormControl(null, [Validators.required]),
    })

    this.getTechList()
  }

  isAdmin() {
    return this.authService.getIsAdmin()
  }

  async getTechList() {
    const apiRes = await this.projectService.getUniqueTechnologies()
    if (apiRes.message === "success") {
      this.allTechnologies = apiRes.technologies
    }
  }


  updateDefaults() {
    this.projectForm.get("title").setValue(this.project.title);
    this.projectForm.get("subtitle").setValue(this.project.subtitle);
    this.projectForm.get("category").setValue(this.project.category);
    if (this.project.featured === "home") {
      this.isFeatured = true
    }
    this.projectForm.get("dateCreated").setValue(this.project.dateCreated);
    this.projectForm.get("description").setValue(this.project.description);

    this.thumbnail = this.project.thumbnail

    // Links
    for (let i=0; i<this.project.links.length; i++) {
      const link = this.project.links[i];

      const newGroup = new FormGroup({
        'name': new FormControl(link.name),
        'type': new FormControl(link.type),
        'url': new FormControl(link.url),
        });

      this.links.push(newGroup);
    }

    // Technologies
    for (let i=0; i<this.project.technologies.length; i++) {
      const tech = this.project.technologies[i];

      const newGroup = new FormGroup({
        'name': new FormControl(tech.name),
        'src': new FormControl(tech.src),
        });

      newGroup.controls['src'].disable();

      this.techs.push(newGroup);
    }

    // this.projectForm.get("images").setValue(this.project.title);
  }

  onAddLinkClicked() {
    const newGroup = new FormGroup({
      'name': new FormControl(""),
      'type': new FormControl(""),
      'url': new FormControl(""),
      });

    this.links.push(newGroup);
  }

  onRemoveLink(index) {
    this.links.removeAt(index)
  }

  onUploadThumbnail(event) {
    if (event.target.files.length > 0) {
      this.thumbnailUpload.append('file', event.target.files[0]);
      this.thumbnail = ""
    }
    this.canUploadThumbnail = true
  }

  async onUploadThumbnailClicked() {
    if (this.canUploadThumbnail) {
      this.canUploadThumbnail = false

      let apiRes = await this.uploadService.uploadFile(this.thumbnailUpload)
      if (apiRes.message === "success") {
        this.thumbnail = environment.apiUrl + apiRes.filename
      } else {

      }
    }
  }

  onUploadNewTech(event) {
    if (event.target.files.length > 0) {
      this.newTechUpload.append('file', event.target.files[0]);
    }
    this.canUploadNewTech = true
  }

  async onUploadNewTechClicked() {
    if (this.canUploadNewTech) {
      this.canUploadNewTech = false

      let apiRes = await this.uploadService.uploadFile(this.newTechUpload)
      if (apiRes.message === "success") {
        // Add photo and blank name to list
      } else {

      }
    }
  }

  async onSaveProject() {
    this.isLoading = true

    let featured: string = ""
    if (this.isFeatured) {
      featured = "home"
    } else {
      featured = "no"
    }

    const title: string = this.project.title
    const newProject: Project = {
      title: this.projectForm.value.title,
      subtitle: this.projectForm.value.subtitle,
      category: this.projectForm.value.category,
      thumbnail: this.thumbnail,
      featured: featured,
      description: this.projectForm.value.description,
      dateCreated: this.projectForm.value.dateCreated,
      technologies: this.project.technologies,
      links: this.links.value,
      images: this.project.images
    }

    const apiRes = await this.projectService.updateProject(title, newProject);

    this.isLoading = false

    if (apiRes.message === "success") {
      let encodedTitle: string = encodeURI(apiRes.project.title.toString())
      this.router.navigate([`projects/${encodedTitle}`])
    } else {
      this.openSnackBar(String(apiRes.message))
    }

  }

  async onDeleteProject() {
    this.isLoading = true

    let encodedTitle: string = encodeURI(this.project.title.toString())

    let apiRes = await this.projectService.deleteProject(encodedTitle)
    if (apiRes.message === "success") {
      this.openSnackBar("Successfully deleted project.")
      this.router.navigate([`projects`])
    } else {
      this.openSnackBar(apiRes.message)
    }
  }

  onCancel() {
    let encodedTitle: string = encodeURI(this.project.title.toString())
    this.router.navigate([`projects/${encodedTitle}`])
  }

  checkboxChanged() {
    this.isFeatured = this.isFeatured ? false : true
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }

}