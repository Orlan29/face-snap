import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss'],
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  snapBtnText!: string;

  constructor(
    private faceSnapService: FaceSnapsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.snapBtnText = 'Oh snap';
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

  onSnap(): void {
    if (this.snapBtnText == 'Oh snap') {
      this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.snapBtnText = 'Oops unSnap';
    } else {
      this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.snapBtnText = 'Oh snap';
    }
  }
}
