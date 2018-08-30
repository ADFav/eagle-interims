import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { ExamEditorComponent } from './exam-editor/exam-editor.component';
import { StudentEditorComponent } from './student-editor/student-editor.component';
import { ExamSelectorComponent } from './exam-selector/exam-selector.component';
import { TextMCEditorComponent } from './text-mceditor/text-mceditor.component';
import { TextQuestionEditorComponent } from './text-question-editor/text-question-editor.component';
import { TextSAEditorComponent } from './text-saeditor/text-saeditor.component';
import { QuestionMetadataComponent } from './question-metadata/question-metadata.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { StudentUploaderComponent } from './student-uploader/student-uploader.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { ImgQuestionEditorComponent } from './img-question-editor/img-question-editor.component';

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
    ImgQuestionEditorComponent
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
