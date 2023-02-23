import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss'],
})
export class SingleFaceSnapComponent {
  faceSnap$!: Observable<FaceSnap>;
  snapBtnText!: string;

  constructor(
    private faceSnapService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.snapBtnText = 'Oh snap';
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapService.getfaceSnapById(faceSnapId);
  }

  onSnap(): void {
    // if (this.snapBtnText == 'Oh snap') {
    //   this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'snap');
    //   this.snapBtnText = 'Oops unSnap';
    // } else {
    //   this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    //   this.snapBtnText = 'Oh snap';
    // }
  }
}
