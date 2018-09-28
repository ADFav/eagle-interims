import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment'
import { CookieService } from 'ngx-cookie-service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './mat-module/mat-module.module'


import { AppComponent } from './app.component';
import { QuestionEditorComponent } from 'src/app/exam-editor/question-editor/question-editor.component';
import { ExamEditorComponent } from './exam-editor/exam-editor.component';
import { StudentEditorComponent } from 'src/app/student-editor/student-editor.component';
import { ExamSelectorComponent } from 'src/app/exam-selector/exam-selector.component';
import { QuestionPreviewComponent } from 'src/app/question-preview/question-preview.component';
import { StudentUploaderComponent } from 'src/app/student-uploader/student-uploader.component';
import { AnalyzeComponent } from 'src/app/analyze/analyze.component';
import { SandboxComponent } from 'src/app/sandbox/sandbox.component';
import { TextMCEditorComponent } from 'src/app/exam-editor/question-editor/text-question-editor/text-mceditor/text-mceditor.component';
import { TextQuestionEditorComponent } from 'src/app/exam-editor/question-editor/text-question-editor/text-question-editor.component';
import { TextSAEditorComponent } from 'src/app/exam-editor/question-editor/text-question-editor/text-saeditor/text-saeditor.component';
import { QuestionMetadataComponent } from 'src/app/exam-editor/question-editor/question-metadata/question-metadata.component';
import { ImgQuestionEditorComponent } from 'src/app/exam-editor/question-editor/img-question-editor/img-question-editor.component';
import { TakeComponent } from './take/take.component';
import { TakeQuestionComponent } from './take/take-question/take-question.component';
import { QuestionSelectorComponent } from './take/question-selector/question-selector.component';
import { StudentLoginComponent } from './take/student-login/student-login.component';
import { TakeExamComponent } from './take/take-exam/take-exam.component';
import { StudentSelectExamComponent } from './take/student-select-exam/student-select-exam.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';

const appRoutes: Routes = [
  { path: 'take', component: TakeComponent },
  { path: 'analysis', component: AnalyzeComponent },
  { path: 'exams', component: ExamEditorComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: TakeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionEditorComponent,
    ExamEditorComponent,
    StudentEditorComponent,
    ExamSelectorComponent,
    TextMCEditorComponent,
    TextQuestionEditorComponent,
    TextSAEditorComponent,
    QuestionMetadataComponent,
    QuestionPreviewComponent,
    StudentUploaderComponent,
    AnalyzeComponent,
    SandboxComponent,
    ImgQuestionEditorComponent,
    TakeComponent,
    TakeQuestionComponent,
    QuestionSelectorComponent,
    StudentLoginComponent,
    TakeExamComponent,
    StudentSelectExamComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    MatModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
    CookieService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [StudentLoginComponent]
})
export class AppModule { }
