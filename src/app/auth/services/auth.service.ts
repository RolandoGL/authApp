import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, concat, map, Observable, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse, RegisterResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl
  private httpClient = inject( HttpClient )

  private _currentUser = signal<User | null>( null )
  private _authStatus = signal<AuthStatus>( AuthStatus.checking )

  public currentUser = computed( ()=> this._currentUser() )
  public authStatus = computed( ()=> this._authStatus() )

  constructor(){
    this.checkAuthStatus().subscribe()
  }

  public login( email: string, password: string ):Observable<boolean>{
    const url: string = `${this.baseUrl}/auth/login`
    const body = { email, password }

    return this.httpClient.post<LoginResponse>(url, body)
            .pipe(
              map(({ user, token}) => this.setAuthentication(user, token) ),
              // map( ()=> true ),
              catchError( err =>  throwError(err.error.message))
            )
  }

  public register( name:string, email:string, password:string):Observable<boolean>{
    const url:string = `${this.baseUrl}/auth/register`
    const body = { name, email, password }

    return this.httpClient.post<RegisterResponse>( url, body )
            .pipe(
              map(({ user, token}) => this.setAuthentication(user, token) ),
              catchError( err=> throwError(err.error.message))
            )

  }

  public checkAuthStatus(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token')

    if( !token ){
      this.logout()
      console.log('no hay token',this._authStatus())
      return of( false )
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<CheckTokenResponse>( url, {headers})
    .pipe(
      map(({user, token}) => this.setAuthentication( user, token)),
      catchError(()=>{
        this._authStatus.set( AuthStatus.notAuthenticated )
        return of(false)
      })
    )
  }

  public logout(){
    this._currentUser.set(null)
    this._authStatus.set( AuthStatus.notAuthenticated)
    localStorage.removeItem('token')
  }

  private setAuthentication(user: User, token: string):boolean{
    this._currentUser.set( user )
    this._authStatus.set( AuthStatus.authenticated )
    localStorage.setItem('token', token)
    return true
  }
}
