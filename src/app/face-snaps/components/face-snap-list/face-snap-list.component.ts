import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, takeUntil, tap } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss'],
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps$!: Observable<FaceSnap[]>;
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapService: FaceSnapsService) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
    interval(1000).pipe(tap(console.log), takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
