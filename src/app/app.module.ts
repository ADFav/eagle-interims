import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment'

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

const appRoutes: Routes = [
  { path: 'analysis', component: AnalyzeComponent },
  { path: '', component: ExamEditorComponent }
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
    TakeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
