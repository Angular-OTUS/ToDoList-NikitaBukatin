import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Task, ToDoListTasksService} from "../../../services/to-do-list-tasks.service";
import {catchError, filter, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-to-do-list-description',
  templateUrl: './to-do-list-description.component.html',
  styleUrls: ['./to-do-list-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListDescriptionComponent implements OnInit {
  public description?: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute, private TaskService: ToDoListTasksService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
      if (params && params['id']) {
        this.TaskService.getTaskById(params['id'])
          .pipe(
            takeUntil(this.destroy$),
            catchError( () => {
              return of(null);
            }),
            filter(result => !!result),
          )
          .subscribe(task => {
              this.description = task!.description;
              this.changeDetectorRef.markForCheck();
          });
      }
    })
  }
}
