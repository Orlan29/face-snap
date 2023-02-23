import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  faceSnaps!: FaceSnap[];

  constructor(private http: HttpClient) {}

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>("http://localhost:3000/facesnaps");
  }

  snapFaceSnapById(faceSnapId: number, snapTytpe: 'snap' | 'unsnap'): void {
    // const faceSnap = this.getfaceSnapById(faceSnapId);
    // snapTytpe == 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
  }

  getfaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    // const faceSnap = this.faceSnaps.find(
    //   (faceSnap) => faceSnap.id === faceSnapId
    // );

    // if (!faceSnap) throw new Error('FaceSnap not found');

    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  addNewFaceSnap(faceSnap: FaceSnap): void {
    this.faceSnaps.push(faceSnap);
  }
}
