import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
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

  onSnap(faceSnapId: number): void {
    if (this.snapBtnText == 'Oh snap') {
      this.faceSnap$ = this.faceSnapService
        .snapFaceSnapById(faceSnapId, 'snap')
        .pipe(tap(() => (this.snapBtnText = 'Oops unSnap')));
    } else {
      this.faceSnap$ = this.faceSnapService
        .snapFaceSnapById(faceSnapId, 'unsnap')
        .pipe(tap(() => (this.snapBtnText = 'Oh snap')));
    }
  }
}
