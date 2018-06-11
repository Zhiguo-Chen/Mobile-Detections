import {DashboardComponent} from "./dashboard.component";
import {Routes} from "@angular/router";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // {path: 'index', redirectTo: "", pathMatch: "full"},
      {path: 'video', loadChildren: 'app/video-test/video-test.module#VideoTestModule'},
      {path: 'posnet-detection', loadChildren: 'app/posnet-detection/posnet-detection.module#PosnetDetectionModule'},
      // {path: 'teacher', loadChildren: 'app/teacher/teacherBoard.module#TeacherBoardModule'},
      // {path: 'topic', loadChildren: 'app/topic/topicBoard.module#TopicBoardModule'},
      // {path: 'event', loadChildren: 'app/event/eventBoard.module#EventBoardModule'}
    ]
  }
];
