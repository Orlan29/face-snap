import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  constructor(private http: HttpClient) {}

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  snapFaceSnapById(
    faceSnapId: number,
    snapTytpe: 'snap' | 'unsnap'
  ): Observable<FaceSnap> {
    return this.getfaceSnapById(faceSnapId).pipe(
      map((faceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapTytpe == 'snap' ? 1 : -1),
      })),
      switchMap((faceSnap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnap.id}`,
          faceSnap
        )
      )
    );
  }

  getfaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    if (faceSnapId <= 0) throw new Error('FaceSnap not found');

    return this.http.get<FaceSnap>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    );
  }

  addNewFaceSnap(faceSnap: FaceSnap): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map((faceSnaps) => [...faceSnaps].sort((a, b) => a.id - b.id)),
      map((sortedFaceSnaps) => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map((lastFaceSnap) => ({
        ...faceSnap,
        id: lastFaceSnap.id + 1,
      })),
      switchMap((newFaceSnap) =>
        this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap)
      )
    );
  }
}
