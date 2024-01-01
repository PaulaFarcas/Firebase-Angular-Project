import { Component } from '@angular/core';
import { FileMetaData } from '../model/FileMetaData';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { DataService } from '../_service/data.service';
import { FileService } from '../_service/file.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  /*
  selectedFiles !: FileList;
  currentFileUpload !: FileMetaData;
  percentage: number = 0;

  listOfFiles : FileMetaData[] = [];



  profileForm: FormGroup;
  selectedImage: File | null = null; 



  constructor(private fileService: FileService, 
              private fireStorage: AngularFireStorage, 
              private dataService : DataService,
              private authService: AuthService,
              private firestoreService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
    ) {  this.profileForm = this.fb.group({
    
    });}

  ngOnInit(): void {
    this.getAllFiles();
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {
     this.currentFileUpload =  new FileMetaData(this.selectedFiles[0]);
     const path = 'Uploads/'+this.currentFileUpload.file.name;

     const storageRef = this.fireStorage.ref(path);
     const uploadTask = storageRef.put(this.selectedFiles[0]);

     uploadTask.snapshotChanges().pipe(finalize( () => {
        storageRef.getDownloadURL().subscribe(downloadLink => {
          this.currentFileUpload.id = '';
          this.currentFileUpload.url = downloadLink;
          this.currentFileUpload.size = this.currentFileUpload.file.size;
          this.currentFileUpload.name = this.currentFileUpload.file.name;

          this.fileService.saveMetaDataOfFile(this.currentFileUpload);
        })
        this.ngOnInit();
     })
     ).subscribe( (res : any) => {
        this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
     }, err => {
        console.log('Error occured');
     });

  }

  getAllFiles() {
    this.fileService.getAllFiles().subscribe( res => {
        this.listOfFiles = res.map((e : any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            //console.log(data);
            return data;
        });
    }, err => {
        console.log('Error occured while fetching file meta data');
    })
  }

 */ 
}
